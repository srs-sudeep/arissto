from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if using a different frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for saved papers
saved_papers = []

class Paper(BaseModel):
    id: str  # Changed to str for DOI compatibility
    title: str
    authors: str
    year: int
    citations: int

@app.post("/api/save", response_model=Paper)
async def save_paper(paper: Paper):
    # Add the paper to the in-memory list
    saved_papers.append(paper)
    return paper

@app.get("/api/saved", response_model=List[Paper])
async def get_saved_papers():
    # Return the list of saved papers
    print(saved_papers)
    return saved_papers

@app.delete("/api/remove")
async def remove_paper(request: Request):
    global saved_papers
    body = await request.json()
    paper_id = body.get("paper_id")

    if not paper_id:
        raise HTTPException(status_code=400, detail="Paper ID not provided")

    # Use dot notation to access attributes of Paper objects
    saved_papers = [paper for paper in saved_papers if paper.id != paper_id]

    return {"detail": "Paper removed successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
