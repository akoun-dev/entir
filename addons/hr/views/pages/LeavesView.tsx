
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HrLayout } from '../components/HrLayout';
import { LeaveCalendar, LeavesList, LeavesStats, LeaveRequestForm, LeaveBalanceCard } from '../../components/leave';
import { useLeaves } from '../../hooks/useLeaves';

/**
 * Page de gestion des congés
 */
const LeavesView: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    leavesList,
    loading,
    getAllLeaves,
    createLeaveRequest,
    updateLeaveStatus,
    getLeaveTypes,
    getEmployeeLeaveBalances
  } = useLeaves();

  // Employé connecté (simulé)
  const currentEmployeeId = "1"; // Thomas Durand

  // Charger les données au montage du composant
  useEffect(() => {
    getAllLeaves();
  }, []);

  // Obtenir les congés de l'employé actuel
  const employeeLeaves = leavesList.filter(leave => leave.employee_id === currentEmployeeId);

  // Obtenir les types de congés
  const leaveTypes = getLeaveTypes();

  // Obtenir les soldes de congés de l'employé
  const employeeBalances = getEmployeeLeaveBalances(currentEmployeeId);

  // Gérer la soumission du formulaire
  const handleLeaveRequest = (data: any) => {
    createLeaveRequest(data);
    setIsDialogOpen(false);
  };

  // Déterminer si l'utilisateur est un manager (simulé)
  const isManager = true;

  return (
    <HrLayout>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion des congés</h1>
            <p className="text-muted-foreground">Suivi et gestion des demandes de congés</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle demande
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Nouvelle demande de congé</DialogTitle>
                <DialogDescription>
                  Remplissez ce formulaire pour soumettre une demande de congé.
                </DialogDescription>
              </DialogHeader>
              <LeaveRequestForm
                leaveTypes={leaveTypes}
                employeeId={currentEmployeeId}
                onSubmit={handleLeaveRequest}
                isLoading={loading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats des congés */}
        <div className="mb-8 w-full">
          <LeavesStats leaves={leavesList} />
        </div>

        <Tabs defaultValue="calendar" className="space-y-4 w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="list">Mes demandes</TabsTrigger>
            {isManager && <TabsTrigger value="all">Toutes les demandes</TabsTrigger>}
            <TabsTrigger value="balance">Mon solde</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              <div className="lg:col-span-2">
                <LeaveCalendar leaves={leavesList} />
              </div>
              <div>
                <div className="border rounded-lg bg-card p-4 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Congés à venir</h3>
                  </div>
                  <div className="space-y-4">
                    {leavesList
                      .filter(leave => {
                        const today = new Date();
                        const fromDate = new Date(leave.date_from);
                        return fromDate >= today && leave.state === 'approved';
                      })
                      .slice(0, 5)
                      .map(leave => (
                        <div key={leave.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{leave.employee_name}</p>
                            <p className="text-xs text-muted-foreground">{leave.type_name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{new Date(leave.date_from).toLocaleDateString()} - {new Date(leave.date_to).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground">{leave.number_of_days} jours</p>
                          </div>
                        </div>
                      ))}
                    {leavesList
                      .filter(leave => {
                        const today = new Date();
                        const fromDate = new Date(leave.date_from);
                        return fromDate >= today && leave.state === 'approved';
                      }).length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        Aucun congé à venir
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="w-full">
            <LeavesList
              leaves={employeeLeaves}
            />
          </TabsContent>

          {isManager && (
            <TabsContent value="all" className="w-full">
              <LeavesList
                leaves={leavesList}
                onUpdateStatus={updateLeaveStatus}
                isManager={true}
              />
            </TabsContent>
          )}

          <TabsContent value="balance" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {employeeBalances.map(balance => (
                <LeaveBalanceCard key={balance.id} balance={balance} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );
};

export default LeavesView;
