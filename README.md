
# Sir Shotto Themes Engine

**One desktop application. Two kinds of desktop experiences.**

Sir Shotto Themes is a Windows-first desktop theme application that combines traditional wallpaper slideshows with interactive desktop experiences.

## 1. Main Features

### Wallpaper Slideshows

- Rotate collections of local wallpapers.
- Select different wallpaper collections.
- Configure slideshow intervals.
- Import existing picture ZIP files.
- Apply wallpaper collections through Windows integration.

### Interactive Desktop Themes

- Browse the bundled interactive themes.
- Preview HTML, CSS and JavaScript themes.
- Apply interactive themes through the desktop application.
- Optional clock, date and brand widgets.
- Desktop rendering intended to operate behind Windows desktop icons.

### Desktop Application

- Single desktop application.
- System Tray integration.
- Close button hides the gallery instead of terminating the application.
- Reopen the gallery from the System Tray.
- Hide the desktop experience or quit through the tray menu.

## 2. Supported Platforms

| Platform | Slideshow | Interactive Desktop |
|---|---|---|
| Windows 10/11 | Implementation available; requires testing | Initial implementation; requires testing |
| Linux | Existing adapter retained | Not implemented |
| macOS | Existing adapter retained | Not implemented |

Windows 10/11 is the primary development target.

## 3. Project Structure

```text
sir-shotto-themes-engine/
│
├── .github/
│   └── workflows/
│
├── docs/
│   └── THEME-PACKAGE-FORMAT.md
│
├── downloads/
├── themes/
├── src/
├── site/
├── scripts/
│   ├── build-windows.ps1
│   ├── build.mjs
│   └── packs.mjs
│
├── src-tauri/
│   ├── icons/
│   ├── src/
│   ├── Cargo.toml
│   ├── Cargo.lock
│   ├── build.rs
│   └── tauri.conf.json
│
├── index.html
├── desktop-renderer.html
├── desktop-renderer.css
├── desktop-renderer.js
├── GITHUB-PAGES.md
├── README.md
└── .gitignore
```

The structure above describes the main project components. Additional source files and theme assets are retained in their respective directories.

## 4. Windows Development Requirements

Developers building the native Windows application need:

- Windows 10 or Windows 11, 64-bit.
- Rust stable toolchain.
- Cargo.
- Visual Studio C++ Build Tools.
- x64 MSVC compiler and linker.
- Windows SDK.
- WebView2 Runtime.

The Windows desktop build uses Rust, Tauri and PowerShell.

**Node.js is not required for the native Windows build.**

## 5. Build the Windows Application

Open an x64 Native Tools Command Prompt for Visual Studio.

Navigate to the project root:

```cmd
cd /d "PATH\TO\sir-shotto-themes-engine"
```

Install the Tauri CLI:

```cmd
cargo install tauri-cli --version "^2" --locked
```

Prepare the frontend:

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\build-windows.ps1"
```

Build the application:

```cmd
cargo tauri build
```

The Tauri build automatically runs the frontend preparation command configured in `src-tauri/tauri.conf.json`.

Generated Windows installers are expected under:

```text
src-tauri/target/release/bundle/
```

Depending on the configured bundle targets, installer formats can include MSI and NSIS installers.

## 6. Interactive Themes

To apply an interactive theme:

1. Open Sir Shotto Themes.
2. Navigate to Interactive Themes.
3. Select a theme.
4. Preview the theme.
5. Configure the optional clock and date widgets.
6. Select Apply Desktop.
7. Wait for the native application to confirm the operation.

The desktop renderer is designed to remain behind Windows desktop icons.

Closing the main gallery hides it in the System Tray. It does not intentionally terminate the desktop experience.

The interactive desktop implementation requires testing on actual supported Windows systems.

## 7. Wallpaper Slideshow Themes

To apply a slideshow:

1. Open the application.
2. Select a wallpaper collection.
3. Choose the desired slideshow interval.
4. Select Apply.
5. Confirm the Windows action if prompted.

Available intervals include:

- 1 minute
- 5 minutes
- 15 minutes
- 30 minutes
- 60 minutes

Windows slideshow handling uses individual image files to construct the Shell Item Array.

## 8. Theme Package Format

See:

[docs/THEME-PACKAGE-FORMAT.md](docs/THEME-PACKAGE-FORMAT.md)

Interactive theme packages use:

```text
theme-name/
├── manifest.json
├── index.html
├── styles.css
├── script.js
└── assets/
```

The bundled interactive themes are included in the Windows-first implementation.

The browser ZIP importer primarily supports adding wallpaper pictures to slideshow collections.

Native installation and execution of arbitrary imported HTML theme packages is a separate security-hardening task.

## 9. GitHub Pages

See:

[GITHUB-PAGES.md](GITHUB-PAGES.md)

The repository includes a GitHub Pages workflow for publishing the static gallery from the `site/` directory.

GitHub Pages hosts the gallery. It cannot independently execute Windows PowerShell commands or change a visitor's desktop wallpaper.

Applying Windows desktop themes requires the locally installed desktop application or the appropriate local Windows integration.

## 10. Automated Windows Builds

GitHub Actions can compile the Windows application on a hosted Windows runner.

The Windows workflow is located at:

```text
.github/workflows/windows-build.yml
```

The workflow is intended to:

1. Check out the repository.
2. Install the Rust toolchain.
3. Install the Tauri CLI.
4. Prepare the frontend.
5. Compile the Windows application.
6. Upload generated installers as workflow artifacts.

Build results are available from the repository's Actions tab.

The workflow must complete successfully before an installer can be considered available.

## 11. Important Implementation Status

| Component | Status |
|---|---|
| Wallpaper slideshow | Implementation available; Windows testing required |
| Interactive theme gallery | Included |
| HTML theme preview | Included |
| Windows interactive renderer | Initial implementation; runtime testing required |
| System Tray | Included in Tauri source; runtime testing required |
| Hide-on-close | Included in Tauri source; runtime testing required |
| Widget overlay | Included |
| Linux interactive renderer | Not implemented |
| macOS interactive renderer | Not implemented |
| Arbitrary imported HTML execution | Not enabled |

Do not interpret source-code availability as proof that every desktop feature has passed runtime testing.

## 12. Security

Interactive themes contain HTML, CSS and JavaScript and must be treated as untrusted web content.

The desktop renderer uses a sandboxed iframe for theme content.

Security recommendations:

- Keep theme content local.
- Do not expose privileged Tauri APIs to untrusted theme JavaScript.
- Do not add unrestricted filesystem or shell access to theme scripts.
- Validate imported theme packages before enabling native execution.
- Never publish passwords, API keys, private certificates or signing credentials.
- Review third-party theme assets before distributing them.

## 13. License

License and redistribution permissions should be established before public commercial distribution.

---

**Sir Shotto Themes**

One desktop application. Multiple desktop experiences.
