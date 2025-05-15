
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../src/components/ui/table';
import { Input } from '../../../../src/components/ui/input';
import { Button } from '../../../../src/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../src/components/ui/select';
import { Card } from '../../../../src/components/ui/card';
import { Badge } from '../../../../src/components/ui/badge';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { OrgChartPerson, OrgChartDepartment } from '../../types/organization';

interface OrgEmployeeListProps {
  departments: OrgChartDepartment[];
  onPersonClick?: (person: OrgChartPerson) => void;
}

type SortField = 'name' | 'department' | 'position';
type SortDirection = 'asc' | 'desc';

const OrgEmployeeList: React.FC<OrgEmployeeListProps> = ({ departments, onPersonClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Extract all employees from departments
  const allEmployees = useMemo(() => {
    return departments.flatMap(dept => dept.employees || []);
  }, [departments]);

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let employees = [...allEmployees];
    
    // Apply department filter
    if (departmentFilter !== 'all') {
      employees = employees.filter(emp => emp.department === departmentFilter);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(term) ||
        (emp.position && emp.position.toLowerCase().includes(term)) ||
        (emp.department && emp.department.toLowerCase().includes(term)) ||
        (emp.email && emp.email.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    employees.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortField) {
        case 'name':
          valueA = a.name || '';
          valueB = b.name || '';
          break;
        case 'department':
          valueA = a.department || '';
          valueB = b.department || '';
          break;
        case 'position':
          valueA = a.position || '';
          valueB = b.position || '';
          break;
        default:
          valueA = a.name || '';
          valueB = b.name || '';
      }
      
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    
    return employees;
  }, [allEmployees, departmentFilter, searchTerm, sortField, sortDirection]);

  // Get unique department names for the filter
  const departmentNames = useMemo(() => {
    return Array.from(new Set(allEmployees.map(emp => emp.department))).filter(Boolean) as string[];
  }, [allEmployees]);

  // Handler for sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? 
      <ChevronUp className="inline h-4 w-4" /> : 
      <ChevronDown className="inline h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un employé..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tous les départements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les départements</SelectItem>
              {departmentNames.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button
                    variant="ghost"
                    className="px-0 font-medium"
                    onClick={() => handleSort('name')}
                  >
                    Nom {renderSortIndicator('name')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="px-0 font-medium"
                    onClick={() => handleSort('position')}
                  >
                    Poste {renderSortIndicator('position')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="px-0 font-medium"
                    onClick={() => handleSort('department')}
                  >
                    Département {renderSortIndicator('department')}
                  </Button>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Aucun employé trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow 
                    key={employee.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onPersonClick && onPersonClick(employee)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium overflow-hidden">
                          {employee.imageUrl ? (
                            <img 
                              src={employee.imageUrl} 
                              alt={employee.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            employee.name.split(' ').map(n => n[0]).join('').toUpperCase()
                          )}
                        </div>
                        <span>{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground">
        {filteredEmployees.length} employé(s) affiché(s)
      </div>
    </div>
  );
};

export default OrgEmployeeList;
