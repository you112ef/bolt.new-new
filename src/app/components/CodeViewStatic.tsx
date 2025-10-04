"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import { MessageContext } from '@/data/context/MessageContext';
import { useModel } from '@/data/context/ModelContext';
import Prompt from '@/data/Prompt';
import { AIClient } from '@/lib/ai-client';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

const CodeViewStatic = () => {
  const {id}=useParams()
  const [activeTab,setActiveTab]=useState('code')
  const [Files,setFiles]=useState(Lookup.DEFAULT_FILE)
  const {messages,setMessages}=useContext<any>(MessageContext)
  const {selectedModel} = useModel()
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    id&&GetFiles()
  },[id])

  const GetFiles=async()=>{
    setLoading(true)
    
    try {
      // Use localStorage for static builds
      const savedFiles = localStorage.getItem(`workspace-files-${id}`);
      if (savedFiles) {
        setFiles(JSON.parse(savedFiles));
      } else {
        setFiles(Lookup.DEFAULT_FILE);
      }
    } catch (error) {
      console.error("Error loading files:", error);
      setFiles(Lookup.DEFAULT_FILE);
    }
    
    setLoading(false)
  }

  useEffect(()=>{
    if(messages?.length > 0){
       const role= messages[messages.length-1].role;
        if(role === 'user'){
          GenerateAiCode()
        }
    }
  },[messages])

  const GenerateAiCode=async()=>{
    setActiveTab('code')
    setLoading(true)
    const PROMPT= JSON.stringify(messages)+" "+Prompt.CODE_GEN_PROMPT
    
    try {
      const aiResponse = await AIClient.generateCode(PROMPT, selectedModel.id);
      console.log("ai-code",aiResponse)

      const mergeFiles= {...Files,...aiResponse?.files}
      setFiles(mergeFiles)
      
      // Save to localStorage for static builds
      localStorage.setItem(`workspace-files-${id}`, JSON.stringify(mergeFiles));
    } catch (error) {
      console.error("Error generating code:", error);
    }
    
    setLoading(false)
  }

  return (
    <div className='relative'>
      <div className='bg-[#181818] w-full p-2 border -mt-10'>
        <div className='flex gap-3 items-center justify-center flex-wrap shrink-0 bg-black p-1 w-[140px] rounded-full'>
          <h2 className={`text-sm cursor-pointer ${activeTab=='code'&& 'text-blue-500 bg-blue-500 bg-opacity-25  p-1 px-2 rounded-full  '}`}
          onClick={()=>setActiveTab('code')}>Code</h2>
          <h2 className={`text-sm cursor-pointer ${activeTab=='preview'&& 'text-blue-500 bg-blue-500 bg-opacity-25  p-1 px-2 rounded-full  '}`}
          onClick={()=>setActiveTab('preview')}>Preview</h2>
        </div>
      </div>
      <SandpackProvider template='react' theme={'dark'} 
      files={Files}
      options={{
        externalResources:['https://unpkg.com/@tailwindcss/browser@4']
      }}
      customSetup={{
        dependencies:{
          ...Lookup.DEPENDENCY
        }
      }}
      >
    <SandpackLayout>
     {activeTab=='code'&& <>

      <SandpackFileExplorer style={{height:'74vh'}} initialCollapsedFolder={["components/","/public/"]} />
      <SandpackCodeEditor style={{height:'74vh'}}/>
      </>}

      {activeTab=='preview'&& <>
      <SandpackPreview style={{height:'74vh'}} showNavigator={true}/>
      </>}
      
    </SandpackLayout>
  </SandpackProvider>
  { loading&& <div className='p-10 bg-gray-900 opacity-60 gap-1 absolute top-0 rounded-lg w-full h-full flex items-center justify-center'>
    <Loader2Icon className={`animate-spin  h-10 w-10 text-white `}/>
    <h2 className='text-white font-semibold text-xl'>Generating code...</h2>
  </div>}
    </div>
  )
}

export default CodeViewStatic