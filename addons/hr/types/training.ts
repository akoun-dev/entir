
/**
 * Types pour la gestion des formations
 */

// Profil du formateur
export interface TrainerProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specialization: string[];
  bio?: string;
  imageUrl?: string;
  rating?: number;
  external: boolean;
}

// Catégorie de formation
export interface TrainingCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// Cours de formation
export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category_id: string;
  duration: number; // en heures
  level: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  objectives: string[];
  prerequisites?: string[];
  materials?: string[];
  cost?: number;
  trainers: string[]; // IDs des formateurs
  created_at: string;
  updated_at?: string;
  status: 'draft' | 'published' | 'archived';
  rating?: number;
  imageUrl?: string;
}

// Session de formation
export interface TrainingSession {
  id: string;
  course_id: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  trainer_id: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
  notes?: string;
  online: boolean;
  meeting_url?: string;
}

// Inscription à une formation
export interface TrainingEnrollment {
  id: string;
  employee_id: string;
  session_id: string;
  enrollment_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  completion_date?: string;
  score?: number;
  feedback?: string;
  attendance: number; // pourcentage de présence
  certificate_issued: boolean;
  manager_approval?: boolean;
  approved_by?: string;
  approved_at?: string;
}

// Statistiques de formation
export interface TrainingStats {
  total_courses: number;
  active_sessions: number;
  total_enrollments: number;
  enrollments_this_month: number;
  completion_rate: number;
  by_category: Array<{
    category_id: string;
    count: number;
  }>;
  average_rating: number;
}
