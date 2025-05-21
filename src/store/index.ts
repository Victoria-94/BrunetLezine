import { create } from 'zustand';
import { Child, Tutor, Level, Evaluation, User, Sublevel } from '../types';
import { mockChildren, mockTutors, mockLevels, mockEvaluations } from './mockData';

interface AppState {
  // Data
  children: Child[];
  tutors: Tutor[];
  levels: Level[];
  evaluations: Evaluation[];
  
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // UI
  sidebarOpen: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleSidebar: () => void;
  
  // CRUD Operations - Children
  getChildren: () => Child[];
  getChildById: (id: string) => Child | undefined;
  addChild: (child: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>) => Child;
  updateChild: (id: string, data: Partial<Child>) => Child | null;
  deleteChild: (id: string) => boolean;
  
  // CRUD Operations - Tutors
  getTutors: () => Tutor[];
  getTutorById: (id: string) => Tutor | undefined;
  addTutor: (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => Tutor;
  updateTutor: (id: string, data: Partial<Tutor>) => Tutor | null;
  deleteTutor: (id: string) => boolean;
  
  // CRUD Operations - Levels
  getLevels: () => Level[];
  getLevelById: (id: string) => Level | undefined;
  addLevel: (level: Omit<Level, 'id' | 'createdAt' | 'updatedAt'>) => Level;
  updateLevel: (id: string, data: Partial<Level>) => Level | null;
  deleteLevel: (id: string) => boolean;
  
  // CRUD Operations - Evaluations
  getEvaluations: () => Evaluation[];
  getEvaluationById: (id: string) => Evaluation | undefined;
  getEvaluationsByChild: (childId: string) => Evaluation[];
  addEvaluation: (evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>) => Evaluation;
  updateEvaluation: (id: string, data: Partial<Evaluation>) => Evaluation | null;
  deleteEvaluation: (id: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Data
  children: mockChildren,
  tutors: mockTutors,
  levels: mockLevels,
  evaluations: mockEvaluations,
  
  // Auth
  user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  isAuthenticated: true,
  
  // UI
  sidebarOpen: true,
  
  // Actions
  login: async (email, password) => {
    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      set({ 
        isAuthenticated: true,
        user: { id: '1', name: 'Admin User', email, role: 'admin' }
      });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  
  // CRUD Operations - Children
  getChildren: () => get().children,
  
  getChildById: (id) => get().children.find(child => child.id === id),
  
  addChild: (childData) => {
    const newChild = {
      ...childData,
      id: `child-${Date.now()}`,
      evaluations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      children: [...state.children, newChild]
    }));
    
    return newChild;
  },
  
  updateChild: (id, data) => {
    const child = get().getChildById(id);
    if (!child) return null;
    
    const updatedChild = {
      ...child,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      children: state.children.map(c => c.id === id ? updatedChild : c)
    }));
    
    return updatedChild;
  },
  
  deleteChild: (id) => {
    const childExists = get().children.some(child => child.id === id);
    
    if (childExists) {
      set(state => ({
        children: state.children.filter(child => child.id !== id)
      }));
      return true;
    }
    
    return false;
  },
  
  // CRUD Operations - Tutors
  getTutors: () => get().tutors,
  
  getTutorById: (id) => get().tutors.find(tutor => tutor.id === id),
  
  addTutor: (tutorData) => {
    const newTutor = {
      ...tutorData,
      id: `tutor-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      tutors: [...state.tutors, newTutor]
    }));
    
    return newTutor;
  },
  
  updateTutor: (id, data) => {
    const tutor = get().getTutorById(id);
    if (!tutor) return null;
    
    const updatedTutor = {
      ...tutor,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      tutors: state.tutors.map(t => t.id === id ? updatedTutor : t)
    }));
    
    return updatedTutor;
  },
  
  deleteTutor: (id) => {
    const tutorExists = get().tutors.some(tutor => tutor.id === id);
    
    if (tutorExists) {
      set(state => ({
        tutors: state.tutors.filter(tutor => tutor.id !== id)
      }));
      return true;
    }
    
    return false;
  },
  
  // CRUD Operations - Levels
  getLevels: () => get().levels,
  
  getLevelById: (id) => get().levels.find(level => level.id === id),
  
  addLevel: (levelData) => {
    const newLevel = {
      ...levelData,
      id: `level-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      levels: [...state.levels, newLevel]
    }));
    
    return newLevel;
  },
  
  updateLevel: (id, data) => {
    const level = get().getLevelById(id);
    if (!level) return null;
    
    const updatedLevel = {
      ...level,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      levels: state.levels.map(l => l.id === id ? updatedLevel : l)
    }));
    
    return updatedLevel;
  },
  
  deleteLevel: (id) => {
    const levelExists = get().levels.some(level => level.id === id);
    
    if (levelExists) {
      set(state => ({
        levels: state.levels.filter(level => level.id !== id)
      }));
      return true;
    }
    
    return false;
  },
  
  // CRUD Operations - Evaluations
  getEvaluations: () => get().evaluations,
  
  getEvaluationById: (id) => get().evaluations.find(evaluation => evaluation.id === id),
  
  getEvaluationsByChild: (childId) => get().evaluations.filter(evaluation => evaluation.childId === childId),
  
  addEvaluation: (evaluationData) => {
    const newEvaluation = {
      ...evaluationData,
      id: `eval-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      evaluations: [...state.evaluations, newEvaluation]
    }));
    
    return newEvaluation;
  },
  
  updateEvaluation: (id, data) => {
    const evaluation = get().getEvaluationById(id);
    if (!evaluation) return null;
    
    const updatedEvaluation = {
      ...evaluation,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      evaluations: state.evaluations.map(e => e.id === id ? updatedEvaluation : e)
    }));
    
    return updatedEvaluation;
  },
  
  deleteEvaluation: (id) => {
    const evaluationExists = get().evaluations.some(evaluation => evaluation.id === id);
    
    if (evaluationExists) {
      set(state => ({
        evaluations: state.evaluations.filter(evaluation => evaluation.id !== id)
      }));
      return true;
    }
    
    return false;
  }
}));