// File: frontend/src/components/health/SymptomTracker.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

const SymptomTracker = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm();
  
  const symptoms = watch();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Symptom Tracker</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('whiteSpots')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>White Spots</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('finRot')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>Fin Rot</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('clampedFins')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>Clamped Fins</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('lossOfAppetite')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>Loss of Appetite</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('lethargy')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>Lethargy</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('rapidBreathing')}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span>Rapid Breathing</span>
          </label>
        </div>

        {Object.values(symptoms).some(val => val) && (
          <button
            type="submit"
            className="btn-primary"
          >
            Analyze Symptoms
          </button>
        )}
      </form>
    </div>
  );
};

export default SymptomTracker;