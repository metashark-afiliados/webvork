// src/components/ui/DropdownMenu/Content.tsx
/**
 * @file Content.tsx
 * @description Panel de contenido animado para el DropdownMenu.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/DropdownMenu/DropdownMenu.md
 */
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useDropdownMenuContext } from "./Context";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, className, align = "end" }, ref) => {
    const { isOpen, setIsOpen } = useDropdownMenuContext();
    const internalRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current!);

    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (isOpen && event.key === "Escape") setIsOpen(false);
      };
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          internalRef.current &&
          !internalRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, setIsOpen]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={internalRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={twMerge(
              "absolute z-50 mt-2 w-56 rounded-md bg-background shadow-lg ring-1 ring-white/10 focus:outline-none",
              align === "end"
                ? "right-0 origin-top-right"
                : "left-0 origin-top-left",
              className
            )}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1" role="none">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Content.displayName = "DropdownMenuContent";
// src/components/ui/DropdownMenu/Content.tsx