
import React from 'react';
import { Card, CardContent } from '../../../../src/components/ui/card';
import { OrgChartPerson } from '../../types/organization';

interface PersonDetailProps {
  person: OrgChartPerson;
}

const PersonDetail: React.FC<PersonDetailProps> = ({ person }) => {
  return (
    <Card className="mb-6 bg-white/90">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 text-xl">
            {person.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{person.name}</h3>
            <p className="text-gray-500">{person.position}</p>
            <p className="text-gray-500">{person.department}</p>
            {person.email && <p className="text-gray-500">{person.email}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonDetail;
