import React from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const TextAlignment = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      {/* Left */}
      <Toggle
        className="rounded-md"
        variant="outline"
        size="sm"
        type="button"
        pressed={editor.isActive({ textAlign: "left" })}
        onClick={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft size={15} />
      </Toggle>

      {/* Center */}
      <Toggle
        className="rounded-md"
        variant="outline"
        size="sm"
        type="button"
        pressed={editor.isActive({ textAlign: "center" })}
        onClick={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter size={15} />
      </Toggle>

      {/* Right */}
      <Toggle
        className="rounded-md"
        variant="outline"
        size="sm"
        type="button"
        pressed={editor.isActive({ textAlign: "right" })}
        onClick={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight size={15} />
      </Toggle>

      {/* Justify */}
      <Toggle
      className="rounded-md"
        variant="outline"
        size="sm"
        type="button"
        pressed={editor.isActive({ textAlign: "justify" })}
        onClick={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
      >
        <AlignJustify size={15} />
      </Toggle>
    </div>
  );
};

export default TextAlignment;