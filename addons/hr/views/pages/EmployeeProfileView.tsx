
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { HrLayout } from '../components';
import { useEmployeeProfile } from '../../hooks/employee-profile';
import EmployeeProfileContainer from '../../components/employee/profile-view/EmployeeProfileContainer';

/**
 * Vue du profil d'employé éditable avec QR code et templates
 */
const EmployeeProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profileRef = useRef<HTMLDivElement>(null);
  
  const employeeProfileProps = useEmployeeProfile(id);
  
  return (
    <HrLayout>
      <EmployeeProfileContainer 
        profileRef={profileRef}
        {...employeeProfileProps}
        employeeId={id}
      />
    </HrLayout>
  );
};

export default EmployeeProfileView;
