"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import FAQ from "@/sections/FAQ";

export default function Home() {
  const words = [m.inspire(), m.innovate(), m.create(), m.code(), m.collab()];
  const [index, setIndex] = useState(0);

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
      <FAQ />
      <section id="sponsors" className="min-h-screen py-24 flex flex-col items-center">
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
      <section id="about" className="bg-container w-full h-screen relative">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h2 className="text-4xl md:text-6xl text-accent font-bold">
            {m.about()} ChilangoHacks
          </h2>
          <p className="mt-4 text-xl max-w-4xl mx-auto text-balance">
            {m.about_description()}
          </p>
          <p className="mt-6 text-xl max-w-4xl mx-auto text-balance">
            {m.about_second_paragraph()}
          </p>
        </div>
      </section>

    </main >
  );
}
