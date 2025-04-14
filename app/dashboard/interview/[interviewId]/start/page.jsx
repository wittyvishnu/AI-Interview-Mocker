"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockid, params.interviewId));

      if (result.length > 0) {
        const interview = result[0];
        setInterviewData(interview);

        // Correct field name used here
        const mockResponseJson = JSON.parse(interview.jsonMockResp);
        setMockInterviewQuestions(mockResponseJson);
        console.log("Parsed Interview:", mockResponseJson);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/*Questions */}
            <QuestionsSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex}/>
            {/*Video/ Audio Recording */}
            <RecordAnswerSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex} interviewData={interviewData}/>
        </div>
        <div className="flex justify-end items-center gap-6 mb-5">
          {activeQuestionIndex>0&&<Button onClick={()=>{setActiveQuestionIndex(prev=>prev-1)}}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestions?.length-1&& <Button onClick={()=>{setActiveQuestionIndex(prev=>prev+1)}}>Next Question</Button>}
         <Link href={'/dashboard/interview/'+interviewData?.mockid+"/feedback"}> <Button>End Interview</Button></Link>
        </div>
    </div>
    );
}

export default StartInterview;
