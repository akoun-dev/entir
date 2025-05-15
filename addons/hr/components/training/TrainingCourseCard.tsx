
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../../src/components/ui/card';
import { Badge } from '../../../../src/components/ui/badge';
import { FileText, Clock, Award } from 'lucide-react';

interface TrainingCourseCardProps {
  course: {
    id: string;
    title: string;
    description?: string;
    duration?: number;
    category?: string;
    certification?: boolean;
    level?: string;
  };
  category?: string;
  actions?: React.ReactNode;
}

const TrainingCourseCard: React.FC<TrainingCourseCardProps> = ({
  course,
  category,
  actions
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {category || course.category || 'Non catégorisé'}
          </Badge>
          
          {course.certification && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Award className="h-3 w-3 mr-1" />
              Certification
            </Badge>
          )}
        </div>
        
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        {course.level && (
          <CardDescription>
            Niveau: {course.level}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description || 'Aucune description disponible'}
        </p>
      </CardContent>
      
      <CardFooter className="flex-col items-start pt-2 border-t">
        <div className="flex items-center w-full text-sm text-muted-foreground mb-2">
          {course.duration && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration} heures
            </div>
          )}
          <div className="flex items-center ml-auto">
            <FileText className="h-4 w-4 mr-1" />
            Formation
          </div>
        </div>
        
        {actions}
      </CardFooter>
    </Card>
  );
};

export default TrainingCourseCard;
