#!/bin/bash

# SnUI Components - Build & NPM Publishing Script
# This script builds all SnUI components and publishes them to NPM
#
# IMPORTANT: Must be run with bash, not sh!
#
# Usage:
#   bash ./scripts/publish-components.sh
#
# Note: If you have 2FA enabled, you'll be prompted for OTP before publishing

set -e  # Exit on error

echo "🚀 SnUI Components - Build & Publish Script"
echo "=========================================="
echo ""

# Check if logged in to npm
echo "🔍 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to npm"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Standard author info (matching sn-button-x)
AUTHOR_NAME="Swapnil Nakate"
AUTHOR_EMAIL="nakate.swapnil7@gmail.com"
AUTHOR_URL="https://swapnilnakate.in"

# All SnUI components
ALL_COMPONENTS=(
    "sn-alert"
    "sn-badge"
    "sn-button-x"
    "sn-card"
    "sn-checkbox"
    "sn-input"
    "sn-modal"
    "sn-radio"
    "sn-select"
    "sn-spinner"
    "sn-table"
    "sn-tabs"
    "sn-textarea"
    "sn-toggle"
)

# Components to publish (can be customized)
COMPONENTS=(
    "sn-checkbox"
    "sn-radio"
    "sn-textarea"
    "sn-select"
    "sn-table"
)

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

# Helper function: Check if version is valid patch update
check_version_validity() {
    local component=$1
    local current_version=$2
    local npm_version=$3

    # Parse versions
    IFS='.' read -r current_major current_minor current_patch <<< "$current_version"
    IFS='.' read -r npm_major npm_minor npm_patch <<< "$npm_version"

    # Remove any pre-release or metadata
    current_major=${current_major%%-*}
    current_minor=${current_minor%%-*}
    current_patch=${current_patch%%-*}
    npm_major=${npm_major%%-*}
    npm_minor=${npm_minor%%-*}
    npm_patch=${npm_patch%%-*}

    # Check if only patch version changed
    if [ "$current_major" != "$npm_major" ] || [ "$current_minor" != "$npm_minor" ]; then
        echo -e "${RED}⚠️  Version mismatch detected!${NC}"
        echo "   Current: $current_version (local)"
        echo "   Published: $npm_version (NPM)"
        echo "   Only patch version updates are allowed"
        return 1
    fi

    return 0
}

# Helper function: Validate author info in package.json
validate_author_info() {
    local component=$1
    local package_file="projects/$component/package.json"

    local author=$(node -pe "try { const a = require('./$package_file').author; typeof a === 'string' ? a : (a.name || 'unknown'); } catch(e) { 'error'; }")

    if [[ "$author" == "Your Name"* ]] || [[ "$author" == "error" ]]; then
        echo -e "${YELLOW}⚠️  Author info needs to be updated in $component${NC}"
        return 1
    fi

    return 0
}

# Helper function: Standardize author info
standardize_author() {
    local component=$1
    local package_file="projects/$component/package.json"

    echo "  Standardizing author info..."

    # Create temporary file with updated author
    node << EOF
const fs = require('fs');
const path = require('path');

const packagePath = '$package_file';
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Update author info
pkg.author = {
    name: '$AUTHOR_NAME',
    email: '$AUTHOR_EMAIL',
    url: '$AUTHOR_URL'
};

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
EOF

    if [ $? -eq 0 ]; then
        echo "  ✅ Author standardized for $component"
        return 0
    else
        echo -e "${RED}  ❌ Failed to standardize author for $component${NC}"
        return 1
    fi
}

# Helper function: Build component
build_component() {
    local component=$1

    echo "🔨 Building $component..."

    cd "projects/$component"

    # Check if ng-package.json exists (indicates it's a library)
    if [ ! -f "ng-package.json" ]; then
        echo -e "${RED}❌ ng-package.json not found for $component${NC}"
        cd ../../
        return 1
    fi

    # Build the component from root
    cd ../../

    if npm run build -- --configuration production "$component" 2>&1 | tee /tmp/build_log.txt; then
        echo -e "${GREEN}✅ Successfully built $component${NC}"

        # Verify dist folder was created
        if [ -d "dist/$component" ] || [ -d "projects/$component/dist" ]; then
            echo -e "${GREEN}  ✅ Distribution files created${NC}"
            return 0
        else
            echo -e "${YELLOW}  ⚠️  Distribution folder not found, but build succeeded${NC}"
            return 0
        fi
    else
        echo -e "${RED}❌ Failed to build $component${NC}"
        echo "Build output:"
        tail -20 /tmp/build_log.txt
        return 1
    fi
}

# Helper function: Verify build artifacts
verify_build_artifacts() {
    local component=$1

    # Check for dist folder in multiple locations
    if [ -d "dist/$component" ]; then
        local file_count=$(find "dist/$component" -type f | wc -l)
        echo "  ✅ Found $file_count files in dist/$component"
        return 0
    elif [ -d "projects/$component/dist" ]; then
        local file_count=$(find "projects/$component/dist" -type f | wc -l)
        echo "  ✅ Found $file_count files in projects/$component/dist"
        return 0
    else
        echo "  ⚠️  No dist folder found (may not be critical)"
        return 0
    fi
}


# Build all components first
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
        verify_build_artifacts "$component"
    else
        BUILD_FAILED+=("$component")
    fi
done

# Report build status
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
    echo -e "${RED}❌ Build failed (${#BUILD_FAILED[@]}):${NC}"
    for component in "${BUILD_FAILED[@]}"; do
        echo "   - $component"
    done
    echo ""
    echo -e "${YELLOW}⚠️  Some components failed to build. Review errors above.${NC}"
    echo "Continuing with publishing for built components..."
fi

echo ""

# Publish selected components
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

    cd "projects/$component"

    echo "📦 Component info:"
    echo "  Name: $component"
    local_version=$(node -pe "require('./package.json').version")
    echo "  Version: $local_version"
    echo ""

    # Verify package.json exists and is valid
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ package.json not found${NC}"
        FAILED+=("$component")
        cd ../../
        continue
    fi

    # Check if component was built successfully
    if [[ ! " ${BUILT[@]} " =~ " ${component} " ]]; then
        echo -e "${YELLOW}⚠️  Skipping publish: Component was not built successfully${NC}"
        FAILED+=("$component")
        cd ../../
        continue
    fi

    # Validate and standardize author info
    echo "🔍 Validating author information..."
    if ! validate_author_info "$component"; then
        echo "  Updating author information..."
        cd ../../
        standardize_author "$component"
        cd "projects/$component"
    else
        echo "  ✅ Author information is valid"
    fi

    echo ""

    # Check if component already exists on NPM
    echo "🔍 Checking NPM registry..."
    if npm_version=$(npm view "$component" version 2>/dev/null); then
        echo "  ✅ Found on NPM: $component@$npm_version"
        echo ""

        # Validate version update (only patch versions allowed)
        echo "📊 Validating version update..."
        if ! check_version_validity "$component" "$local_version" "$npm_version"; then
            echo ""
            echo -e "${RED}❌ Version validation failed${NC}"
            FAILED+=("$component")
            cd ../../
            continue
        fi

        if [ "$local_version" = "$npm_version" ]; then
            echo -e "${YELLOW}⚠️  Version unchanged: $local_version${NC}"
            echo "   No update needed"
            FAILED+=("$component")
            cd ../../
            continue
        fi

        echo "  ✅ Version is valid for update"
    else
        echo "  ℹ️  New package (not found on NPM)"
    fi

    echo ""

    # Prompt for OTP just before publishing
    echo "🔐 Two-Factor Authentication"
    echo "────────────────────────────────────────"
    echo "If you have 2FA enabled, enter your OTP code now."
    echo "If not, just press Enter to continue."
    echo ""
    read -p "Enter OTP code (or press Enter to skip): " otp_code

    OTP_FLAG=""
    if [ -n "$otp_code" ]; then
        OTP_FLAG="--otp=$otp_code"
        echo "✅ Using OTP: ${otp_code}"
    else
        echo "ℹ️  Publishing without OTP"
    fi
    echo ""

    # Try to publish
    echo "📤 Publishing to NPM..."
    if npm publish --access public $OTP_FLAG 2>&1 | tee /tmp/publish_log.txt; then
        echo ""
        echo -e "${GREEN}✅ Successfully published $component@$local_version${NC}"
        PUBLISHED+=("$component")
    else
        echo ""
        echo -e "${RED}❌ Failed to publish $component${NC}"
        echo "Error output:"
        tail -10 /tmp/publish_log.txt
        FAILED+=("$component")
    fi

    cd ../../
    echo ""
done

# Summary
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

if [ ${#BUILD_FAILED[@]} -gt 0 ]; then
    echo -e "${RED}❌ Build Failed (${#BUILD_FAILED[@]}):${NC}"
    for component in "${BUILD_FAILED[@]}"; do
        echo "   - $component"
    done
    echo ""
fi

if [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Successfully Published (${#PUBLISHED[@]}):${NC}"
    for component in "${PUBLISHED[@]}"; do
        echo "   - $component"
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
echo "🔍 Verifying published packages on NPM..."
echo ""

for component in "${PUBLISHED[@]}"; do
    if npm view "$component" version > /dev/null 2>&1; then
        version=$(npm view "$component" version)
        echo -e "${GREEN}✅ $component@$version${NC}"
    fi
done

echo ""
echo "=========================================="
echo "🎉 Publishing Process Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  Built: ${#BUILT[@]} / ${#ALL_COMPONENTS[@]} components"
echo "  Published: ${#PUBLISHED[@]} / ${#COMPONENTS[@]} selected components"
echo ""

if [ ${#FAILED[@]} -eq 0 ] && [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo -e "${GREEN}All selected components published successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Visit https://npmjs.com/package/<component-name>"
    echo "2. Verify package details"
    echo "3. Update documentation with install commands"
    echo ""
    exit 0
else
    echo -e "${YELLOW}Some components did not publish. Check errors above.${NC}"
    echo ""
    exit 1
fi

