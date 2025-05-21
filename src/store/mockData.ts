import { Child, Tutor, Level, Evaluation, Sublevel, EvaluationItem } from '../types';

// Mock Levels and Sublevels
export const mockLevels: Level[] = [
  {
    id: 'level-1',
    name: 'Sala Cuna',
    ageRange: '0 - 1 Año',
    description: 'Nivel para bebés de 0 a 1 año',
    color: '#F56B6B',  // Red
    sublevels: [
      {
        id: 'sublevel-1',
        name: 'Sala Cuna Menor',
        description: '0 - 6 meses',
        levelId: 'level-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sublevel-2',
        name: 'Sala Cuna Mayor',
        description: '7 - 12 meses',
        levelId: 'level-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'level-2',
    name: 'Inicial 1',
    ageRange: '1 - 3 Años',
    description: 'Nivel para niños de 1 a 3 años',
    color: '#00A67D',  // Green
    sublevels: [
      {
        id: 'sublevel-3',
        name: 'Subnivel 1 Maternal',
        description: '1 - 2 años',
        levelId: 'level-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sublevel-4',
        name: 'Subnivel 2 Maternal',
        description: '2 - 3 años',
        levelId: 'level-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'level-3',
    name: 'Inicial 2',
    ageRange: '3 - 5 Años',
    description: 'Nivel para niños de 3 a 5 años',
    color: '#F7D32F',  // Yellow
    sublevels: [
      {
        id: 'sublevel-5',
        name: 'Subnivel 1',
        description: '3 - 4 años',
        levelId: 'level-3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sublevel-6',
        name: 'Subnivel 2',
        description: '4 - 5 años',
        levelId: 'level-3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Tutors
export const mockTutors: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'María Rodriguez',
    email: 'maria.rodriguez@example.com',
    phone: '593-987654321',
    specialization: 'Educación Inicial',
    assignedLevels: [mockLevels[0], mockLevels[1]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tutor-2',
    name: 'Carlos Mendez',
    email: 'carlos.mendez@example.com',
    phone: '593-123456789',
    specialization: 'Educación Especial',
    assignedLevels: [mockLevels[1], mockLevels[2]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tutor-3',
    name: 'Laura Suarez',
    email: 'laura.suarez@example.com',
    phone: '593-456789123',
    specialization: 'Psicología Infantil',
    assignedLevels: [mockLevels[0], mockLevels[1], mockLevels[2]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Evaluation Items
const createEvaluationItems = (evaluationId: string): EvaluationItem[] => {
  return [
    {
      id: `item-${Date.now()}-1`,
      evaluationId,
      domain: 'Lenguaje',
      task: 'Repite 3 Sílabas',
      reinforcement: 'Practicar pronunciación diariamente',
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `item-${Date.now()}-2`,
      evaluationId,
      domain: 'Motricidad',
      task: 'Copia un Círculo',
      reinforcement: 'Ejercicios de motricidad fina',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `item-${Date.now()}-3`,
      evaluationId,
      domain: 'Cognición',
      task: 'Identifica 3 Colores',
      reinforcement: 'Juegos de identificación de colores',
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

// Mock Evaluations
export const mockEvaluations: Evaluation[] = [
  {
    id: 'eval-1',
    childId: 'child-1',
    date: new Date(2023, 3, 15).toISOString(),
    levelId: 'level-1',
    sublevelId: 'sublevel-2',
    realAge: 12,
    developmentAge: 14,
    developmentCoefficient: 117,
    items: createEvaluationItems('eval-1'),
    observations: 'Excelente desarrollo del lenguaje. Trabajar en motricidad fina.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'eval-2',
    childId: 'child-2',
    date: new Date(2023, 4, 20).toISOString(),
    levelId: 'level-2',
    sublevelId: 'sublevel-3',
    realAge: 24,
    developmentAge: 26,
    developmentCoefficient: 108,
    items: createEvaluationItems('eval-2'),
    observations: 'Buen progreso general. Reforzar actividades sociales.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'eval-3',
    childId: 'child-3',
    date: new Date(2023, 5, 10).toISOString(),
    levelId: 'level-3',
    sublevelId: 'sublevel-5',
    realAge: 48,
    developmentAge: 45,
    developmentCoefficient: 94,
    items: createEvaluationItems('eval-3'),
    observations: 'Dificultades en concentración. Necesita apoyo en actividades de atención.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Children
export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Ana Gómez',
    birthDate: '2023-06-15',
    guardianName: 'Sofía Gómez',
    guardianPhone: '593-887766554',
    level: mockLevels[0],
    evaluations: [mockEvaluations[0]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'child-2',
    name: 'Marco Peña',
    birthDate: '2022-02-10',
    guardianName: 'Ricardo Peña',
    guardianPhone: '593-998877665',
    level: mockLevels[1],
    evaluations: [mockEvaluations[1]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'child-3',
    name: 'Camila Torres',
    birthDate: '2020-11-05',
    guardianName: 'Elena Torres',
    guardianPhone: '593-778899001',
    level: mockLevels[2],
    evaluations: [mockEvaluations[2]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];