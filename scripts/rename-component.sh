#!/bin/bash
# ============================================================================
# rename-component.sh
# Renames a component from {name} to {name}-x (or any custom suffix)
#
# Usage:
#   bash scripts/rename-component.sh sn-pagination
#   bash scripts/rename-component.sh sn-pagination sn-pagination-x
#
# What it does:
#   1. Renames projects/{old} directory to projects/{new}
#   2. Updates angular.json (project keys + paths)
#   3. Updates tsconfig.json (path mappings)
#   4. Updates package.json inside the component (name field)
#   5. Updates ng-package.json (dest path)
#   6. Updates component selector in .ts files
#   7. Updates template references in demo app
#   8. Updates publish-workflow.sh
#   9. Updates README.md
# ============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

OLD_NAME="$1"
NEW_NAME="${2:-${OLD_NAME}-x}"

if [ -z "$OLD_NAME" ]; then
    echo "Usage: bash scripts/rename-component.sh <old-name> [new-name]"
    echo "Example: bash scripts/rename-component.sh sn-pagination"
    echo "         (defaults to sn-pagination-x)"
    exit 1
fi

if [ ! -d "projects/$OLD_NAME" ] && [ ! -d "projects/$NEW_NAME" ]; then
    echo -e "${RED}❌ Directory projects/$OLD_NAME not found${NC}"
    exit 1
fi

echo "🔄 Renaming component: $OLD_NAME → $NEW_NAME"
echo "=========================================="

# --- Step 1: Rename directory ---
if [ -d "projects/$OLD_NAME" ]; then
    echo "📁 Renaming directory..."
    mv "projects/$OLD_NAME" "projects/$NEW_NAME"
    echo -e "  ${GREEN}✅ projects/$OLD_NAME → projects/$NEW_NAME${NC}"
else
    echo -e "  ${YELLOW}⚠️  Directory already renamed, skipping...${NC}"
fi

# --- Step 2: Update angular.json ---
echo "📝 Updating angular.json..."
node -e "
const fs = require('fs');
let content = fs.readFileSync('angular.json', 'utf8');
content = content.replaceAll('\"$OLD_NAME\"', '\"$NEW_NAME\"');
content = content.replaceAll('projects/$OLD_NAME', 'projects/$NEW_NAME');
fs.writeFileSync('angular.json', content);
console.log('  ✅ angular.json updated');
"

# --- Step 3: Update tsconfig.json ---
echo "📝 Updating tsconfig.json..."
node -e "
const fs = require('fs');
let content = fs.readFileSync('tsconfig.json', 'utf8');
content = content.replaceAll('\"$OLD_NAME\"', '\"$NEW_NAME\"');
content = content.replaceAll('projects/$OLD_NAME', 'projects/$NEW_NAME');
fs.writeFileSync('tsconfig.json', content);
console.log('  ✅ tsconfig.json updated');
"

# --- Step 4: Update package.json inside project ---
echo "📝 Updating project package.json..."
PACKAGE_FILE="projects/$NEW_NAME/package.json"
if [ -f "$PACKAGE_FILE" ]; then
    node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$PACKAGE_FILE', 'utf8'));
pkg.name = '$NEW_NAME';
fs.writeFileSync('$PACKAGE_FILE', JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ package.json name → $NEW_NAME');
"
fi

# --- Step 5: Update ng-package.json dest ---
echo "📝 Updating ng-package.json..."
NG_PKG_FILE="projects/$NEW_NAME/ng-package.json"
if [ -f "$NG_PKG_FILE" ]; then
    node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$NG_PKG_FILE', 'utf8'));
pkg.dest = '../../dist/$NEW_NAME';
fs.writeFileSync('$NG_PKG_FILE', JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ ng-package.json dest → ../../dist/$NEW_NAME');
"
fi

# --- Step 6: Update component selector in .ts files ---
echo "📝 Updating component selector..."
find "projects/$NEW_NAME/src" -name "*.ts" -exec sed -i "s|selector: '$OLD_NAME'|selector: '$NEW_NAME'|g" {} +
echo -e "  ${GREEN}✅ selector: '$OLD_NAME' → '$NEW_NAME'${NC}"

# --- Step 7: Update demo app references ---
echo "📝 Updating demo app references..."
if [ -f "src/app/list/list.component.ts" ]; then
    sed -i "s|$OLD_NAME|$NEW_NAME|g" src/app/list/list.component.ts
    echo -e "  ${GREEN}✅ list.component.ts updated${NC}"
fi
if [ -f "src/app/list/list.component.html" ]; then
    sed -i "s|<$OLD_NAME|<$NEW_NAME|g" src/app/list/list.component.html
    sed -i "s|</$OLD_NAME|</$NEW_NAME|g" src/app/list/list.component.html
    echo -e "  ${GREEN}✅ list.component.html updated${NC}"
fi

# --- Step 8: Update publish-workflow.sh ---
echo "📝 Updating publish-workflow.sh..."
if [ -f "scripts/publish-workflow.sh" ]; then
    sed -i "s|\"$OLD_NAME\"|\"$NEW_NAME\"|g" scripts/publish-workflow.sh
    echo -e "  ${GREEN}✅ publish-workflow.sh updated${NC}"
fi

# --- Step 9: Update README.md ---
echo "📝 Updating README.md..."
README_FILE="projects/$NEW_NAME/README.md"
if [ -f "$README_FILE" ]; then
    sed -i "s|$OLD_NAME|$NEW_NAME|g" "$README_FILE"
    echo -e "  ${GREEN}✅ README.md updated${NC}"
fi

# --- Step 10: Update Storybook stories ---
echo "📝 Updating Storybook stories..."
find "projects/$NEW_NAME/src" -name "*.stories.ts" -exec sed -i "s|$OLD_NAME|$NEW_NAME|g" {} + 2>/dev/null
echo -e "  ${GREEN}✅ Story files updated${NC}"

# --- Step 11: Update .storybook/tsconfig.json if it references the old name ---
echo "📝 Updating .storybook/tsconfig.json..."
if [ -f ".storybook/tsconfig.json" ]; then
    sed -i "s|$OLD_NAME|$NEW_NAME|g" .storybook/tsconfig.json 2>/dev/null
    echo -e "  ${GREEN}✅ .storybook/tsconfig.json updated${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Rename complete: $OLD_NAME → $NEW_NAME${NC}"
echo ""
echo "Next steps:"
echo "  1. Run: npx ng build $NEW_NAME"
echo "  2. Verify build passes"
echo "  3. Commit: git add -A && git commit -m 'rename: $OLD_NAME → $NEW_NAME'"
echo "=========================================="
