import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/shared/Card';
import { useAppStore } from '../store';
import { Users, School, BarChart, BookOpen } from 'lucide-react';
import Button from '../components/shared/Button';

const Dashboard: React.FC = () => {
  const { children, tutors, levels, evaluations, user } = useAppStore();
  const navigate = useNavigate();
  
  // Redirect based on role
  useEffect(() => {
    if (user?.role === 'admin') {
      // Admin stays on dashboard
    } else if (user?.role === 'tutor') {
      navigate('/test');
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  return (
    <Layout title="Panel de Control">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary-400 to-primary-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users size={28} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Niños</h3>
              <p className="text-2xl font-bold">{children.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary-400 to-secondary-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <School size={28} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Evaluador</h3>
              <p className="text-2xl font-bold">{tutors.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent-400 to-accent-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <BookOpen size={28} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Niveles</h3>
              <p className="text-2xl font-bold">{levels.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <BarChart size={28} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Evaluaciones</h3>
              <p className="text-2xl font-bold">{evaluations.length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Niños Recientes</h2>
            <Button 
              variant="text" 
              onClick={() => navigate('/ninos')}
            >
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-4">
            {children.slice(0, 3).map(child => (
              <div 
                key={child.id} 
                className="p-3 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/ninos/${child.id}`)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">
                      {child.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-gray-500">{child.level.name}</p>
                  </div>
                </div>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: child.level.color }}
                ></div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Evaluaciones Recientes</h2>
            <Button 
              variant="text" 
              onClick={() => navigate('/evaluaciones')}
            >
              Ver todas
            </Button>
          </div>
          
          <div className="space-y-4">
            {evaluations.slice(0, 3).map(evaluation => {
              const child = children.find(c => c.id === evaluation.childId);
              return (
                <div 
                  key={evaluation.id} 
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/evaluaciones/${evaluation.id}`)}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{child?.name || 'Niño'}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(evaluation.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Coef. Desarrollo: <strong>{evaluation.developmentCoefficient}</strong>
                    </span>
                    <div 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: evaluation.developmentCoefficient >= 100 ? '#D1FAE5' : '#FEE2E2',
                        color: evaluation.developmentCoefficient >= 100 ? '#065F46' : '#991B1B'
                      }}
                    >
                      {evaluation.developmentCoefficient >= 100 ? 'Óptimo' : 'Necesita refuerzo'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;