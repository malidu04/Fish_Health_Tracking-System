// File: frontend/src/components/health/TreatmentLog.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

const TreatmentLog = ({ fish, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Log Treatment for {fish.name}</h3>
      
      <form onSubmit={handleSubmit((data) => onSubmit(data, fish._id))} className="space-y-4">
        <div>
          <label className="label">Treatment Name</label>
          <input
            {...register('name', { required: 'Treatment name is required' })}
            className="input-field"
            placeholder="e.g., Ich Treatment"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register('description')}
            className="input-field"
            rows={3}
            placeholder="Describe the treatment..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Start Date</label>
            <input
              type="date"
              {...register('startDate')}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="label">End Date</label>
            <input
              type="date"
              {...register('endDate')}
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Dosage</label>
            <input
              {...register('dosage')}
              className="input-field"
              placeholder="e.g., 5ml per 10 gallons"
            />
          </div>
          
          <div>
            <label className="label">Frequency</label>
            <input
              {...register('frequency')}
              className="input-field"
              placeholder="e.g., Every 24 hours"
            />
          </div>
        </div>

        <div>
          <label className="label">Treatment Type</label>
          <select {...register('type')} className="input-field">
            <option value="medication">Medication</option>
            <option value="water-change">Water Change</option>
            <option value="salt-bath">Salt Bath</option>
            <option value="quarantine">Quarantine</option>
            <option value="diet-change">Diet Change</option>
            <option value="other">Other</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Log Treatment
        </Button>
      </form>
    </div>
  );
};

export default TreatmentLog;