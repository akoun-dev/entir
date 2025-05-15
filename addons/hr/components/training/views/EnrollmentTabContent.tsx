
import React from 'react';
import { ClipboardList } from 'lucide-react';
import TabContent from '../../../components/common/TabContent';
import { EnrollmentList } from '../../training';
import { TrainingEnrollment, TrainingSession, TrainingCourse } from '../../../types';

interface EnrollmentTabContentProps {
  enrollments: TrainingEnrollment[];
  sessions: TrainingSession[];
  courses: TrainingCourse[];
  employeeNames: Record<string, string>;
  onApprove: (enrollmentId: string) => void;
  onReject: (enrollmentId: string) => void;
}

const EnrollmentTabContent: React.FC<EnrollmentTabContentProps> = ({
  enrollments,
  sessions,
  courses,
  employeeNames,
  onApprove,
  onReject
}) => {
  return (
    <TabContent
      title="Demandes d'inscription"
      icon={ClipboardList}
      description="Gérez les demandes d'inscription aux formations"
    >
      <EnrollmentList
        enrollments={enrollments}
        sessions={sessions}
        courses={courses}
        employeeNames={employeeNames}
        onApprove={onApprove}
        onReject={onReject}
        showApprovalActions={true}
      />
    </TabContent>
  );
};

export default EnrollmentTabContent;
