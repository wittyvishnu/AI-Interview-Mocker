"use client"

import { clsx } from "clsx"
import { Lightbulb, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex, loading = false }) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      // Start speaking
      if ("speechSynthesis" in window) {
        const msg = new SpeechSynthesisUtterance(text)
        msg.lang = "en-US"
        msg.rate = 1.5
        msg.pitch = 1
        msg.volume = 1

        // Set up an event listener to update state when speech ends naturally
        msg.onend = () => {
          setIsSpeaking(false)
        }

        window.speechSynthesis.cancel() // Cancel any ongoing speech first
        window.speechSynthesis.speak(msg)
        setIsSpeaking(true)
      } else {
        alert("Sorry, your browser does not support text to speech!")
      }
    }
  }

  useEffect(() => {
    // Cancel speech when component unmounts or question changes
    return () => {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [activeQuestionIndex])

  if (loading) {
    return (
      <div className="p-5 border rounded-lg mt-2 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-8 rounded-full" />
            ))}
        </div>
        <Skeleton className="h-16 my-5" />
        <div className="border rounded-lg p-5 bg-blue-50 mt-10">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    )
  }

  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg mt-2 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={clsx(
                "p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200 font-medium",
                activeQuestionIndex === index
                  ? "bg-primary text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              Question #{index + 1}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="text-md md:text-lg font-medium mb-2">
            {mockInterviewQuestions[activeQuestionIndex]?.Question}
          </h2>
          <button
            onClick={() => toggleSpeech(mockInterviewQuestions[activeQuestionIndex]?.Question)}
            className={`flex items-center gap-1 transition-colors ${
              isSpeaking ? "text-red-500 hover:text-red-600" : "text-primary hover:text-primary/80"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span className="text-sm">Stop speaking</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span className="text-sm">Listen to question</span>
              </>
            )}
          </button>
        </div>

        <div className="border rounded-lg p-5 bg-blue-50 mt-6 shadow-sm">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb className="h-5 font-bold" />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2 font-normal">
            Click on Record Answer when you want to answer the question. At the end of interview we will give you the
            feedback along with correct answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  )
}

export default QuestionsSection
