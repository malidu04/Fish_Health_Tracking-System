// File: frontend/src/components/layout/Header.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Fish, Bell, User, LogOut, Activity, Settings } from "lucide-react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import { motion } from "framer-motion";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* AquaHealth Custom Icon */}
            <div className="relative">
              <div className="relative p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  {/* Water droplet with fish silhouette */}
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-white">
                    {/* Water droplet shape */}
                    <path
                      d="M14 2C14 2 8 8 8 14C8 17.3 10.7 20 14 20C17.3 20 20 17.3 20 14C20 8 14 2 14 2Z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                    {/* Fish silhouette inside */}
                    <path
                      d="M10 14C10 14 11 12.5 13 12.5C15 12.5 16.5 13.5 17 14C16.5 14.5 15 15.5 13 15.5C11 15.5 10 14 10 14Z"
                      fill="#0ea5e9"
                    />
                    {/* Fish tail */}
                    <path
                      d="M9.5 14L8.5 13L9.5 15L9.5 14Z"
                      fill="#0ea5e9"
                    />
                    {/* Fish eye */}
                    <circle cx="12" cy="13.5" r="0.5" fill="white" />
                    {/* Health cross indicator */}
                    <path
                      d="M18 10L20 10L20 12L18 12L18 14L16 14L16 12L14 12L14 10L16 10L16 8L18 8L18 10Z"
                      fill="#10b981"
                      opacity="0.8"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl opacity-20 animate-pulse"></div>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl opacity-20 blur-sm animate-pulse"></div>
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                AquaHealth
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Professional Aquarium Management
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: "Dashboard", href: "/dashboard", icon: Activity },
              { name: "My Aquariums", href: "/aquariums", icon: Fish },
              { name: "Health Monitor", href: "/health", icon: Activity },
              { name: "Settings", href: "/settings", icon: Settings },
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-medium"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* System Status Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">System Online</span>
            </div>

            {/* Notifications */}
            <Tooltip title="Notifications" arrow>
              <IconButton className="relative bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors">
                <Badge badgeContent={3} color="error" variant="standard">
                  <Bell className="h-5 w-5 text-slate-300" />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {user?.name || "Guest User"}
                  </p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <Tooltip title="Logout" arrow>
              <IconButton
                onClick={logout}
                className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="h-5 w-5 text-red-400" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Navigation Menu Button */}
        <div className="md:hidden mt-3">
          <button className="w-full flex items-center justify-center space-x-2 py-2 text-slate-400 hover:text-white transition-colors">
            <span className="text-sm font-medium">Menu</span>
            <div className="flex flex-col space-y-1">
              <div className="w-4 h-0.5 bg-slate-400 rounded"></div>
              <div className="w-4 h-0.5 bg-slate-400 rounded"></div>
              <div className="w-4 h-0.5 bg-slate-400 rounded"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Subtle water ripple effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
    </header>
  );
};

export default Header;