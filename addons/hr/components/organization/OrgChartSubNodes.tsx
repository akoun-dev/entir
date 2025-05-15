
import React from 'react';
import { OrgChartPerson } from '../../types/organization';
import { OrgChartConfig } from '../../hooks/useOrgChartConfig';
import { Droppable } from 'react-beautiful-dnd';
import OrgChartNode from './OrgChartNode';

interface OrgChartSubNodesProps {
  persons: OrgChartPerson[];
  onPersonClick?: (person: OrgChartPerson) => void;
  config: OrgChartConfig;
  isDraggable?: boolean;
}

const OrgChartSubNodes: React.FC<OrgChartSubNodesProps> = ({
  persons,
  onPersonClick,
  config,
  isDraggable = false
}) => {
  if (!persons || persons.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="relative flex justify-center">
        <div className="absolute top-0 w-full h-px bg-gray-300"></div>
        <div className="flex flex-wrap justify-center gap-8 pb-4">
          {persons.map((person, index) => (
            <div key={person.id} className="flex flex-col items-center mt-4">
              <div className="w-px h-8 bg-gray-300"></div>
              <Droppable 
                droppableId={person.id} 
                type="PERSON" 
                isDropDisabled={!isDraggable}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col items-center ${snapshot.isDraggingOver ? 'bg-amber-50 p-2 rounded-lg' : ''}`}
                    data-droppable-id={person.id}
                  >
                    <OrgChartNode 
                      person={person}
                      index={index}
                      onPersonClick={onPersonClick}
                      config={config}
                      isDraggable={isDraggable}
                    />
                    {provided.placeholder}
                    {person.children && person.children.length > 0 && (
                      <OrgChartSubNodes 
                        persons={person.children} 
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

export default React.memo(OrgChartSubNodes);
