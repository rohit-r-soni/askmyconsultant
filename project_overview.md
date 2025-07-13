# AskMyConsultant.com

## 🧭 Overview
AskMyConsultant.com is a curated consulting discovery platform where **clients can search and view consultant profiles**. Profiles are pre-created and managed by the platform administrators (no consultant self-registration in MVP).

---

## ⚙️ Tech Stack

| Layer      | Technology     |
|------------|----------------|
| Frontend   | React.js with Tailwind CSS, react-select |
| Backend    | Python (FastAPI)            |
| Database   | PostgreSQL (Neon DB)        |
| Hosting    | Compatible with Vercel (frontend), Render/Heroku (backend) |

---

## 🧱 Project Structure (Monorepo)

The application uses a **monorepo architecture**. Both frontend and backend live in the same repository for simpler development and deployment.

> Use `docker-compose` to spin up both services in development.

---

## 🎯 MVP Features

### 🚀 Admin Role (Backend Only)
- Admins create consultant profiles via API (no frontend UI for consultant registration).
- No authentication required for MVP.
- Database pre-seeded with sample consultant data.

### 🔍 Client Role (Frontend Only)
- **Advanced Search**: Search by name, profession, or expertise with auto-suggestions
- **Smart Filters**: Location (country/state/city), profession, and expertise dropdowns
- **Dependent Dropdowns**: Country → State → City cascading filters
- **Auto-Suggestions**: Smart suggestions after typing 5+ characters
- **Debounced Search**: Optimized API calls for better performance
- **Reset Functionality**: Clear all filters with one click
- **Responsive Design**: Modern, mobile-friendly interface

---

## 👤 Consultant Profile Structure

### **Mandatory Fields**
- Name
- Address (optional)
- Country
- State  
- City
- Profession
- Experience (in years)
- Fields of Expertise
- Clients Served

### **Optional Fields**
- Education
- Projects Completed
- References / Testimonials
- Website or Social Media Links

---

## 🔗 API Endpoints (FastAPI Backend)

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| POST   | /api/consultant/create   | Admin API to create consultant       |
| GET    | /api/consultants         | List consultants (supports filters)  |
| GET    | /api/consultant/{id}     | Get consultant profile by ID         |
| GET    | /api/consultants/search  | Search consultants by query          |
| GET    | /api/countries           | Get unique countries                 |
| GET    | /api/states              | Get states (filtered by country)     |
| GET    | /api/cities              | Get cities (filtered by country/state) |

> All endpoints are public in the MVP version.

---

## 🎨 Frontend Features (React)

### **Advanced Search Bar**
- **Main Search**: Search by name, profession, or expertise with auto-suggestions
- **Location Filters**: Address input + Country/State/City dropdowns
- **Profession Filter**: Dropdown with predefined options
- **Expertise Filter**: Dropdown with predefined expertise areas
- **Reset Button**: Clear all filters and search

### **Smart Auto-Suggestions**
- Triggers after 5+ characters typed
- Suggests matching professions and expertise
- Click to auto-fill search and filters

### **Dependent Location Dropdowns**
- **Country**: Loads all available countries
- **State**: Loads states based on selected country
- **City**: Loads cities based on selected country and state
- All dropdowns are searchable using react-select

### **Responsive Design**
- Mobile-friendly interface
- Modern UI with Tailwind CSS
- Smooth animations and transitions

---

## 🔎 Search & Filter Features

- **Text Search**: Search by name, profession, or expertise with debouncing
- **Location Filter**: Filter by address, country, state, and city
- **Profession Filter**: Filter by specific profession with dropdown
- **Expertise Filter**: Filter by fields of expertise with dropdown
- **Auto-Suggestions**: Smart suggestions based on search input
- **Reset Functionality**: Clear all filters with one click

---

## 📦 Dev Setup

### Environment Configuration

Before starting the application, set up your environment variables:

1. **Create a `.env` file** from the template:
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file** with your configuration:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require&channel_binding=require
   
   # Frontend Configuration
   REACT_APP_API_URL=http://localhost:8000
   
   # Backend Configuration
   BACKEND_HOST=0.0.0.0
   BACKEND_PORT=8000
   
   # Development Database (for local development)
   LOCAL_DATABASE_URL=postgresql://postgres:password@localhost:5432/askmyconsultant
   ```

3. **Important**: Never commit your `.env` file to version control.

### Start Services

Run both backend and frontend locally using:

```bash
docker-compose up --build
```

### Project Structure

```
askmyconsultant/
├── backend/               ← FastAPI backend service
│   ├── main.py           ← FastAPI application with all endpoints
│   ├── models.py         ← SQLAlchemy models (updated location structure)
│   ├── schemas.py        ← Pydantic schemas
│   ├── database.py       ← Database configuration
│   ├── seed_data.py      ← Sample data seeding script
│   ├── requirements.txt  ← Python dependencies
│   └── Dockerfile        ← Backend container
├── frontend/             ← React.js frontend
│   ├── src/
│   │   ├── components/   ← Reusable components
│   │   │   ├── SearchBar.js          ← Advanced search with filters
│   │   │   ├── SearchSuggestions.js  ← Auto-suggestions component
│   │   │   ├── ConsultantCard.js     ← Consultant display cards
│   │   │   └── Header.js             ← Navigation header
│   │   ├── pages/        ← Page components
│   │   ├── services/     ← API services
│   │   └── App.js        ← Main app component
│   ├── public/           ← Static assets
│   ├── package.json      ← Node.js dependencies
│   └── Dockerfile        ← Frontend container
├── docker-compose.yml    ← Unified dev setup
├── README.md
└── project_overview.md
```

---

## 🔧 Key Technical Features

### **Frontend**
- React.js with functional components and hooks
- Tailwind CSS for styling
- react-select for advanced dropdowns
- Debounced search to optimize API calls
- Auto-suggestions with smart filtering
- Responsive design for all devices

### **Backend**
- FastAPI with automatic API documentation
- SQLAlchemy ORM with PostgreSQL
- CORS middleware for frontend integration
- Structured location data (country/state/city)
- Efficient filtering and search endpoints

### **Database**
- PostgreSQL hosted on Neon DB
- Structured consultant profiles
- Location data properly normalized
- Sample data pre-seeded

---

© 2025 AskMyConsultant.com