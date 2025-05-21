import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useAppStore } from '../store';
import { Plus, Search, Edit } from 'lucide-react';

const LevelsPage: React.FC = () => {
  const { getLevels } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const levels = getLevels();
  
  const filteredLevels = levels.filter(level => 
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    level.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout title="Niveles">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Buscar niveles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          icon={<Plus size={18} />}
          onClick={() => {
            // Open modal or navigate to create page
          }}
        >
          Nuevo Nivel
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLevels.map(level => (
          <Card 
            key={level.id} 
            className="transition-transform hover:scale-102 cursor-pointer"
            color={level.color}
            onClick={() => navigate(`/niveles/${level.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold">{level.name}</h3>
              <Button 
                variant="text" 
                icon={<Edit size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  // Open edit modal
                }}
              />
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{level.ageRange}</p>
            <p className="text-gray-600 mb-4">{level.description}</p>
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subniveles:</h4>
              <div className="space-y-2">
                {level.sublevels.map(sublevel => (
                  <div 
                    key={sublevel.id} 
                    className="bg-gray-100 px-3 py-2 rounded-md text-sm"
                  >
                    {sublevel.name} - {sublevel.description}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default LevelsPage;