'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
    
    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.createdAt, 'desc'); // Order by latest first

        console.log(result)
        setFeedbackList(result);

        if (result.length > 0) {
            const totalRating = result.reduce((sum, item) => sum + parseInt(item.rating), 0);
            const avgRating = Math.round(totalRating / result.length);
            setAverageRating(avgRating);
        } else {
            setAverageRating(0);
        }
    }

    // Use a map to store only the latest feedback per question
    const getUniqueFeedback = (feedback) => {
        const uniqueFeedbackMap = new Map();
        feedback.forEach(item => {
            // Overwrite any previous feedback for the same question to keep the latest one
            uniqueFeedbackMap.set(item.question, item);
        });
        return Array.from(uniqueFeedbackMap.values());
    }

    const uniqueFeedbackList = getUniqueFeedback(feedbackList);

    return (
        <div className='p-10'>
            {uniqueFeedbackList.length === 0
                ? <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Response</h2>
                : <>
                    <h2 className='text-3xl font-bold text-primary'>Congratulations</h2>
                    <h2 className='font-bold text-2xl my-3'>Here is your interview feedback</h2>
                    <h2 className='text-lg my-3'>Your overall rating: <strong className='text-primary'>{averageRating}/10</strong></h2>

                    <h2 className='text-sm'>More Information Below</h2>
                    {uniqueFeedbackList.map((item, index) => (
                        <Collapsible key={index}>
                            <CollapsibleTrigger className='p-2 border border-primary rounded-lg flex text-left g-7 w-full mt-10 mb-2'>
                                <ChevronDownIcon width={50} /> {item.question}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col border rounded-lg w-full'>
                                    <h2 className='p-2'><strong>Rating: </strong>{item.rating}</h2>
                                    <h2 className='p-2 text-sm rounded-lg'><strong className='text-red-500'>Your Answer: </strong>{item.userAns}</h2>
                                    <h2 className='p-2 text-sm rounded-lg '><strong className='text-green-500'>Correct Sample Answer: </strong>{item.correctAns}</h2>
                                    <h2 className='p-2 text-sm rounded-lg '><strong className='text-blue-500'>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }
            <Button className='mt-5 border border-primary' onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback;
