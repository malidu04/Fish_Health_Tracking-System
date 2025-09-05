# File: ai-model/app/routes.py
from flask import Blueprint, request, jsonify
from .predictor import predictor

bp = Blueprint('api', __name__)

@bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_type': predictor.model,
        'message': 'Fish Health AI Service is running'
    })

@bp.route('/predict', methods=['POST'])
def predict_disease():
    """Predict disease based on symptoms"""
    try:
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({
                'error': 'Missing symptoms data'
            }), 400
        
        symptoms = data['symptoms']
        
        # Validate symptoms structure
        if not isinstance(symptoms, dict):
            return jsonify({
                'error': 'Symptoms must be a dictionary'
            }), 400
        
        # Get prediction
        prediction = predictor.predict(symptoms)
        
        return jsonify({
            'success': True,
            'prediction': prediction
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Prediction failed: {str(e)}'
        }), 500

@bp.route('/symptoms', methods=['GET'])
def get_symptoms():
    """Get available symptoms list"""
    return jsonify({
        'symptoms': list(predictor.symptom_mapping.keys()),
        'description': 'Boolean values indicating presence of symptoms'
    })

@bp.route('/diseases', methods=['GET'])
def get_diseases():
    """Get known diseases list"""
    return jsonify({
        'diseases': list(predictor.disease_mapping.values()),
        'count': len(predictor.disease_mapping)
    })