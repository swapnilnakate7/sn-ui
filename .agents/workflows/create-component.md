---
description: Checklist for creating a new component in sn-ui
---

# Component Creation Checklist

Before creating any new components for the `sn-ui` library, follow this checklist to ensure naming consistency and avoid NPM registry collisions:

1. **Check NPM for Naming Collisions**:
   Research the `npm` registry to see if a package with your proposed component name already exists (e.g., `sn-button`).
   
2. **Apply Suffix if Necessary**:
   If the package name is already published and owned by another author, you **MUST** add the suffix `-x` to the component name (e.g., `sn-button-x`, `sn-dropdown-x`).
   
3. **Generate the Component**:
   Once the name is verified and finalized, proceed with generating the Angular library/component.
   
4. **Update Documentation**:
   Ensure the new component is added to the relevant documentation and exported properly in the public API surface.
