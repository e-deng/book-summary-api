# 📚 Book Summary API with GPT Researcher

A modern web application that generates comprehensive book summaries using GPT Researcher's deep research capabilities. Built with FastAPI backend and Next.js frontend.

## 🎯 What This Project Does

This project provides a complete solution for generating detailed book analyses:

- **📖 Deep Research**: Uses GPT Researcher to analyze books comprehensively
- **🎨 Modern UI**: Beautiful Next.js frontend with real-time feedback
- **⚡ Fast API**: FastAPI backend with automatic validation
- **🔗 Seamless Integration**: Connects to local GPT Researcher instance

### How It Works

1. **User Input**: Enter book name, author, and publication date
2. **API Processing**: FastAPI validates and forwards request to GPT Researcher
3. **Deep Research**: GPT Researcher conducts comprehensive analysis
4. **Results Display**: Returns detailed chapter-by-chapter summary with insights

## RUN:
cd book-summary-api && uvicorn main:app --reload
cd book-summary-frontend && npm run dev

## 🏗️ Architecture

```
┌─────────────────┐    HTTP    ┌─────────────────┐    HTTP    ┌─────────────────┐
│   Next.js       │ ────────── │   FastAPI       │ ────────── │  GPT Researcher  │
│   Frontend      │            │   Backend       │            │   (Local)        │
│   (Port 3000)   │            │   (Port 8000)   │            │   (Port 8001)    │
└─────────────────┘            └─────────────────┘            └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **Git**

### For Mac/Linux Users

#### Step 1: Clone and Setup Backend
```bash
# Clone the repository
git clone https://github.com/e-deng/book-summary-api.git
cd book-summary-api

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your settings
```

#### Step 2: Setup GPT Researcher (Separate Project)
```bash
# Clone GPT Researcher (in a different directory)
git clone https://github.com/assafelovic/gpt-researcher.git
cd gpt-researcher

# Install dependencies
pip install -r requirements.txt

# Start GPT Researcher
python main.py
```

**Note**: GPT Researcher should be running on `http://localhost:8001` before starting this API.

#### Step 3: Start the Backend API
```bash
# Make sure you're in the book-summary-api directory
cd /path/to/book-summary-api

# Activate virtual environment
source venv/bin/activate

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/

#### Step 4: Setup Frontend
```bash
# Navigate to frontend directory
cd book-summary-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at:
- **Frontend**: http://localhost:3000

### For Windows Users

#### Step 1: Clone and Setup Backend
```cmd
# Clone the repository
git clone https://github.com/e-deng/book-summary-api.git
cd book-summary-api

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
copy .env.example .env
# Edit .env with your settings
```

#### Step 2: Setup GPT Researcher (Separate Project)
```cmd
# Clone GPT Researcher (in a different directory)
git clone https://github.com/e-deng/gpt-researcher-api
cd gpt-researcher

# Install dependencies
pip install -r requirements.txt

# Start GPT Researcher
python main.py
```

**Note**: GPT Researcher should be running on `http://localhost:8001` before starting this API.

#### Step 3: Start the Backend API
```cmd
# Make sure you're in the book-summary-api directory
cd C:\path\to\book-summary-api

# Activate virtual environment
venv\Scripts\activate

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/

#### Step 4: Setup Frontend
```cmd
# Navigate to frontend directory
cd book-summary-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at:
- **Frontend**: http://localhost:3000

## 🧪 Testing the API

### Using the Frontend

1. Open http://localhost:3000
2. Enter book details:
   - **Book Name**: Atomic Habits
   - **Author**: James Clear
   - **Publication Date**: Oct 16 2018
3. Click "Generate Book Summary"
4. Wait for the comprehensive analysis

### Using curl

```bash
curl -X POST "http://localhost:8000/generate-summary" \
  -H "Content-Type: application/json" \
  -d '{
    "book_name": "Atomic Habits",
    "author": "James Clear", 
    "publication_date": "Oct 16 2018"
  }'
```

### Using the API Docs

1. Open http://localhost:8000/docs
2. Click on POST `/generate-summary`
3. Click "Try it out"
4. Enter the JSON payload
5. Click "Execute"

## 📁 Project Structure

```
book-summary-api/
├── main.py                 # FastAPI backend
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── book-summary-frontend/ # Next.js frontend
    ├── src/
    │   └── app/
    │       ├── page.tsx   # Main frontend component
    │       └── layout.tsx # Layout component
    ├── package.json       # Node.js dependencies
    └── README.md         # Frontend documentation
```

## 🔧 Configuration

### Environment Variables (.env)

```bash
# API Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=true

# GPT Researcher Configuration
GPT_RESEARCHER_URL=http://localhost:8001

# Optional: OpenAI Configuration (if using OpenAI directly)
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4
TEMPERATURE=0.7
MAX_TOKENS=4000
```

## 🛠️ Development

### For Mac/Linux Users

#### Backend Development
```bash
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests (if available)
pytest

# Format code
black main.py
```

#### Frontend Development
```bash
cd book-summary-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### For Windows Users

#### Backend Development
```cmd
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests (if available)
pytest

# Format code
black main.py
```

#### Frontend Development
```cmd
cd book-summary-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 API Endpoints

### POST `/generate-summary`

Generates a comprehensive book summary using GPT Researcher.

**Request Body:**
```json
{
  "book_name": "string",
  "author": "string", 
  "publication_date": "string"
}
```

**Response:**
```json
"Detailed book analysis with chapters, themes, and insights..."
```

### GET `/`

Health check endpoint.

**Response:**
```json
{
  "message": "Book Summary API with GPT Researcher Deep Research",
  "endpoint": "POST /generate-summary",
  "parameters": ["book_name", "author", "publication_date"],
  "response": "Text only - comprehensive book analysis"
}
```

## 🔍 Troubleshooting

### Common Issues

**1. GPT Researcher Connection Error**
```
Error: Could not connect to GPT Researcher. Make sure it's running on localhost:8001
```
**Solution**: Start GPT Researcher first, then start this API.

**2. CORS Error in Frontend**
```
Failed to fetch
```
**Solution**: Make sure the FastAPI server is running on port 8000.

**3. Port Already in Use**
```
Address already in use
```
**Solution**: Change the port in the uvicorn command or kill the process using the port.

**4. Module Import Errors**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solution**: Activate your virtual environment and install requirements.

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your `.env` file.

## 🚀 Deployment

### For Mac/Linux Users

#### Backend Deployment
```bash
# Build Docker image (if using Docker)
docker build -t book-summary-api .

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend Deployment
```bash
cd book-summary-frontend

# Build for production
npm run build

# Deploy to Vercel, Netlify, or any static hosting
```

### For Windows Users

#### Backend Deployment
```cmd
# Build Docker image (if using Docker)
docker build -t book-summary-api .

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend Deployment
```cmd
cd book-summary-frontend

# Build for production
npm run build

# Deploy to Vercel, Netlify, or any static hosting
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **GPT Researcher**: For the deep research capabilities
- **FastAPI**: For the modern Python web framework
- **Next.js**: For the React framework
- **Tailwind CSS**: For the styling

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Ensure all services are running
3. Check the logs for error messages
4. Open an issue on GitHub

---

**Happy Book Summarizing! 📚✨** 