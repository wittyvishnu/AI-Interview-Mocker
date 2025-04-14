import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interviewData }) {
    const router = useRouter()
    
    const formatExperience = (years) => {
      const experience = Number(years); // Convert the string to a number
      if (experience === 0) return 'Fresher';
      if (experience === 1) return '1 year of Experience';
      return `${experience} years of Experience`;
  }
  

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        // If already in DD-MM-YYYY format, return as-is
        if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) return dateStr
        // Otherwise parse and reformat to DD-MM-YYYY
        const [day, month, year] = dateStr.split('-')
        return `${day}-${month}-${year}`
    }

    const onStart = () => {
        router.push("/dashboard/interview/"+interviewData?.mockid+"/start")
    }
    
    const onFeedback = () => {
        router.push("/dashboard/interview/"+interviewData?.mockid+"/feedback")
    }

    return (
        <div className='border p-5 rounded-lg shadow-sm mb-5'>
            <h2 className='font-bold text-primary text-lg capitalize'>{interviewData?.jobPosition}</h2>
            <h2 className='text-gray-500 text-sm uppercase'>{interviewData?.jobDesc}</h2>

            <div className='flex justify-between items-center mt-5'>
                <h2 className='text-gray-500 text-sm'>
                    {formatExperience(interviewData?.jobExperience)}
                </h2>
                <h2 className='text-sm text-gray-500'>
                    Created At: {formatDate(interviewData?.createdAt)}
                </h2>
            </div>

            <div className='flex justify-between items-center mt-5 gap-4'>
                <Button 
                    size='sm' 
                    variant="outline" 
                    className='flex-1 font-medium capitalize' 
                    onClick={onFeedback}
                >
                    Feedback
                </Button>
                <Button 
                    size='sm' 
                    className='flex-1 font-medium capitalize' 
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}

export default InterviewItemCard