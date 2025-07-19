# 🛰️ IP Intel

A lightweight browser extension that adds a right-click context menu for selected IP addresses. When triggered, it:

-   Validates if the selection is a valid IPv4 or IPv6 address.
-   Opens the defined threat intelligence links.
-   Sanitises the IP (e.g., `192.168.1[.]1`) and copies it to your clipboard.
-   Shows an alert if the selected text is not a valid IP.

## Installation Instructions

### Chrome

1. Open `chrome://extensions/` in your address bar.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked**.
4. Select the folder containing `manifest.json` and `background.js`.

### Firefox

1. Open `about:debugging#/runtime/this-firefox` in your address bar.
2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` file in your extension folder.

### Edge

1. Open `edge://extensions/` in your address bar.
2. Enable **Developer mode** (bottom-left toggle).
3. Click **Load unpacked**.
4. Select the folder containing your extension files.

## Example Usage

1. Highlight any valid IPv4 or IPv6 address on a webpage.
2. Right-click and choose `🛰️ IP Intel`.
3. Intel tabs will open in the background.
4. The sanitised IP will be copied to your clipboard.

## Permissions Used

| Permission       | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `contextMenus`   | Adds right-click options for selected IPs |
| `tabs`           | Opens new tabs for threat intel URLs      |
| `clipboardWrite` | Writes sanitised IP to clipboard          |
| `activeTab`      | Executes scripts in the active tab        |
