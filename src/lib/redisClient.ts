// lib/redisClient.js
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL // Ensure you have a REDIS_URL in your environment variables
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect();

export default client;
