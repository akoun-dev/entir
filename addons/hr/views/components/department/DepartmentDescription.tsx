
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../src/components/ui/card';

interface DepartmentDescriptionProps {
  description: string;
}

const DepartmentDescription: React.FC<DepartmentDescriptionProps> = ({ description }) => {
  if (!description) return null;

  return (
    <Card className="mb-6 w-full">
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line">{description}</div>
      </CardContent>
    </Card>
  );
};

export default DepartmentDescription;
