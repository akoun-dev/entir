
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Ban, FileEdit } from "lucide-react";
import { Leave } from '../../types';

interface LeavesListProps {
  leaves: Leave[];
  onUpdateStatus?: (leaveId: string, newStatus: Leave['state']) => void;
  isManager?: boolean;
}

const LeavesList: React.FC<LeavesListProps> = ({ leaves, onUpdateStatus, isManager = false }) => {
  // Formatter la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Obtenir les propriétés de badge en fonction du statut
  const getStatusBadge = (status: Leave['state']) => {
    switch (status) {
      case 'draft':
        return { variant: "outline" as const, label: "Brouillon", icon: FileEdit };
      case 'submitted':
        return { variant: "secondary" as const, label: "En attente", icon: Clock };
      case 'approved':
        return { variant: "default" as const, label: "Approuvé", icon: Check };
      case 'refused':
        return { variant: "destructive" as const, label: "Refusé", icon: X };
      case 'cancelled':
        return { variant: "outline" as const, label: "Annulé", icon: Ban };
      default:
        return { variant: "outline" as const, label: "Inconnu", icon: Clock };
    }
  };

  return (
    <div className="border rounded-lg bg-card w-full">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {isManager && <TableHead>Employé</TableHead>}
              <TableHead>Type</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Jours</TableHead>
              <TableHead>Statut</TableHead>
              {isManager && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaves.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isManager ? 7 : 5} className="text-center py-4">
                  Aucun congé trouvé
                </TableCell>
              </TableRow>
            ) : (
              leaves.map((leave) => {
                const statusBadge = getStatusBadge(leave.state);
                const StatusIcon = statusBadge.icon;

                return (
                  <TableRow key={leave.id}>
                    {isManager && <TableCell>{leave.employee_name}</TableCell>}
                    <TableCell>{leave.type_name}</TableCell>
                    <TableCell>{formatDate(leave.date_from)}</TableCell>
                    <TableCell>{formatDate(leave.date_to)}</TableCell>
                    <TableCell>{leave.number_of_days} j</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className="flex w-fit items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    {isManager && leave.state === 'submitted' && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => onUpdateStatus?.(leave.id, 'approved')}
                          >
                            <Check className="mr-1 h-3 w-3" /> Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onUpdateStatus?.(leave.id, 'refused')}
                          >
                            <X className="mr-1 h-3 w-3" /> Refuser
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {isManager && leave.state !== 'submitted' && (
                      <TableCell className="text-right">
                        <span className="text-muted-foreground">-</span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeavesList;
