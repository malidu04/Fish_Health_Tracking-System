// File: frontend/src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { analyticsService } from '../services/analytics';
import Card from '../components/ui/Card';
import { BarChart3, TrendingUp, Fish, Heart, AlertTriangle } from 'lucide-react';

const Analytics = () => {
  const [healthTrends, setHealthTrends] = useState([]);
  const [treatmentStats, setTreatmentStats] = useState({});
  const [symptomStats, setSymptomStats] = useState({});
  const [aquariumSummary, setAquariumSummary] = useState([]);
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      const [trends, treatments, symptoms, summary] = await Promise.all([
        callApi(analyticsService.getHealthTrends),
        callApi(analyticsService.getTreatmentAnalytics),
        callApi(analyticsService.getSymptomAnalytics),
        callApi(analyticsService.getAquariumHealthSummary)
      ]);
      
      setHealthTrends(trends);
      setTreatmentStats(treatments);
      setSymptomStats(symptoms);
      setAquariumSummary(summary);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  };

  const topSymptoms = Object.entries(symptomStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600">Track your aquarium health trends and patterns</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Health Checks</p>
              <p className="text-2xl font-bold">{healthTrends.reduce((sum, day) => sum + day.total, 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Healthy Days</p>
              <p className="text-2xl font-bold">{healthTrends.reduce((sum, day) => sum + day.healthy, 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Sick Days</p>
              <p className="text-2xl font-bold">{healthTrends.reduce((sum, day) => sum + day.sick, 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Fish className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Treatments</p>
              <p className="text-2xl font-bold">{Object.values(treatmentStats).reduce((sum, treatment) => sum + treatment.total, 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Aquarium Health Summary</h2>
          <div className="space-y-4">
            {aquariumSummary.map(aquarium => (
              <div key={aquarium.aquarium} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{aquarium.aquarium}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className={`font-bold ${
                    aquarium.healthPercentage >= 80 ? 'text-green-600' :
                    aquarium.healthPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {aquarium.healthPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      aquarium.healthPercentage >= 80 ? 'bg-green-500' :
                      aquarium.healthPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${aquarium.healthPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>{aquarium.healthyFish} healthy</span>
                  <span>{aquarium.sickFish} sick</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Top Symptoms</h2>
          <div className="space-y-3">
            {topSymptoms.map(([symptom, count]) => (
              <div key={symptom} className="flex justify-between items-center p-2 border rounded">
                <span className="capitalize">{symptom.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                <span className="font-medium">{count} occurrences</span>
              </div>
            ))}
            
            {topSymptoms.length === 0 && (
              <p className="text-gray-500 text-center py-4">No symptom data available</p>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Treatment Effectiveness</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Treatment</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Effective</th>
                  <th className="text-left py-2">Ineffective</th>
                  <th className="text-left py-2">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(treatmentStats).map(([treatment, stats]) => (
                  <tr key={treatment} className="border-b">
                    <td className="py-3">{treatment}</td>
                    <td className="py-3">{stats.total}</td>
                    <td className="py-3 text-green-600">{stats.effective}</td>
                    <td className="py-3 text-red-600">{stats.ineffective}</td>
                    <td className="py-3 font-medium">
                      {stats.total > 0 ? Math.round((stats.effective / stats.total) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {Object.keys(treatmentStats).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No treatment data available</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;