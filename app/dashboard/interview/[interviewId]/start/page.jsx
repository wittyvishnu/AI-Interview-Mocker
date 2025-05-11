"use client"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import QuestionsSection from "./_components/QuestionsSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null)
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockid, params.interviewId))

      if (result.length > 0) {
        const interview = result[0]
        setInterviewData(interview)

        // Correct field name used here
        const mockResponseJson = JSON.parse(interview.jsonMockResp)
        setMockInterviewQuestions(mockResponseJson)
        console.log("Parsed Interview:", mockResponseJson)
      }
    } catch (error) {
      console.error("Error fetching interview details:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mock Interview</h1>
        <p className="text-gray-500">
          {interviewData?.jobPosition} • {interviewData?.jobExperience} years experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          loading={loading}
        />

        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-between items-center gap-6 mt-8 mb-5">
        <div>
          {activeQuestionIndex > 0 && (
            <Button
              onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
              variant="outline"
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Previous Question
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
            <Button onClick={() => setActiveQuestionIndex((prev) => prev + 1)} className="flex items-center gap-1">
              Next Question <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          <Link href={`/dashboard/interview/${interviewData?.mockid}/feedback`}>
  <Button variant="default" className="flex items-center gap-1 bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md transition-all duration-200">
    End Interview
  </Button>
</Link>
        </div>
      </div>
    </div>
  )
}

export default StartInterview
