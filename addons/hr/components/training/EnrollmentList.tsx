
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import { TrainingEnrollment, TrainingSession, TrainingCourse } from '../../types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '../../../../src/components/ui/badge';
import { Check, X } from 'lucide-react';

interface EnrollmentListProps {
  enrollments: TrainingEnrollment[];
  sessions: TrainingSession[];
  courses: TrainingCourse[];
  employeeNames: Record<string, string>;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showApprovalActions?: boolean;
}

const EnrollmentList: React.FC<EnrollmentListProps> = ({
  enrollments,
  sessions,
  courses,
  employeeNames,
  onApprove,
  onReject,
  showApprovalActions = false
}) => {
  const getSessionInfo = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return { title: 'Session inconnue', date: '' };
    
    const course = courses.find(c => c.id === session.course_id);
    const formattedDate = format(parseISO(session.start_date), 'dd MMM yyyy', { locale: fr });
    
    return {
      title: course?.title || 'Cours inconnu',
      date: formattedDate
    };
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejetée</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">En attente</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Terminée</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Sort enrollments: pending first, then by date
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    // First sort by status (pending first)
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    
    // Then by enrollment date (most recent first)
    return new Date(b.enrollment_date).getTime() - new Date(a.enrollment_date).getTime();
  });

  if (enrollments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucune inscription trouvée</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscriptions aux formations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEnrollments.map(enrollment => {
            const sessionInfo = getSessionInfo(enrollment.session_id);
            const employeeName = employeeNames[enrollment.employee_id] || 'Employé inconnu';
            const enrollmentDate = format(parseISO(enrollment.enrollment_date), 'dd MMM yyyy', { locale: fr });
            const showActions = showApprovalActions && enrollment.status === 'pending';
            
            return (
              <div key={enrollment.id} className="border rounded-md p-4 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <div className="font-medium">{sessionInfo.title}</div>
                    <div className="text-sm text-muted-foreground">{employeeName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                      <span>Session: {sessionInfo.date}</span>
                      <span>•</span>
                      <span>Demande: {enrollmentDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    {getStatusBadge(enrollment.status)}
                    
                    {showActions && (
                      <div className="flex gap-2 ml-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-7 bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900"
                          onClick={() => onApprove && onApprove(enrollment.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-7 bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900"
                          onClick={() => onReject && onReject(enrollment.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentList;
