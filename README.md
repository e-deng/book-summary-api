# 📚 Book Summary API with GPT Researcher

A FastAPI backend that generates comprehensive book summaries using GPT Researcher's deep research capabilities.

## 🎯 What This Project Does

This API provides a powerful backend service for generating detailed book analyses:

- **📖 Deep Research**: Uses GPT Researcher to analyze books comprehensively
- **⚡ Fast API**: FastAPI backend with automatic validation
- **🔗 Seamless Integration**: Connects to local GPT Researcher instance
- **📝 Text-Only Output**: Returns clean summary text without metadata

### How It Works

1. **API Request**: Send book name, author, and publication date
2. **GPT Researcher Integration**: FastAPI forwards request to local GPT Researcher
3. **Deep Research**: GPT Researcher conducts comprehensive analysis
4. **Clean Response**: Returns detailed book summary as text only

## 🏗️ Architecture

```
┌─────────────────┐    HTTP    ┌─────────────────┐    HTTP    ┌─────────────────┐
│   Your Client   │ ────────── │   FastAPI       │ ────────── │  GPT Researcher  │
│   (Any App)     │            │   Backend       │            │   (Local)        │
│                 │            │   (Port 8000)   │            │   (Port 8001)    │
└─────────────────┘            └─────────────────┘            └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Git**

### For Mac/Linux Users

#### Step 1: Clone and Setup
```bash
# Clone the repository
git clone https://github.com/datacamp-tor/book-summary-api.git
cd book-summary-api

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
touch .env
# Edit .env with your settings (see Configuration section)
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

#### Step 3: Start the API
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

### For Windows Users

#### Step 1: Clone and Setup
```cmd
# Clone the repository
git clone https://github.com/datacamp-tor/book-summary-api.git
cd book-summary-api

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
echo. > .env
# Edit .env with your settings (see Configuration section)
```

#### Step 2: Setup GPT Researcher (Separate Project)
```cmd
# Clone GPT Researcher (in a different directory)
git clone https://github.com/assafelovic/gpt-researcher.git
cd gpt-researcher

# Install dependencies
pip install -r requirements.txt

# Start GPT Researcher
python main.py
```

**Note**: GPT Researcher should be running on `http://localhost:8001` before starting this API.

#### Step 3: Start the API
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

## 🧪 Testing the API

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
4. Enter the JSON payload:
   ```json
   {
     "book_name": "Atomic Habits",
     "author": "James Clear",
     "publication_date": "Oct 16 2018"
   }
   ```
5. Click "Execute"

### Using Python requests

```python
import requests

url = "http://localhost:8000/generate-summary"
data = {
    "book_name": "Atomic Habits",
    "author": "James Clear",
    "publication_date": "Oct 16 2018"
}

response = requests.post(url, json=data)
print(response.text)
```

## 📁 Project Structure

```
book-summary-api/
├── main.py                 # FastAPI backend
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── run.py                # Alternative run script
```

## 🔧 Configuration

### Environment Variables (.env)

Create a `.env` file in the project root:

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
```
Detailed book analysis with chapters, themes, and insights...
```

**Example Response:**
```
# Comprehensive Research Analysis of "Atomic Habits" by James Clear

"Atomic Habits," authored by James Clear and published on October 16, 2018, has emerged as a seminal work in the field of personal development and behavioral psychology. The book delves into the science of habit formation, offering readers practical strategies for building positive habits and breaking negative ones...

[Detailed analysis continues...]
```

### GET `/`

Health check endpoint.

**Response:**
```
Book Summary API - POST /generate-summary with book_name, author, publication_date
```

## 🛠️ Development

### For Mac/Linux Users

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

### For Windows Users

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

## 🔍 Troubleshooting

### Common Issues

**1. GPT Researcher Connection Error**
```
Error: Could not connect to GPT Researcher. Make sure it's running on localhost:8001
```
**Solution**: Start GPT Researcher first, then start this API.

**2. Port Already in Use**
```
Address already in use
```
**Solution**: Change the port in the uvicorn command or kill the process using the port.

**3. Module Import Errors**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solution**: Activate your virtual environment and install requirements.

**4. Environment Variables Not Loading**
```
Error: OPENAI_API_KEY not found
```
**Solution**: Create a `.env` file in the project root with your configuration.

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your `.env` file.

## 🚀 Deployment

### For Mac/Linux Users

```bash
# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000

# Or using gunicorn (install first: pip install gunicorn)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### For Windows Users

```cmd
# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
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

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Ensure GPT Researcher is running on port 8001
3. Check the logs for error messages
4. Open an issue on GitHub

---

**Happy Book Summarizing! 📚✨** 