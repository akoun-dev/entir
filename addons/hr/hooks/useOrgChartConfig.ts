
import { useState, useEffect } from 'react';

export interface OrgChartConfig {
  // Display options
  showEmail: boolean;
  showPhone: boolean;
  showDepartment: boolean;
  showPosition: boolean;
  maxDepth: number;
  displayMode: 'hierarchical' | 'flat' | 'department';
  // Appearance options
  colorByDepartment: boolean;
  defaultNodeColor: string;
  nodeWidth: number;
  nodeHeight: number;
  departmentColors: Record<string, string>;
  // Drag and drop options
  allowDragDrop?: boolean;
  restrictDragToSameLevel?: boolean;
  confirmOnDrop?: boolean;
  animateDragDrop?: boolean;
}

const defaultConfig: OrgChartConfig = {
  showEmail: true,
  showPhone: true,
  showDepartment: true,
  showPosition: true,
  maxDepth: 4,
  displayMode: 'hierarchical',
  colorByDepartment: true,
  defaultNodeColor: '#f3f4f6', // gray-100
  nodeWidth: 240, // Increased for better readability
  nodeHeight: 16,
  departmentColors: {
    'Direction Générale': '#dbeafe', // blue-100
    'Ressources Humaines': '#dcfce7', // green-100
    'Finance': '#fef9c3', // yellow-100
    'Technique': '#f3e8ff', // purple-100
    'Marketing': '#ffedd5', // orange-100
    'Ventes': '#fee2e2', // red-100
  },
  // Default drag and drop options
  allowDragDrop: true,
  restrictDragToSameLevel: false,
  confirmOnDrop: true,
  animateDragDrop: true
};

export const useOrgChartConfig = () => {
  const [config, setConfig] = useState<OrgChartConfig>(defaultConfig);
  const [loaded, setLoaded] = useState(false);

  // Load configuration from localStorage on component mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('orgChartConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // Ensure all departmentColors are valid hex codes
        if (parsedConfig.departmentColors) {
          Object.keys(parsedConfig.departmentColors).forEach(dept => {
            const color = parsedConfig.departmentColors[dept];
            if (!color.startsWith('#')) {
              parsedConfig.departmentColors[dept] = defaultConfig.departmentColors[dept] || defaultConfig.defaultNodeColor;
            }
          });
        }
        setConfig(current => ({ ...current, ...parsedConfig }));
      }
      setLoaded(true);
    } catch (error) {
      console.error('Error parsing organization chart configuration:', error);
      setLoaded(true);
    }
  }, []);

  // Update a specific configuration parameter
  const updateConfig = (updates: Partial<OrgChartConfig>) => {
    setConfig(current => {
      const newConfig = { ...current, ...updates };
      try {
        localStorage.setItem('orgChartConfig', JSON.stringify(newConfig));
      } catch (error) {
        console.error('Error saving organization chart configuration:', error);
      }
      return newConfig;
    });
  };

  // Reset configuration to defaults
  const resetConfig = () => {
    try {
      localStorage.removeItem('orgChartConfig');
    } catch (error) {
      console.error('Error removing organization chart configuration:', error);
    }
    setConfig(defaultConfig);
  };

  return {
    config,
    loaded,
    updateConfig,
    resetConfig
  };
};
