import {create } from 'zustand';
import {Editor} from '@tiptap/react';

// Zustand store for managing the editor state.
interface EditorState {
    editor: Editor | null; // The editor instance, which can be null if not initialized.
    setEditor: (editor: Editor | null) => void; // Function to set the editor instance.
}


export const useEditorStore = create<EditorState>((set)=>({
    editor: null, // Initial state of the editor is null.
    setEditor: (editor) => set({ editor }), // Function to set the editor instance.
}));

  


