# Authentication Methods – Backend Systems

This repository/document explains different types of authentication used in backend servers, including session-based authentication, JWT authentication, OAuth, API keys, and basic authentication. It also includes authentication flows and architecture diagrams.

## Table of Contents

1. Session-Based Authentication
2. Token-Based Authentication
3. JWT Authentication
4. OAuth Authentication
5. API Key Authentication
6. Basic Authentication
7. Comparison Table
8. Best Security Practices


## 1. Session-Based Authentication
![pic1](https://github.com/user-attachments/assets/502e113b-abd1-4f75-8679-e1cd9fb8da97)

### Steps

1. User logs in with username and password.
2. Server verifies credentials.
3. Server creates a session and stores it in database/memory.
4. Server sends session ID in a cookie.
5. Browser sends cookie with every request.
6. Server validates session ID and returns response.

### Advantages

* Very secure
* Easy to invalidate sessions
* Good for traditional web applications

### Disadvantages

* Not scalable for microservices
* Requires session storage

## 2. Token-Based Authentication
![pic2](https://github.com/user-attachments/assets/d21f621e-48ef-4115-aad4-24461192f08d)

### Steps

1. User logs in.
2. Server generates token.
3. Client stores token.
4. Client sends token in Authorization header.
5. Server validates token.

### Header Example

Authorization: Bearer <token>

### Advantages

* Stateless
* Scalable
* Good for APIs and mobile apps


## 3. JWT Authentication (JSON Web Token)
![pic3](https://github.com/user-attachments/assets/3b59bc5d-f01b-4003-b494-fc589754d753)

JWT consists of three parts:
Header.Payload.Signature

### JWT Authentication Flow

1. User logs in.
2. Server generates JWT access token.
3. Client stores token.
4. Client sends token in Authorization header.
5. Server verifies signature.

### Access Token + Refresh Token

* Access Token → Short expiry (15 min)
* Refresh Token → Long expiry (7 days)

## 4. OAuth Authentication
![pic4](https://github.com/user-attachments/assets/f44aac0d-bbec-4bc0-becf-61eb0bee1fa3)

OAuth allows users to log in using third-party providers like Google, Facebook, or GitHub.

### Flow

1. User clicks Login with Google.
2. Redirect to Google login page.
3. Google authenticates user.
4. Google sends authorization code/token to backend.
5. Backend logs user into system.

### Examples

* Login with Google
* Login with Facebook
* Login with GitHub

## 5. API Key Authentication

Used for public APIs and service-to-service communication.

### Example Request

GET /api/data
x-api-key: YOUR_API_KEY

### Used In

* Weather APIs
* Payment APIs
* Google Maps API
## 6. Basic Authentication

Username and password are sent in Base64 encoded format in the Authorization header.

Authorization: Basic base64(username:password)

Not secure unless using HTTPS.

## Authentication Comparison

| Method     | Stateful | Security  | Scalable | Used For             |
| ---------- | -------- | --------- | -------- | -------------------- |
| Session    | Yes      | High      | No       | Traditional Web Apps |
| Token      | No       | Medium    | Yes      | APIs                 |
| JWT        | No       | High      | Yes      | Modern Apps          |
| OAuth      | No       | Very High | Yes      | Social Login         |
| API Key    | No       | Medium    | Yes      | Public APIs          |
| Basic Auth | No       | Low       | Yes      | Simple APIs          |

## Security Best Practices

1. Always use HTTPS
2. Hash passwords using bcrypt
3. Use HttpOnly cookies
4. Use Access Token + Refresh Token
5. Implement Rate Limiting
6. Add CSRF Protection
7. Add Role-Based Authorization
8. Add Email Verification
9. Add Two-Factor Authentication (OTP)
