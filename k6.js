import http from "k6/http";
import { check, sleep } from "k6";

// Configuration for the load test
export let options = {
  vus: 1000, // Number of virtual users
  duration: "30s", // Duration of the test
};

// Function to generate a random string of a specific length

function randomString(length, charset) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

// Function to generate a valid email
function generateEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return `test_${randomString(5, chars)}@example.com`; // Generates email like 'test_XyZaB@example.com'
}

// Function to generate a valid username
function generateUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return randomString(5, chars); // Generates username like 'abc12'
}

// Function to generate a valid phone number
function generatePhone() {
  const startDigits = ['6', '7', '8', '9'];
  const randomDigit = startDigits[Math.floor(Math.random() * startDigits.length)];
  const otherDigits = randomString(9, '0123456789'); // Generates 9 random digits
  return randomDigit + otherDigits; // Combines to form a valid phone number
}

// Default function executed by k6
export default function () {
  // Create dynamic values for email, username, and phone
  const dynamicEmail = generateEmail();
  const dynamicUsername = generateUsername();
  const dynamicPhone = generatePhone();

  // Define the payload for the sign-up request
  const payload = JSON.stringify({
    fullName: "John Doe", // Must be at least 5 characters and contain only letters and spaces
    userName: dynamicUsername, // Username must be at least 3 characters and contain only lowercase letters and numbers
    email: dynamicEmail, // Must be a valid email
    phone: dynamicPhone, // Must start with 6, 7, 8, or 9 and be exactly 10 digits
    password: "securePass123" // Must be at least 2 characters
  });

  // Define headers for the HTTP request
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Make a POST request to the sign-up API
  let res = http.post("http://localhost:3000/api/auth/sign-up", payload, params);

  // Check the response status
  check(res, {
    "Sign-up succeeded": (r) => r.status === 200,
    "Validation error (400)": (r) => r.status === 400,
  });

  // Pause for a short duration
  sleep(1);
}