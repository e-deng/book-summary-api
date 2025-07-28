from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
import requests
import json

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key or openai.api_key == "your-openai-api-key-here":
    raise ValueError("Please set your OpenAI API key in the .env file")

app = FastAPI()

class BookRequest(BaseModel):
    book_name: str
    author: str
    publication_date: str

@app.post("/generate-summary")
async def generate_summary(data: BookRequest):
    # Get configuration from environment variables
    model = os.getenv("OPENAI_MODEL", "gpt-4")
    temperature = float(os.getenv("TEMPERATURE", "0.7"))
    max_tokens = int(os.getenv("MAX_TOKENS", "1500"))
    
    # Deep research prompt for comprehensive analysis
    prompt = f"""
    Conduct a comprehensive deep research analysis of the book "{data.book_name}" by {data.author}, published on {data.publication_date}.
    
    Please provide:
    1. **Detailed Summary**: Comprehensive overview of the plot, themes, and narrative structure
    2. **Character Analysis**: Deep dive into main characters, their development, motivations, and relationships
    3. **Thematic Exploration**: Analysis of major themes, symbolism, and underlying messages
    5. **Literary Analysis**: Writing style, narrative techniques, and literary devices used
    8. **Key Quotes**: Notable passages that exemplify the book's themes and style
    9. **Discussion Points**: Thought-provoking questions and topics for deeper discussion
    
    Structure your response in a clear, organized manner with appropriate headings and sections.
    """

    try:
        # Call GPT Researcher API
        gpt_researcher_url = os.getenv("GPT_RESEARCHER_URL", "http://localhost:8000")
        
        # Prepare the request for GPT Researcher
        researcher_request = {
            "query": f"Book analysis: {data.book_name} by {data.author} ({data.publication_date})",
            "report_type": "research_report",
            "source_urls": [],
            "custom_prompt": prompt
        }
        
        # Make request to GPT Researcher
        response = requests.post(
            f"{gpt_researcher_url}/api/research",
            json=researcher_request,
            headers={"Content-Type": "application/json"},
            timeout=1200  # 20 minute timeout for research
        )
        
        if response.status_code == 200:
            researcher_data = response.json()
            # Extract the research text from GPT Researcher response
            research_text = researcher_data.get("text", researcher_data.get("report", ""))
            return research_text
        else:
            # Fallback to direct OpenAI call if GPT Researcher is not available
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens
            )
            result_text = response['choices'][0]['message']['content'].strip()
            return result_text
            
    except Exception as e:
        # Fallback to direct OpenAI call on any error
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens
            )
            result_text = response['choices'][0]['message']['content'].strip()
            return result_text
        except Exception as fallback_error:
            return f"Error: {str(fallback_error)}" 