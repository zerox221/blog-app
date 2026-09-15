import React, { useState } from "react";
import { Palette } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const colors = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#78716c",
  "#6b7280",
];

const ColorPicker = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  if (!editor) return null;

  const setColor = (color) => {
    editor
      .chain()
      .focus()
      .setColor(color)
      .run();

    setSelectedColor(color);

    // Close palette
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
      >
        <div className="relative">
          <Palette size={16} />

          {/* Color indicator */}
          <span
            className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              className="h-7 w-7 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
              onMouseDown={(e) => {
                e.preventDefault();
                setColor(color);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;