"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import QuestionSection from './_components/QuestionSection'
import RecordAnswer from './_components/RecordAnswer' 
import { Button } from '@/components/ui/button'
import Link from 'next/link'




function StartInterview({params}) {

    const [interviewData,setInterviewData]                      =   useState();
    const [mockInterviewQuestions, setMockInterviewQuestion]    =   useState();
    const [activeQuestionIndex, setActiveQuestionIndex]         =   useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))

        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0])
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionSection 
                    mockInterviewQuestions  =   {mockInterviewQuestions}
                    activeQuestionIndex     =   {activeQuestionIndex}
                />


                {/* Audio Recording  */}
                <RecordAnswer
                    mockInterviewQuestions  =   {mockInterviewQuestions}
                    activeQuestionIndex     =   {activeQuestionIndex}
                    interviewData           =   {interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && 
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}

                {activeQuestionIndex!=mockInterviewQuestions?.length-1 && 
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

                {activeQuestionIndex==mockInterviewQuestions?.length-1 && 
                <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                    <Button>End Interview</Button>
                </Link>}
            </div>
        </div>
    )
}

export default StartInterview