"use client"

import { useState, useEffect } from "react"
import * as m from "@/paraglide/messages"
import { ChevronRight } from "lucide-react"

const FAQ = () => {
    const [faqData, setFaqData] = useState<{ question: string; answer: string }[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const fetchedFAQ = [
            { question: m.what_is_a_hackathon(), answer: m.what_is_a_hackathon_answer() },
            { question: m.how_do_i_become_a_sponsor(), answer: m.how_do_i_become_a_sponsor_answer() },
            { question: m.who_can_participate(), answer: m.who_can_participate_answer() },
            { question: m.is_chilangohacks_in_person(), answer: m.is_chilangohacks_in_person_answer() },
            { question: m.how_much_does_it_cost(), answer: m.how_much_does_it_cost_answer() },
            { question: m.how_can_i_find_a_team(), answer: m.how_can_i_find_a_team_answer() },
            { question: m.what_if_i_dont_know_how_to_code(), answer: m.what_if_i_dont_know_how_to_code_answer() },
            { question: m.can_i_participate_if_im_underage(), answer: m.can_i_participate_if_im_underage_answer() },
            { question: m.what_project_should_i_make(), answer: m.what_project_should_i_make_answer() },
        ]

        setFaqData(fetchedFAQ)

        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    const toggleQuestion = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    return (
        <section id="faq" className="py-24 w-full h-full max-w-screen-md mx-auto">
            <h2 className="text-4xl md:text-6xl text-accent font-bold text-center mb-12">
                {m.faq_extended()}
            </h2>
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-8 mt-8 px-4 space-x-5">
                <div className="w-full md:w-1/2 space-y-1 divide-y divide-gray-200">
                    {faqData.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleQuestion(index)}
                                className={`w-full items-start p-3 transition-all duration-200 flex justify-between ${activeIndex === index ? "bg-secondary text-white px-4" : "hover:bg-gray-50 text-gray-900"
                                    }`}
                            >
                                <span className="text-[1rem] text-left w-full text-start">{faq.question}</span>
                                <ChevronRight
                                    className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? "transform rotate-90" : ""
                                        }`}
                                />
                            </button>
                            {isMobile && activeIndex === index && (
                                <div className="py-4 px-4">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {!isMobile && (
                    <div className="w-full md:w-1/2">
                        {activeIndex !== null && faqData[activeIndex] ? (
                            <div className="sticky top-24 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-bold mb-4">{faqData[activeIndex].question}</h3>
                                <p className="text-gray-700 text-[1rem]">{faqData[activeIndex].answer}</p>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">{m.select()}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600 px-4">
                    {m.still_have_questions()}
                </p>
            </div>
        </section>
    )
}

export default FAQ