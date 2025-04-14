"use client"
import { Button } from '@/components/ui/button'
import { is } from 'drizzle-orm';
import { WebcamIcon ,Mic, StopCircleIcon} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import {toast } from 'sonner'
import { main } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';

function RecordAnswerSection({mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex,interviewData }) {
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [shouldSaveAnswer, setShouldSaveAnswer] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(() => {
        results.forEach((result) => {
          setUserAnswer(prevAns => prevAns + " " + result.transcript);
          console.log("User Answer:", result.transcript);
        });
      }, [results]);
      useEffect(() => {
        if (shouldSaveAnswer && userAnswer.length > 10) {
          updateUserAnswer()
          setShouldSaveAnswer(false)
        }
      }, [shouldSaveAnswer, userAnswer])


      const stopAndStartRecording=async()=>{
        if(isRecording){
            stopSpeechToText();
            setLoading(true);
            
            
            setShouldSaveAnswer(true)
        }else{
            startSpeechToText();
        }
        }
        const updateUserAnswer = async () => {
          console.log("User Answer:", userAnswer);
          setLoading(true);
          const feedbackPrompt = "Question: " + mockInterviewQuestions[activeQuestionIndex]?.Question +" Answer: " + userAnswer +
          ". Based on the question and answer above, please give a rating (out of 10) and a short feedback (in 3 to 5 lines) focusing on how the answer can be improved." +
          " The response should be in JSON format with only two fields: 'rating' and 'feedback'. Do not include any additional fields like 'areas_for_improvement'.";
        
        
          const result = await main(feedbackPrompt);
          const rawText = result?.text || result;
          const mockFeedbackMatch = rawText.match(/{[\s\S]*}/); // extract only the JSON block
        
          if (!mockFeedbackMatch) {
            console.log("No valid JSON found in Gemini response:", rawText);
            toast.error("Error while parsing Gemini feedback");
            setLoading(false);
            return;
          }
        
          const mockFeedback = mockFeedbackMatch[0];
          const jsonFeedback = JSON.parse(mockFeedback);
        
          console.log(mockFeedback);
        
          try {
            const resp = await db.insert(UserAnswer).values({
              mockIdref: interviewData?.mockid,
              question: mockInterviewQuestions[activeQuestionIndex]?.Question,
              correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.Answer,
              userAnswer: userAnswer,
              feedback: jsonFeedback?.feedback,
              rating: jsonFeedback?.rating,
              userEmail: interviewData?.createdBy,
              questionId: activeQuestionIndex,
              createdAt: moment().format('DD-MM-YYYY')
            });
        
            if (resp) {
              toast.success("Answer saved successfully");
              setUserAnswer("");
              setLoading(false);
              
            }
          } catch (error) {
            console.log("Error while inserting user answer", error);
            setLoading(false);
            toast.error("Error while saving answer,Please record again");
          }
        };
        
    
  return (
    <div className='flex flex-col items-center justify-center gap-5 my-10'>
            <div className='flex flex-col items-center justify-center bg-secondary rounded-lg mt-3 p-4'>
            <WebcamIcon className="w-50 h-50 text-white-500 bg-secondary  p-4 absolute" />
            <Webcam mirrored={true} style={{height:300,width:'100%',zIndex:10,}}/>

            
            </div>
            <Button variant="outline" className='cursor-pointer' disabled={loading} onClick={stopAndStartRecording}>{isRecording ? <h2 className='flex gap-2 text-red-500 text-center items-center'><StopCircleIcon /> Recording ...</h2>: <><Mic/> Record Answer</>}</Button>
            
            
            
            
      
      
  </div>
  )
}

export default RecordAnswerSection