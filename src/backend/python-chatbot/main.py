from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Initialize your chatbot model once (GPT-2 here)
chatbot = pipeline("text-generation", model="gpt2")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    # Generate text response from the model
    result = chatbot(req.message, max_length=100, do_sample=True)[0]["generated_text"]
    # Return generated text (strip input prompt to avoid repetition)
    return {"response": result[len(req.message):].strip()}
