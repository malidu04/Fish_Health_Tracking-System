// File: frontend/src/components/fish/FishForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const FishForm = ({ isOpen, onClose, onSubmit, initialData, aquariums }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Fish' : 'Add New Fish'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="input-field"
            placeholder="e.g., Goldie"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label">Species</label>
          <input
            {...register('species', { required: 'Species is required' })}
            className="input-field"
            placeholder="e.g., Goldfish"
          />
          {errors.species && (
            <p className="text-red-500 text-sm mt-1">{errors.species.message}</p>
          )}
        </div>

        <div>
          <label className="label">Breed/Variety</label>
          <input
            {...register('breed')}
            className="input-field"
            placeholder="e.g., Comet"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              {...register('age', { min: 0 })}
              className="input-field"
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="label">Age Unit</label>
            <select {...register('ageUnit')} className="input-field">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Aquarium</label>
          <select
            {...register('aquarium', { required: 'Aquarium is required' })}
            className="input-field"
          >
            <option value="">Select Aquarium</option>
            {aquariums.map(aquarium => (
              <option key={aquarium._id} value={aquarium._id}>
                {aquarium.name}
              </option>
            ))}
          </select>
          {errors.aquarium && (
            <p className="text-red-500 text-sm mt-1">{errors.aquarium.message}</p>
          )}
        </div>

        <div>
          <label className="label">Origin</label>
          <select {...register('origin')} className="input-field">
            <option value="unknown">Unknown</option>
            <option value="store-bought">Store Bought</option>
            <option value="captive-bred">Captive Bred</option>
            <option value="wild-caught">Wild Caught</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Add'} Fish
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FishForm;