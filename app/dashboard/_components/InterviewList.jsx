"use client"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import InterviewItemCard from "./InterviewItemCard"
import { Skeleton } from "@/components/ui/skeleton"

function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    setLoading(true)
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))

      // Sort the results manually by date (most recent first)
      const sortedResults = result.sort((a, b) => {
        // Convert DD-MM-YYYY to Date objects for proper comparison
        const dateA = a.createdAt ? convertToDate(a.createdAt) : new Date(0)
        const dateB = b.createdAt ? convertToDate(b.createdAt) : new Date(0)
        return dateB - dateA // Most recent first
      })

      console.log("Mock Interviews (sorted):", sortedResults)
      setInterviewList(sortedResults)
    } catch (error) {
      console.error("Error fetching interview list:", error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to convert DD-MM-YYYY to a Date object
  const convertToDate = (dateStr) => {
    if (!dateStr) return new Date(0)

    // Check if the date is in DD-MM-YYYY format
    if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = dateStr.split("-")
      return new Date(`${year}-${month}-${day}`)
    }

    // If it's already in a different format, try to parse it directly
    return new Date(dateStr)
  }

  return (
    <div>
      <h2 className="font-medium text-xl mb-4">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {loading ? (
          // Skeleton loading state
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border p-5 rounded-lg shadow-sm mb-5">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between items-center mt-5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="flex justify-between items-center mt-5 gap-4">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))
        ) : interviewList.length > 0 ? (
          interviewList.map((item, index) => <InterviewItemCard key={index} interviewData={item} />)
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">No mock interviews found.</p>
        )}
      </div>
    </div>
  )
}

export default InterviewList
