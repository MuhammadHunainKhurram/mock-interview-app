"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [interviewData, setInterviewData] = useState("test");
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        
        console.log(result)
        setInterviewData(result[0]);
    }

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-7 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border border-primary'>
                        <h2 className='text-lg mb-2'><strong>Job Position: <br/></strong>{interviewData.jobPosition}</h2>
                        <h2 className='text-lg mb-2'><strong>Job Description/Tech Stack: <br/></strong>{interviewData.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Exeprience: <br/></strong>{interviewData.jobExperience}</h2>                
                    </div>
                    <div className='p-5 border rounded-lg border-primary'>
                            <h2 className='flex gap-2 items-center'><Lightbulb/><strong>Information</strong></h2>
                            <h2 className='mt-3'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>


                <div className="flex flex-col items-center">
                    {webCamEnabled ? (
                        <div className="rounded-lg my-7 " >
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                height = {'h-96'}
                                width = {'w-96'}
                            />
                        </div>
                    ) : (
                        <>
                            <WebcamIcon className='h-96 w-full my-7 p-20 rounded-lg border border-primary' />
                            <Button  variant = "ghost" className="w-full bg-primary py-2 px-4 rounded" onClick={() => setWebCamEnabled(true)}>
                                <h2 className='text-md font-bold'>Enable Camera & Microphone</h2>
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='flex justify-end items-end '>
                <Link href={'/dashboard/interview/'+ params.interviewId +'/start'}>
                    <Button className=''>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview