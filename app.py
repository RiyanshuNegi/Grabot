# from flask import Flask, render_template, request, jsonify

# from chat import get_response 

# app = Flask(__name__)


# @app.get("/")
# def index_get():
#     return render_template('base.html')
# @app.get("/CHAT")
# def index_get():
#     return render_template('base.html')

# @app.post("/predict")
# def prtedict():
#     text = request.get_json().get("message")
#     #check teext is valid 
#     response  = get_response(text)
#     message = {"answer": response}
#     return jsonify(message)

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, render_template, request, jsonify
from chat import get_response 

app = Flask(__name__)

@app.get("/")
def home_get():
    return render_template('base.html')

@app.get("/CHAT")
def chat_get():
    return render_template('base.html')

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # Check if the text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
