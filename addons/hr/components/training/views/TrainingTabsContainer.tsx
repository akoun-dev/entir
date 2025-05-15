
import React from 'react';
import { BookOpen, Calendar, ClipboardList } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../../src/components/ui/tabs';

interface TrainingTabsContainerProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  coursesTabContent: React.ReactNode;
  sessionsTabContent: React.ReactNode;
  calendarTabContent: React.ReactNode;
  enrollmentsTabContent: React.ReactNode;
}

const TrainingTabsContainer: React.FC<TrainingTabsContainerProps> = ({
  activeTab,
  setActiveTab,
  coursesTabContent,
  sessionsTabContent,
  calendarTabContent,
  enrollmentsTabContent
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-4 h-auto">
        <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
          <BookOpen className="h-4 w-4" />
          <span>Catalogue</span>
        </TabsTrigger>
        <TabsTrigger value="sessions" className="flex items-center gap-2 py-3">
          <Calendar className="h-4 w-4" />
          <span>Sessions à venir</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
          <Calendar className="h-4 w-4" />
          <span>Calendrier</span>
        </TabsTrigger>
        <TabsTrigger value="enrollments" className="flex items-center gap-2 py-3">
          <ClipboardList className="h-4 w-4" />
          <span>Inscriptions</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="courses" className="space-y-6">
        {coursesTabContent}
      </TabsContent>
      
      <TabsContent value="sessions" className="space-y-6">
        {sessionsTabContent}
      </TabsContent>
      
      <TabsContent value="calendar">
        {calendarTabContent}
      </TabsContent>
      
      <TabsContent value="enrollments">
        {enrollmentsTabContent}
      </TabsContent>
    </Tabs>
  );
};

export default TrainingTabsContainer;
