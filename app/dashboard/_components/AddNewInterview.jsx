"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {main} from '@/utils/GeminiAIModal.js';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import {useRouter} from 'next/navigation';



function  AddNewInterview() {
  const[openDialog,setOpenDialog]=useState(false);
  const[jobRole,setJobRole]=useState("");
  const[jobDesc,setJobDesc]=useState("");
  const[experience,setExperience]=useState("");
  const[loading,setLoading]=useState(false);
  const[jsonResponse,setJsonRespone]=useState([]);
  const {user}=useUser();
  const router=useRouter();
  
  async function  onSubmit (e){
    setLoading(true);
    e.preventDefault();
    console.log(jobRole,jobDesc,experience);
    const inputPrompt="Job Role: "+jobRole+" Job Description: "+jobDesc+" Experience: "+experience+" years.Based on the information,Give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT+" interview questions with answers in json format.the Question and Answer are thr fields in json format";
    const result = await main(inputPrompt);
    const text=result?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const MockjsonData = JSON.parse(cleanedText); // Now it's a proper JS object
    console.log("Parsed JSON Data:",  MockjsonData);
    setJsonRespone(cleanedText);
    
    if(MockjsonData){
    const resp=await db.insert(MockInterview).values({
            mockid:uuidv4(),
            jsonMockResp:cleanedText,
            jobPosition:jobRole ,
            jobDesc: jobDesc,
            jobExperience: experience,
            createdBy:user?.primaryEmailAddress?.emailAddress ,
            createdAt:moment().format('DD-MM-YYYY')

    }).returning({mockid:MockInterview.mockid});
 
    console.log("Inserted ID:",resp)
    if(resp) {
    setOpenDialog(false);
    router.push("/dashboard/interview/"+resp[0].mockid);
  }}else{
    console.log("Error")
  }

    setLoading(false);
  
}
  
  
  return (
    <div>
    <div className='p-10 border rounded-lg w-50 h-20 items-center flex flex-col justify-center shadow-sm hover:shadow-lg cursor-pointerhover:scale-105 transition duration-300 ease-in-out'
    onClick={()=>setOpenDialog(true)}>
        
        <h1 className='text-lg text-center'>+Add New</h1>
    </div>
    <Dialog open={openDialog} >
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your job information</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
        <h2>Add details about your job position/role,job description and Experience</h2>
        <div className='mt-7 my-3'>
          <label>Job Role/Job Position</label>
          <Input placeholder="Ex:Full stack developer" required onChange={(event)=>{setJobRole(event.target.value)}}/>
        </div>
        <div className='mt-3'>
          <label>Job Description(in Short)</label>
          <Textarea placeholder="Ex:React,NodeJs,Angular,MySQL etc" required onChange={(event)=>{setJobDesc(event.target.value)}}/>
        </div>
        <div className='mt-3'>
          <label>Experience</label>
          <Input placeholder="Ex:2" type="number" max="50" required onChange={(event)=>{setExperience(event.target.value)}}/>
        </div>
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" className="hover:cursor-pointer hover:scale-105" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin mr-2" />Generating from AI...</> : "Continue"}</Button>
          </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview;