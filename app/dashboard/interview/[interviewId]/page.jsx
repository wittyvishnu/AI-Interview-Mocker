"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockid, params.interviewId));
    console.log(result[0]);
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 px-4">
      <h2 className="font-bold text-3xl text-center mb-6">Let's Get Started</h2>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6">
        {/* Job Info Card */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
            <h2 className="text-lg font-semibold">
              <strong className="text-black">Job Role/Job Position:</strong> {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg font-semibold">
              <strong className="text-black">Job Description/Tech Stack:</strong> {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg font-semibold">
              <strong className="text-black ">Years of Experience:</strong> {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="p-4 border rounded-lg bg-yellow-100 text-sm leading-relaxed">
            <h2 className="flex gap-2 items-center font-medium mb-1">
              <Lightbulb className="w-5 h-5" />
              <span>Information</span>
            </h2>
            <p>
              Enable Video Web Cam and Microphone to start your AI Generated Mock Interview.
              It has 5 questions which you can answer and at the end you will get the report based on your answer. 
              <br />
              <strong>NOTE:</strong> We never record your video. Webcam access can be disabled any time if you want.
            </p>
          </div>
        </div>

        {/* Webcam Card */}
        {/* Webcam Card */}
<div className="flex flex-col items-center justify-center space-y-4">
  {webCamEnabled ? (
    <>
      <Webcam
        className="h-72 w-full rounded-lg border shadow-md"
        onUserMedia={() => setWebCamEnabled(true)}
        onUserMediaError={() => setWebCamEnabled(false)}
        mirrored={true}
        audio={true}
      />
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        onClick={() => setWebCamEnabled(false)}
      >
        Disable Web Cam and Microphone
      </button>
    </>
  ) : (
    <>
      <div className="flex flex-col items-center justify-center h-72 w-full bg-gray-100 rounded-lg border shadow-md p-6">
        <WebcamIcon className="w-24 h-24 text-black mb-4" />
      </div>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        onClick={() => setWebCamEnabled(true)}
      >
        Enable Web Cam and Microphone
      </Button>
    </>
  )}
  
</div>

      </div>
      <div className="flex flex-end justify-end lg:mr-50 my-10 w-full max-w-5xl gmd:grid-cols-2 p-3 ">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>

      <Button className='hover:cursor-pointer transfrom-scale-105'>Start Interview</Button>
        </Link>
      </div>
      
    </div>
  );
}

export default Interview;
