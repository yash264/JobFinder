# install dependencies
from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
from suggestions import recommend_suggestion
from flask_cors import CORS

app = Flask(__name__)


# set the cors value
# cors_options = {
#     "origins": "https://vidyavaani-meta.vercel.app",
#     "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
#     "allow_headers": ["Content-Type", "Authorization"],
#     "supports_credentials": True
# }


# # Apply CORS to the app with specific options
# CORS(app, resources={r"/*": cors_options})


# Load trained ML model
jobSeekersModel = joblib.load("models/jobSeekers.pkl")
jobProvidersModel = joblib.load("models/jobProviders.pkl")


@app.route('/')
def home():
    return "<h1>Welcome to Server Side.</h1>"


# Classify student performance
def classify_student(score):
    if score >= 75:
        return "good"
    elif score >= 45:
        return "average"
    else:
        return "poor"


# route to predicting the score
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print(data)
        
        study_hours = float(data["study_hours"])
        sleep_hours = float(data["sleep_hours"])
        revision_frequency = int(data["revision_frequency"])
        exam_stress_level = int(data["exam_stress_level"])
        preperation_level = int(data["preperation_level"])

        # Predict performance category
        prediction = model.predict(
            np.array([
                [   
                    study_hours,
                    sleep_hours,
                    revision_frequency,
                    exam_stress_level,
                    preperation_level
                ]
                ])
            )[0]
        
        # classify the category of student
        final_score = max(10, min(100, prediction))
        category = classify_student(final_score)

        # Get recommendation
        recommendation = recommend_suggestion(category)

        return jsonify(
            {
                "performance_scores": float(prediction),
                "recommendation": recommendation
            }
        )
    
    except Exception as error:
        return jsonify({"error": str(error)})


#  start the server on hosting
# @app.route("/startServer", methods=['GET'])
# def start_server():
#     return jsonify({
#         "message": "Server started successfully!"
#     })


if __name__ == '__main__':
    app.run(debug=True)