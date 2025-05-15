
import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '../../../../src/components/ui/input';
import { Button } from '../../../../src/components/ui/button';
import { Card, CardContent } from '../../../../src/components/ui/card';

interface EmployeeSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const EmployeeSearchBar: React.FC<EmployeeSearchBarProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <Card className="mb-8 shadow-sm border-ivory-green/20 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-ivory-orange via-ivory-white to-ivory-green"></div>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, poste ou département..."
              className="pl-10 border-ivory-orange/20 focus-visible:ring-ivory-orange"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-ivory-orange/30 text-ivory-orange hover:border-ivory-orange hover:bg-ivory-orange/10">
              <Filter size={16} />
              Filtres
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-ivory-green/30 text-ivory-green hover:border-ivory-green hover:bg-ivory-green/10">
              <SlidersHorizontal size={16} />
              Trier
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeSearchBar;
