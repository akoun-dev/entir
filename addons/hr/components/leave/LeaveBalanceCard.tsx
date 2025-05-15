
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalance } from '../../types';

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
}

const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ balance }) => {
  // Calculer le pourcentage utilisé
  const percentUsed = Math.round((balance.total_taken / balance.total_allocated) * 100);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {balance.leave_type_name}
        </CardTitle>
        <CardDescription>
          {balance.year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-1">
          <div className="text-2xl font-bold">
            {balance.remaining} <span className="text-sm text-muted-foreground">jours</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{balance.total_taken}</span>/{balance.total_allocated} utilisés
          </div>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveBalanceCard;
