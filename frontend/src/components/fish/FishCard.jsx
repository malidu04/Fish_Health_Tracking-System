// File: frontend/src/components/fish/FishCard.jsx
import React from 'react';
import { Fish, Edit, Trash2, Heart } from 'lucide-react';
import Button from '../ui/Button';

const FishCard = ({ fish, onEdit, onDelete, onViewHealth }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'sick': return 'text-red-600 bg-red-100';
      case 'recovering': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Fish className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{fish.name}</h3>
            <p className="text-gray-600">{fish.species}</p>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fish.status)}`}>
          {fish.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>Breed: {fish.breed || 'Unknown'}</p>
        <p>Age: {fish.age} {fish.ageUnit}</p>
        <p>Origin: {fish.origin.replace('-', ' ')}</p>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewHealth(fish)}
        >
          <Heart className="h-4 w-4 mr-1" />
          Health
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(fish)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(fish)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FishCard;