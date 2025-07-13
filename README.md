# AskMyConsultant.com

A curated consulting discovery platform where clients can search and view consultant profiles. Built with React.js frontend and FastAPI backend in a monorepo architecture.

## 🚀 Features

### For Clients
- **Advanced Search & Filter**: Find consultants by name, profession, expertise, and detailed location
- **Smart Auto-Suggestions**: Get search suggestions after typing 5+ characters
- **Dependent Location Dropdowns**: Country → State → City cascading filters with searchable options
- **Debounced Search**: Real-time search with optimized API calls
- **Profile Viewing**: Detailed consultant profiles with all information
- **Responsive Design**: Modern, mobile-friendly interface with Tailwind CSS
- **Reset Functionality**: Clear all filters with one click

### For Admins
- **Profile Management**: Create and manage consultant profiles via API
- **No Authentication Required**: Simple admin access for MVP
- **Database Seeding**: Pre-populated with sample consultant data

## 🛠️ Tech Stack

| Layer      | Technology     |
|------------|----------------|
| Frontend   | React.js with Tailwind CSS, react-select |
| Backend    | Python (FastAPI)            |
| Database   | PostgreSQL (Neon DB)        |
| Hosting    | Compatible with Vercel (frontend), Render/Heroku (backend) |

## 📦 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd askmyconsultant
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🏗️ Project Structure

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
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| POST   | /api/consultant/create   | Admin API to create consultant       |
| GET    | /api/consultants         | List consultants (supports filters)  |
| GET    | /api/consultant/{id}     | Get consultant profile by ID         |
| GET    | /api/consultants/search  | Search consultants by query          |
| GET    | /api/countries           | Get unique countries                 |
| GET    | /api/states              | Get states (filtered by country)     |
| GET    | /api/cities              | Get cities (filtered by country/state) |

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

## 🎨 Frontend Features

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

## 🔍 Search & Filter Features

- **Text Search**: Search by name, profession, or expertise with debouncing
- **Location Filter**: Filter by address, country, state, and city
- **Profession Filter**: Filter by specific profession with dropdown
- **Expertise Filter**: Filter by fields of expertise with dropdown
- **Auto-Suggestions**: Smart suggestions based on search input
- **Reset Functionality**: Clear all filters with one click

## 🐳 Docker Development

The application uses Docker Compose for easy development setup:

```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build --force-recreate
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

### Backend (Render/Heroku)
1. Deploy the `backend/` directory
2. Set environment variables:
   - `DATABASE_URL`
   - `PORT` (if needed)

## 📝 Sample Data

The application comes pre-seeded with sample consultant data. You can add more consultants using the API:

```bash
curl -X POST "http://localhost:8000/api/consultant/create" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Johnson",
    "address": "123 Business Ave",
    "country": "United States",
    "state": "New York",
    "city": "New York",
    "profession": "Business Strategy Consultant",
    "experience_years": 8,
    "fields_of_expertise": "Strategic planning, Market analysis, Business transformation",
    "clients_served": "Fortune 500 companies, startups, non-profits",
    "education": "MBA from Harvard Business School",
    "projects_completed": "Led digital transformation for 3 major corporations",
    "references_testimonials": "Sarah helped us increase revenue by 40% in just 6 months.",
    "website_social_links": "linkedin.com/in/sarahjohnson"
  }'
```

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

© 2025 AskMyConsultant.com 