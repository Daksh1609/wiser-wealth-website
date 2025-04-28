
import React from "react";
import {
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const isMobile = useIsMobile();

  // Use Popover for mobile devices and Tooltip for desktop
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="inline-block">{children}</div>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-w-[200px] p-2 text-sm">
          <p>{content}</p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipProvider>
      <RadixTooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </RadixTooltip>
    </TooltipProvider>
  );
};
