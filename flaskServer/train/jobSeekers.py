import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import random

# Sample dataset (real-world data should be larger )
data = {
    'technical_skill': [random.randint(1, 10) for _ in range(1000)],
    'communication_skill': [random.randint(1, 10) for _ in range(1000)],
    'problem_solving': [random.randint(1, 10) for _ in range(1000)],
    'creativity': [random.randint(1, 10) for _ in range(1000)],
    'leadership': [random.randint(1, 10) for _ in range(1000)],
}


# Performance Score (Target Variable) → Based on other factors
data['performance_score'] = [
    max(0, min(100,
        (
            0.35 * ts +
            0.25 * cs +
            0.20 * ps +
            0.10 * cr +
            0.10 * ls 
        ) * 10 + random.uniform(-5, 5)
    ))
    for ts, cs, ps, cr, ls in zip(
        data['technical_skill'],
        data['communication_skill'],
        data['problem_solving'],
        data['creativity'],
        data['leadership']
    )
]

df = pd.DataFrame(data)


# Split data
X = df[['technical_skill', 'communication_skill', 'problem_solving', 'creativity', 'leadership']]
y = df['performance_score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Train Random Forest Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


# Make predictions on the test set
y_pred = model.predict(X_test)


# Calculate Accuracy Metrics
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Print Accuracy Results
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"R² Score: {r2:.2f}")


# Save model
joblib.dump(model, 'models/jobSeekers.pkl')


print("Server is running")