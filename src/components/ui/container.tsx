
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
