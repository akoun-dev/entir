
import React from "react";
import { Container } from "./ui/container";

export function Header() {
  return (
    <header className="py-6 border-b border-border/40">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg"></div>
            <span className="text-xl font-medium">AppName</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg transition hover:bg-primary/90">
              Get Started
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
