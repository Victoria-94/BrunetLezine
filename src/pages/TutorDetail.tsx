import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useAppStore } from '../store';
import { ArrowLeft, Edit, Trash2, Phone, Mail, BookOpen } from 'lucide-react';
import TutorFormModal from '../components/modals/TutorFormModal';
import { Modal } from 'antd';

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTutorById, deleteTutor } = useAppStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const tutor = getTutorById(id!);
  
  if (!tutor) {
    return (
      <Layout title="Tutor no encontrado">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Tutor no encontrado</h2>
          <Button 
            icon={<ArrowLeft size={18} />} 
            onClick={() => navigate('/tutores')}
          >
            Volver a la lista
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleDelete = () => {
    Modal.confirm({
      title: '¿Está seguro que desea eliminar este tutor?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        await deleteTutor(id!);
        navigate('/tutores');
      }
    });
  };
  
  return (
    <Layout title={tutor.name}>
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          icon={<ArrowLeft size={18} />} 
          onClick={() => navigate('/tutores')}
        >
          Volver
        </Button>
        
        <div className="ml-auto space-x-2">
          <Button 
            variant="outline" 
            icon={<Edit size={18} />}
            onClick={() => setEditModalOpen(true)}
          >
            Editar
          </Button>
          
          <Button 
            variant="outline" 
            icon={<Trash2 size={18} />}
            className="text-red-500 hover:bg-red-50"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 mb-4 rounded-full bg-secondary-100 flex items-center justify-center">
                <span className="text-3xl text-secondary-600">
                  {tutor.name.charAt(0)}
                </span>
              </div>
              
              <h2 className="text-xl font-bold">{tutor.name}</h2>
              <p className="text-gray-500">{tutor.specialization}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Correo Electrónico</p>
                  <p className="font-medium">{tutor.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{tutor.phone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center mb-4">
              <BookOpen size={20} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-bold">Niveles Asignados</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutor.assignedLevels.map(level => (
                <div 
                  key={level.id}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: level.color }}
                >
                  <h4 className="font-medium mb-1">{level.name}</h4>
                  <p className="text-sm text-gray-500">{level.ageRange}</p>
                  
                  <div className="mt-2">
                    {level.sublevels.map(sublevel => (
                      <div 
                        key={sublevel.id}
                        className="text-sm py-1"
                      >
                        • {sublevel.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      <TutorFormModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialValues={tutor}
        mode="edit"
      />
    </Layout>
  );
};

export default TutorDetail;