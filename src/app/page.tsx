"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const words = [m.inspire(), m.innovate(), m.create(), m.code(), m.collab()];
  const [index, setIndex] = useState(0);

  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [faqData, setFaqData] = useState<{ question: string, answer: string }[]>([])

  const toggleQuestion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <main className="relative">
      <section id="home" className="bg-img-container w-[100vw] h-screen ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
        <div className="h-full flex flex-col md:items-center justify-center">
          <div className="text-white text-center max-w-screen-md mx-auto px-4">
            <h1 className="text-5xl md:text-8xl font-bold">chilangohacks</h1>
            <p className="text-lg md:text-xl mt-4 text-balance">📅 Nov 1-2 @ 📍{m.location()}</p>
          </div>
          <div className="w-full mx-auto px-4 flex flex-row items-center justify-center mt-8 space-x-4 text-xl">
            <Button size="lg">{m.hero_cta()}</Button>
            <Button variant="secondary" size="lg">{m.donate()} 💖</Button>
          </div>
        </div>
      </section>
      <section id="donate" className="relative px-4 min-h-screen px-36 py-24 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-8xl font-bold text-center fancy">
          {m.donate_noun()} 🤑
        </h1>
        <div className="mt-8 max-w-[450px] text-balance w-full text-center">
          <h2>
            <span className="text-2xl font-bold">{m.donate_desc()}</span>
          </h2>
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-bold text-center fancy italic mt-2"
          >
            {words[index].toLocaleLowerCase()}
          </motion.h1>
        </div>
        <div className="w-full mt-8 flex flex-col items-center space-y-4 text-md">
          <Button variant="donate" size="xl">$ {m.donate()}</Button>
          <span>
            {m.business()}
          </span>
          <Button variant="secondary" size="xl">{m.sponsor()}</Button>
        </div>
      </section>
      <section className="bg-white text-black py-24" id="faq">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-[#0A2463]">{m.faq_extended()}</h2>

          <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-16">
            <div className="w-full md:w-1/2 space-y-0 divide-y divide-gray-200">
              {faqData.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleQuestion(index)}
                    className={`w-full text-left py-6 transition-all duration-200 flex items-center justify-between ${activeIndex === index ? "bg-[#0A2463] text-white px-4" : "hover:bg-gray-50 text-gray-900"
                      }`}
                  >
                    <span className="text-[1rem]">{faq.question}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? "transform rotate-90" : ""
                        }`}
                    />
                  </button>
                  {isMobile && activeIndex === index && (
                    <div className="py-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isMobile && (
              <div className="w-full md:w-1/2">
                {activeIndex !== null && faqData[activeIndex] && (
                  <div className="sticky top-24">
                    <h3 className="text-[1.5rem] font-bold text-[#0A2463] mb-6">{faqData[activeIndex].question}</h3>
                    <p className="text-gray-700 text-[1rem]">{faqData[activeIndex].answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600">
              Still have questions? Feel free to{" "}
              <a href="#contact" className="text-[#0A2463] font-medium hover:underline">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <section id="sponsors" className="relative px-4 min-h-screen px-36 py-24 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-6xl text-accent font-bold text-center">
          {m.sponsors_extended()}
        </h2>
        <div className="mt-8 max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {
            Array.from({ length: 10 }, (_, i) => (
              <div className="flex justify-center items-center border-dotted border-4 p-8" key={i}>
                <span>Your Company</span>
              </div>
            ))
          }
        </div>
        <div className="w-full mt-8 flex flex-col items-center space-y-4 text-md">
          <Button variant="donate" size="xl">{m.sponsor()}</Button>
        </div>
      </section>
      <section id="about" className="bg-gradient-to-t from-black via-[#00001f] to-[#003468] w-full h-screen">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl text-accent font-bold">
            {m.about()} ChilangoHacks
          </h2>
          <p className="mt-4 text-xl max-w-4xl mx-auto">
            {m.about_description()}
          </p>
          <p className="mt-6 text-xl max-w-4xl mx-auto">
            {m.about_second_paragraph()}
          </p>
        </div>
      </section>

    </main >
  );
}
