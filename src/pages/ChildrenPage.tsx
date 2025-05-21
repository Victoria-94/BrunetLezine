import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/shared/Button';
import { useAppStore } from '../store';
import { Plus, Search, UserPlus } from 'lucide-react';

const ChildrenPage: React.FC = () => {
  const { getChildren } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Niños');
  const navigate = useNavigate();
  
  const children = getChildren();
  
  const filteredChildren = children.filter(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    child.guardianName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout title="Niños">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Buscar niños..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          icon={<UserPlus size={18} />}
          onClick={() => {
            // Open registration modal or navigate to create page
          }}
        >
          Nuevo Niño
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="bg-gray-200 rounded-lg p-1 flex mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'Niños' 
              ? 'bg-white shadow-sm' 
              : 'hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('Niños')}
        >
          Niños
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'Registro' 
              ? 'bg-accent-500 text-white shadow-sm' 
              : 'hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('Registro')}
        >
          Registro
        </button>
      </div>
      
      {activeTab === 'Niños' ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N°
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredChildren.map(child => (
                <tr 
                  key={child.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/ninos/${child.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                          {child.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{child.name}</div>
                        <div className="text-sm text-gray-500">{child.level.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(child.evaluations.length * 20, 100)}%`,
                          backgroundColor: child.level.color 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    21002
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Button
              size="lg"
              className="mb-4 rounded-full w-16 h-16 flex items-center justify-center p-0"
              icon={<Plus size={24} />}
              iconPosition="left"
              onClick={() => {
                // Open registration form
              }}
            />
            <p className="text-gray-500">Agregar nuevo niño</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChildrenPage;