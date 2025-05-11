"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { main } from "@/utils/GeminiAIModal.js"
import { LoaderCircle, Plus } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { MockInterview } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { db } from "@/utils/db"
import { useRouter } from "next/navigation"

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobRole, setJobRole] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [experience, setExperience] = useState("")
  const [loading, setLoading] = useState(false)
  const [jsonResponse, setJsonRespone] = useState([])
  const { user } = useUser()
  const router = useRouter()

  async function onSubmit(e) {
    setLoading(true)
    e.preventDefault()
    console.log(jobRole, jobDesc, experience)

    try {
      const inputPrompt =
        "Job Role: " +
        jobRole +
        " Job Description: " +
        jobDesc +
        " Experience: " +
        experience +
        " years. Based on the information, Give me " +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT +
        " interview questions with answers in json format. The Question and Answer are the fields in json format"
      const result = await main(inputPrompt)
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text
      const cleanedText = text.replace(/```json|```/g, "").trim()
      const MockjsonData = JSON.parse(cleanedText) // Now it's a proper JS object
      console.log("Parsed JSON Data:", MockjsonData)
      setJsonRespone(cleanedText)

      if (MockjsonData) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockid: uuidv4(),
            jsonMockResp: cleanedText,
            jobPosition: jobRole,
            jobDesc: jobDesc,
            jobExperience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockid: MockInterview.mockid })

        console.log("Inserted ID:", resp)
        if (resp) {
          setOpenDialog(false)
          router.push("/dashboard/interview/" + resp[0].mockid)
        }
      } else {
        console.log("Error")
      }
    } catch (error) {
      console.error("Error generating interview:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg h-full flex flex-col justify-center items-center shadow-sm hover:shadow-md cursor-pointer hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-white to-gray-50"
        onClick={() => setOpenDialog(true)}
      >
        <div className="rounded-full bg-primary/10 p-3 mb-3">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-lg font-medium text-gray-800">Create New Interview</h1>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job information</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
                <div>
                  <h2 className="text-gray-700">
                    Add details about your job position/role, job description and experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex: Full stack developer"
                      required
                      onChange={(event) => {
                        setJobRole(event.target.value)
                      }}
                      className="focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Job Description (in Short)</label>
                    <Textarea
                      placeholder="Ex: React, NodeJs, Angular, MySQL etc"
                      required
                      onChange={(event) => {
                        setJobDesc(event.target.value)
                      }}
                      className="focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Experience (in years)</label>
                    <Input
                      placeholder="Ex: 2"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => {
                        setExperience(event.target.value)
                      }}
                      className="focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:cursor-pointer hover:scale-105 transition-transform"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin h-4 w-4" />
                        Generating from AI...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
