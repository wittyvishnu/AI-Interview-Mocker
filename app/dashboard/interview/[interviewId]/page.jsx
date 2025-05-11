"use client"
import { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import Webcam from "react-webcam"
import { Lightbulb, WebcamIcon, Briefcase, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null)
  const [webCamEnabled, setWebCamEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockid, params.interviewId))

      if (result.length > 0) {
        console.log(result[0])
        setInterviewData(result[0])
      }
    } catch (error) {
      console.error("Error fetching interview details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="my-10 px-4 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-64 mx-auto mb-6" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col justify-center space-y-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-72 w-full rounded-lg" />
            <Skeleton className="h-10 w-48 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10 px-4 max-w-5xl mx-auto">
      <h2 className="font-bold text-3xl text-center mb-8 text-gray-800">Let's Get Started</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        {/* Job Info Card */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-gray-50 border rounded-lg p-5 space-y-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Interview Details</h3>

            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Job Role/Position</h4>
                <p className="font-medium text-gray-900">{interviewData?.jobPosition}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Job Description/Tech Stack</h4>
                <p className="font-medium text-gray-900">{interviewData?.jobDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Experience Level</h4>
                <p className="font-medium text-gray-900">{interviewData?.jobExperience} years</p>
              </div>
            </div>
          </div>

          <div className="p-5 border rounded-lg bg-yellow-50 text-sm leading-relaxed shadow-sm">
            <h2 className="flex gap-2 items-center font-medium mb-2 text-amber-700">
              <Lightbulb className="w-5 h-5" />
              <span>Information</span>
            </h2>
            <p className="text-amber-800">
              Enable Video Web Cam and Microphone to start your AI Generated Mock Interview. It has 5 questions which
              you can answer and at the end you will get the report based on your answer.
              <br />
              <br />
              <strong>NOTE:</strong> We never record your video. Webcam access can be disabled any time if you want.
            </p>
          </div>
        </div>

        {/* Webcam Card */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {webCamEnabled ? (
            <>
              <div className="relative w-full">
                <Webcam
                  className="h-72 w-full rounded-lg border shadow-md object-cover"
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  audio={true}
                />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  Camera Active
                </div>
              </div>
              <Button
                variant="destructive"
                className="font-semibold py-2 px-6 rounded-lg transition duration-300 hover:scale-105"
                onClick={() => setWebCamEnabled(false)}
              >
                Disable Web Cam and Microphone
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-72 w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border shadow-md p-6">
                <WebcamIcon className="w-24 h-24 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">Camera access is required for the interview</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 hover:scale-105"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8 mb-10">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="px-8 py-2 text-base font-medium hover:scale-105 transition-transform duration-200 shadow-sm">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
