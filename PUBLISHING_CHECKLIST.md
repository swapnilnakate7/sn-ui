# ✅ NPM Publishing Checklist

## Pre-Publishing Tasks

- [ ] Verify npm account exists (npmjs.com)
- [ ] Run `npm login`
- [ ] Verify login: `npm whoami` (should show username)
- [ ] Run `npm run build` (should complete with no errors)
- [ ] Run `npm test` (should show passing tests)
- [ ] Review each package.json file:
  - [ ] projects/sn-checkbox/package.json
  - [ ] projects/sn-radio/package.json
  - [ ] projects/sn-textarea/package.json
  - [ ] projects/sn-select/package.json
  - [ ] projects/sn-table/package.json

## Publishing

### Using Script (Recommended)
- [ ] Make script executable: `chmod +x scripts/publish-components.sh`
- [ ] Run script: `./scripts/publish-components.sh`
- [ ] Wait for completion
- [ ] Review summary output

### Manual Publishing
- [ ] `cd projects/sn-checkbox && npm publish --access public && cd ../..`
- [ ] `cd projects/sn-radio && npm publish --access public && cd ../..`
- [ ] `cd projects/sn-textarea && npm publish --access public && cd ../..`
- [ ] `cd projects/sn-select && npm publish --access public && cd ../..`
- [ ] `cd projects/sn-table && npm publish --access public && cd ../..`

## Post-Publishing Verification

- [ ] Check sn-checkbox: `npm view sn-checkbox`
- [ ] Check sn-radio: `npm view sn-radio`
- [ ] Check sn-textarea: `npm view sn-textarea`
- [ ] Check sn-select: `npm view sn-select`
- [ ] Check sn-table: `npm view sn-table`
- [ ] Visit npmjs.com/package/sn-checkbox (repeat for others)
- [ ] Search: `npm search sn-`

## Documentation Updates

- [ ] Update main README.md with npm install commands
- [ ] Create CHANGELOG.md for version 0.0.1
- [ ] Add npm badges to README
- [ ] Create GitHub releases for v0.0.1
- [ ] Update project documentation with usage examples

## Social Media & Announcements

- [ ] Post on Twitter/X
- [ ] Post on dev.to
- [ ] Post on Reddit (r/Angular, r/Angular2, r/typescript)
- [ ] Update GitHub repo description
- [ ] Update GitHub topics

## Future Planning

- [ ] Plan next version (0.0.2) features
- [ ] Create issues for improvements
- [ ] Set up monitoring for package downloads
- [ ] Set up GitHub Actions for automated publishing
- [ ] Consider scoped packages (@username/sn-checkbox) for v1.0.0

---

## 📊 Status

**Total Tasks:** 40
**Current Status:** Ready to Publish ✅

Next: Run `npm login && ./scripts/publish-components.sh`

