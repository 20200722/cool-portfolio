"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./components/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 英雄区文字渐入
    gsap.fromTo(
      heroRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // 滚动触发动画
    [section1Ref, section2Ref].forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <main className="min-h-screen">
      {/* 固定在背景的3D场景 */}
      <Scene />

      {/* 滚动内容层 */}
      <div className="relative z-10">
        {/* 第一屏：英雄区 */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-4">
          <div ref={heroRef} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
              CREATIVE DEV
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Building immersive web experiences with code & 3D.
            </p>
            <button className="mt-8 px-8 py-3 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300">
              View My Work
            </button>
          </div>
        </section>

        {/* 第二屏：关于我 */}
        <section ref={section1Ref} className="h-screen flex flex-col justify-center items-center text-center px-4 bg-black/50 backdrop-blur-sm">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Me</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            I'm a creative developer passionate about blending design and technology. 
            I specialize in creating interactive 3D websites, dynamic animations, and memorable user experiences.
          </p>
        </section>

        {/* 第三屏：作品展示 */}
        <section ref={section2Ref} className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-300">Project {item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="py-10 text-center text-gray-500 border-t border-white/10">
          <p>© 2026 Creative Dev. Built with Next.js & R3F.</p>
        </footer>
      </div>
    </main>
  );
}