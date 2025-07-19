chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'ip-tools',
        title: '🛰️ IP Intel',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'ip-tools') {
        const ip = info.selectionText.trim();

        const ipv4 =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6 =
            /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;

        if (ipv4.test(ip) || ipv6.test(ip)) {
            const encoded = encodeURIComponent(ip);
            const urls = [
                `http://www.abuseipdb.com/check/${encoded}`,
                `https://threatfox.abuse.ch/browse.php?search=ioc%3A${encoded}`,
                `https://www.shodan.io/host/${encoded}`,
            ];

            urls.forEach((url) => {
                chrome.tabs.create({ url, active: false });
            });

            // Sanitize IP: wrap only the last punctuation character in brackets
            let sanitized = ip;
            const lastDot = ip.lastIndexOf('.');
            const lastColon = ip.lastIndexOf(':');

            if (lastDot > lastColon) {
                sanitized =
                    ip.slice(0, lastDot) + '[.]' + ip.slice(lastDot + 1);
            } else if (lastColon > -1) {
                sanitized =
                    ip.slice(0, lastColon) + '[:]' + ip.slice(lastColon + 1);
            }

            chrome.tabs.executeScript(tab.id, {
                code: `navigator.clipboard.writeText(${JSON.stringify(
                    sanitized
                )});`,
            });
        } else {
            chrome.tabs.executeScript(tab.id, {
                code: `alert("Selected text is not a valid IP address.");`,
            });
        }
    }
});
