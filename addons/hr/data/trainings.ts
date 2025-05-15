
import { TrainingCourse, TrainingSession, TrainingEnrollment, TrainingCategory, TrainerProfile } from '../types';

// Catégories de formations
export const trainingCategories: TrainingCategory[] = [
  { 
    id: 'tech', 
    name: 'Technologies', 
    description: 'Formations sur les technologies, logiciels et outils techniques',
    color: '#3498db'
  },
  { 
    id: 'management', 
    name: 'Management', 
    description: 'Formations en management, leadership et gestion d\'équipe',
    color: '#2ecc71'
  },
  { 
    id: 'soft_skills', 
    name: 'Compétences comportementales', 
    description: 'Développement des compétences interpersonnelles',
    color: '#9b59b6'
  },
  { 
    id: 'compliance', 
    name: 'Conformité', 
    description: 'Formations obligatoires et mises en conformité réglementaire',
    color: '#e74c3c'
  },
  { 
    id: 'languages', 
    name: 'Langues', 
    description: 'Apprentissage et perfectionnement en langues étrangères',
    color: '#f39c12'
  }
];

// Formateurs
export const trainers: TrainerProfile[] = [
  {
    id: 'tr001',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    specialization: ['management', 'soft_skills'],
    bio: 'Coach certifiée avec 10 ans d\'expérience en développement du leadership',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8,
    external: false
  },
  {
    id: 'tr002',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    specialization: ['tech', 'compliance'],
    bio: 'Expert en cybersécurité et conformité RGPD',
    imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 4.6,
    external: true
  },
  {
    id: 'tr003',
    name: 'Clara Lefèvre',
    email: 'clara.lefevre@example.com',
    specialization: ['languages', 'soft_skills'],
    bio: 'Professeure d\'anglais des affaires avec expérience internationale',
    imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 4.9,
    external: true
  },
  {
    id: 'tr004',
    name: 'Marc Bonnet',
    email: 'marc.bonnet@example.com',
    specialization: ['management', 'compliance'],
    bio: 'Ancien DRH spécialisé en gestion du changement',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    rating: 4.5,
    external: false
  }
];

// Cours de formation
export const trainingCourses: TrainingCourse[] = [
  {
    id: 'tc001',
    title: 'Leadership et Management d\'équipe',
    description: 'Apprenez à diriger efficacement une équipe et à développer votre leadership',
    category_id: 'management',
    duration: 16,
    level: 'intermédiaire',
    objectives: [
      'Développer ses compétences en leadership',
      'Apprendre à gérer les conflits',
      'Améliorer la communication d\'équipe',
      'Optimiser la délégation des tâches'
    ],
    prerequisites: ['Expérience en gestion d\'équipe recommandée'],
    trainers: ['tr001', 'tr004'],
    created_at: '2024-03-15T10:00:00Z',
    status: 'published',
    rating: 4.7,
    imageUrl: '/assets/training/leadership.jpg'
  },
  {
    id: 'tc002',
    title: 'Sécurité des données et RGPD',
    description: 'Formation complète sur la protection des données et la conformité RGPD',
    category_id: 'compliance',
    duration: 8,
    level: 'débutant',
    objectives: [
      'Comprendre les principes du RGPD',
      'Identifier les risques de sécurité des données',
      'Mettre en place des procédures conformes'
    ],
    trainers: ['tr002'],
    created_at: '2024-01-20T09:30:00Z',
    status: 'published',
    rating: 4.5,
    imageUrl: '/assets/training/rgpd.jpg'
  },
  {
    id: 'tc003',
    title: 'Communication efficace en entreprise',
    description: 'Techniques pour améliorer la communication interne et externe',
    category_id: 'soft_skills',
    duration: 12,
    level: 'intermédiaire',
    objectives: [
      'Maîtriser les techniques de communication',
      'Adapter son discours selon l\'interlocuteur',
      'Gérer les situations de communication difficiles'
    ],
    trainers: ['tr001', 'tr003'],
    created_at: '2024-02-10T14:00:00Z',
    status: 'published',
    rating: 4.8,
    imageUrl: '/assets/training/communication.jpg'
  },
  {
    id: 'tc004',
    title: 'Excel avancé pour l\'analyse de données',
    description: 'Maîtrisez les fonctionnalités avancées d\'Excel pour l\'analyse de données',
    category_id: 'tech',
    duration: 8,
    level: 'avancé',
    objectives: [
      'Utiliser les tableaux croisés dynamiques',
      'Maîtriser les formules complexes',
      'Créer des visualisations de données',
      'Automatiser des tâches avec les macros'
    ],
    prerequisites: ['Connaissances de base d\'Excel'],
    trainers: ['tr002'],
    created_at: '2024-03-05T11:00:00Z',
    status: 'published',
    rating: 4.6,
    imageUrl: '/assets/training/excel.jpg'
  },
  {
    id: 'tc005',
    title: 'Anglais professionnel',
    description: 'Améliorer son niveau d\'anglais dans un contexte professionnel',
    category_id: 'languages',
    duration: 24,
    level: 'intermédiaire',
    objectives: [
      'Améliorer la communication écrite et orale',
      'Maîtriser le vocabulaire professionnel',
      'Gagner en confiance lors des présentations en anglais'
    ],
    trainers: ['tr003'],
    created_at: '2024-02-28T09:00:00Z',
    status: 'published',
    rating: 4.9,
    imageUrl: '/assets/training/english.jpg'
  }
];

// Sessions de formation
export const trainingSessions: TrainingSession[] = [
  {
    id: 'ts001',
    course_id: 'tc001',
    start_date: '2025-06-15T09:00:00Z',
    end_date: '2025-06-17T17:00:00Z',
    location: 'Salle de conférence A',
    max_participants: 15,
    trainer_id: 'tr001',
    status: 'scheduled',
    created_at: '2024-04-01T10:30:00Z',
    online: false,
  },
  {
    id: 'ts002',
    course_id: 'tc002',
    start_date: '2025-05-20T13:00:00Z',
    end_date: '2025-05-20T17:00:00Z',
    location: 'Salle de formation B',
    max_participants: 20,
    trainer_id: 'tr002',
    status: 'scheduled',
    created_at: '2024-03-15T09:45:00Z',
    online: false,
  },
  {
    id: 'ts003',
    course_id: 'tc003',
    start_date: '2025-06-05T09:00:00Z',
    end_date: '2025-06-06T17:00:00Z',
    location: 'Virtuel',
    max_participants: 30,
    trainer_id: 'tr001',
    status: 'scheduled',
    created_at: '2024-04-10T11:00:00Z',
    online: true,
    meeting_url: 'https://meet.example.com/formation-communication',
  },
  {
    id: 'ts004',
    course_id: 'tc004',
    start_date: '2025-05-25T09:00:00Z',
    end_date: '2025-05-25T17:00:00Z',
    location: 'Salle informatique',
    max_participants: 12,
    trainer_id: 'tr002',
    status: 'scheduled',
    created_at: '2024-03-20T14:30:00Z',
    online: false,
  },
  {
    id: 'ts005',
    course_id: 'tc005',
    start_date: '2025-06-01T09:00:00Z',
    end_date: '2025-07-15T12:00:00Z', // Formation sur plusieurs semaines
    location: 'Salle de langues',
    max_participants: 10,
    trainer_id: 'tr003',
    status: 'scheduled',
    created_at: '2024-04-05T10:00:00Z',
    notes: 'Sessions de 2h par semaine pendant 6 semaines',
    online: false,
  }
];

// Inscriptions aux formations
export const trainingEnrollments: TrainingEnrollment[] = [
  {
    id: 'te001',
    employee_id: 'emp001',
    session_id: 'ts001',
    enrollment_date: '2024-04-05T09:30:00Z',
    status: 'approved',
    manager_approval: true,
    approved_by: 'emp005',
    approved_at: '2024-04-06T11:00:00Z',
    attendance: 100,
    certificate_issued: false
  },
  {
    id: 'te002',
    employee_id: 'emp002',
    session_id: 'ts001',
    enrollment_date: '2024-04-07T14:20:00Z',
    status: 'approved',
    manager_approval: true,
    approved_by: 'emp005',
    approved_at: '2024-04-08T10:30:00Z',
    attendance: 100,
    certificate_issued: false
  },
  {
    id: 'te003',
    employee_id: 'emp003',
    session_id: 'ts002',
    enrollment_date: '2024-03-17T11:45:00Z',
    status: 'approved',
    manager_approval: true,
    approved_by: 'emp006',
    approved_at: '2024-03-18T09:15:00Z',
    attendance: 100,
    certificate_issued: false
  },
  {
    id: 'te004',
    employee_id: 'emp004',
    session_id: 'ts003',
    enrollment_date: '2024-04-12T16:30:00Z',
    status: 'pending',
    manager_approval: false,
    attendance: 0,
    certificate_issued: false
  },
  {
    id: 'te005',
    employee_id: 'emp007',
    session_id: 'ts004',
    enrollment_date: '2024-03-25T10:15:00Z',
    status: 'approved',
    manager_approval: true,
    approved_by: 'emp005',
    approved_at: '2024-03-26T14:00:00Z',
    attendance: 100,
    certificate_issued: false
  }
];

// Removed duplicate exports that were causing the error
