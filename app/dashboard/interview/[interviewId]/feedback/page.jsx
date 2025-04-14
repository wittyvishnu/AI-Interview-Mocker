"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const params = useParams();
  const interviewId = params?.interviewId;
  const router = useRouter();

  const GetFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdref, interviewId)).orderBy(UserAnswer.id, 'asc');
    console.log("Feedback Result:", result);
    setFeedback(result);
  };

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  return (
    <div className='p-10'>
      {feedback.length > 0 ? (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview</h2>
          <h2 className='text-primary text-lg my-3 flex items-center'>
            Your overall interview rating:
            <strong className='font-bold ml-2'>3/10</strong>
          </h2>

          <h2 className='text-black-100 font-light'>
            Find below interview question with correct answer, your answer and feedback for improving:
          </h2>

          {feedback.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between items-center w-full'>
                {item.question} <ChevronsUpDown className='h-6 w-6' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2 p-4'>
                  <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-700'><strong>Your Answer:</strong> {item.userAnswer}</h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-700'><strong>Correct Answer:</strong> {item.correctAnswer}</h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'><strong>Feedback:</strong> {item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Button
            onClick={() => router.replace('/dashboard')}
            className="mt-6 bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105"
          >
            Go Home
          </Button>
        </>
      ) : (
        
        <div className="p-10 bg-secondary rounded-lg shadow-md max-w-xl mx-auto text-center space-y-6 m-20">
  <h2 className="text-2xl font-bold text-gray-800">No Feedback Available</h2>
  <p className="text-gray-500">
    Please attend the interview and then check the feedback.
  </p>
  <div className="flex justify-center">
    <Link href={`/dashboard/interview/${interviewId}/start`}>
      <Button size="sm" className="px-6 py-2 font-medium capitalize">
        Start Interview
      </Button>
    </Link>
  </div>
</div>

         
      )}
    </div>
  );
}

export default Feedback;
