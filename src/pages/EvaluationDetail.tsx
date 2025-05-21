import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useAppStore } from '../store';
import { 
  ArrowLeft, Edit, Trash2, Calendar, User, 
  BarChart3, BookOpen 
} from 'lucide-react';

const EvaluationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvaluationById, getChildById, getLevelById, deleteEvaluation } = useAppStore();
  
  const evaluation = getEvaluationById(id!);
  
  if (!evaluation) {
    return (
      <Layout title="Evaluación no encontrada">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Evaluación no encontrada</h2>
          <Button 
            icon={<ArrowLeft size={18} />} 
            onClick={() => navigate('/evaluaciones')}
          >
            Volver a la lista
          </Button>
        </div>
      </Layout>
    );
  }
  
  const child = getChildById(evaluation.childId);
  const level = getLevelById(evaluation.levelId);
  const sublevel = level?.sublevels.find(s => s.id === evaluation.sublevelId);
  
  if (!child || !level || !sublevel) {
    return (
      <Layout title="Error al cargar datos">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Error al cargar datos</h2>
          <Button 
            icon={<ArrowLeft size={18} />} 
            onClick={() => navigate('/evaluaciones')}
          >
            Volver a la lista
          </Button>
        </div>
      </Layout>
    );
  }
  
  const formattedDate = new Date(evaluation.date).toLocaleDateString('es-ES');
  
  return (
    <Layout title="Detalle de Evaluación">
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          icon={<ArrowLeft size={18} />} 
          onClick={() => navigate(`/ninos/${child.id}`)}
        >
          Volver al Niño
        </Button>
        
        <div className="ml-auto space-x-2">
          <Button 
            variant="outline" 
            icon={<Edit size={18} />}
            onClick={() => {
              // Navigate to edit page or open modal
            }}
          >
            Editar
          </Button>
          
          <Button 
            variant="outline" 
            icon={<Trash2 size={18} />}
            className="text-red-500 hover:bg-red-50"
            onClick={() => {
              if (window.confirm('¿Está seguro que desea eliminar esta evaluación?')) {
                deleteEvaluation(id!);
                navigate(`/ninos/${child.id}`);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
      
      <Card className="mb-6" color={level.color}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">{level.name} - {sublevel.name}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <User size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Niño</p>
                  <p className="font-medium">{child.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Evaluación</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Edad Real</p>
                <p className="text-xl font-bold">{evaluation.realAge} meses</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Edad Desarrollo</p>
                <p className="text-xl font-bold">{evaluation.developmentAge} meses</p>
              </div>
              
              <div 
                className="p-3 rounded-lg text-white"
                style={{ backgroundColor: level.color }}
              >
                <p className="text-sm opacity-80">Coeficiente</p>
                <p className="text-xl font-bold">{evaluation.developmentCoefficient}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <BarChart3 size={18} className="text-gray-400 mr-3" />
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso</span>
                  <span>{Math.round((evaluation.items.filter(i => i.completed).length / evaluation.items.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${(evaluation.items.filter(i => i.completed).length / evaluation.items.length) * 100}%`,
                      backgroundColor: level.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center mb-4">
            <BookOpen size={18} className="text-gray-400 mr-2" />
            <h3 className="text-lg font-bold">Áreas de Dominio</h3>
          </div>
          
          <div className="space-y-3">
            {evaluation.items.map((item, index) => (
              <div 
                key={item.id} 
                className="p-3 border rounded-lg flex items-center"
              >
                <div className="mr-3 flex-shrink-0">
                  <div 
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      item.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? '' : 'text-gray-500'}`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-gray-500">{item.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <div className="flex items-center mb-4">
              <BookOpen size={18} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-bold">Refuerzos Recomendados</h3>
            </div>
            
            <div className="space-y-3">
              {evaluation.items
                .filter(item => !item.completed)
                .map((item) => (
                  <div 
                    key={`reinforcement-${item.id}`} 
                    className="p-3 border rounded-lg"
                  >
                    <p className="font-medium mb-1">{item.task}</p>
                    <p className="text-sm text-gray-600">{item.reinforcement}</p>
                  </div>
                ))}
              
              {evaluation.items.filter(item => !item.completed).length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No hay refuerzos pendientes
                </p>
              )}
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center mb-4">
              <BookOpen size={18} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-bold">Observaciones</h3>
            </div>
            
            <p className="text-gray-700">
              {evaluation.observations || 'No hay observaciones registradas.'}
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EvaluationDetail;