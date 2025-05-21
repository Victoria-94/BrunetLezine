import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useAppStore } from '../store';
import { 
  ArrowLeft, Edit, Trash2, Clock, Calendar, Phone, 
  User, BarChart, PlusCircle 
} from 'lucide-react';

const ChildDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getChildById, getEvaluationsByChild, deleteChild } = useAppStore();
  
  const child = getChildById(id!);
  const evaluations = getEvaluationsByChild(id!);
  
  if (!child) {
    return (
      <Layout title="Niño no encontrado">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Niño no encontrado</h2>
          <Button 
            icon={<ArrowLeft size={18} />} 
            onClick={() => navigate('/ninos')}
          >
            Volver a la lista
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Calculate age in years
  const birthDate = new Date(child.birthDate);
  const today = new Date();
  const ageInYears = Math.floor((today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  
  // Format the birth date
  const formattedBirthDate = new Date(child.birthDate).toLocaleDateString('es-ES');
  
  return (
    <Layout title={child.name}>
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          icon={<ArrowLeft size={18} />} 
          onClick={() => navigate('/ninos')}
        >
          Volver
        </Button>
        
        <div className="ml-auto space-x-2">
          <Button 
            variant="outline" 
            icon={<Edit size={18} />}
            onClick={() => {
              // Open edit modal
            }}
          >
            Editar
          </Button>
          
          <Button 
            variant="outline" 
            icon={<Trash2 size={18} />}
            className="text-red-500 hover:bg-red-50"
            onClick={() => {
              // Show confirmation dialog
              if (window.confirm('¿Está seguro que desea eliminar este niño?')) {
                deleteChild(id!);
                navigate('/ninos');
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-3xl text-gray-500">
                  {child.name.charAt(0)}
                </span>
              </div>
              
              <h2 className="text-xl font-bold">{child.name}</h2>
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium mt-2"
                style={{ 
                  backgroundColor: `${child.level.color}33`,
                  color: child.level.color
                }}
              >
                {child.level.name}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                  <p className="font-medium">{formattedBirthDate}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Edad</p>
                  <p className="font-medium">{ageInYears} años</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Representante</p>
                  <p className="font-medium">{child.guardianName}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{child.guardianPhone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <BarChart size={20} className="mr-2 text-gray-400" />
                Evaluaciones
              </h3>
              
              <Button 
                icon={<PlusCircle size={18} />}
                onClick={() => navigate(`/evaluaciones/nueva/${child.id}`)}
              >
                Nueva Evaluación
              </Button>
            </div>
            
            {evaluations.length > 0 ? (
              <div className="space-y-4">
                {evaluations.map(evaluation => {
                  const level = child.level;
                  const sublevel = level.sublevels.find(s => s.id === evaluation.sublevelId);
                  
                  return (
                    <div 
                      key={evaluation.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/evaluaciones/${evaluation.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{level.name} - {sublevel?.name || 'Subnivel'}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(evaluation.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        
                        <div 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: evaluation.developmentCoefficient >= 100 ? '#D1FAE5' : '#FEE2E2',
                            color: evaluation.developmentCoefficient >= 100 ? '#065F46' : '#991B1B'
                          }}
                        >
                          CD: {evaluation.developmentCoefficient}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{Math.round((evaluation.items.filter(i => i.completed).length / evaluation.items.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              width: `${(evaluation.items.filter(i => i.completed).length / evaluation.items.length) * 100}%`,
                              backgroundColor: level.color
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg border-dashed">
                <p className="text-gray-500 mb-4">No hay evaluaciones registradas</p>
                <Button 
                  icon={<PlusCircle size={18} />}
                  onClick={() => navigate(`/evaluaciones/nueva/${child.id}`)}
                >
                  Primera Evaluación
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChildDetail;