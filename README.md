# Sir Shotto Themes Engine

**One desktop application. Two kinds of desktop experiences.**

Sir Shotto Themes combines:

1. **Wallpaper Slideshows** — rotate a collection of local wallpapers at a selected interval.
2. **Interactive Themes** — local HTML, CSS and JavaScript experiences with animations and optional Sir Shotto widgets.

The current implementation milestone targets **Windows 10/11** for interactive desktop rendering. Linux and macOS slideshow adapters remain in the source, but interactive rendering is not yet implemented for those platforms.

## What is included

- Original 10 Sir Shotto wallpaper collections and theme artwork.
- Slideshow groups: Sir Shotto Collection, Ocean, Nature, Night Lights and Abstract.
- Slideshow intervals: 1, 5, 15, 30 and 60 minutes.
- Interactive theme gallery for the 10 bundled themes.
- Sandboxed HTML theme preview.
- Windows desktop renderer intended to sit behind desktop icons.
- Optional clock/date/brand widget overlay.
- System Tray menu: reopen the gallery, hide the desktop experience, or quit.
- Close button hides the main gallery to the tray; it does not terminate the desktop renderer.
- Import of existing picture ZIPs for slideshow use.

## Build the Windows desktop application without Node.js

The Windows desktop build does **not** require Node.js or npm. The project includes a PowerShell frontend-preparation script and uses the Rust-based Tauri CLI.

Requirements for the developer computer:

- Windows 10 or Windows 11 (64-bit).
- Rust stable toolchain and Cargo.
- Visual Studio C++ Build Tools with the x64 MSVC compiler and Windows 10/11 SDK.
- WebView2 Runtime (normally present on supported Windows 10/11 systems).

Open **x64 Native Tools Command Prompt for VS** and run these commands from the project folder:

```powershell
cargo install tauri-cli --version "^2" --locked
cargo tauri build --manifest-path src-tauri/Cargo.toml
```

The Tauri build runs `scripts/build-windows.ps1` automatically to prepare the static frontend. No Node.js installation is needed for this Windows desktop build.

The distributable installers are created under `src-tauri/target/release/bundle/` (for example, the `nsis` and `msi` folders, depending on the configured bundle targets).

## Optional browser gallery development

Node.js 18+ is only needed if you want to run the separate browser-based development server using `npm start`. It is **not** required to build or run the installed Windows desktop application.

## Use interactive themes

1. Open Sir Shotto Themes.
2. Select **Interactive themes**.
3. Preview a theme.
4. Choose whether to show the clock/date widgets.
5. Click **Apply desktop**.
6. The renderer is intended to remain behind desktop icons.
7. Close the main gallery: it hides to the System Tray, leaving the desktop experience running.
8. Use the tray menu to reopen the gallery, hide the desktop experience, or quit Sir Shotto.

The widgets are a separate overlay and can be switched on or off from the Interactive themes page or Settings.

## Use slideshow themes

1. Select a theme group.
2. Click Apply.
3. Choose the interval.
4. Confirm the Windows action.

Windows slideshow handling now builds a Shell Item Array from the individual image files rather than passing the folder as a single item.

## Theme package format

See [docs/THEME-PACKAGE-FORMAT.md](docs/THEME-PACKAGE-FORMAT.md).

Interactive theme packages use:

- `manifest.json`
- `index.html`
- `styles.css`
- `script.js`
- local assets and preview artwork

Bundled interactive themes are available in this Windows-first milestone. The browser ZIP importer still primarily supports adding wallpaper pictures to slideshow collections. Native installation and execution of arbitrary imported HTML theme packages is a separate security-hardening task and is not claimed as complete.

## Important implementation status

- Windows slideshow: implementation updated; validate on actual Windows 10/11 machines.
- Windows interactive renderer: first implementation added using a Tauri WebView and Windows WorkerW desktop host; requires real Windows runtime testing.
- System Tray and hide-on-close: implemented in the Tauri application source; requires Windows runtime testing.
- Interactive widget toggle: implemented in the desktop renderer.
- Linux/macOS interactive desktop rendering: not implemented yet.
- Linux/macOS slideshow support: retained from the original project, but not newly regression-tested in this milestone.
- Imported third-party interactive themes: not yet enabled for native desktop execution.

## Safety

Interactive themes are untrusted web content. The desktop renderer loads theme HTML inside a sandboxed iframe and the renderer page does not expose Tauri APIs to that iframe. Keep packages offline and local. Do not add filesystem, shell or privileged bridge access to theme JavaScript.


## Publish the gallery on GitHub Pages

See [GITHUB-PAGES.md](GITHUB-PAGES.md). The repository includes a GitHub Actions workflow that automatically publishes the static gallery from `site/` whenever you push to `main`.

**Important:** GitHub Pages hosts the gallery only. It cannot run Windows PowerShell or change a visitor's desktop wallpaper by itself. Windows wallpaper application requires the locally installed Sir Shotto bridge or the native desktop application.


## Interactive theme Apply behavior

Interactive themes must be applied from the installed Tauri desktop application. The browser-hosted gallery can preview interactive themes, but an ordinary browser cannot create a desktop WebView behind Windows desktop icons. If a user clicks Apply in a browser, the gallery explains that the installed desktop app is required; it does not show a false success notification.

Inside the Tauri application, Apply shows a processing state and waits for the `apply_interactive_theme` command to return. Only then does it display a persistent success confirmation. Errors are displayed in a separate error dialog.
