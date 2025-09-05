# File: ai-model/train_model.py
#!/usr/bin/env python3
"""
Fish Disease Classification Model Training Script
This script trains a machine learning model to predict fish diseases from symptoms.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def create_synthetic_data():
    """Create synthetic training data for demonstration"""
    # This would be replaced with real data collection in production
    np.random.seed(42)
    
    # Symptom features (10 symptoms)
    n_samples = 1000
    X = np.random.randint(0, 2, (n_samples, 10)).astype(bool)
    
    # Disease labels (10 diseases)
    y = np.random.randint(0, 10, n_samples)
    
    # Create some meaningful patterns (for demonstration)
    for i in range(n_samples):
        # Pattern for Ich (white spots + loss of appetite)
        if X[i, 0] and X[i, 3]:  # whiteSpots and lossOfAppetite
            y[i] = 0  # Ich
            
        # Pattern for Fin Rot
        elif X[i, 1] and X[i, 7]:  # finRot and lesions
            y[i] = 1  # Fin Rot
            
        # Pattern for Dropsy
        elif X[i, 6] and X[i, 4]:  # bloating and lethargy
            y[i] = 2  # Dropsy
    
    return X, y

def train_model():
    """Train the fish disease classification model"""
    print("Generating synthetic training data...")
    X, y = create_synthetic_data()
    
    print("Splitting data into train/test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print("Training Random Forest classifier...")
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        class_weight='balanced'
    )
    
    model.fit(X_train, y_train)
    
    print("Evaluating model performance...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy:.3f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the trained model
    os.makedirs('app/models', exist_ok=True)
    model_path = 'app/models/fish_disease_model.joblib'
    joblib.dump(model, model_path)
    
    print(f"\nModel saved to: {model_path}")
    
    # Save feature names and class labels for reference
    feature_names = [
        'whiteSpots', 'finRot', 'clampedFins', 'lossOfAppetite', 
        'lethargy', 'rapidBreathing', 'bloating', 'lesions', 
        'cloudyEyes', 'abnormalSwimming'
    ]
    
    class_names = [
        'Ich', 'Fin Rot', 'Dropsy', 'Swim Bladder Disorder',
        'Velvet Disease', 'Pop-eye', 'Columnaris', 'Tuberculosis',
        'Hexamita', 'Healthy'
    ]
    
    metadata = {
        'feature_names': feature_names,
        'class_names': class_names,
        'accuracy': accuracy
    }
    
    joblib.dump(metadata, 'app/models/model_metadata.joblib')
    
    print("Training completed successfully!")
    return model, accuracy

if __name__ == '__main__':
    train_model()