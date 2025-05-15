
import React from 'react';
import { LayoutList, Users, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { EmployeeCard } from './EmployeeCard';
import EmployeeListView from './EmployeeListView';
import { Employee } from '../../models';
import { Link } from 'react-router-dom';
import { Button } from '../../../../src/components/ui/button';

interface EmployeeViewTabsProps {
  loading: boolean;
  error: string | null;
  filteredEmployees: Employee[];
  onDelete: (id: number) => void;
}

export const EmployeeViewTabs: React.FC<EmployeeViewTabsProps> = ({
  loading,
  error,
  filteredEmployees,
  onDelete
}) => {
  return (
    <Tabs defaultValue="cards" className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="bg-muted/50 border border-ivory-orange/20">
          <TabsTrigger value="cards" className="flex items-center gap-2 data-[state=active]:bg-ivory-orange data-[state=active]:text-white">
            <Users size={16} />
            Cartes
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-ivory-orange data-[state=active]:text-white">
            <LayoutList size={16} />
            Liste
          </TabsTrigger>
        </TabsList>
        <div className="text-sm text-muted-foreground px-3 py-1 bg-muted/40 rounded-full border border-muted">
          {filteredEmployees.length} employé(s) trouvé(s)
        </div>
      </div>

      <TabsContent value="cards">
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Chargement des employés...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            <p>{error}</p>
          </div>
        ) : filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyEmployeeState />
        )}
      </TabsContent>

      <TabsContent value="list">
        <EmployeeListView
          employees={filteredEmployees}
          loading={loading}
          error={error}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};

const EmptyEmployeeState: React.FC = () => {
  return (
    <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed border-ivory-orange/30">
      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">Aucun employé trouvé</p>
      <Button variant="outline" className="mt-4 border-ivory-orange text-ivory-orange hover:bg-ivory-orange/10 hover:text-ivory-orange" asChild>
        <Link to="/hr/employees/new">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un employé
        </Link>
      </Button>
    </div>
  );
};

export default EmployeeViewTabs;
