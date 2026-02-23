# API Requirements & Logic Documentation
## SOTR-APP Payment Routing System

---

## 📋 Overview

This document outlines all required APIs for the SOTR-APP payment routing system. The APIs are organized by functional domain and include request/response schemas, authentication requirements, and business logic.

**Base URL**: `https://api.sotr.app/v1` (or staging/dev equivalents)

**Authentication**: Bearer Token (JWT) for most endpoints

---

## 🔐 Authentication & Authorization APIs

### 1. User Registration

**Endpoint**: `POST /auth/register`

**Description**: Register a new user (Bitcoiner, Merchant, or Admin)

**Request Body**:
```json
{
  "email": "user@example.com",
  "phone": "+2348012345678",
  "password": "securePassword123",
  "userType": "user" | "merchant" | "admin",
  "firstName": "John",
  "lastName": "Doe",
  "country": "NG",
  "merchantData": {  // Only if userType is "merchant"
    "businessName": "My Store",
    "businessType": "retail" | "restaurant" | "service" | "other",
    "taxId": "TAX123456"
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "userId": "usr_123456789",
    "email": "user@example.com",
    "phone": "+2348012345678",
    "userType": "user",
    "requiresVerification": true,
    "verificationMethod": "email" | "sms"
  },
  "message": "Registration successful. Please verify your email/phone."
}
```

**Business Logic**:
- Validate email format and uniqueness
- Validate phone number format (E.164)
- Hash password using bcrypt (min 12 rounds)
- Generate unique user ID
- Send verification code via email/SMS
- For merchants: Create pending merchant record (requires admin approval)

---

### 2. User Login

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "deviceId": "device_unique_id",
  "deviceInfo": {
    "platform": "ios" | "android",
    "osVersion": "17.0",
    "appVersion": "1.0.0"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600,
    "user": {
      "userId": "usr_123456789",
      "email": "user@example.com",
      "userType": "user" | "merchant" | "admin",
      "isVerified": true,
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "https://..."
      }
    }
  }
}
```

**Business Logic**:
- Verify credentials
- Check if account is verified
- Check if account is active/suspended
- Generate JWT token (expires in 1 hour)
- Generate refresh token (expires in 30 days)
- Log device information for security
- For merchants: Check if merchant account is approved

---

### 3. Phone/Email Verification

**Endpoint**: `POST /auth/verify`

**Description**: Verify email or phone number with OTP

**Request Body**:
```json
{
  "userId": "usr_123456789",
  "verificationCode": "123456",
  "method": "email" | "sms"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "verified": true,
    "token": "jwt_token_here"  // Return token if first-time verification
  },
  "message": "Verification successful"
}
```

**Business Logic**:
- Validate OTP code (6 digits, expires in 10 minutes)
- Check if code matches and hasn't expired
- Mark email/phone as verified
- If first-time verification, return auth token
- Invalidate used OTP code

---

### 4. Refresh Token

**Endpoint**: `POST /auth/refresh`

**Description**: Get new access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "expiresIn": 3600
  }
}
```

**Business Logic**:
- Validate refresh token
- Check if token is revoked
- Generate new access token
- Optionally rotate refresh token

---

### 5. Logout

**Endpoint**: `POST /auth/logout`

**Description**: Logout user and invalidate tokens

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Business Logic**:
- Invalidate refresh token
- Log logout event
- Clear device session

---

### 6. Forgot Password

**Endpoint**: `POST /auth/forgot-password`

**Description**: Request password reset

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Business Logic**:
- Check if email exists
- Generate secure reset token (expires in 1 hour)
- Send reset link via email
- Rate limit: max 3 requests per hour per email

---

### 7. Reset Password

**Endpoint**: `POST /auth/reset-password`

**Description**: Reset password with token

**Request Body**:
```json
{
  "token": "reset_token_here",
  "newPassword": "newSecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Business Logic**:
- Validate reset token
- Check token expiration
- Validate password strength
- Hash and update password
- Invalidate reset token
- Invalidate all existing sessions (force re-login)

---

## 👤 User Profile APIs

### 8. Get User Profile

**Endpoint**: `GET /users/profile`

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_123456789",
    "email": "user@example.com",
    "phone": "+2348012345678",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://...",
    "country": "NG",
    "userType": "user",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "preferences": {
      "currency": "NGN",
      "language": "en",
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      }
    }
  }
}
```

---

### 9. Update User Profile

**Endpoint**: `PUT /users/profile`

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "base64_image_or_url",
  "preferences": {
    "currency": "NGN",
    "language": "en",
    "notifications": {
      "email": true,
      "push": true
    }
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_123456789",
    "firstName": "John",
    "lastName": "Doe",
    // ... updated fields
  },
  "message": "Profile updated successfully"
}
```

---

## 💰 Payment APIs

### 10. Get Exchange Rate

**Endpoint**: `GET /exchange-rates`

**Description**: Get current Bitcoin to local currency exchange rates

**Query Parameters**:
- `baseCurrency`: `BTC` (default)
- `targetCurrency`: `NGN` | `USD` | `EUR` (default: NGN)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "baseCurrency": "BTC",
    "targetCurrency": "NGN",
    "rate": 45000000.00,
    "lastUpdated": "2024-01-01T12:00:00Z",
    "source": "bitcoin_average" | "coinbase" | "custom",
    "fees": {
      "networkFee": 0.00001,  // BTC
      "serviceFee": 0.005,     // 0.5%
      "serviceFeeCurrency": "BTC"
    }
  }
}
```

**Business Logic**:
- Fetch rate from exchange rate provider
- Cache for 30 seconds
- Include network fees (estimated)
- Include service fees
- Return rate with timestamp

---

### 11. Initiate Payment

**Endpoint**: `POST /payments/initiate`

**Description**: Create a payment request from user to merchant

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "merchantId": "mch_123456789",
  "amount": {
    "currency": "NGN",
    "value": 5000.00
  },
  "description": "Payment for goods",
  "metadata": {
    "orderId": "order_123",
    "items": ["item1", "item2"]
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_123456789",
    "merchantId": "mch_123456789",
    "merchantName": "My Store",
    "amount": {
      "currency": "NGN",
      "value": 5000.00,
      "btcEquivalent": 0.00011111
    },
    "bitcoinAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "qrCode": "data:image/png;base64,...",
    "expiresAt": "2024-01-01T12:15:00Z",
    "fees": {
      "networkFee": 0.00001,
      "serviceFee": 0.00000556,
      "totalFee": 0.00001556
    },
    "status": "pending",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

**Business Logic**:
- Validate merchant exists and is active
- Calculate BTC equivalent using current exchange rate
- Generate unique Bitcoin address for this payment (using HD wallet)
- Calculate network fee (estimate based on current network conditions)
- Calculate service fee (percentage of transaction)
- Set expiration time (15 minutes)
- Create payment record with status "pending"
- Generate QR code with payment address and amount
- Return payment details to user

---

### 12. Check Payment Status

**Endpoint**: `GET /payments/{paymentId}`

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_123456789",
    "merchantId": "mch_123456789",
    "merchantName": "My Store",
    "amount": {
      "currency": "NGN",
      "value": 5000.00,
      "btcEquivalent": 0.00011111
    },
    "bitcoinAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "status": "pending" | "confirmed" | "completed" | "failed" | "expired",
    "transactionHash": "tx_hash_here",  // If confirmed
    "confirmations": 1,  // Number of blockchain confirmations
    "requiredConfirmations": 1,  // Required confirmations for completion
    "createdAt": "2024-01-01T12:00:00Z",
    "confirmedAt": "2024-01-01T12:05:00Z",  // If confirmed
    "completedAt": "2024-01-01T12:06:00Z"    // If completed
  }
}
```

**Business Logic**:
- Check payment record in database
- If status is "pending", check blockchain for transaction
- Update status based on blockchain confirmations
- Return current status and details

---

### 13. Get User Transaction History

**Endpoint**: `GET /payments/history`

**Headers**: `Authorization: Bearer {token}`

**Query Parameters**:
- `page`: `1` (default)
- `limit`: `20` (default, max 100)
- `status`: `pending` | `completed` | `failed` | `expired`
- `startDate`: `2024-01-01`
- `endDate`: `2024-01-31`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "paymentId": "pay_123456789",
        "merchantName": "My Store",
        "amount": {
          "currency": "NGN",
          "value": 5000.00,
          "btcEquivalent": 0.00011111
        },
        "status": "completed",
        "createdAt": "2024-01-01T12:00:00Z",
        "completedAt": "2024-01-01T12:06:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

### 14. Get Transaction Receipt

**Endpoint**: `GET /payments/{paymentId}/receipt`

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_123456789",
    "receiptNumber": "RCP-2024-001234",
    "merchant": {
      "name": "My Store",
      "address": "123 Main St, Lagos",
      "taxId": "TAX123456"
    },
    "amount": {
      "currency": "NGN",
      "value": 5000.00,
      "btcEquivalent": 0.00011111
    },
    "fees": {
      "networkFee": 0.00001,
      "serviceFee": 0.00000556
    },
    "transactionHash": "tx_hash_here",
    "status": "completed",
    "paidAt": "2024-01-01T12:06:00Z",
    "receiptPdf": "https://..."  // URL to downloadable PDF
  }
}
```

---

## 🏪 Merchant APIs

### 15. Get Merchant Dashboard

**Endpoint**: `GET /merchants/dashboard`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Query Parameters**:
- `period`: `today` | `week` | `month` | `year` (default: today)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "merchantId": "mch_123456789",
    "businessName": "My Store",
    "stats": {
      "today": {
        "totalSales": 150000.00,
        "transactionCount": 25,
        "pendingSettlement": 50000.00,
        "settled": 100000.00
      },
      "thisMonth": {
        "totalSales": 2500000.00,
        "transactionCount": 450,
        "pendingSettlement": 200000.00,
        "settled": 2300000.00
      }
    },
    "recentTransactions": [
      {
        "paymentId": "pay_123456789",
        "amount": {
          "currency": "NGN",
          "value": 5000.00
        },
        "status": "completed",
        "customerName": "John Doe",
        "createdAt": "2024-01-01T12:00:00Z"
      }
    ],
    "settlementStatus": {
      "nextSettlement": "2024-01-02T00:00:00Z",
      "pendingAmount": 50000.00,
      "settlementCurrency": "NGN"
    }
  }
}
```

---

### 16. Generate Payment QR Code

**Endpoint**: `POST /merchants/payment-request`

**Description**: Generate QR code for merchant to receive payment

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Request Body**:
```json
{
  "amount": {
    "currency": "NGN",
    "value": 5000.00
  },
  "description": "Payment for goods",
  "expiresIn": 900  // Optional: seconds until expiration (default: 15 minutes)
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "paymentRequestId": "prq_123456789",
    "merchantId": "mch_123456789",
    "amount": {
      "currency": "NGN",
      "value": 5000.00,
      "btcEquivalent": 0.00011111
    },
    "bitcoinAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "qrCode": "data:image/png;base64,...",
    "qrCodeUrl": "https://sotr.app/pay/prq_123456789",
    "expiresAt": "2024-01-01T12:15:00Z",
    "status": "pending",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

**Business Logic**:
- Generate unique Bitcoin address for this payment request
- Calculate BTC equivalent
- Generate QR code (BIP21 format: `bitcoin:address?amount=0.00011111`)
- Set expiration time
- Create payment request record
- Return QR code and payment details

---

### 17. Get Merchant Payment Requests

**Endpoint**: `GET /merchants/payment-requests`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Query Parameters**:
- `status`: `pending` | `completed` | `expired`
- `page`: `1`
- `limit`: `20`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "paymentRequests": [
      {
        "paymentRequestId": "prq_123456789",
        "amount": {
          "currency": "NGN",
          "value": 5000.00
        },
        "status": "completed",
        "createdAt": "2024-01-01T12:00:00Z",
        "completedAt": "2024-01-01T12:06:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50
    }
  }
}
```

---

### 18. Get Merchant Transactions

**Endpoint**: `GET /merchants/transactions`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Query Parameters**: Same as user transaction history

**Response**: Similar structure to user transaction history

---

### 19. Get Settlement Preferences

**Endpoint**: `GET /merchants/settlement/preferences`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "settlementCurrency": "NGN" | "BTC",
    "settlementMethod": "instant" | "daily" | "weekly",
    "settlementThreshold": {
      "currency": "NGN",
      "value": 10000.00
    },
    "bankAccount": {  // If settlementCurrency is NGN
      "bankName": "Access Bank",
      "accountNumber": "1234567890",
      "accountName": "My Store Ltd",
      "isVerified": true
    },
    "bitcoinAddress": "bc1q...",  // If settlementCurrency is BTC
    "nextSettlement": "2024-01-02T00:00:00Z",
    "lastSettlement": "2024-01-01T00:00:00Z"
  }
}
```

---

### 20. Update Settlement Preferences

**Endpoint**: `PUT /merchants/settlement/preferences`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Request Body**:
```json
{
  "settlementCurrency": "NGN" | "BTC",
  "settlementMethod": "instant" | "daily" | "weekly",
  "settlementThreshold": {
    "currency": "NGN",
    "value": 10000.00
  },
  "bankAccount": {  // Required if settlementCurrency is NGN
    "bankName": "Access Bank",
    "accountNumber": "1234567890",
    "accountName": "My Store Ltd"
  },
  "bitcoinAddress": "bc1q..."  // Required if settlementCurrency is BTC
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "settlementCurrency": "NGN",
    "settlementMethod": "daily",
    // ... updated preferences
  },
  "message": "Settlement preferences updated successfully"
}
```

**Business Logic**:
- Validate bank account details (if NGN settlement)
- Validate Bitcoin address format (if BTC settlement)
- Verify bank account (may require additional verification step)
- Update merchant preferences
- Recalculate next settlement time

---

### 21. Get Settlement History

**Endpoint**: `GET /merchants/settlement/history`

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Query Parameters**:
- `page`: `1`
- `limit`: `20`
- `startDate`: `2024-01-01`
- `endDate`: `2024-01-31`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "settlements": [
      {
        "settlementId": "stl_123456789",
        "amount": {
          "currency": "NGN",
          "value": 50000.00,
          "btcEquivalent": 0.00111111
        },
        "status": "completed",
        "settlementMethod": "bank_transfer",
        "transactionReference": "TXN123456789",
        "initiatedAt": "2024-01-01T00:00:00Z",
        "completedAt": "2024-01-01T00:05:00Z",
        "fees": {
          "serviceFee": 250.00,
          "currency": "NGN"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45
    }
  }
}
```

---

### 22. Request Instant Settlement

**Endpoint**: `POST /merchants/settlement/request`

**Description**: Request immediate settlement (if merchant has instant settlement enabled)

**Headers**: `Authorization: Bearer {token}` (Merchant token)

**Request Body**:
```json
{
  "amount": {
    "currency": "NGN",
    "value": 50000.00
  }
}
```

**Response** (202 Accepted):
```json
{
  "success": true,
  "data": {
    "settlementId": "stl_123456789",
    "amount": {
      "currency": "NGN",
      "value": 50000.00
    },
    "status": "processing",
    "estimatedCompletion": "2024-01-01T12:10:00Z"
  },
  "message": "Settlement request submitted"
}
```

**Business Logic**:
- Check if merchant has instant settlement enabled
- Verify available balance
- Check minimum settlement amount
- Create settlement record
- Queue settlement for processing
- Return settlement ID

---

## 👨‍💼 Admin APIs

### 23. Get Admin Dashboard

**Endpoint**: `GET /admin/dashboard`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 10000,
      "totalMerchants": 500,
      "activeMerchants": 450,
      "pendingMerchants": 50,
      "totalTransactions": 50000,
      "totalVolume": {
        "btc": 100.5,
        "ngn": 4500000000.00
      },
      "todayTransactions": 500,
      "todayVolume": {
        "btc": 1.5,
        "ngn": 67500000.00
      }
    },
    "recentActivity": [
      {
        "type": "merchant_approved",
        "merchantName": "New Store",
        "timestamp": "2024-01-01T12:00:00Z"
      }
    ],
    "systemHealth": {
      "status": "healthy",
      "bitcoinNode": "connected",
      "database": "connected",
      "exchangeRateService": "connected"
    }
  }
}
```

---

### 24. Get Merchant List (Admin)

**Endpoint**: `GET /admin/merchants`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Query Parameters**:
- `status`: `pending` | `approved` | `suspended` | `rejected`
- `page`: `1`
- `limit`: `20`
- `search`: `store name`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "merchants": [
      {
        "merchantId": "mch_123456789",
        "businessName": "My Store",
        "email": "merchant@example.com",
        "status": "approved",
        "totalSales": 5000000.00,
        "transactionCount": 1000,
        "createdAt": "2024-01-01T00:00:00Z",
        "approvedAt": "2024-01-02T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 500
    }
  }
}
```

---

### 25. Approve/Reject Merchant

**Endpoint**: `PUT /admin/merchants/{merchantId}/status`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Request Body**:
```json
{
  "status": "approved" | "rejected" | "suspended",
  "reason": "Approved after verification"  // Optional
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "merchantId": "mch_123456789",
    "status": "approved",
    "updatedAt": "2024-01-01T12:00:00Z"
  },
  "message": "Merchant status updated"
}
```

**Business Logic**:
- Validate admin permissions
- Update merchant status
- If approved: Activate merchant account, send approval email
- If rejected: Send rejection email with reason
- If suspended: Disable merchant account temporarily
- Log admin action

---

### 26. Get User List (Admin)

**Endpoint**: `GET /admin/users`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Query Parameters**: Similar to merchant list

**Response**: Similar structure to merchant list

---

### 27. Get System Configuration

**Endpoint**: `GET /admin/config`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "exchangeRates": {
      "provider": "bitcoin_average",
      "updateInterval": 30,
      "lastUpdated": "2024-01-01T12:00:00Z"
    },
    "fees": {
      "serviceFeePercentage": 0.005,
      "minServiceFee": 0.00001,
      "networkFeeEstimate": 0.00001
    },
    "settlement": {
      "minSettlementAmount": {
        "NGN": 1000.00,
        "BTC": 0.0001
      },
      "settlementSchedule": {
        "daily": "00:00 UTC",
        "weekly": "Monday 00:00 UTC"
      }
    },
    "limits": {
      "maxTransactionAmount": {
        "NGN": 10000000.00,
        "BTC": 1.0
      },
      "dailyTransactionLimit": {
        "NGN": 50000000.00,
        "BTC": 5.0
      }
    }
  }
}
```

---

### 28. Update System Configuration

**Endpoint**: `PUT /admin/config`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Request Body**:
```json
{
  "fees": {
    "serviceFeePercentage": 0.005,
    "minServiceFee": 0.00001
  },
  "settlement": {
    "minSettlementAmount": {
      "NGN": 1000.00
    }
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    // Updated config
  },
  "message": "Configuration updated successfully"
}
```

**Business Logic**:
- Validate admin permissions
- Validate configuration values
- Update system configuration
- Log configuration changes
- Notify relevant services of changes

---

### 29. Get System Logs

**Endpoint**: `GET /admin/logs`

**Headers**: `Authorization: Bearer {token}` (Admin token)

**Query Parameters**:
- `level`: `info` | `warning` | `error`
- `startDate`: `2024-01-01`
- `endDate`: `2024-01-31`
- `page`: `1`
- `limit`: `100`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log_123",
        "level": "error",
        "message": "Payment processing failed",
        "timestamp": "2024-01-01T12:00:00Z",
        "metadata": {
          "paymentId": "pay_123",
          "error": "Insufficient funds"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 100,
      "total": 5000
    }
  }
}
```

---

## 🔔 Notification APIs

### 30. Register Device for Push Notifications

**Endpoint**: `POST /notifications/register-device`

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "deviceToken": "expo_push_token_here",
  "platform": "ios" | "android",
  "deviceId": "device_unique_id"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Device registered for notifications"
}
```

---

### 31. Get Notification Preferences

**Endpoint**: `GET /notifications/preferences`

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "push": true,
    "email": true,
    "sms": false,
    "paymentReceived": true,
    "settlementCompleted": true,
    "transactionStatus": true
  }
}
```

---

### 32. Update Notification Preferences

**Endpoint**: `PUT /notifications/preferences`

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "push": true,
  "email": false,
  "paymentReceived": true,
  "settlementCompleted": true
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Notification preferences updated"
}
```

---

## 🔍 Blockchain Monitoring APIs (Internal/Webhook)

### 33. Webhook: Payment Confirmation

**Endpoint**: `POST /webhooks/bitcoin-payment` (Internal/External)

**Description**: Called by blockchain monitoring service when payment is detected

**Request Body**:
```json
{
  "transactionHash": "tx_hash_here",
  "bitcoinAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "amount": 0.00011111,
  "confirmations": 1,
  "blockHeight": 800000,
  "timestamp": "2024-01-01T12:05:00Z"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_123456789",
    "status": "confirmed"
  }
}
```

**Business Logic**:
- Verify webhook signature
- Find payment by Bitcoin address
- Update payment status
- Check if required confirmations met
- If completed: Process settlement (if merchant prefers instant)
- Send notifications to user and merchant
- Update transaction records

---

## 📊 Analytics & Reporting APIs

### 34. Get Transaction Analytics

**Endpoint**: `GET /analytics/transactions`

**Headers**: `Authorization: Bearer {token}` (Admin or Merchant)

**Query Parameters**:
- `startDate`: `2024-01-01`
- `endDate`: `2024-01-31`
- `groupBy`: `day` | `week` | `month`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "summary": {
      "totalTransactions": 5000,
      "totalVolume": {
        "btc": 10.5,
        "ngn": 472500000.00
      },
      "averageTransaction": {
        "btc": 0.0021,
        "ngn": 94500.00
      }
    },
    "dailyBreakdown": [
      {
        "date": "2024-01-01",
        "transactionCount": 150,
        "volume": {
          "btc": 0.315,
          "ngn": 14175000.00
        }
      }
    ]
  }
}
```

---

## 🔒 Security & Rate Limiting

### Rate Limits
- Authentication endpoints: 5 requests per minute per IP
- Payment endpoints: 10 requests per minute per user
- General endpoints: 100 requests per minute per user
- Admin endpoints: 50 requests per minute per admin

### Authentication
- JWT tokens expire in 1 hour
- Refresh tokens expire in 30 days
- Tokens include: userId, userType, permissions
- All sensitive endpoints require authentication

### Webhook Security
- Webhook endpoints verify HMAC signature
- IP whitelist for blockchain monitoring service
- Request validation and sanitization

---

## 📝 Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "code": "PAYMENT_NOT_FOUND",
    "message": "Payment not found",
    "details": {}  // Optional additional details
  }
}
```

### Common Error Codes
- `AUTHENTICATION_REQUIRED` - 401
- `AUTHORIZATION_DENIED` - 403
- `RESOURCE_NOT_FOUND` - 404
- `VALIDATION_ERROR` - 400
- `RATE_LIMIT_EXCEEDED` - 429
- `INTERNAL_SERVER_ERROR` - 500
- `SERVICE_UNAVAILABLE` - 503

---

## 🔄 WebSocket Events (Real-time Updates)

### Connection
**Endpoint**: `wss://api.sotr.app/v1/ws`

**Authentication**: Token in query parameter: `?token=jwt_token`

### Events

#### Payment Status Update
```json
{
  "event": "payment.status.update",
  "data": {
    "paymentId": "pay_123456789",
    "status": "confirmed",
    "confirmations": 2,
    "transactionHash": "tx_hash_here"
  }
}
```

#### Payment Received (Merchant)
```json
{
  "event": "payment.received",
  "data": {
    "paymentId": "pay_123456789",
    "amount": {
      "currency": "NGN",
      "value": 5000.00
    },
    "customerName": "John Doe"
  }
}
```

#### Settlement Completed
```json
{
  "event": "settlement.completed",
  "data": {
    "settlementId": "stl_123456789",
    "amount": {
      "currency": "NGN",
      "value": 50000.00
    },
    "transactionReference": "TXN123456789"
  }
}
```

---

**Last Updated**: [Current Date]
**API Version**: v1
**Status**: Planning Phase

