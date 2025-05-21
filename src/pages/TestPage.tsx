import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/shared/Button';
import { ChevronDown, Check } from 'lucide-react';

const TestPage: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState('5 Años');
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  
  const handleTaskToggle = (taskIndex: number) => {
    if (completedTasks.includes(taskIndex)) {
      setCompletedTasks(completedTasks.filter(t => t !== taskIndex));
    } else {
      setCompletedTasks([...completedTasks, taskIndex]);
    }
  };
  
  const tasks = [
    { id: 1, task: 'Construye Una Escalera' },
    { id: 2, task: 'Copia Una Figura Compleja' },
    { id: 3, task: 'Hace Un Puzzle De 4 Piezas' },
    { id: 4, task: 'Distingue Mañana Y Tarde' },
    { id: 5, task: 'Repite 12 Sílabas' },
    { id: 6, task: 'Cuenta 4 Cubos' }
  ];
  
  return (
    <Layout title="Test">
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="relative w-64 mb-4">
          <button
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded inline-flex items-center justify-between transition-colors"
            onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
          >
            <span>{selectedAge}</span>
            <ChevronDown size={20} className={`transform transition-transform ${isAgeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isAgeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              {['3 Años', '4 Años', '5 Años', '6 Años'].map(age => (
                <button
                  key={age}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedAge(age);
                    setIsAgeDropdownOpen(false);
                  }}
                >
                  {age}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-yellow-400 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Test Brunet Lezine</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Nombre:</span> Nombre Completo
              </div>
              <div className="mb-2">
                <span className="font-semibold">Fecha De Nacimiento:</span> 0000-00-00
              </div>
              <div>
                <span className="font-semibold">Edad Real:</span> 0
              </div>
            </div>
            
            <div>
              <div className="mb-2">
                <span className="font-semibold">Fecha De Evaluacion:</span> 0000-00-00
              </div>
              <div className="mb-2">
                <span className="font-semibold">EdadDesarrollo:</span> 0
              </div>
              <div>
                <span className="font-semibold">Coeficiente Desarrollo:</span> 0
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} className="border-b border-gray-300 last:border-0">
                  <td className="py-3 px-4 w-10">{task.id}</td>
                  <td className="py-3 px-4">{task.task}</td>
                  <td className="py-3 px-4 w-16">
                    <button
                      className={`w-10 h-10 rounded-md ${
                        completedTasks.includes(index) 
                          ? 'bg-yellow-400' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      } flex items-center justify-center transition-colors`}
                      onClick={() => handleTaskToggle(index)}
                    >
                      {completedTasks.includes(index) && <Check className="text-white" size={20} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mb-6">
          <label className="form-label">Observaciones:</label>
          <textarea 
            className="form-input h-24 resize-none" 
            placeholder="Ingrese sus observaciones aquí..."
          ></textarea>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg">Guardar</Button>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;