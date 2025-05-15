
import { useProfileEditing } from './useProfileEditing';
import { useEmployeeTemplates } from './useEmployeeTemplates';
import { usePdfExport } from './usePdfExport';
import { ProfileTemplate } from './types';

export { useProfileEditing, useEmployeeTemplates, usePdfExport };
export type { ProfileTemplate };

export const useEmployeeProfile = (employeeId?: string) => {
  // Combine the functionality from separate hooks
  const profileEditing = useProfileEditing({ employeeId });
  const templateManagement = useEmployeeTemplates();
  const pdfExport = usePdfExport();

  return {
    ...profileEditing,
    ...templateManagement,
    ...pdfExport
  };
};
