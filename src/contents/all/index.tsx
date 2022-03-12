import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

function App() {
    // 路由pathname变化触发重新render
    useEffect(() => {
        const listener = (msg: any) => {
            const { type, data } = msg;
            if (type === 'trackingMessage') {
                console.log('🚀 ~ file: index.tsx ~ line 9 ~ listener ~ data', data);
            }
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        };
    }, []);
    return <div>111</div>;
}

const root = document.createElement('div');
root.id = 'GINEE-TRACK-CONTENT';
document.body.append(root);
ReactDOM.render(<App />, document.querySelector('#GINEE-TRACK-CONTENT'));
