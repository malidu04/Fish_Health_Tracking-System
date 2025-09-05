import React from "react";
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Fish,
    Heart,
    Activity,
    Bell,
    BarChart3,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/fish', icon: Fish, label: 'My Fish' },
        { path: '/health', icon: Heart, label: 'Health Logs' },
        { path: '/treatments', icon: Activity, label: 'Treatments' },
        { path: '/alerts', icon: Bell, label: 'Alerts' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside>
            <nav>
                <ul>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li>
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-100 text-primary-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;