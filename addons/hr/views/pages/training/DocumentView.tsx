
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HrLayout } from '../../components';
import { Button } from '../../../../../src/components/ui/button';
import { useTraining } from '../../../hooks/useTraining';
import { PrinterIcon, FileIcon, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../../src/components/ui/card';

const DocumentView: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { getCourseById, getSessionById, courses, sessions, trainers } = useTraining();

  // Get the appropriate data based on the document type
  const data = type === 'course' ? getCourseById(id!) : getSessionById(id!);
  const title = type === 'course' ? 'Formation' : 'Session de Formation';

  // If data not found
  if (!data) {
    return (
      <HrLayout>
        <div className="p-6">
          <div className="mb-6">
            <Link to={`/hr/training/${type === 'course' ? 'courses' : 'sessions'}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Document introuvable</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Le document demandé n'a pas été trouvé.</p>
            </CardContent>
          </Card>
        </div>
      </HrLayout>
    );
  }

  const renderCourseDocument = () => {
    const course = data as any;
    
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">{course.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{course.description || 'Aucune description disponible'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Durée</h3>
                <p>{course.duration || 'N/A'} heures</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Catégorie</h3>
                <p>{course.category || 'Non catégorisé'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Niveau</h3>
                <p>{course.level || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Certification</h3>
                <p>{course.certification ? 'Oui' : 'Non'}</p>
              </div>
            </div>
            
            {course.objectives && (
              <div>
                <h3 className="text-lg font-medium mb-2">Objectifs</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.objectives.map((obj: string, index: number) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {course.topics && (
              <div>
                <h3 className="text-lg font-medium mb-2">Programme</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.topics.map((topic: string, index: number) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <p className="text-xs text-muted-foreground">
            Document généré le {new Date().toLocaleDateString()}
          </p>
          <div className="text-xs text-muted-foreground">
            Référence: COURSE-{course.id.substring(0, 8)}
          </div>
        </CardFooter>
      </Card>
    );
  };

  const renderSessionDocument = () => {
    const session = data as any;
    const course = courses.find(c => c.id === session.course_id);
    const trainer = trainers.find(t => t.id === session.trainer_id);
    
    // Format date
    const formatDate = (dateString?: string) => {
      if (!dateString) return 'Non définie';
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
    
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">
            {session.name || (course ? course.title : 'Session de formation')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className="space-y-6">
            {course && (
              <div>
                <h3 className="text-lg font-medium mb-2">Formation</h3>
                <p>{course.title}</p>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Date de début</h3>
                <p>{formatDate(session.start_date)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Date de fin</h3>
                <p>{formatDate(session.end_date)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Lieu</h3>
                <p>{session.location || 'Non défini'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Formateur</h3>
                <p>{trainer ? trainer.name : (session.trainer_name || 'Non défini')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Capacité</h3>
                <p>{session.capacity || 'Non limitée'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Inscrits</h3>
                <p>{session.enrolled || '0'} participant(s)</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Informations additionnelles</h3>
              <p className="text-muted-foreground">
                {session.details || 'Aucune information additionnelle disponible.'}
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <p className="text-xs text-muted-foreground">
            Document généré le {new Date().toLocaleDateString()}
          </p>
          <div className="text-xs text-muted-foreground">
            Référence: SESSION-{session.id.substring(0, 8)}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <HrLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between">
          <Link to={`/hr/training/${type === 'course' ? 'courses' : 'sessions'}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <PrinterIcon className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button size="sm">
              <FileIcon className="h-4 w-4 mr-2" />
              Exporter PDF
            </Button>
          </div>
        </div>
        
        {type === 'course' ? renderCourseDocument() : renderSessionDocument()}
      </div>
    </HrLayout>
  );
};

export default DocumentView;
