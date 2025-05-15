
import { Employee } from '../../types/employee';

/**
 * Configuration for the profile header
 */
export interface HeaderConfig {
  text: string;
  logo?: string;
  showLogo: boolean;
}

/**
 * Configuration for the profile footer
 */
export interface FooterConfig {
  text: string;
  showContactInfo: boolean;
  showAddress: boolean;
}

/**
 * Combined configuration for header and footer
 */
export interface HeaderFooterConfig {
  header: HeaderConfig;
  footer: FooterConfig;
}

/**
 * Template for employee profile display
 */
export interface ProfileTemplate {
  id: string;
  name: string;
  description?: string;
  headerFooterConfig: HeaderFooterConfig;
  showQRCode: boolean;
  qrCodePosition: 'header' | 'body' | 'footer';
  showDepartmentInfo: boolean;
  showManagerInfo: boolean;
  showJobTitle: boolean;
}

/**
 * Employee data specific to profile display
 */
export interface ProfileEmployee {
  id?: string;
  name: string;
  job_title?: string;
  department_id?: string;
  department_name?: string;
  work_email?: string;
  work_phone?: string;
  manager_id?: string;
  manager_name?: string;
  is_active?: boolean;
  photo?: string;
  notes?: string;
  address?: string;
}

/**
 * Props for the profile header component
 */
export interface ProfileHeaderProps {
  headerConfig: HeaderConfig;
  showQRCode: boolean;
  qrCodePosition: string;
  getProfileUrl: () => string;
  onHeaderFooterEdit: () => void;
}

/**
 * Props for the profile content component
 */
export interface ProfileContentProps {
  employee: ProfileEmployee;
  isEditing: boolean;
  updateField: (field: string, value: string) => void;
  currentTemplate: ProfileTemplate;
  getProfileUrl: () => string;
}

/**
 * Props for the profile footer component
 */
export interface ProfileFooterProps {
  footerConfig: FooterConfig;
  employee: Partial<ProfileEmployee>;
  showQRCode: boolean;
  qrCodePosition: string;
  getProfileUrl: () => string;
}

/**
 * Props for the header tab component
 */
export interface HeaderTabProps {
  headerConfig: HeaderConfig;
  onChange: (config: HeaderConfig) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileUpload: () => void;
}

/**
 * Props for the footer tab component
 */
export interface FooterTabProps {
  footerConfig: FooterConfig;
  onChange: (config: FooterConfig) => void;
}

/**
 * Props for the profile header/footer editor component
 */
export interface ProfileHeaderFooterProps {
  config: HeaderFooterConfig;
  onChange: (config: HeaderFooterConfig) => void;
  onSave?: () => void;
}

/**
 * Props for the QR code component
 */
export interface QRCodeComponentProps {
  value: string;
  size?: number;
  title?: string;
  downloadable?: boolean;
}

/**
 * Props for the profile actions component
 */
export interface ProfileActionsProps {
  isEditing: boolean;
  saving: boolean;
  isPdfGenerating: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTemplateClick: () => void;
  onPrintClick: () => void;
  onPdfExport: () => void;
}

/**
 * Props for the template selector component
 */
export interface TemplateSelectorProps {
  templates: ProfileTemplate[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  label?: string;
}

/**
 * Props for the header/footer dialog component
 */
export interface HeaderFooterDialogProps {
  currentTemplate: ProfileTemplate;
  selectedTemplate: string;
  updateHeaderFooterConfig: (templateId: string, config: HeaderFooterConfig) => void;
  onClose: () => void;
}

/**
 * Props for the template dialog component
 */
export interface TemplateDialogProps {
  templates: ProfileTemplate[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  currentTemplate: ProfileTemplate;
}

/**
 * Props for the print dialog component
 */
export interface PrintDialogProps {
  employee: {
    name: string;
    job_title?: string;
    department_name?: string;
  };
  onPrint: () => void;
  onClose: () => void;
}

/**
 * Props for the editable field component
 */
export interface EditableFieldProps {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
}

/**
 * Props for the profile top bar component
 */
export interface ProfileTopBarProps {
  employeeName: string;
  isEditing: boolean;
  saving: boolean;
  isPdfGenerating: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTemplateClick: () => void;
  onPrintClick: () => void;
  onPdfExport: () => void;
}

/**
 * Props for the profile dialogs component
 */
export interface ProfileDialogsProps {
  templateDialogOpen: boolean;
  setTemplateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerFooterDialogOpen: boolean;
  setHeaderFooterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  printDialogOpen: boolean;
  setPrintDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templates: ProfileTemplate[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  currentTemplate: ProfileTemplate;
  updateHeaderFooterConfig: (templateId: string, config: HeaderFooterConfig) => void;
  employee: Partial<ProfileEmployee>;
  onPrint: () => void;
}

/**
 * Return type for useProfileEditing hook
 */
export interface UseProfileEditingReturn {
  employee: Partial<Employee>;
  loading: boolean;
  saving: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  saveEmployee: () => Promise<void>;
  cancelEditing: () => void;
  updateField: (field: string, value: any) => void;
  getProfileUrl: () => string;
}

/**
 * Return type for useEmployeeTemplates hook
 */
export interface UseEmployeeTemplatesReturn {
  templates: ProfileTemplate[];
  selectedTemplate: string;
  handleTemplateChange: (templateId: string) => void;
  updateHeaderFooterConfig: (templateId: string, config: HeaderFooterConfig) => void;
  saveNewTemplate: (template: ProfileTemplate) => ProfileTemplate;
  getCurrentTemplate: () => ProfileTemplate;
}

/**
 * Return type for usePdfExport hook
 */
export interface UsePdfExportReturn {
  generatePDF: (element: HTMLElement, filename: string) => Promise<void>;
  isPdfGenerating: boolean;
}

/**
 * Props for the employee profile container
 */
export interface EmployeeProfileContainerProps {
  profileRef: React.RefObject<HTMLDivElement>;
  employee?: Partial<Employee>;
  loading: boolean;
  saving: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  saveEmployee: () => Promise<void>;
  cancelEditing: () => void;
  updateField: (field: string, value: any) => void;
  getProfileUrl: () => string;
  templates: ProfileTemplate[];
  selectedTemplate: string;
  handleTemplateChange: (templateId: string) => void;
  getCurrentTemplate: () => ProfileTemplate;
  updateHeaderFooterConfig: (templateId: string, config: HeaderFooterConfig) => void;
  generatePDF: (element: HTMLElement, filename: string) => Promise<void>;
  isPdfGenerating: boolean;
  employeeId?: string;
}
