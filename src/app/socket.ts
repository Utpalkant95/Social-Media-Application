export const ws = new WebSocket('wss://websocketserver-qepw.onrender.com');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

ws.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
};