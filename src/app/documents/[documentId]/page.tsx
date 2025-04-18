import React from 'react'
import { Editor } from './editor' // Importing the editor component from the editor.tsx file.


interface DocumentIdPageProps {
    params: Promise<{documentId: string}>;
};
// This is the type for the props that will be passed to the component. It includes the documentId parameter from the URL.
// The params object contains the dynamic segments of the URL, which in this case is documentId.


// I need to remember, props are passed to the component as an object, so I need to destructure it to get the documentId parameter.
//and i'm using typescript to define the type of the props that will be passed to the component.

const DocumentIdPage = async({params}: DocumentIdPageProps)=> {
    const {documentId} = await params; // Extracting the documentId from the params object.
  return (
    <div className='min-h-screen bg-[#FAFBFD] '>

        <Editor /> 
    </div>
  )
}

export default DocumentIdPage