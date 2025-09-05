import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { alertService } from '../services/alert';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Bell, CheckCircle, XCircle, Filter, Calendar, Fish } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const data = await alertService.getAll();
      setAlerts(data.alerts || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error('Failed to load alerts:', err);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      await callApi(alertService.markAsRead, alertId);
      loadAlerts();
    } catch (err) {
      console.error('Failed to mark alert as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await callApi(alertService.markAllAsRead);
      loadAlerts();
    } catch (err) {
      console.error('Failed to mark all alerts as read:', err);
    }
  };

  const deleteAlert = async (alertId) => {
    try {
      await callApi(alertService.delete, alertId);
      loadAlerts();
    } catch (err) {
      console.error('Failed to delete alert:', err);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.isRead;
    return alert.type === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-400 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'health':
        return <Fish className="h-4 w-4" />;
      case 'maintenance':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="health">Health</option>
              <option value="maintenance">Maintenance</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <div
              key={alert._id}
              className={`border rounded-lg p-4 ${!alert.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getPriorityColor(alert.priority)}`}>
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{alert.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.triggerDate).toLocaleDateString()} • 
                      {alert.relatedFish?.map(f => f.name).join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert._id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Mark as read"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteAlert(alert._id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <XCircle className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              {alert.actionRequired && (
                <div className="mt-3 pt-3 border-t">
                  <Button size="sm">Take Action</Button>
                </div>
              )}
            </div>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Alerts;