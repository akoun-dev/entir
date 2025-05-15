
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../../src/components/ui/card';
import { OrgChartPerson } from '../../types/organization';
import { useOrgChartConfig } from '../../hooks/useOrgChartConfig';
import OrgChartNode from './OrgChartNode';
import OrgChartSubNodes from './OrgChartSubNodes';
import OrgChartToolbar from './OrgChartToolbar';
import OrgChartContent from './OrgChartContent';
import useOrgChartActions from './OrgChartActions';
import { useOrgChartDragDrop } from '../../hooks/useOrgChartDragDrop';

interface OrgChartProps {
  rootPerson: OrgChartPerson;
  onPersonClick?: (person: OrgChartPerson) => void;
  onStructureChange?: (updatedRoot: OrgChartPerson) => void;
  readOnly?: boolean;
}

const OrgChart: React.FC<OrgChartProps> = ({ 
  rootPerson, 
  onPersonClick,
  onStructureChange,
  readOnly = false
}) => {
  const [scale, setScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const { config, loaded } = useOrgChartConfig();
  const chartActions = useOrgChartActions({ data: rootPerson });
  
  // Utiliser useOrgChartDragDrop pour gérer le drag and drop
  const {
    rootData,
    hasChanges,
    handleDragEnd,
    handleSaveChanges,
    handleDiscardChanges,
    updateRootData
  } = useOrgChartDragDrop(rootPerson, editModeEnabled, readOnly, onStructureChange);

  // Mettre à jour les données locales quand les props changent
  useEffect(() => {
    console.log("OrgChart: rootPerson changed, updating rootData");
    updateRootData(rootPerson);
  }, [rootPerson, updateRootData]);

  // Afficher un indicateur de chargement si la configuration n'est pas chargée
  if (!loaded) {
    return <div className="p-8 text-center">Chargement de l'organigramme...</div>;
  }

  // Debug mode: afficher des informations utiles dans la console
  console.log("OrgChart rendering with:", {
    editModeEnabled,
    readOnly,
    hasChanges,
    rootDataExists: !!rootData,
    rootChildren: rootData?.children?.length
  });

  return (
    <div className="w-full">
      <OrgChartToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scale={scale}
        setScale={setScale}
        editModeEnabled={editModeEnabled}
        setEditModeEnabled={setEditModeEnabled}
        readOnly={readOnly}
        hasChanges={hasChanges}
        handleDiscardChanges={handleDiscardChanges}
        handleSaveChanges={handleSaveChanges}
        handleExport={chartActions.handleExport}
        configDialogOpen={configDialogOpen}
        setConfigDialogOpen={setConfigDialogOpen}
        importDialogOpen={importDialogOpen}
        setImportDialogOpen={setImportDialogOpen}
      />

      <OrgChartContent
        rootData={rootData}
        scale={scale}
        editModeEnabled={editModeEnabled}
        readOnly={readOnly}
        onPersonClick={onPersonClick}
        config={config}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default OrgChart;
