#!/bin/bash

# SnUI Components - Patch Version Updater
# Automatically updates patch version for components that failed to publish due to version conflicts

set -e

echo "🔄 SnUI Components - Patch Version Updater"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check npm login
if ! npm whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged in to npm${NC}"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Function to increment patch version
increment_patch_version() {
    local version=$1
    # Parse version: 0.0.1 -> 0.0.2
    IFS='.' read -r major minor patch <<< "$version"

    # Remove any pre-release or metadata
    patch=${patch%%-*}
    patch=$((patch + 1))

    echo "$major.$minor.$patch"
}

# Function to update package.json version
update_version() {
    local component=$1
    local package_file="projects/$component/package.json"

    if [ ! -f "$package_file" ]; then
        echo -e "${RED}❌ $package_file not found${NC}"
        return 1
    fi

    local current_version=$(node -pe "require('./$package_file').version")
    local new_version=$(increment_patch_version "$current_version")

    echo "  Current version: $current_version"
    echo "  New version:     $new_version"

    # Update using node
    node << EOF
const fs = require('fs');
const path = require('path');

const packagePath = '$package_file';
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

pkg.version = '$new_version';

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
console.log('✅ Version updated successfully');
EOF

    return $?
}

# Function to check version on NPM
check_npm_version() {
    local component=$1

    if npm_version=$(npm view "$component" version 2>/dev/null); then
        echo "  NPM version:     $npm_version"
        return 0
    else
        echo "  NPM version:     Not found (new package)"
        return 1
    fi
}

# Main menu
show_menu() {
    echo "What would you like to do?"
    echo ""
    echo "1) Update version for a specific component"
    echo "2) Update versions for multiple components"
    echo "3) Check version status of all components"
    echo "4) Auto-fix failed components (interactive)"
    echo "5) Exit"
    echo ""
    read -p "Enter choice [1-5]: " choice
}

# Option 1: Single component
update_single() {
    echo ""
    echo "Available components:"
    ls -1 projects/ | grep "^sn-" | nl
    echo ""
    read -p "Enter component name (e.g., sn-checkbox): " component

    if [ ! -d "projects/$component" ]; then
        echo -e "${RED}❌ Component not found: $component${NC}"
        return 1
    fi

    echo ""
    echo -e "${BLUE}Updating $component${NC}"
    echo "----------------------------------------"

    if check_npm_version "$component"; then
        echo ""
        if update_version "$component"; then
            echo -e "${GREEN}✅ $component version updated${NC}"
        fi
    else
        echo ""
        echo -e "${YELLOW}⚠️  Component not yet published on NPM${NC}"
        read -p "Still update version? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            if update_version "$component"; then
                echo -e "${GREEN}✅ $component version updated${NC}"
            fi
        fi
    fi
}

# Option 2: Multiple components
update_multiple() {
    echo ""
    echo "Enter component names separated by space:"
    echo "Example: sn-checkbox sn-radio sn-textarea"
    echo ""
    read -p "Components: " components

    for component in $components; do
        echo ""
        echo -e "${BLUE}Updating $component${NC}"
        echo "----------------------------------------"

        if [ ! -d "projects/$component" ]; then
            echo -e "${RED}❌ Component not found: $component${NC}"
            continue
        fi

        check_npm_version "$component"
        echo ""
        update_version "$component"
    done
}

# Option 3: Check all versions
check_all_versions() {
    echo ""
    echo "Component Version Status"
    echo "=========================================="
    echo ""

    for component_dir in projects/sn-*/; do
        component=$(basename "$component_dir")
        local_version=$(node -pe "require('./$component_dir/package.json').version")

        echo -n "$component:"
        printf '%*s' $((20 - ${#component})) ''
        echo -n "Local: $local_version  |  "

        if npm_version=$(npm view "$component" version 2>/dev/null); then
            echo "NPM: $npm_version"

            # Check if needs update
            if [ "$local_version" != "$npm_version" ]; then
                echo -n "  "
                printf '%*s' 20 ''
                echo -e "${YELLOW}⚠️  Version mismatch - may need update${NC}"
            fi
        else
            echo "NPM: Not published"
        fi
    done

    echo ""
}

# Option 4: Auto-fix failed components
auto_fix_failed() {
    echo ""
    echo "This will check all components and auto-update those with version conflicts."
    echo ""
    read -p "Continue? (y/n): " confirm

    if [ "$confirm" != "y" ]; then
        return 0
    fi

    echo ""
    UPDATED=()
    SKIPPED=()

    for component_dir in projects/sn-*/; do
        component=$(basename "$component_dir")
        local_version=$(node -pe "require('./$component_dir/package.json').version")

        if npm_version=$(npm view "$component" version 2>/dev/null); then
            if [ "$local_version" = "$npm_version" ]; then
                echo -e "${YELLOW}⚠️  $component v$local_version - Version already published${NC}"
                echo "   Updating patch version..."

                if update_version "$component"; then
                    UPDATED+=("$component")
                    echo -e "${GREEN}✅ Updated${NC}"
                fi
            else
                echo -e "${BLUE}ℹ️  $component - Local: $local_version, NPM: $npm_version${NC}"
                SKIPPED+=("$component")
            fi
        else
            echo -e "${BLUE}ℹ️  $component - Not yet published${NC}"
            SKIPPED+=("$component")
        fi
    done

    echo ""
    echo "=========================================="
    echo "Summary"
    echo "=========================================="
    echo ""

    if [ ${#UPDATED[@]} -gt 0 ]; then
        echo -e "${GREEN}✅ Updated (${#UPDATED[@]}):${NC}"
        for component in "${UPDATED[@]}"; do
            echo "   - $component"
        done
        echo ""
    fi

    if [ ${#SKIPPED[@]} -gt 0 ]; then
        echo -e "${BLUE}ℹ️  Skipped (${#SKIPPED[@]}):${NC}"
        for component in "${SKIPPED[@]}"; do
            echo "   - $component"
        done
        echo ""
    fi

    echo "You can now run: ./scripts/publish-components.sh"
}

# Main loop
while true; do
    show_menu

    case $choice in
        1)
            update_single
            ;;
        2)
            update_multiple
            ;;
        3)
            check_all_versions
            ;;
        4)
            auto_fix_failed
            ;;
        5)
            echo ""
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac

    echo ""
    read -p "Press Enter to continue..."
done

