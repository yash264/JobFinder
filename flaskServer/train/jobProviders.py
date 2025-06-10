import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import random

# Sample dataset (real-world data should be larger )
data = {
    'domain_expertise': [random.randint(1, 10) for _ in range(1000)],
    'communication_skill': [random.randint(1, 10) for _ in range(1000)],
    'collaboration': [random.randint(1, 10) for _ in range(1000)],
    'time_management': [random.randint(1, 10) for _ in range(1000)],
    'cultural_fit': [random.randint(1, 10) for _ in range(1000)],
}


# Performance Score (Target Variable) → Based on other factors
data['performance_score'] = [
    max(0, min(100,
        (
            0.30 * de +
            0.20 * cs +
            0.20 * cb +
            0.15 * tm +
            0.15 * cf
        ) * 10 + random.uniform(-5, 5)
    ))
    for de, cs, cb, tm, cf in zip(
        data['domain_expertise'],
        data['communication_skill'],
        data['collaboration'],
        data['time_management'],
        data['cultural_fit'],
    )
]

df = pd.DataFrame(data)


# Split data
X = df[['domain_expertise', 'communication_skill', 'collaboration', 'time_management', 'cultural_fit']]
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
joblib.dump(model, 'models/jobProviders.pkl')


print("Server is running")