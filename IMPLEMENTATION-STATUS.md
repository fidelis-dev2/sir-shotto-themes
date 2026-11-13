# Implementation status — 1.4.0 Windows-first milestone

## Implemented in source

- Added an Interactive themes page alongside the existing slideshow gallery.
- Added a separate Tauri desktop renderer page that loads bundled HTML theme entries.
- Added optional clock/date/brand widgets with a runtime toggle.
- Added native commands to apply an interactive theme, toggle widgets, and stop the desktop renderer.
- Added Windows WorkerW attachment code intended to place the renderer behind desktop icons.
- Added Tauri System Tray menu actions: open gallery, show/hide desktop experience, quit.
- Main window close now hides the gallery instead of exiting the process.
- Corrected Windows slideshow setup to create a Shell Item Array from every individual PNG/JPEG file.
- Added `type: interactive` to the ten bundled theme manifests.
- Updated the theme package documentation and rebuilt the included theme ZIPs.
- Updated the local Tauri development server to serve the renderer and theme HTML/CSS/JS assets.

## Not yet verified

This environment does not contain Rust/Cargo or a Windows desktop session. Therefore the Tauri/Rust application has not been compiled or run here.

Before distributing a Windows installer, run `npm install` and `npm run tauri:build` on a Windows 10/11 development machine, fix any toolchain/API errors, then test the generated installer on both Windows versions.

The WorkerW desktop attachment is a native Windows integration and must be validated against Explorer, multiple displays, virtual desktops, lock/unlock, sleep/resume, and Explorer restarts. The first renderer targets the primary monitor only.

## Not implemented in this milestone

- Native execution of arbitrary imported/community interactive ZIP packages.
- Linux/macOS interactive desktop rendering.
- Automatic restoration of the previous desktop theme after Windows restart.
- Multi-monitor independent theme instances.
- Installer signing and automatic updates.

The existing picture ZIP importer remains for slideshow pictures. It explicitly rejects `type: interactive` packages rather than silently importing them as a wallpaper-only theme.
