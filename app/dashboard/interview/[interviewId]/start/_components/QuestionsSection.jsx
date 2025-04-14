import { clsx } from 'clsx';
import { text } from 'drizzle-orm/gel-core';
import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const msg=new SpeechSynthesisUtterance(text);
      msg.lang='en-US';
      msg.rate=1.5;
      msg.pitch=1;
      msg.volume=1;
      window.speechSynthesis.speak(msg);
    }else{
      alert('Sorry, your browser does not support text to speech!');
    }
  }
    return mockInterviewQuestions&&(
      <div className='p-5 border rounded-lg mt-2'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {mockInterviewQuestions.map((question, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={clsx(
                'p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-colors duration-200',
                activeQuestionIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
              )}
            >
              Question #{index + 1}
            </h2>
            
          ))}
          
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.Question}</h2>
        <Volume2 onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.Question)} className='h-5 text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200' />
        <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
            <h2 className='flex gap-2 items-center text-blue-700'>
                <Lightbulb className='h-5 font-bold'/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2 font-normal'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.</h2>
        </div>
      </div>
    );
  }
  

export default QuestionsSection;
