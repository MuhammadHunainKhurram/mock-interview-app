import { Lightbulb, Speaker, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestions, activeQuestionIndex}) {
    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry. youre browserr does not support Text To Speech')
        }
    }
  return mockInterviewQuestions&&(
    <div className='p-10 border rounded-lg border-primary my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestions&&mockInterviewQuestions.map((question,index)=>(
                <h2 className={`p-2 bg-primary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'bg-white text-primary'}`}>Question #{index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>

        <div className='border rounded-lg p-5 border-primary bg-primary mt-20'>
            <h2 className='flex gap-2 items-center'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm  my-2'>{process.env.NEXT_PUBLIC_NOTE}</h2>
        </div>
    </div>
  )
}

export default QuestionSection