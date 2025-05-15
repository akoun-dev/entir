
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { OrgChartDepartment } from '../../types/organization';
import { Building2, Users } from 'lucide-react';
import { Badge } from '../../../../src/components/ui/badge';

interface OrgDepartmentsProps {
  departments: OrgChartDepartment[];
  onDepartmentClick?: (department: OrgChartDepartment) => void;
}

const OrgDepartments: React.FC<OrgDepartmentsProps> = ({ departments, onDepartmentClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <Card 
          key={department.id}
          className="bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onDepartmentClick && onDepartmentClick(department)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{department.name}</CardTitle>
              <Building2 className="h-5 w-5 text-ivory-orange" />
            </div>
          </CardHeader>
          <CardContent>
            {department.manager && (
              <div className="mb-3">
                <p className="text-sm text-gray-500">Manager:</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
                    {department.manager.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{department.manager.name}</p>
                    <p className="text-xs text-gray-500">{department.manager.position}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{department.employees.length} employés</span>
              </div>
              {department.subDepartments && department.subDepartments.length > 0 && (
                <Badge variant="outline" className="bg-gray-100">
                  {department.subDepartments.length} sous-départements
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrgDepartments;
