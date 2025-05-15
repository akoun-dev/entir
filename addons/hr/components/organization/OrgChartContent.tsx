
import React from 'react';
import { Card, CardContent } from '../../../../src/components/ui/card';
import { OrgChartPerson } from '../../types/organization';
import { OrgChartConfig } from '../../hooks/useOrgChartConfig';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import OrgChartNode from './OrgChartNode';
import OrgChartSubNodes from './OrgChartSubNodes';
import { DragDropResult } from '../../hooks/useOrgChartDragDrop';

interface OrgChartContentProps {
  rootData: OrgChartPerson;
  scale: number;
  editModeEnabled: boolean;
  readOnly: boolean;
  onPersonClick?: (person: OrgChartPerson) => void;
  config: OrgChartConfig;
  handleDragEnd: (result: DragDropResult) => void;
}

const OrgChartContent: React.FC<OrgChartContentProps> = ({
  rootData,
  scale,
  editModeEnabled,
  readOnly,
  onPersonClick,
  config,
  handleDragEnd
}) => {
  // Wrapper autour du handleDragEnd pour assurer la compatibilité des types
  const onDragEnd = (result: DropResult) => {
    // Ne rien faire si déposé hors d'une zone de dépôt
    if (!result.destination) return;
    
    // Convertir DropResult en DragDropResult et appeler le handler
    handleDragEnd(result as DragDropResult);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm overflow-auto">
      <CardContent className="p-6">
        <div 
          className="min-w-max"
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center', 
            transition: 'transform 0.3s ease'
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col items-center">
              <Droppable 
                droppableId={rootData.id} 
                type="PERSON" 
                isDropDisabled={!editModeEnabled || readOnly}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col items-center"
                  >
                    <OrgChartNode 
                      person={rootData}
                      index={0}
                      isRoot={true} 
                      onPersonClick={onPersonClick} 
                      config={config}
                      isDraggable={editModeEnabled && !readOnly}
                    />
                    {provided.placeholder}
                    
                    <OrgChartHierarchy 
                      children={rootData.children} 
                      onPersonClick={onPersonClick}
                      config={config}
                      isDraggable={editModeEnabled && !readOnly}
                    />
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </CardContent>
    </Card>
  );
};

// Extracted hierarchy rendering component
const OrgChartHierarchy: React.FC<{
  children?: OrgChartPerson[];
  onPersonClick?: (person: OrgChartPerson) => void;
  config: OrgChartConfig;
  isDraggable: boolean;
}> = ({ children, onPersonClick, config, isDraggable }) => {
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="relative flex justify-center">
        <div className="absolute top-0 w-full h-px bg-gray-300"></div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {children.map((child, index) => (
            <div key={child.id} className="flex flex-col items-center mt-4">
              <div className="w-px h-8 bg-gray-300"></div>
              <Droppable droppableId={child.id} type="PERSON" isDropDisabled={!isDraggable}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col items-center"
                  >
                    <OrgChartNode 
                      person={child}
                      index={index}
                      onPersonClick={onPersonClick}
                      config={config}
                      isDraggable={isDraggable}
                    />
                    {provided.placeholder}
                    {child.children && child.children.length > 0 && (
                      <OrgChartSubNodes 
                        persons={child.children} 
                        onPersonClick={onPersonClick}
                        config={config}
                        isDraggable={isDraggable}
                      />
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(OrgChartContent);
