export {};

chrome.runtime.onMessage.addListener((message) => {
    console.log(
        '🚀 ~ file: index.ts ~ line 4 ~ chrome.runtime.onMessage.addListener ~ message',
        message,
    );
    if (message.name === 'tracking') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'trackingMessage',
                data: message.content,
            });
        });
    }
});
console.log(
    '🚀 ~ file: index.ts ~ line 17 ~ chrome.runtime.onMessage.addListener ~ chrome',
    chrome,
);
