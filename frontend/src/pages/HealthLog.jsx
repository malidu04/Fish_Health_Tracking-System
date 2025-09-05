import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { healthService } from '../services/health';
import { fishService } from '../services/fish';
import SymptomTracker from '../components/health/SymptomTracker';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Plus, Calendar, Fish, AlertTriangle } from 'lucide-react';

const HealthLog = () => {
  const [healthLogs, setHealthLogs] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    loadFishes();
    loadHealthLogs();
  }, []);

  const loadFishes = async () => {
    try {
      const data = await fishService.getAll();
      setFishes(data);
    } catch (err) {
      console.error('Failed to load fishes:', err);
    }
  };

  const loadHealthLogs = async () => {
    try {
      const data = await healthService.getAll();
      setHealthLogs(data.healthLogs || []);
    } catch (err) {
      console.error('Failed to load health logs:', err);
    }
  };

  const handleSymptomAnalysis = async (symptoms) => {
    if (!selectedFish) return;

    try {
      const healthData = {
        fish: selectedFish._id,
        symptoms,
        observationDate: new Date().toISOString()
      };

      await callApi(healthService.create, healthData);
      setShowSymptomTracker(false);
      setSelectedFish(null);
      loadHealthLogs();
    } catch (err) {
      console.error('Failed to create health log:', err);
    }
  };

  const getSymptomCount = (log) => {
    return Object.values(log.symptoms || {}).filter(val => val).length;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Logs</h1>
          <p className="text-gray-600">Track and monitor your fish health</p>
        </div>
        <Button onClick={() => setShowSymptomTracker(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Log Health Check
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showSymptomTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Log Health Check</h2>
              <button onClick={() => setShowSymptomTracker(false)}>✕</button>
            </div>
            
            {!selectedFish ? (
              <div>
                <h3 className="text-lg font-medium mb-4">Select a Fish</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishes.map(fish => (
                    <div
                      key={fish._id}
                      onClick={() => setSelectedFish(fish)}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <Fish className="h-6 w-6 text-primary-600" />
                        <div>
                          <p className="font-medium">{fish.name}</p>
                          <p className="text-sm text-gray-600">{fish.species}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Health Check for {selectedFish.name}</h3>
                  <button onClick={() => setSelectedFish(null)} className="text-primary-600">
                    Change Fish
                  </button>
                </div>
                <SymptomTracker onSubmit={handleSymptomAnalysis} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Recent Health Logs</h2>
            <div className="space-y-4">
              {healthLogs.slice(0, 5).map(log => (
                <div key={log._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{log.fish?.name}</p>
                      <p className="text-sm text-gray-600">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {new Date(log.observationDate).toLocaleDateString()}
                      </p>
                    </div>
                    {getSymptomCount(log) > 0 && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {getSymptomCount(log)} symptoms
                      </span>
                    )}
                  </div>
                  
                  {log.aiPrediction && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium text-yellow-800">
                            AI Prediction: {log.aiPrediction.disease}
                          </p>
                          <p className="text-sm text-yellow-700">
                            Confidence: {Math.round(log.aiPrediction.confidence * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {log.notes && (
                    <p className="text-sm text-gray-600 mb-2">{log.notes}</p>
                  )}
                </div>
              ))}
              
              {healthLogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No health logs yet</p>
                  <p className="text-sm">Start by logging a health check</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-3">Health Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Logs</span>
                <span className="font-medium">{healthLogs.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Fish with Symptoms</span>
                <span className="font-medium text-red-600">
                  {healthLogs.filter(log => getSymptomCount(log) > 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>AI Predictions</span>
                <span className="font-medium text-yellow-600">
                  {healthLogs.filter(log => log.aiPrediction).length}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setShowSymptomTracker(true)}>
                Log General Health Check
              </Button>
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthLog;