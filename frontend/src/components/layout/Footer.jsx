// File: frontend/src/components/layout/Footer.jsx
import React from 'react';
import { Fish, Mail, Phone, MapPin, Shield, FileText, Users, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                <Fish className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AquaHealth Pro</h3>
                <p className="text-sm text-slate-400">Aquarium Management System</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional aquarium monitoring and health management solutions for commercial and research facilities.
            </p>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'System Status', href: '/status' },
                { name: 'Data Analytics', href: '/analytics' },
                { name: 'Equipment Management', href: '/equipment' },
                { name: 'Reports', href: '/reports' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Support & Resources */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Support</h4>
            <nav className="space-y-3">
              {[
                { name: 'Documentation', href: '/docs', icon: FileText },
                { name: 'Technical Support', href: '/support', icon: Users },
                { name: 'System Updates', href: '/updates', icon: ExternalLink },
                { name: 'Security', href: '/security', icon: Shield }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@aquahealthpro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-400">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-sm">
                  Marine Technology Center<br />
                  123 Ocean Drive<br />
                  Aquatic City, AC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <span className="text-slate-400 text-sm">
                © 2024 AquaHealth Pro. All rights reserved.
              </span>
              <div className="flex items-center space-x-4">
                <a href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="/compliance" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Compliance
                </a>
              </div>
            </div>

            {/* Version & Certification */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-slate-400 font-mono">v2.1.4</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <Shield className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;