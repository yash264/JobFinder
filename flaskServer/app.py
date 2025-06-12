# install dependencies
from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
from flask_cors import CORS

from suggestions.jobSeekers import recommend_jobSeeker_suggestion
from suggestions.jobProviders import recommend_jobProvider_suggestion


app = Flask(__name__)


# set the cors value
cors_options = {
    "origins": ["https://jobfinder-meta.vercel.app"],
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}


# Apply CORS to the app with specific options
CORS(app, **cors_options)


# Load trained ML model
jobSeekersModel = joblib.load("models/jobSeekers.pkl")
jobProvidersModel = joblib.load("models/jobProviders.pkl")


@app.route('/')
def home():
    return "<h1>Welcome to Server Side.</h1>"


# Classify student performance
def classify_person(score):
    if score >= 75:
        return "good"
    elif score >= 45:
        return "average"
    else:
        return "poor"


# route to predicting the score
@app.route("/predict/jobSeekers", methods=["POST"])
def jobSeekers():
    try:
        data = request.get_json()
        print(data)
        
        techincal_skill = int(data["techincal_skill"])
        communication_skill = int(data["communication_skill"])
        problem_solving = int(data["problem_solving"])
        creativity = int(data["creativity"])
        leadership = int(data["leadership"])

        # Predict performance category
        prediction = jobSeekersModel.predict(
            np.array([
                [   
                    techincal_skill,
                    communication_skill,
                    problem_solving,
                    creativity,
                    leadership 
                ]
                ])
            )[0]
        
        # classify the category of student
        final_score = max(10, min(100, prediction))
        category = classify_person(final_score)

        # Get recommendation
        recommendation = recommend_jobSeeker_suggestion(category)

        return jsonify(
            {
                "performance_scores": float(prediction),
                "recommendation": recommendation
            }
        )
    
    except Exception as error:
        return jsonify({"error": str(error)})



# route to predicting the score
@app.route("/predict/jobProviders", methods=["POST"])
def jobProviders():
    try:
        data = request.get_json()
        print(data)
        
        domain_expertise = int(data["domain_expertise"])
        communication_skill = int(data["communication_skill"])
        collaboration = int(data["collaboration"])
        time_management = int(data["time_management"])
        cultural_fit = int(data["cultural_fit"])

        # Predict performance category
        prediction = jobProvidersModel.predict(
            np.array([
                [   
                    domain_expertise,
                    communication_skill,
                    collaboration,
                    time_management,
                    cultural_fit 
                ]
                ])
            )[0]
        
        # classify the category of student
        final_score = max(10, min(100, prediction))
        category = classify_person(final_score)

        # Get recommendation
        recommendation = recommend_jobProvider_suggestion(category)

        return jsonify(
            {
                "performance_scores": float(prediction),
                "recommendation": recommendation
            }
        )
    
    except Exception as error:
        return jsonify({"error": str(error)})


#  start the server on hosting
@app.route("/startFlaskServer", methods=['GET'])
def start_server():
    return jsonify({
        "message": "Server started successfully!"
    })


if __name__ == '__main__':
    app.run(debug=True)