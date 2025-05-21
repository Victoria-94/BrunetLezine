import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store';
import { 
  Users, Globe, School, BarChart, HelpCircle, Settings, LogOut,
  User, BookOpen
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar, user, logout } = useAppStore();
  
  return (
    <div 
      className={`h-screen fixed left-0 top-0 z-20 transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col justify-between`}
      style={{ 
        backgroundColor: user?.role === 'admin' ? '#F7D32F' : '#00A67D'
      }}
    >
      {/* Top section with logo */}
      <div className="p-4 flex justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <User className="w-12 h-12" style={{ 
            color: user?.role === 'admin' ? '#F7D32F' : '#00A67D' 
          }} />
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4">
        {user?.role === 'admin' && (
          <>
            <NavLink 
              to="/niveles" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <Globe size={22} />
              {sidebarOpen && <span>Nivel</span>}
            </NavLink>
            
            <NavLink 
              to="/ninos" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <Users size={22} />
              {sidebarOpen && <span>Niños</span>}
            </NavLink>
            
            <NavLink 
              to="/tutores" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <School size={22} />
              {sidebarOpen && <span>Evaluadores</span>}
            </NavLink>

            <NavLink 
              to="/evaluaciones" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <BarChart size={22} />
              {sidebarOpen && <span>Evaluaciones</span>}
            </NavLink>
          </>
        )}
        
        {user?.role === 'tutor' && (
          <>
            <NavLink 
              to="/test" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <Users size={22} />
              {sidebarOpen && <span>Test</span>}
            </NavLink>
            
            <NavLink 
              to="/progreso" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <BarChart size={22} />
              {sidebarOpen && <span>Progreso</span>}
            </NavLink>

            <NavLink 
              to="/contenido" 
              className={({ isActive }) => 
                `sidebar-link mb-2 ${isActive ? 'active' : ''}`
              }
            >
              <BookOpen size={22} />
              {sidebarOpen && <span>Contenido</span>}
            </NavLink>
          </>
        )}
      </nav>
      
      {/* Bottom Links */}
      <div className="px-3 py-4 border-t border-white/20">
        <button className="sidebar-link mb-2 w-full text-left">
          <HelpCircle size={22} />
          {sidebarOpen && <span>Ayuda</span>}
        </button>
        
        <button className="sidebar-link mb-2 w-full text-left">
          <Settings size={22} />
          {sidebarOpen && <span>Configuraciones</span>}
        </button>
        
        <button 
          className="sidebar-link w-full text-left"
          onClick={logout}
        >
          <LogOut size={22} />
          {sidebarOpen && <span>Salir</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;