#!/bin/bash

# SnUI Components - Smart Build & Publish Script
# Handles version conflicts automatically and prompts for OTP once

set -e  # Exit on error

echo "🚀 SnUI Smart Publish Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track published components
PUBLISHED=()
FAILED=()
BUILT=()
BUILD_FAILED=()
VERSION_UPDATED=()

# Standard author info
AUTHOR_NAME="Swapnil Nakate"
AUTHOR_EMAIL="nakate.swapnil7@gmail.com"
AUTHOR_URL="https://swapnilnakate.in"

# All SnUI components
ALL_COMPONENTS=(
#    "sn-alert"
#    "sn-badge"
#    "sn-button-x"
#    "sn-card"
#    "sn-checkbox-x"
#    "sn-input"
#    "sn-modal"
#    "sn-radio"
    "sn-dropdown-x"
    "sn-spinner-x"
#    "sn-datatable"
    "sn-tabs-x"
#    "sn-textarea"
#    "sn-toggle"
)

# Components to publish (all 14 components)
COMPONENTS=(
#    "sn-alert"
#    "sn-badge"
#    "sn-button-x"
#    "sn-card"
#    "sn-checkbox-x"
#    "sn-input"
#    "sn-modal"
#    "sn-radio"
    "sn-dropdown-x"
    "sn-spinner-x"
#    "sn-datatable"
    "sn-tabs-x"
#    "sn-textarea"
#    "sn-toggle"
)

# Check if logged in to npm
echo "🔍 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged in to npm${NC}"
    echo "Please run: npm login"
    exit 1
fi

echo -e "${GREEN}✅ Logged in as: $(npm whoami)${NC}"
echo ""


# Helper function: Increment patch version
increment_patch_version() {
    local version=$1
    IFS='.' read -r major minor patch <<< "$version"
    patch=${patch%%-*}
    patch=$((patch + 1))
    echo "$major.$minor.$patch"
}

# Helper function: Update version in package.json
update_version() {
    local component=$1
    local package_file="projects/$component/package.json"

    local current_version=$(node -pe "require('./$package_file').version")
    local new_version=$(increment_patch_version "$current_version")

    echo "  Updating version: $current_version → $new_version"

    node << EOF
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$package_file', 'utf8'));
pkg.version = '$new_version';
fs.writeFileSync('$package_file', JSON.stringify(pkg, null, 2) + '\n');
EOF

    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✅ Version updated${NC}"
        VERSION_UPDATED+=("$component")
        return 0
    else
        echo -e "  ${RED}❌ Failed to update version${NC}"
        return 1
    fi
}

# Helper function: Build component
build_component() {
    local component=$1

    echo "🔨 Building $component..."

    cd "projects/$component"

    if [ ! -f "ng-package.json" ]; then
        echo -e "${RED}❌ ng-package.json not found${NC}"
        cd ../../
        return 1
    fi

    cd ../../

    if npm run build -- --configuration production "$component" > /tmp/build_${component}.log 2>&1; then
        echo -e "${GREEN}✅ Successfully built $component${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to build $component${NC}"
        echo "Build log:"
        tail -20 /tmp/build_${component}.log
        return 1
    fi
}

# Helper function: Check if version exists on NPM
check_version_on_npm() {
    local component=$1
    local package_file="projects/$component/package.json"
    local package_name=$(node -pe "require('./$package_file').name")
    local local_version=$(node -pe "require('./$package_file').version")

    if npm_version=$(npm view "$package_name" version 2>/dev/null); then
        if [ "$local_version" = "$npm_version" ]; then
            return 0  # Version conflict exists
        fi
    fi
    return 1  # No conflict
}

# Helper function: Publish component
publish_component() {
    local component=$1
    local package_file="projects/$component/package.json"
    local package_name=$(node -pe "require('./$package_file').name")
    local local_version=$(node -pe "require('./$package_file').version")

    cd "projects/$component"

    echo "📤 Publishing $package_name@$local_version..."

    local publish_cmd="npm publish --access public"
    if [ -n "$OTP_CODE" ]; then
        publish_cmd="$publish_cmd --otp=$OTP_CODE"
    fi

    if $publish_cmd > /tmp/publish_${component}.log 2>&1; then
        echo -e "${GREEN}✅ Successfully published $package_name@$local_version${NC}"
        cd ../../
        return 0
    else
        local error_output=$(cat /tmp/publish_${component}.log)

        # Check if it's a version conflict
        if echo "$error_output" | grep -q "already exists\|You cannot publish over the previously published versions"; then
            echo -e "${YELLOW}⚠️  Version conflict detected${NC}"
            cd ../../
            return 2  # Special code for version conflict
        else
            echo -e "${RED}❌ Failed to publish${NC}"
            echo "Error:"
            tail -10 /tmp/publish_${component}.log
            cd ../../
            return 1
        fi
    fi
}

# ============================================================================
# PHASE 1: Build All Components
# ============================================================================

echo ""
echo "=========================================="
echo "PHASE 1: Building Components"
echo "=========================================="
echo ""

for component in "${ALL_COMPONENTS[@]}"; do
    if [ ! -d "projects/$component" ]; then
        echo -e "${YELLOW}⚠️  Skipping: projects/$component (not found)${NC}"
        continue
    fi

    echo ""
    echo "Building: $component"
    echo "----------------------------------------"

    if build_component "$component"; then
        BUILT+=("$component")
    else
        BUILD_FAILED+=("$component")
    fi
done

echo ""
echo "=========================================="
echo "Build Summary"
echo "=========================================="

if [ ${#BUILT[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Successfully built (${#BUILT[@]}):${NC}"
    for component in "${BUILT[@]}"; do
        echo "   - $component"
    done
fi

if [ ${#BUILD_FAILED[@]} -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ Build failed (${#BUILD_FAILED[@]}):${NC}"
    for component in "${BUILD_FAILED[@]}"; do
        echo "   - $component"
    done
fi

echo ""

# ============================================================================
# OTP Setup - After Build Phase
# ============================================================================

echo ""
echo "🔐 Two-Factor Authentication Setup"
echo "────────────────────────────────────────"
echo "All components have been built successfully!"
echo ""
echo "Now, before publishing, we need to set up OTP if you have 2FA enabled."
echo ""
read -p "Do you want to use OTP for publishing? (y/n): " use_otp

OTP_CODE=""
if [[ "$use_otp" == "y" || "$use_otp" == "Y" ]]; then
    echo ""
    echo "📱 Get your 6-digit OTP code from your authenticator app"
    read -p "Enter OTP code: " OTP_CODE
    echo -e "${GREEN}✅ OTP code saved (will be used for all publishes)${NC}"
else
    echo -e "${BLUE}ℹ️  Publishing without OTP${NC}"
fi

echo ""

# ============================================================================
# PHASE 2: Publish Components (with automatic retry on version conflicts)
# ============================================================================

echo ""
echo "=========================================="
echo "PHASE 2: Publishing Components"
echo "=========================================="
echo ""

for component in "${COMPONENTS[@]}"; do
    echo "=========================================="
    echo "Publishing: $component"
    echo "=========================================="
    echo ""

    if [ ! -d "projects/$component" ]; then
        echo -e "${RED}❌ Directory not found: projects/$component${NC}"
        FAILED+=("$component")
        continue
    fi

    # Check if component was built successfully
    if [[ ! " ${BUILT[@]} " =~ " ${component} " ]]; then
        echo -e "${YELLOW}⚠️  Skipping: Component was not built successfully${NC}"
        FAILED+=("$component")
        continue
    fi

    package_file="projects/$component/package.json"
    package_name=$(node -pe "require('./$package_file').name")
    component_version=$(node -pe "require('./$package_file').version")

    echo "📦 Component: $package_name"
    echo "   Version: $component_version"
    echo ""

    # First publish attempt
    publish_component "$component"
    publish_result=$?

    if [ $publish_result -eq 0 ]; then
        PUBLISHED+=("$component")
    elif [ $publish_result -eq 2 ]; then
        # Version conflict - auto-update and retry
        echo ""
        echo -e "${BLUE}🔄 Auto-updating version and retrying...${NC}"
        echo ""

        if update_version "$component"; then
            echo ""
            echo "🔄 Retrying publish with new version..."
            echo ""

            # Retry publish
            publish_component "$component"
            retry_result=$?

            if [ $retry_result -eq 0 ]; then
                PUBLISHED+=("$component")
            else
                FAILED+=("$component")
            fi
        else
            FAILED+=("$component")
        fi
    else
        FAILED+=("$component")
    fi

    echo ""
done

# ============================================================================
# PHASE 3: Final Summary
# ============================================================================

echo ""
echo "=========================================="
echo "📊 Final Summary"
echo "=========================================="
echo ""

if [ ${#BUILT[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Built Components (${#BUILT[@]}):${NC}"
    for component in "${BUILT[@]}"; do
        echo "   - $component"
    done
    echo ""
fi

if [ ${#VERSION_UPDATED[@]} -gt 0 ]; then
    echo -e "${BLUE}🔄 Version Updated (${#VERSION_UPDATED[@]}):${NC}"
    for component in "${VERSION_UPDATED[@]}"; do
        new_ver=$(node -pe "require('./projects/$component/package.json').version")
        echo "   - $component → v$new_ver"
    done
    echo ""
fi

if [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Successfully Published (${#PUBLISHED[@]}):${NC}"
    for component in "${PUBLISHED[@]}"; do
        pkg_name=$(node -pe "require('./projects/$component/package.json').name")
        pkg_ver=$(node -pe "require('./projects/$component/package.json').version")
        echo "   - $pkg_name@$pkg_ver"
    done
    echo ""
fi

if [ ${#FAILED[@]} -gt 0 ]; then
    echo -e "${RED}❌ Failed to Publish (${#FAILED[@]}):${NC}"
    for component in "${FAILED[@]}"; do
        echo "   - $component"
    done
    echo ""
fi

# Verify published packages
if [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo "🔍 Verifying published packages on NPM..."
    echo ""

    for component in "${PUBLISHED[@]}"; do
        pkg_name=$(node -pe "require('./projects/$component/package.json').name")
        if npm view "$pkg_name" version > /dev/null 2>&1; then
            version=$(npm view "$pkg_name" version)
            echo -e "${GREEN}✅ $pkg_name@$version${NC}"
        fi
    done
fi

echo ""
echo "=========================================="
echo "🎉 Publishing Process Complete!"
echo "=========================================="
echo ""

if [ ${#FAILED[@]} -eq 0 ] && [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo -e "${GREEN}✨ All selected components published successfully!${NC}"
    echo ""
    echo "Users can now install with:"
    for component in "${PUBLISHED[@]}"; do
        pkg_name=$(node -pe "require('./projects/$component/package.json').name")
        echo "  npm install $pkg_name"
    done
    echo ""
    exit 0
else
    if [ ${#PUBLISHED[@]} -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Some components published, but some failed.${NC}"
    else
        echo -e "${RED}❌ No components were published successfully.${NC}"
    fi
    echo ""
    echo "Check the errors above for details."
    exit 1
fi

