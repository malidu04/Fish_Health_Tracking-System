// File: frontend/src/contexts/FishContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fishService } from '../services/fish';

const FishContext = createContext();

export const useFish = () => {
  const context = useContext(FishContext);
  if (!context) {
    throw new Error('useFish must be used within a FishProvider');
  }
  return context;
};

export const FishProvider = ({ children }) => {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFishes();
  }, []);

  const loadFishes = async () => {
    try {
      setLoading(true);
      const data = await fishService.getAll();
      setFishes(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load fish');
    } finally {
      setLoading(false);
    }
  };

  const addFish = async (fishData) => {
    try {
      const response = await fishService.create(fishData);
      setFishes(prev => [...prev, response.fish]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateFish = async (id, fishData) => {
    try {
      const response = await fishService.update(id, fishData);
      setFishes(prev => prev.map(fish => 
        fish._id === id ? response.fish : fish
      ));
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteFish = async (id) => {
    try {
      await fishService.delete(id);
      setFishes(prev => prev.filter(fish => fish._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const value = {
    fishes,
    loading,
    error,
    addFish,
    updateFish,
    deleteFish,
    refreshFishes: loadFishes
  };

  return (
    <FishContext.Provider value={value}>
      {children}
    </FishContext.Provider>
  );
};