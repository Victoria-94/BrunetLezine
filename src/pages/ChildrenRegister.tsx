import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/shared/Button';
import { childrenService } from '../services/children';

const RegisterChild: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    birthDate: '',
    registerDate: '',
    gender: '',
    cedula: '',
  });

  const calculateAge = (birthDate: string): number | '' => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 0 ? age : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await childrenService.create(formData);
      alert('Niño registrado con éxito');
      navigate('/ninos');
    } catch (error) {
      console.error('Error al registrar niño:', error);
      alert('Ocurrió un error al registrar el niño.');
    }
  };

  const age = calculateAge(formData.birthDate);

  return (
    <Layout title="Registrar Niño">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Edad</label>
          <input
            type="text"
            value={age !== '' ? `${age} años` : ''}
            readOnly
            className="form-input w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha de registro</label>
          <input
            type="date"
            name="registerDate"
            value={formData.registerDate}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select w-full"
          >
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cédula</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <Button type="submit">Registrar Niño</Button>
      </form>
    </Layout>
  );
};

export default RegisterChild;
