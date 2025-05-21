import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/shared/Button';
import { tutorsService } from '../services/tutors';

const RegisterTutor: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.specialization || !formData.email || !formData.password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await tutorsService.create(formData);
      alert('Tutor registrado con éxito');
      navigate('/tutores');
    } catch (error) {
      console.error('Error al registrar tutor:', error);
      alert('Hubo un error al registrar el tutor.');
    }
  };

  return (
    <Layout title="Registrar Tutor">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
      >
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
          <label className="block text-sm font-medium mb-1">Especialidad</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <Button type="submit">Agregar Tutor</Button>
      </form>
    </Layout>
  );
};

export default RegisterTutor;
