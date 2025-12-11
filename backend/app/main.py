from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def get_h():
    return {"message": "hello from server"}