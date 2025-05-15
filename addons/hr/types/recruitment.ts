
export interface JobOffer {
  id: string;
  title: string;
  department_id: string;
  department_name: string;
  job_description: string;
  requirements: string[];
  start_date: string;
  end_date: string;
  status: 'draft' | 'published' | 'closed';
  location: string;
  salary_range?: string;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  created_at: string;
  created_by: string;
}

export interface JobApplication {
  id: string;
  job_offer_id: string;
  candidate_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter?: string;
  status: 'new' | 'reviewed' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage: number;
  application_date: string;
  last_updated: string;
  notes?: string;
}

export interface RecruitmentStage {
  id: number;
  name: string;
  description: string;
  order: number;
  color: string;
}

export interface RecruitmentStats {
  total_offers: number;
  active_offers: number;
  total_applications: number;
  applications_this_month: number;
  by_stage: {
    stage_id: number;
    count: number;
  }[];
  hiring_rate: number;
}
