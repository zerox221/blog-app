import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Heading, Italic, List, ListOrdered, Quote } from "lucide-react";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import ColorPicker from "./ColorPallate";
import TextAlign from "@tiptap/extension-text-align";
import TextAlignment from "./TextAlignment";

const TipTapEditor = ({ value, onChange }) => {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md">
      <div className="w-full flex overflow-x-scroll bar gap-4 border-b p-4">
        {/* bold */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={15} />
          </Toggle>
        </div>
        {/* itallic  */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={15} />
          </Toggle>
        </div>
        {/* h1 heading */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </Toggle>
        </div>
        {/* h2 heading */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </Toggle>
        </div>
        {/* color picker */}
        <div>
          <ColorPicker editor={editor} />
        </div>
        {/* underline */}
        <div>
          <Toggle
            variant="outline"
            size="sm"
            className="rounded-md"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            U
          </Toggle>
        </div>
        {/* bullet points */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={15} />
          </Toggle>
        </div>

        {/* quotes */}
        <div>
          <Toggle
            variant="outline"
            className="rounded-md"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={15} />
          </Toggle>
        </div>

        {/* text aligment */}
        <TextAlignment editor={editor}/>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
