#!/bin/bash

# SnUI Components - Smart Build & Publish Script
# Handles version conflicts, author checks, auto-renaming (-x), and prompts for OTP once

set -e

echo "🚀 SnUI Smart Publish Script (with Author Check)"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Track published components
PUBLISHED=()
FAILED=()
BUILT=()
BUILD_FAILED=()
VERSION_UPDATED=()
RENAMED=()

# Recognized authors
AUTHOR_ID="swapnilnakate7"
AUTHOR_EMAIL="nakate.swapnil7@gmail.com"

# All SnUI components to process
COMPONENTS=(
    # "sn-alert"
    # "sn-badge"
    # "sn-button-x"
    # "sn-card"
    # "sn-checkbox-x"
    # "sn-input"
    # "sn-modal"
    # "sn-radio"
    # "sn-dropdown-x"
    # "sn-spinner-x"
    # "sn-datatable"
    # "sn-tabs-x"
    # "sn-textarea"
    # "sn-toggle"
    "sn-avatar"
    "sn-skeleton"
    "sn-pagination"
)


echo "🔍 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged in to npm${NC}"
    echo "Please run: npm login"
    exit 1
fi
LOGGED_IN_USER=$(npm whoami)
echo -e "${GREEN}✅ Logged in as: $LOGGED_IN_USER${NC}"
echo ""

# --- Helper Functions ---

# Increment patch version
increment_patch_version() {
    local version=$1
    IFS='.' read -r major minor patch <<< "$version"
    patch=${patch%%-*}
    patch=$((patch + 1))
    echo "$major.$minor.$patch"
}

# Update version in package.json
update_version() {
    local folder_name=$1
    local package_file="projects/$folder_name/package.json"

    local current_version=$(node -pe "require('./$package_file').version")
    local new_version=$(increment_patch_version "$current_version")

    node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$package_file', 'utf8'));
pkg.version = '$new_version';
fs.writeFileSync('$package_file', JSON.stringify(pkg, null, 2) + '\n');
"

    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✅ Version bumped: $current_version → $new_version${NC}"
        return 0
    else
        echo -e "  ${RED}❌ Failed to update version${NC}"
        return 1
    fi
}

# Rename component by appending -x
rename_component_x() {
    local component=$1
    local new_name="${component}-x"
    echo -e "${YELLOW}⚠️  Author mismatch detected! Renaming $component to $new_name...${NC}"

    if [ ! -d "projects/$component" ]; then
        echo -e "${RED}❌ Cannot rename: projects/$component does not exist.${NC}"
        return 1
    fi

    # Rename directory
    mv "projects/$component" "projects/$new_name"

    # Update angular.json
    node -e "
const fs = require('fs');
let aj = fs.readFileSync('angular.json', 'utf8');
// replace object keys
aj = aj.split('\"$component\"').join('\"$new_name\"');
// replace paths
aj = aj.split('projects/$component').join('projects/$new_name');
fs.writeFileSync('angular.json', aj);
"

    # Update package.json inside project
    local package_file="projects/$new_name/package.json"
    node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$package_file', 'utf8'));
pkg.name = '$new_name';
fs.writeFileSync('$package_file', JSON.stringify(pkg, null, 2) + '\n');
"
    # Update tsconfig.json paths if they exist
    node -e "
const fs = require('fs');
let ts = fs.readFileSync('tsconfig.json', 'utf8');
ts = ts.split('\"$component\"').join('\"$new_name\"');
ts = ts.split('projects/$component').join('projects/$new_name');
fs.writeFileSync('tsconfig.json', ts);
"
    
    echo -e "  ${GREEN}✅ Renamed to $new_name successfully!${NC}"
    echo "$new_name" # Output new name to capture
}


# Check if package exists and verify owner
verify_package_status() {
    local package_name=$1
    
    # Check if package exists in registry
    if npm view "$package_name" version > /dev/null 2>&1; then
        local maintainers=$(npm view "$package_name" maintainers 2>/dev/null)
        
        # Check if author matches
        if echo "$maintainers" | grep -q "$AUTHOR_ID\|$AUTHOR_EMAIL\|$LOGGED_IN_USER"; then
             echo "OWNED"
             return 0
        else
             echo "TAKEN"
             return 0
        fi
    else
        echo "NEW"
        return 0
    fi
}

# Ensure final version is strictly greater than NPM version
sync_version() {
    local folder_name=$1
    local package_file="projects/$folder_name/package.json"
    local package_name=$(node -pe "require('./$package_file').name")
    local local_version=$(node -pe "require('./$package_file').version")
    
    local npm_version=$(npm view "$package_name" version 2>/dev/null)
    
    # If version exists on npm, ensure ours is newer
    if [ ! -z "$npm_version" ]; then
         # Simple comparison, if they match, we bump it
         if [ "$local_version" = "$npm_version" ]; then
             update_version "$folder_name"
             VERSION_UPDATED+=("$package_name")
         fi
    fi
}


build_and_publish() {
    local folder_name=$1
    local package_file="projects/$folder_name/package.json"
    local package_name=$(node -pe "require('./$package_file').name")
    local version=$(node -pe "require('./$package_file').version")
    local dest_path=$(node -pe "require('path').resolve('projects/$folder_name', require('./projects/$folder_name/ng-package.json').dest)")
    
    echo "🔨 Building $package_name..."
    cd "projects/$folder_name"
    if [ ! -f "ng-package.json" ]; then
        echo -e "${RED}❌ ng-package.json not found in $folder_name${NC}"
        cd ../../
        return 1
    fi
    cd ../../

    if npm run build -- --configuration production "$package_name" > /tmp/build_${package_name}.log 2>&1; then
         BUILT+=("$package_name")
    else
         echo -e "${RED}❌ Failed to build $package_name${NC}"
         BUILD_FAILED+=("$package_name")
         return 1
    fi

    echo "📤 Publishing $package_name@$version..."
    cd "$dest_path"
    
    local publish_cmd="npm publish --access public"
    if [ -n "$OTP_CODE" ]; then
        publish_cmd="$publish_cmd --otp=$OTP_CODE"
    fi

    if $publish_cmd > /tmp/publish_${package_name}.log 2>&1; then
        echo -e "${GREEN}✅ Successfully published $package_name@$version${NC}"
        cd ../../
        PUBLISHED+=("$package_name")
        return 0
    else
        echo -e "${RED}❌ Failed to publish $package_name${NC}"
        cat /tmp/publish_${package_name}.log
        cd ../../
        FAILED+=("$package_name")
        return 1
    fi
}

# ============================================================================
# PHASE 1: Pre-publish Checks & Renaming
# ============================================================================

echo ""
echo "=========================================="
echo "PHASE 1: Checking Packages & Resolving Clashes"
echo "=========================================="
echo ""

READY_COMPONENTS=()

for component in "${COMPONENTS[@]}"; do
    if [ ! -d "projects/$component" ]; then
        echo -e "${YELLOW}⚠️  Skipping: projects/$component (not found)${NC}"
        continue
    fi
    
    package_file="projects/$component/package.json"
    package_name=$(node -pe "require('./$package_file').name")
    
    echo "🔍 Checking status for: $package_name"
    status=$(verify_package_status "$package_name")
    
    if [ "$status" = "TAKEN" ]; then
         # Does not belong to us
         new_folder=$(rename_component_x "$component")
         RENAMED+=("$component → $new_folder")
         sync_version "$new_folder"
         READY_COMPONENTS+=("$new_folder")
    else
         # NEW or OWNED
         if [ "$status" = "OWNED" ]; then
             sync_version "$component"
         fi
         READY_COMPONENTS+=("$component")
    fi
    echo "----------------------------------------"
done

# ============================================================================
# OTP Setup
# ============================================================================
echo ""
echo "🔐 Two-Factor Authentication Setup"
read -p "Do you want to use OTP for publishing? (y/n): " use_otp

OTP_CODE=""
if [[ "$use_otp" == "y" || "$use_otp" == "Y" ]]; then
    read -p "📱 Enter 6-digit OTP code: " OTP_CODE
fi

# ============================================================================
# PHASE 2: Build & Publish
# ============================================================================
echo ""
echo "=========================================="
echo "PHASE 2: Building & Publishing"
echo "=========================================="
echo ""

for folder in "${READY_COMPONENTS[@]}"; do
   build_and_publish "$folder"
done

# ============================================================================
# PHASE 3: Summary
# ============================================================================
echo ""
echo "=========================================="
echo "📊 Final Summary"
echo "=========================================="

if [ ${#RENAMED[@]} -gt 0 ]; then
    echo -e "${YELLOW}🔄 Renamed Components (${#RENAMED[@]}):${NC}"
    for item in "${RENAMED[@]}"; do echo "   - $item"; done
    echo ""
fi

if [ ${#VERSION_UPDATED[@]} -gt 0 ]; then
    echo -e "${BLUE}🔄 Versions Bumped (${#VERSION_UPDATED[@]}):${NC}"
    for item in "${VERSION_UPDATED[@]}"; do echo "   - $item"; done
    echo ""
fi

if [ ${#PUBLISHED[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Published (${#PUBLISHED[@]}):${NC}"
    for item in "${PUBLISHED[@]}"; do echo "   - $item"; done
    echo ""
fi

if [ ${#BUILD_FAILED[@]} -gt 0 ] || [ ${#FAILED[@]} -gt 0 ]; then
    echo -e "${RED}❌ Failed: ${NC} ${#BUILD_FAILED[@]} builds, ${#FAILED[@]} publishes"
    exit 1
else
    echo -e "${GREEN}✨ All selected components processed successfully!${NC}"
    exit 0
fi
