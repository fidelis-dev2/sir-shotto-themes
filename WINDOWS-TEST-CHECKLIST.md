# Windows 10/11 manual test checklist

Run these tests on a clean Windows 10 and Windows 11 machine after compiling the Tauri app.

- [ ] `npm install` completes.
- [ ] `npm run tauri:dev` opens the gallery.
- [ ] System Tray icon appears.
- [ ] Closing the gallery hides it; it remains in Task Manager and tray.
- [ ] Tray → Open Sir Shotto restores the gallery.
- [ ] Tray → Quit Sir Shotto exits the process.
- [ ] Slideshow group applies all images and rotates at each supported interval.
- [ ] Interactive themes page lists the 10 bundled themes.
- [ ] Preview loads local HTML/CSS/JS and clock/date widget overlay.
- [ ] Apply attaches the renderer behind desktop icons, not over normal application windows.
- [ ] Desktop icons remain clickable.
- [ ] Widget toggle updates the desktop without restarting the theme.
- [ ] Hide/Show desktop experience tray items work.
- [ ] Stop desktop theme closes the renderer and reveals the prior desktop background.
- [ ] Explorer restart does not leave a stuck foreground window.
- [ ] Lock/unlock and sleep/resume do not break the renderer.
- [ ] Primary display at 100%, 125%, 150% and 200% scaling.
- [ ] Two-monitor setup is recorded as a known first-milestone limitation (primary monitor only).
- [ ] Importing an interactive ZIP through Import picture is rejected with a clear message.
- [ ] Malformed ZIP paths and oversized files are rejected.
