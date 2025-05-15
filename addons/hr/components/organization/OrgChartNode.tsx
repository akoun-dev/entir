
import React from 'react';
import { OrgChartPerson } from '../../types/organization';
import { OrgChartConfig } from '../../hooks/useOrgChartConfig';
import { Draggable } from 'react-beautiful-dnd';

interface OrgChartNodeProps {
  person: OrgChartPerson;
  index: number;
  isRoot?: boolean;
  onPersonClick?: (person: OrgChartPerson) => void;
  config: OrgChartConfig;
  isDraggable?: boolean;
}

const OrgChartNode: React.FC<OrgChartNodeProps> = ({
  person,
  index,
  isRoot = false,
  onPersonClick,
  config,
  isDraggable = false
}) => {
  const getNodeBackgroundColor = () => {
    if (config.colorByDepartment) {
      return config.departmentColors[person.department] || config.defaultNodeColor;
    }
    
    if (isRoot) return '#dbeafe'; // blue-50
    
    switch (person.department) {
      case 'Ressources Humaines':
        return '#dcfce7'; // green-50
      case 'Finance':
        return '#fef9c3'; // yellow-50
      case 'Technique':
        return '#f3e8ff'; // purple-50
      default:
        return '#f9fafb'; // gray-50
    }
  };

  const getBorderColor = () => {
    const bgColor = getNodeBackgroundColor();
    // Create slightly darker border color
    return bgColor.replace(/^#/, '').match(/.{2}/g)?.map(hex => {
      // Make each RGB component about 10% darker
      const component = parseInt(hex, 16);
      return Math.max(0, component - 25).toString(16).padStart(2, '0');
    }).join('') || '#e5e7eb'; // Default to gray-200 if parsing fails
  };
  
  const handleClick = () => {
    if (onPersonClick) onPersonClick(person);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const nodeWidth = config.nodeWidth || 64;
  const backgroundColor = getNodeBackgroundColor();
  const borderColor = getBorderColor();

  return (
    <Draggable
      draggableId={person.id}
      index={index}
      isDragDisabled={!isDraggable || person.id === 'root' || isRoot}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`transition-all duration-200 ${snapshot.isDragging ? 'opacity-70 z-50 scale-105' : ''}`}
          data-dragging={snapshot.isDragging ? 'true' : 'false'}
        >
          <div 
            className="rounded-md border p-4 cursor-pointer hover:shadow-md transition-all"
            style={{ 
              width: `${nodeWidth}px`, 
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              boxShadow: snapshot.isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.2)' : 'none',
              transform: snapshot.isDragging ? 'rotate(2deg)' : 'rotate(0)'
            }}
            onClick={handleClick}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {person.imageUrl ? (
                  <img 
                    src={person.imageUrl} 
                    alt={person.name} 
                    className="h-12 w-12 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
                    {getInitials(person.name)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{person.name}</h4>
                {config.showPosition && person.position && (
                  <p className="text-xs text-gray-500 truncate">{person.position}</p>
                )}
                {config.showDepartment && person.department && (
                  <p className="text-xs text-gray-500 truncate">{person.department}</p>
                )}
                {config.showEmail && person.email && (
                  <p className="text-xs text-gray-500 truncate">{person.email}</p>
                )}
                {config.showPhone && person.phone && (
                  <p className="text-xs text-gray-500 truncate">{person.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(OrgChartNode);
