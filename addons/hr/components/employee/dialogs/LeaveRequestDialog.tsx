
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LeaveRequestForm } from '../../leave';
import { LeaveType, LeaveRequest } from '../../../types';

interface LeaveRequestDialogProps {
  leaveTypes: LeaveType[];
  employeeId: string;
  onSubmit: (data: LeaveRequest) => void;
  isLoading?: boolean;
}

const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({
  leaveTypes,
  employeeId,
  onSubmit,
  isLoading = false
}) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Nouvelle demande de congé</DialogTitle>
        <DialogDescription>
          Remplissez ce formulaire pour soumettre une demande de congé.
        </DialogDescription>
      </DialogHeader>
      <LeaveRequestForm
        leaveTypes={leaveTypes}
        employeeId={employeeId}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </DialogContent>
  );
};

export default LeaveRequestDialog;
