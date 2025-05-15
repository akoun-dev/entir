
import React from 'react';
import { HrLayout } from '../components';
import { Briefcase, Plus } from 'lucide-react';
import { Button } from '../../../../src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { Card } from '../../../../src/components/ui/card';
import { JobOfferCard, ApplicationList, RecruitmentPipeline, RecruitmentStats } from '../../components/recruitment';
import { useRecruitment } from '../../hooks';
import { Link } from 'react-router-dom';

/**
 * Page de gestion du recrutement
 */
const RecruitmentView: React.FC = () => {
  const { 
    getJobOffers, 
    getApplications, 
    recruitmentStages, 
    getRecruitmentStats,
    getApplicationsByJobOffer,
    moveApplicationStage,
  } = useRecruitment();

  // Get data
  const jobOffers = getJobOffers();
  const applications = getApplications();
  const stats = getRecruitmentStats();

  return (
    <HrLayout>
      <div>
        {/* En-tête avec fil d'Ariane */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mt-4">
            <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
            <Briefcase className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Gestion du Recrutement</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
            <p className="text-muted-foreground">
              Gérez les offres d'emploi, les candidatures et le processus de recrutement
            </p>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link to="/hr/recruitment/offers/new">
                  <Plus className="h-4 w-4 mr-1" />
                  Nouvelle offre
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="mb-8">
          <RecruitmentStats stats={stats} stages={recruitmentStages} />
        </div>

        {/* Contenu avec onglets */}
        <Tabs defaultValue="offers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="offers">Offres d'emploi</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="offers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobOffers.length === 0 ? (
                <Card className="col-span-full p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune offre d'emploi disponible.
                  </p>
                  <Button asChild>
                    <Link to="/hr/recruitment/offers/new">
                      <Plus className="h-4 w-4 mr-1" />
                      Créer une offre
                    </Link>
                  </Button>
                </Card>
              ) : (
                jobOffers.map(offer => (
                  <JobOfferCard 
                    key={offer.id} 
                    jobOffer={offer}
                    applicationCount={getApplicationsByJobOffer(offer.id).length}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <ApplicationList 
              applications={applications} 
              stages={recruitmentStages}
              onMoveStage={moveApplicationStage}
            />
          </TabsContent>
          
          <TabsContent value="pipeline">
            <RecruitmentPipeline 
              applications={applications} 
              stages={recruitmentStages} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );
};

export default RecruitmentView;
