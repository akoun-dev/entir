
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../../src/components/ui/card';
import { Badge } from '../../../../../src/components/ui/badge';

interface Contract {
  id: string;
  type: string;
  start_date: string;
  end_date: string | null;
  department: string;
  job_title: string;
}

interface EmployeeContractsTabProps {
  contracts: Contract[];
}

const EmployeeContractsTab: React.FC<EmployeeContractsTabProps> = ({ contracts }) => {
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historique des contrats</CardTitle>
        <CardDescription>Historique des contrats et changements de poste</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {contracts.map((contract, index) => (
            <div key={contract.id} className="relative pl-6 pb-6 border-l border-border">
              {/* Indicateur de chronologie */}
              <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">{contract.job_title}</h3>
                  <p className="text-sm text-muted-foreground">{contract.department}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{contract.type}</Badge>
                  <span className="text-sm">
                    {formatDate(contract.start_date)} - {contract.end_date ? formatDate(contract.end_date) : 'Présent'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeContractsTab;
