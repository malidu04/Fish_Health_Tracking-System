# File: ai-model/app/predictor.py
import numpy as np
import joblib
import os
from typing import Dict, List

class FishHealthPredictor:
    def __init__(self):
        self.model = None
        self.symptom_mapping = {
            'whiteSpots': 0,
            'finRot': 1,
            'clampedFins': 2,
            'lossOfAppetite': 3,
            'lethargy': 4,
            'rapidBreathing': 5,
            'bloating': 6,
            'lesions': 7,
            'cloudyEyes': 8,
            'abnormalSwimming': 9
        }
        
        self.disease_mapping = {
            0: 'Ich (White Spot Disease)',
            1: 'Fin Rot',
            2: 'Dropsy',
            3: 'Swim Bladder Disorder',
            4: 'Velvet Disease',
            5: 'Pop-eye',
            6: 'Columnaris',
            7: 'Tuberculosis',
            8: 'Hexamita',
            9: 'Healthy'
        }
        
        self.load_model()

    def load_model(self):
        """Load the trained model"""
        try:
            # In production, this would load from models/ directory
            # For now, we'll use a rule-based approach
            self.model = "rule_based"
            print("AI Model: Using rule-based predictor (fallback mode)")
            
        except Exception as e:
            print(f"Error loading model: {e}")
            self.model = "rule_based"

    def symptoms_to_vector(self, symptoms: Dict) -> np.array:
        """Convert symptoms dictionary to feature vector"""
        vector = np.zeros(len(self.symptom_mapping))
        
        for symptom, present in symptoms.items():
            if symptom in self.symptom_mapping and present:
                vector[self.symptom_mapping[symptom]] = 1
                
        return vector

    def predict(self, symptoms: Dict) -> Dict:
        """Predict disease based on symptoms"""
        try:
            if self.model == "rule_based":
                return self.rule_based_predict(symptoms)
            else:
                # ML model prediction would go here
                return self.ml_predict(symptoms)
                
        except Exception as e:
            print(f"Prediction error: {e}")
            return self.get_fallback_prediction()

    def rule_based_predict(self, symptoms: Dict) -> Dict:
        """Rule-based disease prediction"""
        symptom_count = sum(1 for s in symptoms.values() if s)
        
        if symptom_count == 0:
            return {
                'disease': 'Healthy',
                'confidence': 0.95,
                'recommendations': [
                    'Continue regular maintenance and observation',
                    'Maintain good water quality',
                    'Monitor fish behavior daily'
                ]
            }

        # Rule-based logic
        if symptoms.get('whiteSpots') and symptoms.get('lossOfAppetite'):
            return {
                'disease': 'Ich (White Spot Disease)',
                'confidence': 0.85,
                'recommendations': [
                    'Increase water temperature to 80-82°F gradually',
                    'Use ich medication according to instructions',
                    'Add aquarium salt if suitable for your fish',
                    'Increase aeration during treatment'
                ]
            }

        if symptoms.get('finRot') and symptoms.get('lesions'):
            return {
                'disease': 'Fin Rot or Bacterial Infection',
                'confidence': 0.75,
                'recommendations': [
                    'Improve water quality with immediate water change',
                    'Use antibacterial medication for fin rot',
                    'Ensure proper filtration system is working',
                    'Test water parameters regularly'
                ]
            }

        if symptoms.get('bloating') and symptoms.get('lethargy'):
            return {
                'disease': 'Dropsy or Internal Infection',
                'confidence': 0.7,
                'recommendations': [
                    'Isolate affected fish immediately',
                    'Try antibacterial food or medication',
                    'Add Epsom salt bath (1 tsp per gallon)',
                    'This condition has low survival rate, focus on prevention'
                ]
            }

        if symptoms.get('rapidBreathing') and symptoms.get('clampedFins'):
            return {
                'disease': 'Water Quality Issues or Gill Disease',
                'confidence': 0.8,
                'recommendations': [
                    'Test water parameters immediately (ammonia, nitrite, nitrate)',
                    'Perform 25-50% water change',
                    'Check filtration system and clean if needed',
                    'Reduce feeding until parameters stabilize'
                ]
            }

        # Default prediction for unknown patterns
        return self.get_fallback_prediction(symptoms)

    def ml_predict(self, symptoms: Dict) -> Dict:
        """Machine learning model prediction (placeholder)"""
        # This would use the actual trained model
        vector = self.symptoms_to_vector(symptoms)
        
        # Placeholder for ML model prediction
        return {
            'disease': 'General Infection',
            'confidence': 0.65,
            'recommendations': [
                'Improve water quality',
                'Consider broad-spectrum treatment',
                'Monitor fish closely',
                'Consult with aquatic veterinarian if symptoms persist'
            ]
        }

    def get_fallback_prediction(self, symptoms=None) -> Dict:
        """Fallback prediction when model fails"""
        return {
            'disease': 'Unknown Condition',
            'confidence': 0.3,
            'recommendations': [
                'Monitor fish closely for changes',
                'Improve water quality with partial water change',
                'Consider isolating the fish if symptoms worsen',
                'Consult with experienced aquarists or veterinarians'
            ]
        }

# Global predictor instance
predictor = FishHealthPredictor()