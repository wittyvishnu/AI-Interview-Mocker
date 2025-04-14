"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, {  useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);
    useEffect(()=>{
        user&& GetInterviewList()
    },[user])
    const GetInterviewList=async()=>{
        try {
            const result = await db
              .select()
              .from(MockInterview)
              .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
              .orderBy(desc(MockInterview.createdAt));

            console.log("Mock Interviews:", result);
            setInterviewList(result);
          } catch (error) {
            console.error("Error fetching interview list:", error);
          }
    }
   console.log("Interview List:", interviewList);

  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
        {interviewList.length > 0 ? (
          interviewList.map((item, index) => (
            <InterviewItemCard key={index} interviewData={item} />
          ))
        ) : (
          <p className="text-muted-foreground">No mock interviews found.</p>
        )}
        </div>
    </div>
  )
}

export default InterviewList