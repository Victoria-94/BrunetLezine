import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Search, Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const [searchText, setSearchText] = useState('');
  
  return (
    <header className="bg-white shadow-sm h-16 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <h1 className="text-xl font-bold hidden md:block">{title}</h1>
      </div>
      
      <div className="relative max-w-xl w-full mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="form-input pl-10 pr-4 py-2 w-full"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/initials/svg?seed=AB&backgroundColor=00A67D" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;