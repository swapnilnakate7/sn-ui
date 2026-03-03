---
description: How to setup Storybook in sn-ui project using Node 24
---
# Setup Storybook

This workflow initializes Storybook using Node 24.

1. Ensure NVM is loaded and switch to Node 24:
// turbo
```bash
source ~/.nvm/nvm.sh && nvm install 24 && nvm use 24
```

2. Initialize Storybook (will prompt for project selection in multi-project workspaces):
```bash
npx storybook@latest init
```

3. Choose `sn-ui` when prompted for the project to generate configuration for.
4. Follow the remaining onboarding prompts.
