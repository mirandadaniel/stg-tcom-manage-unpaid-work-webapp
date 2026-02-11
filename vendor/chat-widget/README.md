# Chat widget backup

This folder holds a **backup copy** of the chat widget tarball so you can switch between the current (backup) version and a new version from the familylaw repo.

## 1. Backup the current widget (first time)

From the repo root, run:

```bash
npm run backup-chat-widget
```

This copies `your-org-chat-widget-0.1.2.tgz` from the familylaw widget-package into this folder. Commit the resulting `.tgz` file if you want the backup in version control.

## 2. Switch between backup and new widget

Edit the `@your-org/chat-widget` dependency in `package.json` to point at the version you want, then reinstall:

| Use this version | Set dependency to |
|------------------|-------------------|
| **Backup** (frozen copy in this repo) | `"file:./vendor/chat-widget/your-org-chat-widget-0.1.2.tgz"` |
| **New** (from familylaw repo) | `"file:../../familylaw/familylaw/frontend/widget-package/your-org-chat-widget-0.1.2.tgz"` (or the new tarball path/version) |

Then run:

```bash
npm install
```

and restart the dev server. Your app and `ChatWidgetModal` keep using `@your-org/chat-widget`; only the resolved tarball changes.
