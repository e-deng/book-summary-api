# Book Summary API

A FastAPI-based REST API that generates comprehensive book summaries using OpenAI's GPT models with GPT Researcher integration for deep research analysis.

## Features

- Generate comprehensive book summaries using OpenAI GPT-4 or GPT-3.5-turbo
- **Deep Research Integration**: Uses GPT Researcher for comprehensive analysis
- **Fallback Support**: Falls back to direct OpenAI calls if GPT Researcher is unavailable
- Structured API with Pydantic models for request validation
- Environment-based configuration
- Error handling and response formatting
- Easy to deploy and extend

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the project root with your OpenAI API key:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Optional: Model configuration
OPENAI_MODEL=gpt-4
TEMPERATURE=0.7
MAX_TOKENS=1500

# GPT Researcher Configuration
GPT_RESEARCHER_URL=http://localhost:8000
```

**Important:** Replace `your-openai-api-key-here` with your actual OpenAI API key. You can get one from [OpenAI's platform](https://platform.openai.com/api-keys).

### 3. Run the Application

```bash
# Development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Usage

### Generate Book Summary

**Endpoint:** `POST /generate-summary`

**Request Body:**
```json
{
    "book_name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925"
}
```

**Response:**
```
The Great Gatsby by F. Scott Fitzgerald, published in 1925, is a classic American novel that explores themes of wealth, love, and the American Dream...

## Detailed Summary
The novel is set in the summer of 1922 and follows the story of Jay Gatsby, a mysterious millionaire...

## Character Analysis
Jay Gatsby: The enigmatic protagonist whose wealth and extravagant lifestyle mask his humble origins...

[Comprehensive analysis continues with all 10 sections]
```

### Research Analysis Sections

The API provides a comprehensive deep research analysis including:

1. **Detailed Summary**: Comprehensive overview of plot, themes, and narrative structure
2. **Character Analysis**: Deep dive into main characters, their development, motivations, and relationships
3. **Thematic Exploration**: Analysis of major themes, symbolism, and underlying messages
4. **Historical Context**: How the book reflects or responds to its historical and cultural context
5. **Literary Analysis**: Writing style, narrative techniques, and literary devices used
6. **Critical Reception**: How the book was received by critics and its impact on literature
7. **Comparative Analysis**: How it compares to other works by the same author or in the same genre
8. **Key Quotes**: Notable passages that exemplify the book's themes and style
9. **Discussion Points**: Thought-provoking questions and topics for deeper discussion
10. **Relevance Today**: How the book's themes remain relevant in contemporary society

## API Documentation

Once the server is running, you can access:

- **Interactive API docs:** http://localhost:8000/docs
- **ReDoc documentation:** http://localhost:8000/redoc

## Project Structure

```
book-summary-api/
├── main.py              # FastAPI application
├── requirements.txt      # Python dependencies
├── README.md           # This file
├── .env                # Environment variables (create this)
└── .gitignore          # Git ignore file
```

## Configuration

### Environment Variables

All configuration is handled through environment variables in the `.env` file:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: Model to use (default: "gpt-4")
- `TEMPERATURE`: Controls creativity (0.0-1.0, default: 0.7)
- `MAX_TOKENS`: Maximum response length (default: 1500)
- `GPT_RESEARCHER_URL`: URL of GPT Researcher instance (default: "http://localhost:8000")

### GPT Researcher Integration

The API integrates with GPT Researcher for enhanced research capabilities:

1. **Primary**: Attempts to use GPT Researcher for comprehensive analysis
2. **Fallback**: If GPT Researcher is unavailable, falls back to direct OpenAI calls
3. **Error Handling**: Graceful error handling with fallback mechanisms

### OpenAI Model Selection

You can modify the model in your `.env` file:

```env
# For GPT-4 (default)
OPENAI_MODEL=gpt-4

# For GPT-3.5-turbo (faster, cheaper)
OPENAI_MODEL=gpt-3.5-turbo
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid API keys
- Network connectivity issues
- OpenAI API rate limits
- Malformed requests
- Missing environment variables
- GPT Researcher unavailability (with fallback)

## Development

### Adding New Endpoints

1. Define your Pydantic model for request validation
2. Create your endpoint function with appropriate decorators
3. Add error handling and response formatting

### Testing

You can test the API using curl:

```bash
curl -X POST "http://localhost:8000/generate-summary" \
     -H "Content-Type: application/json" \
     -d '{
       "book_name": "1984",
       "author": "George Orwell",
       "publication_date": "1949"
     }'
```

## GPT Researcher Setup

To use the full GPT Researcher integration:

1. **Install GPT Researcher**: Follow the [GPT Researcher documentation](https://github.com/assafelovic/gpt-researcher)
2. **Run GPT Researcher**: Start the GPT Researcher server
3. **Configure URL**: Update `GPT_RESEARCHER_URL` in your `.env` file if needed

The API will automatically fall back to direct OpenAI calls if GPT Researcher is not available.

## Security Notes

- The `.env` file is automatically excluded from version control via `.gitignore`
- Never commit your actual API keys to version control
- Consider using environment variables in production deployments

## License

This project is open source and available under the MIT License. 