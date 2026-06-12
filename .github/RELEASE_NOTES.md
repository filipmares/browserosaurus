These builds are ad-hoc signed but **not notarized** by Apple. After downloading and unzipping, macOS quarantines the app, so the first launch is blocked with a Gatekeeper warning (this is expected for unsigned community builds).

To open it, either:

- Right-click `Browserosaurus.app` → **Open**, then confirm **Open** in the dialog, or
- Clear the quarantine flag in Terminal:

  ```
  xattr -dr com.apple.quarantine /Applications/Browserosaurus.app
  ```
