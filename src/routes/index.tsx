import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '../store';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ChildrenPage from '../pages/ChildrenPage';
import ChildDetail from '../pages/ChildDetail';
import TutorsPage from '../pages/TutorsPage';
import TutorDetail from '../pages/TutorDetail';
import LevelsPage from '../pages/LevelsPage';
//import LevelDetail from '../pages/LevelDetail';
//import EvaluationsPage from '../pages/EvaluationsPage';
import EvaluationDetail from '../pages/EvaluationDetail';
//import EvaluationForm from '../pages/EvaluationForm';
import TestPage from '../pages/TestPage';
//import ProgressPage from '../pages/ProgressPage';
//import ContentPage from '../pages/ContentPage';
import RegisterTutor from '../pages/RegisterTutor';

// Protected route HOC
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Role-specific route
const RoleRoute: React.FC<{ 
  children: React.ReactNode, 
  allowedRoles: string[] 
}> = ({ children, allowedRoles }) => {
  const { user } = useAppStore();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/ninos" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <ChildrenPage />
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      
      <Route path="/ninos/:id" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <ChildDetail />
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/tutores" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <TutorsPage />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/tutores/nuevo" element={
  <ProtectedRoute>
    <RoleRoute allowedRoles={['admin']}>
      <RegisterTutor />
    </RoleRoute>
  </ProtectedRoute>
} />

      
      <Route path="/tutores/:id" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <TutorDetail />
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/niveles" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <LevelsPage />
          </RoleRoute>
        </ProtectedRoute>
      } />
    
      <Route path="/evaluaciones/:id" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['admin']}>
            <EvaluationDetail />
          </RoleRoute>
        </ProtectedRoute>
      } />
      
   
      
      {/* Tutor Routes */}
      <Route path="/test" element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['tutor']}>
            <TestPage />
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;