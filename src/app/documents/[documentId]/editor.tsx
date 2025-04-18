'use client' // This is a client component that will be rendered on the client side, not on the server side. in this case, we are using tiptap, which is a client-side library for building rich text editors. 

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'



export const Editor = () => {

    const editor = useEditor({
        editorProps: {
            attributes: { 
                style: 'padding-left: 56px; padding-right: 56px; ',
                class: ' focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text dark:prose-invert max-w-none' }, // This is the class that will be applied to the editor content area.
        },
        extensions: [StarterKit,TaskList,
            TaskItem.configure({
              nested: true,
            }),
            Table.configure({
                resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell, 
            Image, ImageResize    ],
        content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
      })
  return (
    <div className='size-full overflow-x-auto px bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'> 
        <div className='min-w-screen flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0' >
            <EditorContent editor={editor} /> {/* This is the content area of the editor. It will be rendered here. */}
        </div>
    </div>
  )
}

