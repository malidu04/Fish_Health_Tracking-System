// File: frontend/src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFish } from '../contexts/FishContext';
import { Fish, Heart, AlertTriangle, BarChart3, Plus, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { fishes } = useFish();
  const navigate = useNavigate();

  const healthyFish = fishes.filter(fish => fish.status === 'healthy').length;
  const sickFish = fishes.filter(fish => fish.status === 'sick').length;
  const recoveringFish = fishes.filter(fish => fish.status === 'recovering').length;

  const stats = [
    {
      title: 'Total Fish',
      value: fishes.length,
      icon: Fish,
      color: 'text-blue-600 bg-blue-100',
      onClick: () => navigate('/fish')
    },
    {
      title: 'Healthy',
      value: healthyFish,
      icon: Heart,
      color: 'text-green-600 bg-green-100',
      onClick: () => navigate('/health')
    },
    {
      title: 'Sick',
      value: sickFish,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
      onClick: () => navigate('/health?filter=sick')
    },
    {
      title: 'Recovering',
      value: recoveringFish,
      icon: BarChart3,
      color: 'text-yellow-600 bg-yellow-100',
      onClick: () => navigate('/health?filter=recovering')
    }
  ];

  const quickActions = [
    {
      title: 'Add New Fish',
      description: 'Register a new fish to your collection',
      icon: Plus,
      color: 'bg-primary-50 hover:bg-primary-100 text-primary-600',
      onClick: () => navigate('/fish?add=new')
    },
    {
      title: 'Log Health Check',
      description: 'Record observations for your fish',
      icon: Activity,
      color: 'bg-green-50 hover:bg-green-100 text-green-600',
      onClick: () => navigate('/health?log=new')
    },
    {
      title: 'View Analytics',
      description: 'See trends and health statistics',
      icon: TrendingUp,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
      onClick: () => navigate('/analytics')
    }
  ];

  const handleFishClick = (fish) => {
    navigate(`/health?fish=${fish._id}`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Here's an overview of your aquarium health.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="card cursor-pointer hover:shadow-lg transition-shadow"
              onClick={stat.onClick}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Alerts */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Health Alerts</h2>
            {sickFish > 0 && (
              <button 
                onClick={() => navigate('/health?filter=sick')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View All
              </button>
            )}
          </div>
          <div className="space-y-3">
            {fishes.filter(f => f.status === 'sick').slice(0, 3).map(fish => (
              <div 
                key={fish._id} 
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => handleFishClick(fish)}
              >
                <div>
                  <p className="font-medium">{fish.name}</p>
                  <p className="text-sm text-red-600">{fish.species} • Needs attention</p>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              </div>
            ))}
            {fishes.filter(f => f.status === 'sick').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <p>No health alerts!</p>
                <p className="text-sm">All fish are healthy and happy</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`w-full text-left p-4 rounded-lg transition-colors flex items-center space-x-3 ${action.color}`}
                >
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      {fishes.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Aquarium</h2>
            <button 
              onClick={() => navigate('/fish')}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Manage Fish
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fishes.slice(0, 3).map(fish => (
              <div 
                key={fish._id}
                className="card cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/fish?edit=${fish._id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    fish.status === 'healthy' ? 'bg-green-100 text-green-600' :
                    fish.status === 'sick' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Fish className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{fish.name}</p>
                    <p className="text-sm text-gray-600">{fish.species}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                      fish.status === 'healthy' ? 'bg-green-100 text-green-800' :
                      fish.status === 'sick' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fish.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;