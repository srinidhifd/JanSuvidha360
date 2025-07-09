# JanSuvidha360

A comprehensive platform that aggregates government schemes and shows users what they're eligible for based on their profile. Built with React.js (TypeScript) frontend and Node.js backend.

## Features

- **Phone-based Authentication**: Secure login using phone numbers and OTP
- **User Profile Management**: Complete user profiles with Aadhaar integration
- **Scheme Eligibility**: Intelligent eligibility checking based on age, income, occupation, and other criteria
- **Clean Dashboard**: Single-screen view of all eligible schemes
- **Responsive Design**: Clean, modern UI with white and muted color theme
- **Real Government Schemes**: Includes popular schemes like PM-KISAN, Ayushman Bharat, PMAY, etc.

## Tech Stack

### Frontend
- React.js 18 with TypeScript
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications
- CSS3 with custom design system

### Backend
- Node.js with Express.js
- TypeScript
- JWT for authentication
- Mock JSON data (no database required)
- CORS enabled for cross-origin requests

## Project Structure

```
government-schemes-aggregator/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts (Auth, etc.)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── data/            # Mock data (users, schemes)
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── types/           # TypeScript types
│   └── package.json
└── package.json            # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd government-schemes-aggregator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (port 3000) and backend (port 5000) concurrently.

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend

   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

### Test Users

Use these test phone numbers to login:

- `+919876543210` - Rajesh Kumar (Student, 28 years)
- `+919876543211` - Priya Sharma (Farmer, 31 years)
- `+919876543212` - Amit Patel (Unemployed, 35 years)
- `+919876543213` - Sunita Devi (Self-employed, 48 years)
- `+919876543214` - Arjun Singh (Student, 23 years)

**Note**: The OTP will be displayed in the backend console and also returned in the API response for demo purposes.

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/test-users` - Get list of test users

### User Management
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `GET /api/user/verification` - Get verification status (requires auth)
- `GET /api/user/dashboard` - Get dashboard data (requires auth)

### Schemes
- `GET /api/schemes` - Get all active schemes
- `GET /api/schemes/:id` - Get scheme by ID
- `GET /api/schemes/category/:category` - Get schemes by category
- `GET /api/schemes/eligible/me` - Get user's eligible schemes (requires auth)
- `GET /api/schemes/eligibility/me` - Get eligibility results for all schemes (requires auth)
- `GET /api/schemes/stats/me` - Get eligibility statistics (requires auth)

### Health Check
- `GET /api/health` - Health check endpoint

## Government Schemes Included

The platform includes these popular government schemes:

1. **PM-KISAN** - Income support for farmers
2. **National Scholarship Portal** - Merit-based scholarships
3. **Pradhan Mantri Awas Yojana** - Housing for urban poor
4. **MUDRA Yojana** - Micro-finance for small businesses
5. **Ayushman Bharat** - Health insurance scheme
6. **Sukanya Samriddhi Yojana** - Savings for girl child
7. **Startup India** - Support for entrepreneurs
8. **PM Kaushal Vikas Yojana** - Skill development program
9. **Jan Dhan Yojana** - Financial inclusion
10. **Old Age Pension Scheme** - Social security for elderly

## Eligibility Logic

The system checks eligibility based on:
- **Age criteria** (minimum and maximum age)
- **Income limits** (annual income thresholds)
- **Occupation** (student, farmer, unemployed, etc.)
- **Gender requirements** (where applicable)
- **State/location** (where applicable)
- **Other specific criteria** (education, marital status, etc.)

## Design System

The UI follows a clean, modern design with:
- **Primary Colors**: Indigo/Purple shades
- **Background**: White and light gray tones
- **Typography**: System font stack
- **Components**: Cards, buttons, forms with consistent spacing
- **Responsive**: Mobile-first design approach

## Development

### Frontend Development
```bash
cd frontend
npm start
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production
```bash
npm run build
```

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository.

---

**Note**: This is a demonstration project with mock data. In a production environment, you would need to:
- Set up a real database
- Implement proper SMS service for OTP
- Add real government scheme data
- Implement proper security measures
- Add comprehensive error handling
- Set up monitoring and logging 