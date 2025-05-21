export interface Child {
  id: string;
  name: string;
  birthDate: string;
  guardianName: string;
  guardianPhone: string;
  level: Level;
  evaluations: Evaluation[];
  createdAt: string;
  updatedAt: string;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  specialization: string;

  createdAt: string;
  updatedAt: string;
}

export interface Level {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  color: string;
  sublevels: Sublevel[];
  createdAt: string;
  updatedAt: string;
}

export interface Sublevel {
  id: string;
  name: string;
  description: string;
  levelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evaluation {
  id: string;
  childId: string;
  date: string;
  levelId: string;
  sublevelId: string;
  realAge: number;
  developmentAge: number;
  developmentCoefficient: number;
  items: EvaluationItem[];
  observations: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationItem {
  id: string;
  evaluationId: string;
  domain: string;
  task: string;
  reinforcement: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tutor' | 'guardian';
}