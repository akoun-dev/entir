
import React from "react";
import { Container } from "./ui/container";

export function Footer() {
  return (
    <footer className="py-8 mt-auto border-t border-border/40">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-md"></div>
              <span className="text-lg font-medium">AppName</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A beautiful starting point for your next amazing project.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-border/40">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} AppName. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
