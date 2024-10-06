"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/utils/GeminiAIModel"
import { db } from "@/utils/db"
import { Loader, LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { useRouter } from 'next/navigation'



function AddNewInterview() {
    const   [openDialog,      setOpenDialog]      =   useState(false)
    const   [jobPosition,     setJobPosition]     =   useState()
    const   [jobDesc,         setJobDesc]         =   useState()
    const   [jobExperience,   setJobExperience]   =   useState()
    const   [loading,         setLoading]         =   useState(false)
    const   [jsonResponse,    setJsonResponse]    =   useState([])
    const   Router                                 =   useRouter();
    const   {user}                                =   useUser();


    const onSubmit=async(e)=>{

        setLoading(true);
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)

        const InputPrompt   =   "Job Position: " + jobPosition + "\nJob Description: " + jobDesc + "\nYears of Experience: " + jobExperience + "\nGiven the information above, provide me with " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_AMOUNT +" potential interview questions a candidate could be asked for the applied job. In addition, provide a sample answer for each question asked that could be considered a perfect answer. Display in JSON format, with a question and an answer."
        const result        =   await chatSession.sendMessage(InputPrompt)
        const MockJsonResp  =   result.response.text().replace('```json','').replace('```','');

        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp) {
            const resp=await db.insert(MockInterview)
            .values({
                mockId:         uuidv4(),
                jsonMockResp:   MockJsonResp,
                jobPosition:    jobPosition,
                jobDesc:        jobDesc,
                jobExperience:  jobExperience,
                createdBy:      user?.primaryEmailAddress?.emailAddress,
                createdAt:      moment().format('MM-DD-yyyy')
            }).returning({mockId:MockInterview.mockId})

            if(resp){
                setOpenDialog(false);
                Router.push('/dashboard/interview/'+resp[0]?.mockId)
            }


        } else{
            console.log("Error in AddNewInterview.jsx at line 60")
        }
        setLoading(false)
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-dark hover:scale-105 hover:shadow-md cursor-pointer transition-all border-primary' onClick={()=>setOpenDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
            <DialogContent className="max-w-2xl border-primary">
                <DialogHeader>
                <DialogTitle className='font-bold text-2xl text-center'>Tell us more about your job interview</DialogTitle>
                <DialogDescription>
                    <form onSubmit={onSubmit}>
                        <div>
                            <h2>Add Details about your job or something idk</h2>

                            <div className='mt-7 my-3 '>
                                <label>Job Position</label>
                                <Input className='border-primary' placeholder="Ex: Full-Stack Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
                            </div>

                            <div className='my-3 border-primary'>
                                <label>Job Description</label>
                                <Textarea className='border-primary' placeholder="Ex: React, Next.JS, Flask, MySQL" onChange={(event)=>setJobDesc(event.target.value)}/>
                            </div>

                            <div className='my-3'>
                                <label>Years of Experience</label>
                                <Input className='border-primary' placeholder="Ex: 5" type="number" min="0" max="50" onChange={(event)=>setJobExperience(event.target.value)}/>
                            </div>

                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost"  onClick={()=>setOpenDialog(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading?
                                    <>
                                    <LoaderCircle className='animate-spin'/>Generating Questions
                                    </>:"Start Interview"  
                                }
                                </Button>
                            </div>
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