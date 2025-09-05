import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { treatmentService } from '../services/treatment';
import TreatmentLog from '../components/health/TreatmentLog';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Plus, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      const data = await treatmentService.getAll();
      setTreatments(data.treatments || []);
    } catch (err) {
      console.error('Failed to load treatments:', err);
    }
  };

  const handleCreateTreatment = async (treatmentData, fishId) => {
    try {
      const data = {
        ...treatmentData,
        fish: [fishId],
        startDate: treatmentData.startDate || new Date().toISOString()
      };

      await callApi(treatmentService.create, data);
      setShowTreatmentForm(false);
      setSelectedFish(null);
      loadTreatments();
    } catch (err) {
      console.error('Failed to create treatment:', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-800 bg-green-100';
      case 'cancelled':
        return 'text-red-800 bg-red-100';
      case 'in-progress':
        return 'text-yellow-800 bg-yellow-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Treatments</h1>
          <p className="text-gray-600">Manage fish treatments and medications</p>
        </div>
        <Button onClick={() => setShowTreatmentForm(true)}>
          <Plus className="h-5 w-5 mr-2" />
          New Treatment
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showTreatmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Treatment</h2>
              <button onClick={() => {
                setShowTreatmentForm(false);
                setSelectedFish(null);
              }}>✕</button>
            </div>
            <TreatmentLog onSubmit={handleCreateTreatment} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Active Treatments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Treatment</th>
                    <th className="text-left py-2">Fish</th>
                    <th className="text-left py-2">Start Date</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.filter(t => t.status !== 'completed' && t.status !== 'cancelled').map(treatment => (
                    <tr key={treatment._id} className="border-b">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{treatment.name}</p>
                          <p className="text-sm text-gray-600">{treatment.type}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        {treatment.fish?.map(f => f.name).join(', ') || 'Unknown'}
                      </td>
                      <td className="py-3">
                        {new Date(treatment.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                          {treatment.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {treatments.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No active treatments</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="font-semibold mb-4">Treatment History</h3>
          <div className="space-y-3">
            {treatments.filter(t => t.status === 'completed' || t.status === 'cancelled').slice(0, 5).map(treatment => (
              <div key={treatment._id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{treatment.name}</span>
                  {getStatusIcon(treatment.status)}
                </div>
                <p className="text-sm text-gray-600 mb-1">{treatment.fish?.map(f => f.name).join(', ')}</p>
                <p className="text-xs text-gray-500">
                  {new Date(treatment.startDate).toLocaleDateString()} - 
                  {treatment.endDate ? new Date(treatment.endDate).toLocaleDateString() : 'Present'}
                </p>
              </div>
            ))}
            
            {treatments.filter(t => t.status === 'completed' || t.status === 'cancelled').length === 0 && (
              <p className="text-gray-500 text-center py-4">No treatment history</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Treatment Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Treatments</span>
              <span className="font-medium">{treatments.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Active</span>
              <span className="font-medium text-yellow-600">
                {treatments.filter(t => t.status === 'in-progress').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span className="font-medium text-green-600">
                {treatments.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-medium">
                {treatments.length > 0 ? 
                  Math.round((treatments.filter(t => t.results === 'effective').length / treatments.length) * 100) : 0
                }%
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Treatments;