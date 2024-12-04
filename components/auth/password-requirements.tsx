"use client";

import { Check, X } from "lucide-react";

interface PasswordRequirement {
  text: string;
  met: boolean;
}

interface PasswordRequirementsProps {
  requirements: PasswordRequirement[];
}

export function PasswordRequirements({ requirements }: PasswordRequirementsProps) {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium text-muted-foreground">Password must contain:</p>
      <ul className="space-y-1">
        {requirements.map((requirement, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            {requirement.met ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            {requirement.text}
          </li>
        ))}
      </ul>
    </div>
  );
}