// File: frontend/src/pages/FishList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFish } from '../contexts/FishContext';
import { useAuth } from '../contexts/AuthContext';
import FishCard from '../components/fish/FishCard';
import FishForm from '../components/fish/FishForm';
import Button from '../components/ui/Button';
import { Plus, Fish, AlertCircle } from 'lucide-react';

const FishList = () => {
  const { fishes, addFish, updateFish, deleteFish, loading: fishLoading, error: fishError } = useFish();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [aquariums, setAquariums] = useState([]);
  const [loadingAquariums, setLoadingAquariums] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFish, setEditingFish] = useState(null);

  // Load user's aquariums
  useEffect(() => {
    const loadAquariums = async () => {
      try {
        setLoadingAquariums(true);
        // For now, we'll create a default aquarium if none exist
        // In a real app, you'd fetch from an API endpoint
        const defaultAquariums = [
          {
            _id: 'default-aquarium',
            name: 'My Aquarium',
            type: 'freshwater',
            size: 20,
            unit: 'gallons',
            owner: user?._id
          }
        ];
        setAquariums(defaultAquariums);
      } catch (error) {
        console.error('Failed to load aquariums:', error);
        // Fallback to default aquarium
        setAquariums([{
          _id: 'default-aquarium',
          name: 'Main Aquarium',
          type: 'freshwater',
          size: 20,
          unit: 'gallons'
        }]);
      } finally {
        setLoadingAquariums(false);
      }
    };

    if (user) {
      loadAquariums();
    }
  }, [user]);

  const handleAddFish = async (fishData) => {
    try {
      // Ensure aquarium is set - use default if not provided
      const dataWithAquarium = {
        ...fishData,
        aquarium: fishData.aquarium || aquariums[0]?._id
      };
      await addFish(dataWithAquarium);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add fish:', error);
      alert('Failed to add fish. Please try again.');
    }
  };

  const handleEditFish = async (fishData) => {
    try {
      await updateFish(editingFish._id, fishData);
      setEditingFish(null);
    } catch (error) {
      console.error('Failed to update fish:', error);
      alert('Failed to update fish. Please try again.');
    }
  };

  const handleDeleteFish = async (fish) => {
    if (window.confirm(`Are you sure you want to delete ${fish.name}? This action cannot be undone.`)) {
      try {
        await deleteFish(fish._id);
      } catch (error) {
        console.error('Failed to delete fish:', error);
        alert('Failed to delete fish. Please try again.');
      }
    }
  };

  const handleViewHealth = (fish) => {
    navigate(`/health?fish=${fish._id}`);
  };

  if (fishLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Fish</h1>
          <p className="text-gray-600">Manage your fish collection</p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          disabled={loadingAquariums}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Fish
        </Button>
      </div>

      {fishError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{fishError}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {fishes.map(fish => (
          <FishCard
            key={fish._id}
            fish={fish}
            onEdit={setEditingFish}
            onDelete={handleDeleteFish}
            onViewHealth={handleViewHealth}
          />
        ))}
      </div>

      {fishes.length === 0 && (
        <div className="text-center py-12">
          <Fish className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No fish yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first fish to your aquarium</p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            disabled={loadingAquariums}
          >
            Add Your First Fish
          </Button>
        </div>
      )}

      {/* Add Fish Modal */}
      <FishForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddFish}
        aquariums={aquariums}
        loading={loadingAquariums}
      />

      {/* Edit Fish Modal */}
      <FishForm
        isOpen={!!editingFish}
        onClose={() => setEditingFish(null)}
        onSubmit={handleEditFish}
        initialData={editingFish}
        aquariums={aquariums}
        loading={loadingAquariums}
      />
    </div>
  );
};

export default FishList;