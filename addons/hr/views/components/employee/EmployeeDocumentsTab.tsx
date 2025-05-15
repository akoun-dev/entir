
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../../src/components/ui/card';
import { Button } from '../../../../../src/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

interface EmployeeDocumentsTabProps {
  documents: Document[];
}

const EmployeeDocumentsTab: React.FC<EmployeeDocumentsTabProps> = ({ documents }) => {
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Documents liés à l'employé</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Ajouter un document
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 w-full">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {doc.type} • {formatDate(doc.date)} • {doc.size}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDocumentsTab;
