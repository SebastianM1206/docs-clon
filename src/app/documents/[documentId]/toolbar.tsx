"use client"

import React from 'react'
import { BoldIcon,
     ItalicIcon, 
     ListTodoIcon,
      LucideIcon,
       MessageSquare,
        MessageSquarePlusIcon,
         PrinterIcon,
          Redo2Icon,
           RemoveFormatting,
            SpellCheck,
             SpellCheck2Icon,
              UnderlineIcon,
               Undo2Icon,
                ChevronDownIcon,
                HighlighterIcon,
                  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
    AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
            } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

//types
import { type ColorResult, SketchPicker } from "react-color";
import { type Level } from "@tiptap/extension-heading";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  console.log(editor?.getAttributes("link").href, "TEST");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
          <DropdownMenuItem onClick={onUpload} className="cursor-pointer">
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  console.log(editor?.getAttributes("link").href, "TEST");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger onClick={() => setValue(editor?.getAttributes("link").href)} asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://www.example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heding 1", value: 1, fontSize: "32px" },
    { label: "Heding 2", value: 2, fontSize: "24px" },
    { label: "Heding 3", value: 3, fontSize: "20px" },
    { label: "Heding 4", value: 4, fontSize: "18px" },
    { label: "Heding 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 font-[value] rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value as Level }) && "bg-neutral-200/80")
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 font-[value] rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


interface ToolbarButtonProps {
    icon: LucideIcon; // The icon that will be displayed on the button.
    onClick?: () => void; // The function that will be called when the button is clicked.
    isActive?: boolean; // This is an optional prop that will be used to determine if the button is active or not.
}



const ToolbarButton = ({icon:Icon,onClick,isActive}:ToolbarButtonProps)=>{
    return (
        <button className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm bg-neutral-200/80",
            isActive && "bg-neutral-200/80"

        )} onClick={onClick}><Icon className='size-4'></Icon></button>

    )
}
// This is the toolbar component that will be used in the editor. It will contain the buttons for formatting the text, adding images, etc.
export const Toolbar = () => {
    // This is the array of sections that will be used to create the toolbar. Each section will contain an array of buttons.
    // the sections has some specific types (label:string, icon:LucideIcon, onClick?:()=>void, isActive?:boolean) that's why we are using the type assertion here like a object

    const {editor} = useEditorStore(); 



    const sections:{
        label:string;
        icon:LucideIcon;
        onClick?:()=>void;
        isActive?:boolean;
    }[][] = [
        [
            {
                label: 'Undo',
                icon:Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),  // This function will be called when the button is clicked. It will undo the last action in the editor.

            },
            {
                label: 'Redo',
                icon:Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(), // This function will be called when the button is clicked. It will redo the last action in the editor.
            },
            {
                label: 'print',
                icon: PrinterIcon,
                onClick: () => window.print(), // It will print the document in the editor.
            },
            {label: 'spell check',
                icon: SpellCheck,
                onClick: ()=> editor?.view.dom.getAttribute("spellcheck") === "true" ? editor?.view.dom.setAttribute("spellcheck","false") : editor?.view.dom.setAttribute("spellcheck","true"), //  It will toggle the spell check in the editor.
            }
        ],
        [
            {
                label: 'Bold',
                icon: BoldIcon,
                isActive: editor?.isActive('bold'), // This will check if the text is bold or not.
                onClick: () => editor?.chain().focus().toggleBold().run(), //  It will toggle the bold formatting in the editor.
            },
            {
                label: 'Italic',
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'), // This will check if the text is italic or not.
                onClick: () => editor?.chain().focus().toggleItalic().run(), //  It will toggle the italic formatting in the editor.
            },
            {
                label: 'Underline',
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'), // This will check if the text is underline or not.
                onClick: () => editor?.chain().focus().toggleUnderline().run(), //  It will toggle the underline formatting in the editor.
            }
        ],
        [
            { 
                label: "Comment", 
                icon: MessageSquarePlusIcon,
                onClick: () => console.log("Comment, you shouldn't forget to do it "), 
                isActive: false //Idk if this is needed
            },
            {
                label: "list todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(), 
                isActive: editor?.isActive('taskList'), 
            },
            {
                label:"Remove formatting",
                icon:RemoveFormatting,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(), // This will remove all the formatting from the selected text.
                
            }
        ]
    ]
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto '>
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
         <FontFamilyButton />
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
         <HeadingLevelButton />
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/* This is something i may forget FONT SIZE*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {sections[1].map((item) => (  //using the second section of the array to create the buttons in the toolbar.
            <ToolbarButton key={item.label} {...item} />
        ))} 
        
          <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            <LinkButton />
      <ImageButton />
       <AlignButton />
        <ListButton />
        
        {sections[2].map((item) => (  //using the third section of the array to create the buttons in the toolbar.
            <ToolbarButton key={item.label} {...item} />
        ))}

    </div>
  )
}

