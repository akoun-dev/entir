
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HrLayout } from '../components';

/**
 * Page de gestion des formations - redirige vers la vue catalogue
 */
const TrainingView: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/hr/training/courses');
  }, [navigate]);

  return (
    <HrLayout>
      <div>
        {/* Cette page redirige vers /hr/training/courses */}
        <div className="flex items-center justify-center h-96">
          Redirection en cours...
        </div>
      </div>
    </HrLayout>
  );
};

export default TrainingView;
