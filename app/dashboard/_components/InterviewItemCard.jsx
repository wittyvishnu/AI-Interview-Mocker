"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Calendar, Award } from "lucide-react"

function InterviewItemCard({ interviewData }) {
  const router = useRouter()

  const formatExperience = (years) => {
    const experience = Number(years) // Convert the string to a number
    if (experience === 0) return "Fresher"
    if (experience === 1) return "1 year of Experience"
    return `${experience} years of Experience`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    // If already in DD-MM-YYYY format, return as-is
    if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) return dateStr
    // Otherwise parse and reformat to DD-MM-YYYY
    const [day, month, year] = dateStr.split("-")
    return `${day}-${month}-${year}`
  }

  const onStart = () => {
    router.push(`/dashboard/interview/${interviewData?.mockid}/start`)
  }

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interviewData?.mockid}/feedback`)
  }

  return (
    <div className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-5">
      <h2 className="font-bold text-primary text-lg capitalize">{interviewData?.jobPosition}</h2>
      <h2 className="text-gray-500 text-sm uppercase mb-4">{interviewData?.jobDesc}</h2>

      <div className="flex justify-between items-center mt-5">
        <h2 className="text-gray-600 text-sm flex items-center gap-1">
          <Award className="h-4 w-4 text-amber-500" />
          {formatExperience(interviewData?.jobExperience)}
        </h2>
        <h2 className="text-sm text-gray-600 flex items-center gap-1">
          <Calendar className="h-4 w-4 text-blue-500" />
          {formatDate(interviewData?.createdAt)}
        </h2>
      </div>

      <div className="flex justify-between items-center mt-5 gap-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 font-medium capitalize hover:bg-gray-100 transition-colors"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="flex-1 font-medium capitalize hover:scale-[1.02] transition-transform"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
