
import { JobOffer, JobApplication, RecruitmentStage } from '../types/recruitment';

// Sample recruitment stages
export const recruitmentStages: RecruitmentStage[] = [
  { id: 1, name: 'Candidature reçue', description: 'Candidature récemment reçue', order: 1, color: 'bg-blue-500' },
  { id: 2, name: 'CV sélectionné', description: 'Le CV a été présélectionné', order: 2, color: 'bg-purple-500' },
  { id: 3, name: 'Entretien prévu', description: 'Entretien planifié avec le candidat', order: 3, color: 'bg-amber-500' },
  { id: 4, name: 'Test technique', description: 'Évaluation technique du candidat', order: 4, color: 'bg-orange-500' },
  { id: 5, name: 'Entretien final', description: 'Dernière étape d\'entretien', order: 5, color: 'bg-green-500' },
  { id: 6, name: 'Offre émise', description: 'Une offre a été proposée', order: 6, color: 'bg-teal-500' },
  { id: 7, name: 'Embauché', description: 'Candidat recruté avec succès', order: 7, color: 'bg-green-700' },
  { id: 8, name: 'Refusé', description: 'Candidature non retenue', order: 8, color: 'bg-red-500' }
];

// Sample job offers
export const jobOffers: JobOffer[] = [
  {
    id: 'jo001',
    title: 'Développeur Frontend',
    department_id: 'dept001',
    department_name: 'Technologie',
    job_description: 'Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe de développement web...',
    requirements: [
      'Au moins 3 ans d\'expérience en développement frontend',
      'Maîtrise de React et TypeScript',
      'Connaissance de Tailwind CSS',
      'Expérience en responsive design'
    ],
    start_date: '2023-06-01',
    end_date: '2023-07-15',
    status: 'published',
    location: 'Abidjan, Côte d\'Ivoire',
    salary_range: '1 500 000 - 2 000 000 FCFA',
    employment_type: 'full_time',
    created_at: '2023-05-15',
    created_by: 'user001'
  },
  {
    id: 'jo002',
    title: 'Responsable Marketing Digital',
    department_id: 'dept002',
    department_name: 'Marketing',
    job_description: 'Rejoignez notre équipe marketing en tant que responsable marketing digital...',
    requirements: [
      'Expérience en gestion de campagnes digitales',
      'Maîtrise des outils d\'analyse web',
      'Compétences en SEO/SEM',
      'Capacité à gérer une équipe'
    ],
    start_date: '2023-06-15',
    end_date: '2023-07-30',
    status: 'published',
    location: 'Abidjan, Côte d\'Ivoire',
    salary_range: '1 800 000 - 2 500 000 FCFA',
    employment_type: 'full_time',
    created_at: '2023-05-20',
    created_by: 'user002'
  },
  {
    id: 'jo003',
    title: 'Stagiaire Ressources Humaines',
    department_id: 'dept003',
    department_name: 'RH',
    job_description: 'Nous offrons une opportunité de stage dans notre département RH...',
    requirements: [
      'Étudiant en gestion des ressources humaines',
      'Bonnes compétences organisationnelles',
      'Maîtrise de MS Office',
      'Excellentes compétences en communication'
    ],
    start_date: '2023-07-01',
    end_date: '2023-08-15',
    status: 'published',
    location: 'Abidjan, Côte d\'Ivoire',
    employment_type: 'internship',
    created_at: '2023-05-25',
    created_by: 'user001'
  },
  {
    id: 'jo004',
    title: 'Analyste Financier',
    department_id: 'dept004',
    department_name: 'Finance',
    job_description: 'Nous recherchons un analyste financier pour rejoindre notre équipe...',
    requirements: [
      'Diplôme en finance ou comptabilité',
      'Expérience en analyse financière',
      'Maîtrise d\'Excel avancé',
      'Connaissances en ERP financiers'
    ],
    start_date: '2023-06-10',
    end_date: '2023-07-25',
    status: 'draft',
    location: 'Abidjan, Côte d\'Ivoire',
    salary_range: '1 700 000 - 2 200 000 FCFA',
    employment_type: 'full_time',
    created_at: '2023-05-28',
    created_by: 'user003'
  }
];

// Sample job applications
export const jobApplications: JobApplication[] = [
  {
    id: 'app001',
    job_offer_id: 'jo001',
    candidate_name: 'Kouadio Konan',
    email: 'kouadio.konan@example.com',
    phone: '+225 0712345678',
    resume_url: '/uploads/resumes/resume001.pdf',
    cover_letter: 'Je suis très intéressé par le poste de développeur frontend...',
    status: 'interview',
    stage: 3,
    application_date: '2023-05-20',
    last_updated: '2023-05-25',
    notes: 'Candidat prometteur avec une bonne expérience technique'
  },
  {
    id: 'app002',
    job_offer_id: 'jo001',
    candidate_name: 'Aya Touré',
    email: 'aya.toure@example.com',
    phone: '+225 0723456789',
    resume_url: '/uploads/resumes/resume002.pdf',
    status: 'new',
    stage: 1,
    application_date: '2023-05-22',
    last_updated: '2023-05-22'
  },
  {
    id: 'app003',
    job_offer_id: 'jo002',
    candidate_name: 'Ahmed Diallo',
    email: 'ahmed.diallo@example.com',
    phone: '+225 0734567890',
    resume_url: '/uploads/resumes/resume003.pdf',
    cover_letter: 'Mon expérience en marketing digital...',
    status: 'reviewed',
    stage: 2,
    application_date: '2023-05-21',
    last_updated: '2023-05-24',
    notes: 'A de l\'expérience dans le domaine mais pas assez en gestion d\'équipe'
  },
  {
    id: 'app004',
    job_offer_id: 'jo003',
    candidate_name: 'Marie Koffi',
    email: 'marie.koffi@example.com',
    phone: '+225 0745678901',
    resume_url: '/uploads/resumes/resume004.pdf',
    status: 'offer',
    stage: 6,
    application_date: '2023-05-18',
    last_updated: '2023-05-30',
    notes: 'Excellente candidate, prête à commencer dès que possible'
  }
];
