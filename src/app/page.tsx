"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import { ChevronRight } from "lucide-react"

import { LuGithub, LuLinkedin, LuInstagram } from "react-icons/lu";

type TeamMember = {
  name?: string;
  role?: string;
  social?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
};

type TeamMembers = {
  [key: string]: TeamMember;
};

export default function Home() {
  const words = [m.inspire(), m.innovate(), m.create(), m.code(), m.collab()];
  const [index, setIndex] = useState(0);

  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [faqData, setFaqData] = useState<{ question: string, answer: string }[]>([])

  const [teamData, setTeamData] = useState<TeamMembers>({})

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


    const fetchedTeam: TeamMembers = {
      ulises: {
        name: "Ulises Viña",
        role: m.ulises_role(),
        social: {
          instagram: "https://www.instagram.com/ulisesvina/",
          linkedin: "https://www.linkedin.com/in/ulisesvina/",
          github: "https://github.com/ulisesvina",
        },
      },
      juan: {
        name: "Juan Almanza",
        role: m.juan_role(),
        social: {
          linkedin: "https://www.linkedin.com/in/scidroid/",
          github: "https://github.com/scidroid",
          instagram: "https://www.instagram.com/scidroid/",
        }
      },
      sebastian: {
        name: "Sebastian Ponce",
        role: m.sebastian_role(),
        social: {
          github: "https://github.com/sebaspv",
          linkedin: "https://www.linkedin.com/in/sebaspv/"
        }
      },
      elohim: {
        name: "Elohim Hernández",
        role: m.elohim_role(),
      },
      bruno: {
        name: "Bruno Ramírez",
        role: m.bruno_role(),
        social: {
          instagram: "https://www.instagram.com/brunooosf/"
        }
      },
      ivan: {
        name: "Ivan Espinola",
        role: m.ivan_role(),
      },
      mariana: {
        name: "Mariana Garza",
        role: m.mariana_role(),
        social: {
          instagram: "https://www.instagram.com/astrolemonma.r/",
          linkedin: "https://www.linkedin.com/in/garza-cedillo/",
          github: "https://github.com/astrolemonmarafk",
        }
      },
    }

    setFaqData(fetchedFAQ)
    setTeamData(fetchedTeam)

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
        <div className="h-full flex flex-col items-center justify-center px-4">
          {/* Title and Subtitle */}
          <div className="text-white text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              chilangohacks
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-4 text-balance">
              📅 {m.month()} 11 - 12 @ 📍{m.location()}
            </p>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-lg sm:text-xl">
            <a href="https://form.typeform.com/to/rT1GnQuh" className="md:w-auto w-full" target="_blank" rel="noopener noreferrer">
              <Button className="md:w-auto w-full" size="lg">{m.hero_cta()}</Button>
            </a>

            <a href="https://gofund.me/27f7be92" className="md:w-auto w-full" target="_blank" rel="noopener noreferrer">
              <Button className="w-full" variant="secondary" size="lg">
                {m.donate()} 💖
              </Button>
            </a>

            <a href="/pdf/convocatoria.pdf" target="_blank" rel="noopener noreferrer">
              <Button className="md:w-auto w-full" variant="secondary" size="lg">
                {m.call()} 📄
              </Button>
            </a>
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
          <div className="h-16">
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
        </div>
        <div className="w-full mt-8 flex flex-col items-center space-y-4 text-md">
          <a href="https://gofund.me/27f7be92" target="_blank" rel="noopener noreferrer">
            <Button variant="donate" size="xl">$ {m.donate()}</Button>
          </a>
          <span>
            {m.business()}
          </span>
          <a href="#sponsors">
            <Button variant="secondary" size="xl">{m.sponsor()}</Button>
          </a>
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
                  <div className="top-24">
                    <h3 className="text-[1.5rem] font-bold text-[#0A2463] mb-6">{faqData[activeIndex].question}</h3>
                    <p className="text-gray-700 text-[1rem]">{faqData[activeIndex].answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600">
              {m.still_have_questions()}{" "}
              <a href="#contact" className="text-[#0A2463] font-medium hover:underline">
                {m.contact_us()}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <section
        id="team"
        className="relative py-24 px-4 md:px-8 lg:px-12"
      >

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
              {m.our_team()}
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">{m.team_desc()}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {["ulises", "mariana", "sebastian", "juan", "ivan", "elohim", "bruno"].map((member, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">

                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>

                  <div className="relative pt-6 px-6 flex-grow">
                    <div className="relative mx-auto w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-white dark:border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={`/team/${member}.png`}
                        alt={teamData[member]?.name || member}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center pb-6">
                      <h3 className="text-xl font-bold text-slate-800 transition-colors">
                        {teamData[member]?.name || member}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-secondary">
                        {teamData[member]?.role || "Team Member"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-5 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                    {teamData[member]?.social?.github && (
                      <a href={teamData[member]?.social?.github} target="_blank" rel="noopener noreferrer">
                        <LuGithub className="w-6 h-6 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" />
                      </a>
                    )}
                    {teamData[member]?.social?.linkedin && (
                      <a href={teamData[member]?.social?.linkedin} target="_blank" rel="noopener noreferrer">
                        <LuLinkedin className="w-6 h-6 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" />
                      </a>
                    )}
                    {teamData[member]?.social?.instagram && (
                      <a href={teamData[member]?.social?.instagram} target="_blank" rel="noopener noreferrer">
                        <LuInstagram className="w-6 h-6 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
      <section id="about" className="bg-gradient-to-t from-black via-[#00001f] to-[#003468] w-full min-h-screen">
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
