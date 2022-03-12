const log = (...args: any) => {
    chrome.devtools.inspectedWindow.eval(`
        console.log(...${JSON.stringify(args)});
    `);
};

// 注册回调，每一个http请求响应后，都触发该回调
chrome.devtools.network.onRequestFinished.addListener(async (...args) => {
    try {
        const [
            {
                // 请求的类型，查询参数，以及url
                request: { postData, url },
            },
        ] = args;

        if (url === 'https://tracking.ginee.com/tracking/event/push') {
            if (!postData?.text) return;
            try {
                const params = JSON.parse(postData.text);
                chrome.runtime.sendMessage({
                    tabId: chrome.devtools.inspectedWindow.tabId,
                    name: 'tracking',
                    content: params,
                });
            } catch (error: any) {
                log(error.stack || error.toString());
            }
        }
    } catch (error: any) {
        log(error.stack || error.toString());
    }
});

export {};
