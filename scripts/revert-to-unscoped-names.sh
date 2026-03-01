#!/bin/bash
# Revert all package names to unscoped format
# Rename conflicting packages to avoid NPM conflicts
echo "🔄 Reverting package names to unscoped format..."
echo ""
# Map of component names (handle conflicts)
declare -A NAME_MAP=(
    ["sn-alert"]="sn-alert"
    ["sn-badge"]="sn-badge"
    ["sn-button-x"]="sn-button-x"
    ["sn-card"]="sn-card"
    ["sn-checkbox"]="sn-checkbox"
    ["sn-input"]="sn-input"
    ["sn-modal"]="sn-modal"
    ["sn-radio"]="sn-radio"
    ["sn-select"]="sn-dropdown"          # Rename to avoid conflict
    ["sn-spinner"]="sn-spinner"
    ["sn-table"]="sn-datatable"          # Rename to avoid conflict
    ["sn-tabs"]="sn-tabs"
    ["sn-textarea"]="sn-textarea"
    ["sn-toggle"]="sn-toggle"
)
for component_dir in projects/sn-*/; do
    component=$(basename "$component_dir")
    package_file="${component_dir}package.json"
    if [ -f "$package_file" ]; then
        new_name="${NAME_MAP[$component]}"
        if [ "$component" != "$new_name" ]; then
            echo "Renaming: $component → $new_name (avoiding NPM conflict)"
        else
            echo "Updating: $component → $new_name (unscoped)"
        fi
        # Update package name using node
        node << NODESCRIPT
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$package_file', 'utf8'));
pkg.name = '${new_name}';
fs.writeFileSync('$package_file', JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Updated');
NODESCRIPT
    fi
done
echo ""
echo "✅ All components updated!"
echo ""
echo "Package names (avoiding NPM conflicts):"
echo "  - sn-alert"
echo "  - sn-badge"
echo "  - sn-button-x"
echo "  - sn-card"
echo "  - sn-checkbox"
echo "  - sn-input"
echo "  - sn-modal"
echo "  - sn-radio"
echo "  - sn-dropdown (was sn-select, renamed to avoid conflict)"
echo "  - sn-spinner"
echo "  - sn-datatable (was sn-table, renamed to avoid conflict)"
echo "  - sn-tabs"
echo "  - sn-textarea"
echo "  - sn-toggle"
echo ""
echo "Users will install with:"
echo "  npm install sn-checkbox"
echo "  npm install sn-datatable"
echo "  npm install sn-dropdown"
