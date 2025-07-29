from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import asyncio
import websockets
import json
import logging

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookRequest(BaseModel):
    book_name: str
    author: str
    publication_date: str

@app.post("/generate-summary")
async def generate_summary(data: BookRequest):
    """
    Generate a comprehensive book summary using GPT Researcher deep research.
    
    Parameters:
    - book_name: Name of the book
    - author: Author of the book  
    - publication_date: Publication date of the book
    
    Returns: Text response with comprehensive book analysis
    """
    try:
        logger.info(f"🔗 Sending request to GPT Researcher for '{data.book_name}' by {data.author}")
        
        # Use the HTTP API endpoint
        gpt_researcher_url = "http://localhost:8001/summarize"
        
        # Prepare the request payload
        request_payload = {
            "name": data.book_name,
            "author": data.author,
            "publication_date": data.publication_date
        }
        
        try:
            response = requests.post(
                gpt_researcher_url,
                json=request_payload,
                timeout=1200,  # 20 minutes
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info(f"✅ Successfully generated research summary via GPT Researcher")
                return result.get("summary", str(result))
            else:
                logger.error(f"❌ GPT Researcher returned status {response.status_code}")
                return f"Error from GPT Researcher: HTTP {response.status_code}"
                
        except requests.exceptions.ConnectionError:
            return "Could not connect to GPT Researcher. Make sure it's running on localhost:8001"
        except requests.exceptions.Timeout:
            return "Request to GPT Researcher timed out after 20 minutes"
        except Exception as e:
            return f"Error communicating with GPT Researcher: {str(e)}"
    
    except Exception as e:
        return f"Error: {str(e)}"

@app.get("/")
async def root():
    return {
        "message": "Book Summary API with GPT Researcher Deep Research",
        "endpoint": "POST /generate-summary",
        "parameters": ["book_name", "author", "publication_date"],
        "response": "Text only - comprehensive book analysis"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 