import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import { useAppStore } from '../store';
import { Search, UserPlus, School } from 'lucide-react';

const TutorsPage: React.FC = () => {
  const { getTutors } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const tutors = getTutors();

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Tutores">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Buscar tutores..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <Button 
          icon={<UserPlus size={18} />}
          onClick={() => navigate('/tutores/nuevo')}
        >
          Nuevo Tutor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map(tutor => (
          <Card 
            key={tutor.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/tutores/${tutor.id}`)}
          >
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                <School className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{tutor.name}</h3>
                <p className="text-sm text-gray-500">{tutor.specialization}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default TutorsPage;
