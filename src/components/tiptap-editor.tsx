"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function TiptapEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] rounded border bg-background px-3 py-2 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("bold") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("bulletList") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("orderedList") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
        >
          1. List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
