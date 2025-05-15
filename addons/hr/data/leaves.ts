
import { Leave, LeaveType, LeaveBalance } from '../types';

/**
 * Types de congés disponibles
 */
export const leaveTypes: LeaveType[] = [
  {
    id: "1",
    name: "Congés payés",
    code: "CP",
    color: "#8B5CF6", // Purple
    limit_days: 25,
    requires_approval: true,
    active: true
  },
  {
    id: "2",
    name: "RTT",
    code: "RTT",
    color: "#0EA5E9", // Blue
    limit_days: 12,
    requires_approval: true,
    active: true
  },
  {
    id: "3",
    name: "Maladie",
    code: "MAL",
    color: "#F97316", // Orange
    requires_approval: false,
    active: true
  },
  {
    id: "4",
    name: "Sans solde",
    code: "CSS",
    color: "#71717A", // Gray
    requires_approval: true,
    active: true
  },
  {
    id: "5",
    name: "Événement familial",
    code: "FAM",
    color: "#D946EF", // Pink
    requires_approval: true,
    active: true
  }
];

/**
 * Données de congés pour les employés
 */
export const leaves: Leave[] = [
  {
    id: "1",
    employee_id: "1",
    employee_name: "Thomas Durand",
    date_from: "2024-06-10",
    date_to: "2024-06-21",
    number_of_days: 10,
    state: "approved",
    type: "1",
    type_name: "Congés payés",
    created_at: "2024-05-01T10:15:30Z",
    updated_at: "2024-05-02T14:30:45Z"
  },
  {
    id: "2",
    employee_id: "2",
    employee_name: "Sophie Martin",
    date_from: "2024-07-15",
    date_to: "2024-07-26",
    number_of_days: 10,
    state: "submitted",
    type: "1",
    type_name: "Congés payés",
    created_at: "2024-05-05T09:22:10Z",
    updated_at: "2024-05-05T09:22:10Z"
  },
  {
    id: "3",
    employee_id: "1",
    employee_name: "Thomas Durand",
    date_from: "2024-05-02",
    date_to: "2024-05-02",
    number_of_days: 1,
    state: "approved",
    type: "2",
    type_name: "RTT",
    created_at: "2024-04-25T08:12:30Z",
    updated_at: "2024-04-26T11:05:15Z"
  },
  {
    id: "4",
    employee_id: "3",
    employee_name: "Julie Bernard",
    date_from: "2024-05-20",
    date_to: "2024-05-24",
    number_of_days: 5,
    state: "refused",
    type: "4",
    type_name: "Sans solde",
    description: "Voyage personnel",
    created_at: "2024-04-30T15:40:22Z",
    updated_at: "2024-05-03T10:15:30Z"
  },
  {
    id: "5",
    employee_id: "4",
    employee_name: "Marc Petit",
    date_from: "2024-04-28",
    date_to: "2024-05-15",
    number_of_days: 12,
    state: "approved",
    type: "3",
    type_name: "Maladie",
    created_at: "2024-04-28T09:30:00Z",
    updated_at: "2024-04-28T14:45:20Z"
  }
];

/**
 * Soldes de congés pour les employés
 */
export const leaveBalances: LeaveBalance[] = [
  {
    id: "1",
    employee_id: "1",
    employee_name: "Thomas Durand",
    leave_type_id: "1",
    leave_type_name: "Congés payés",
    total_allocated: 25,
    total_taken: 10,
    remaining: 15,
    year: 2024
  },
  {
    id: "2",
    employee_id: "1",
    employee_name: "Thomas Durand",
    leave_type_id: "2",
    leave_type_name: "RTT",
    total_allocated: 12,
    total_taken: 1,
    remaining: 11,
    year: 2024
  },
  {
    id: "3",
    employee_id: "2",
    employee_name: "Sophie Martin",
    leave_type_id: "1",
    leave_type_name: "Congés payés",
    total_allocated: 25,
    total_taken: 0,
    remaining: 25,
    year: 2024
  },
  {
    id: "4",
    employee_id: "2",
    employee_name: "Sophie Martin",
    leave_type_id: "2",
    leave_type_name: "RTT",
    total_allocated: 12,
    total_taken: 2,
    remaining: 10,
    year: 2024
  },
  {
    id: "5",
    employee_id: "3",
    employee_name: "Julie Bernard",
    leave_type_id: "1",
    leave_type_name: "Congés payés",
    total_allocated: 25,
    total_taken: 5,
    remaining: 20,
    year: 2024
  }
];
