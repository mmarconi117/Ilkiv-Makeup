from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Load the GPT-2 pipeline once at startup
chatbot = pipeline("text-generation", model="gpt2")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        # Generate text with sampling for variety
        result = chatbot(req.message, max_length=100, do_sample=True)[0]["generated_text"]
        # Remove the input prompt from the output
        reply = result[len(req.message):].strip()
        print(f"User: {req.message} \nBot: {reply}")
        return {"response": reply}
    except Exception as e:
        print("Error in FastAPI:", str(e))
        return {"response": "Sorry, something went wrong on the server."}
