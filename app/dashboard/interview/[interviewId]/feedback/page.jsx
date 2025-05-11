"use client"
import { db } from "@/utils/db"
import { UserAnswer } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronsUpDown, Home, Star, StarHalf } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [averageRating, setAverageRating] = useState(0)
  const params = useParams()
  const interviewId = params?.interviewId
  const router = useRouter()

  const GetFeedback = async () => {
    setLoading(true)
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdref, interviewId))
        .orderBy(UserAnswer.questionId, "asc")

      console.log("Feedback Result:", result)
      setFeedback(result)

      // Calculate average rating
      if (result.length > 0) {
        const totalRating = result.reduce((sum, item) => sum + Number(item.rating || 0), 0)
        const avgRating = (totalRating / result.length).toFixed(1)
        setAverageRating(avgRating)
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (interviewId) {
      GetFeedback()
    }
  }, [interviewId])

  // Function to render stars based on rating
  const renderRatingStars = (rating) => {
    const numRating = Number(rating)
    const fullStars = Math.floor(numRating)
    const hasHalfStar = numRating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(10 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm font-medium">{numRating}/10</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-10">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-6 w-72 mb-8" />

        {[1, 2, 3].map((_, index) => (
          <div key={index} className="mb-6">
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {feedback.length > 0 ? (
        <>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-sm mb-8 border border-green-100">
            <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
            <h2 className="font-bold text-2xl text-gray-800 mb-4">Interview Feedback Summary</h2>

            <div className="flex items-center mb-4">
              <h2 className="text-gray-700 text-lg mr-3">Your overall interview rating:</h2>
              <div className="flex items-center">{renderRatingStars(averageRating)}</div>
            </div>

            <p className="text-gray-600">
              Find below interview questions with correct answers, your responses, and feedback for improvement.
            </p>
          </div>

          <div className="space-y-4">
            {feedback.map((item, index) => (
              <Collapsible key={index} className="border rounded-lg shadow-sm overflow-hidden">
                <CollapsibleTrigger className="p-4 bg-white hover:bg-gray-50 rounded-t-lg text-left flex justify-between items-center w-full transition-colors">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                    <h3 className="font-medium text-gray-900">{item.question}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    {renderRatingStars(item.rating)}
                    <ChevronsUpDown className="h-5 w-5 text-gray-400" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-4 p-4 bg-gray-50">
                    <div className="p-4 border rounded-lg bg-red-50 text-sm text-gray-800">
                      <h4 className="font-semibold text-red-700 mb-1">Your Answer:</h4>
                      <p>{item.userAnswer}</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-green-50 text-sm text-gray-800">
                      <h4 className="font-semibold text-green-700 mb-1">Correct Answer:</h4>
                      <p>{item.correctAnswer}</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-50 text-sm text-gray-800">
                      <h4 className="font-semibold text-blue-700 mb-1">Feedback:</h4>
                      <p>{item.feedback}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => router.replace("/dashboard")}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 mt-3"
            >
              <Home className="h-4 w-4" /> Back to Dashboard
            </Button>
          </div>
        </>
      ) : (
        <div className="p-10 bg-gray-50 rounded-lg shadow-md max-w-xl mx-auto text-center space-y-6 m-20">
          <h2 className="text-2xl font-bold text-gray-800">No Feedback Available</h2>
          <p className="text-gray-500">Please attend the interview and then check the feedback.</p>
          <div className="flex justify-center">
            <Link href={`/dashboard/interview/${interviewId}/start`}>
              <Button size="lg" className="px-6 py-2 font-medium capitalize">
                Start Interview
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Feedback
