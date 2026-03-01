#!/bin/bash
# Script to update all component names to use @swapnilnakate7 scope
SCOPE="@swapnilnakate7"
echo "🔄 Updating all component packages to use scoped names..."
echo ""
for component_dir in projects/sn-*/; do
    component=$(basename "$component_dir")
    package_file="${component_dir}package.json"
    if [ -f "$package_file" ]; then
        echo "Updating: $component → ${SCOPE}/${component}"
        # Update package name using node
        node << NODESCRIPT
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$package_file', 'utf8'));
pkg.name = '${SCOPE}/${component}';
fs.writeFileSync('$package_file', JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Updated');
NODESCRIPT
    fi
done
echo ""
echo "✅ All components updated to use scoped names!"
echo ""
echo "Components will now be published as:"
for component_dir in projects/sn-*/; do
    component=$(basename "$component_dir")
    echo "  - ${SCOPE}/${component}"
done
