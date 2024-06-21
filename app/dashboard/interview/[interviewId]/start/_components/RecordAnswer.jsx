"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


function RecordAnswer({mockInterviewQuestions, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer]   =   useState('')
  const {user}                        =   useUser();
  const [loading, setLoading]         =   useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({continuous: true, useLegacyResults: false});

  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
    
  },[results])

  const SaveUserAnswer=async()=>{
    if(isRecording)
    {
      setLoading(true)
      stopSpeechToText()

      
        const feedbackPrompt = 
        "Question: " + mockInterviewQuestions[activeQuestionIndex]?.question
        +
        ", User Answer: " + userAnswer 
        + 
        ", Depending on the question and the user answer, please provide a rating (1 - 10) for the answer, along with feedback on areas of improvement, if any, in just 3-5 lines. Do this in JSON format, with a STRING rating field and a feedback field."
        
        const result = await chatSession.sendMessage(feedbackPrompt)

        const mockJsonResp = (result.response.text().replace('```json','').replace('```',''));
        console.log(mockJsonResp)
        const JsonFeebackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef:interviewData?.mockId,
          question:mockInterviewQuestions[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestions[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeebackResp?.feedback,
          rating:JsonFeebackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('MM-DD-yyyy')
        })

        if(resp)
        {
          toast('User Answer Recorded Succecssfully')
          setUserAnswer('')
          setResults([])
        }

        setResults([])
        setLoading(false)
    }
    else
    {
      startSpeechToText()
    }
  }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.png'} width={200} height={200} 
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:500,
                width:500,
                zIndex:10,
            }}
            />
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10"
      onClick={SaveUserAnswer}>
        {isRecording
        ?
        <h2 className='text-red-600 flex gap-2 items-center'>
          <Mic/>Stop Recording
        </h2>

        :
        <h2 className=' flex gap-2 items-center'>
              <Mic/>  Record Answer</h2> }</Button>
    </div>
  )
}

export default RecordAnswer