
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Leave } from '../../types';

interface LeaveCalendarProps {
  leaves: Leave[];
}

interface CalendarDay {
  date: Date;
  leaves: Leave[];
}

const LeaveCalendar: React.FC<LeaveCalendarProps> = ({ leaves }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // Function to modify the calendar day element directly
  const modifiers = {
    leaveApproved: (date: Date) => {
      return leaves.some(leave => {
        const fromDate = new Date(leave.date_from);
        const toDate = new Date(leave.date_to);
        return date >= fromDate && date <= toDate && leave.state === 'approved';
      });
    },
    leavePending: (date: Date) => {
      return leaves.some(leave => {
        const fromDate = new Date(leave.date_from);
        const toDate = new Date(leave.date_to);
        return date >= fromDate && date <= toDate && leave.state !== 'approved';
      });
    }
  };

  const modifiersStyles = {
    leaveApproved: {
      backgroundColor: '#E5DEFF',
      borderRadius: '4px',
      color: '#000',
    },
    leavePending: {
      backgroundColor: '#FDE1D3',
      borderRadius: '4px',
      color: '#000',
    }
  };

  return (
    <div className="border rounded-lg bg-card p-4 w-full">
      <Calendar
        mode="single"
        selected={new Date()}
        onMonthChange={setSelectedMonth}
        className="w-full"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#E5DEFF] mr-2"></div>
          <span>Congés approuvés</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#FDE1D3] mr-2"></div>
          <span>Congés en attente</span>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
