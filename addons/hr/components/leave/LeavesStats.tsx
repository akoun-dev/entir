
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, UserCheck, Clock, CalendarCheck } from "lucide-react";
import { Leave } from '../../types';

interface LeavesStatsProps {
  leaves: Leave[];
}

const LeavesStats: React.FC<LeavesStatsProps> = ({ leaves }) => {
  // Calculer les statistiques
  const totalLeaves = leaves.length;
  const approvedLeaves = leaves.filter(leave => leave.state === 'approved').length;
  const pendingLeaves = leaves.filter(leave => leave.state === 'submitted').length;
  const upcomingLeaves = leaves.filter(leave => {
    if (leave.state !== 'approved') return false;
    const today = new Date();
    const startDate = new Date(leave.date_from);
    return startDate > today;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total des demandes</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeaves}</div>
          <p className="text-xs text-muted-foreground">Demandes de congés</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Congés approuvés</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedLeaves}</div>
          <p className="text-xs text-muted-foreground">Sur {totalLeaves} demandes</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">En attente</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingLeaves}</div>
          <p className="text-xs text-muted-foreground">Demandes en validation</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">À venir</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingLeaves}</div>
          <p className="text-xs text-muted-foreground">Congés à venir</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeavesStats;
