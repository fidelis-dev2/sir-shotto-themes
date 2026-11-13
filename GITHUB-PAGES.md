# Publish Sir Shotto Themes on GitHub Pages

## What GitHub Pages hosts

GitHub Pages hosts the browser-based Sir Shotto Themes gallery and its static theme artwork. It does not run PowerShell, Rust, Tauri, or Windows wallpaper APIs. Applying a wallpaper on a visitor's computer still requires the Windows bridge or the installed native desktop application.

## Publish

1. Create a public GitHub repository named `sir-shotto-themes`.
2. Upload the complete contents of this project folder to the repository root (including the `site/` folder and `.github/workflows/pages.yml`).
3. Commit the files to the `main` branch.
4. Open **Settings → Pages** in GitHub.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Open the **Actions** tab and wait for **Deploy Sir Shotto Themes Gallery to GitHub Pages** to finish.
7. GitHub will show the published URL, normally `https://YOUR-USERNAME.github.io/sir-shotto-themes/`.

## Windows wallpaper application

The hosted gallery can request the registered `sirshotto://` Windows protocol, but the protocol handler must already be installed on the visitor's Windows account. For this prototype bridge, the full project files are needed by `Setup-Windows.bat` so it can install the local slideshow assets and register the protocol. Publish a versioned project ZIP in **GitHub Releases** and link users to that ZIP from your website or README.

The native Windows desktop application is the intended long-term customer experience. A hosted web page alone cannot silently change a visitor's wallpaper.

## Update the hosted gallery

Commit and push changes to `main`. GitHub Actions automatically republishes the `site/` directory.


## Interactive theme previews

GitHub Pages can display the interactive theme previews. Applying an interactive theme to the Windows desktop is a native desktop operation and must be initiated from the installed Sir Shotto Themes Tauri application. The web gallery displays an explanatory message instead of claiming that a browser-only Apply succeeded.
