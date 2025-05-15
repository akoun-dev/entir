
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { RecruitmentStats as RecruitmentStatsType, RecruitmentStage } from '../../types/recruitment';
import { Briefcase, Users, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

interface RecruitmentStatsProps {
  stats: RecruitmentStatsType;
  stages: RecruitmentStage[];
}

const RecruitmentStats: React.FC<RecruitmentStatsProps> = ({ stats, stages }) => {
  // Helper function to get stage name
  const getStageName = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name : 'Inconnu';
  };

  // Helper function to get stage color
  const getStageColor = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.color : 'bg-gray-500';
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total job offers card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Offres d'emploi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{stats.total_offers}</div>
              <p className="text-sm text-muted-foreground">
                {stats.active_offers} actives
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total applications card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Candidatures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{stats.total_applications}</div>
              <p className="text-sm text-muted-foreground">
                {stats.applications_this_month} ce mois-ci
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hiring rate card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Taux d'embauche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{formatPercent(stats.hiring_rate)}</div>
              <p className="text-sm text-muted-foreground flex items-center">
                {stats.hiring_rate > 20 ? (
                  <>
                    <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">Bon</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-amber-500">À améliorer</span>
                  </>
                )}
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications by stage card (spans 2 columns) */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Par étape
          </CardTitle>
          <CardDescription className="text-xs">
            Répartition des candidatures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.by_stage.map((item) => (
              <div key={item.stage_id} className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${getStageColor(item.stage_id)}`} />
                <div className="flex-1 text-sm">
                  {getStageName(item.stage_id)}
                </div>
                <div className="text-sm font-medium">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentStats;
