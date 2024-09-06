"use client";
import { useEffect, useState } from 'react';

const WebSocketPage: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('wss://websocketserver-qepw.onrender.com');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            setIsConnected(true);
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log('Message from server:', event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
            setIsConnected(false);
        };

        ws.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        setSocket(ws);

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            socket.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Example</h1>
            <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage} disabled={!isConnected}>
                Send
            </button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketPage;
