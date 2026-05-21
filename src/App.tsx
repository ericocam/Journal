/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REPORTS } from './constants';
import { Report } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'works' | 'about' | 'contact' | 'news'>('home');
  const [selectedReport, setSelectedReport] = useState<Report | null>(REPORTS[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const selectProject = (report: Report) => {
    setSelectedReport(report);
    setActiveView('works');
    setCurrentImageIndex(0);
    window.scrollTo(0, 0);
  };

  const nextHomeProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % REPORTS.length);
  };

  const prevHomeProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + REPORTS.length) % REPORTS.length);
  };

  const nextImage = () => {
    if (selectedReport) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedReport.images.length);
    }
  };

  const prevImage = () => {
    if (selectedReport) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedReport.images.length) % selectedReport.images.length);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLElement>, nextFn: () => void, prevFn: () => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) {
      prevFn();
    } else {
      nextFn();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black p-6 md:p-12 lg:p-20 gap-10 md:gap-12 lg:gap-20">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[210px] flex flex-col shrink-0 gap-12">
        <div className="space-y-1">
          <button 
            onClick={() => { setActiveView('home'); setCurrentProjectIndex(0); }}
            className="font-bold tracking-tight text-[13px] md:text-[14px] hover:opacity-50 transition-opacity text-left block"
          >
            Campbell Journal
          </button>
          <p className="text-[10px] md:text-[9px] tracking-widest text-black/60 uppercase font-medium">
            Journalist & Documentarian
          </p>
        </div>

        <nav className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            {REPORTS.map((report) => (
              <button
                key={report.id}
                onClick={() => selectProject(report)}
                className={`text-left text-[12px] md:text-[12px] tracking-wide transition-all hover:text-black ${
                  activeView === 'works' && selectedReport?.id === report.id ? 'text-black font-bold' : 'text-black/75'
                }`}
              >
                {report.title}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 pt-4">
            <button 
              onClick={() => setActiveView('news')}
              className={`text-left text-[12px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'news' ? 'text-black font-bold' : 'text-black/75'}`}
            >
              News
            </button>
            <button 
              onClick={() => setActiveView('about')}
              className={`text-left text-[12px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'about' ? 'text-black font-bold' : 'text-black/75'}`}
            >
              Methodology
            </button>
            <button 
              onClick={() => setActiveView('contact')}
              className={`text-left text-[12px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'contact' ? 'text-black font-bold' : 'text-black/75'}`}
            >
              Contact
            </button>
          </div>
        </nav>

        <div className="mt-auto hidden md:block opacity-50 text-[9px] tracking-[0.2em] leading-relaxed">
          Turning complex systems <br /> into clear visual narratives.
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Controls */}
              <div className="flex justify-between items-center text-[11px] md:text-[10px] text-black/60 uppercase tracking-widest font-mono">
                <div className="flex gap-6">
                  <button onClick={prevHomeProject} className="hover:text-black transition-colors">Previous</button>
                  <button onClick={nextHomeProject} className="hover:text-black transition-colors">Next</button>
                </div>
                <span>{currentProjectIndex + 1} / {REPORTS.length}</span>
              </div>

              {/* Home Image View (First image of current project) */}
              <div className="relative overflow-hidden bg-neutral-50/50">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentProjectIndex}
                    src={REPORTS[currentProjectIndex].images[0]}
                    alt={REPORTS[currentProjectIndex].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-h-[75vh] object-contain grayscale brightness-100 cursor-crosshair"
                    onClick={(e) => handleImageClick(e, nextHomeProject, prevHomeProject)}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Home Description */}
              <div className="text-[12px] text-black/70 italic font-medium leading-relaxed max-w-lg">
                {REPORTS[currentProjectIndex].imageDescriptions[0]}
              </div>

              <div className="max-w-xl pt-2">
                <div className="text-[12px]">
                  From:{' '}
                  <button 
                    onClick={() => selectProject(REPORTS[currentProjectIndex])}
                    className="font-bold hover:opacity-75 transition-opacity underline underline-offset-4 decoration-black/20 hover:decoration-black/50"
                  >
                    {REPORTS[currentProjectIndex].title}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'works' && selectedReport && (
            <motion.div
              key={selectedReport.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Controls at the top */}
              <div className="flex justify-between items-center text-[11px] md:text-[10px] text-black/60 uppercase tracking-widest font-mono">
                <div className="flex gap-6">
                  <button onClick={prevImage} className="hover:text-black transition-colors">Previous</button>
                  <button onClick={nextImage} className="hover:text-black transition-colors">Next</button>
                </div>
                <span>{currentImageIndex + 1} / {selectedReport.images.length}</span>
              </div>

              {/* Single Image View */}
              <div className="relative overflow-hidden bg-neutral-50/50">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={selectedReport.images[currentImageIndex]}
                    alt={`${selectedReport.title} ${currentImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-h-[75vh] object-contain grayscale brightness-100 cursor-crosshair"
                    onClick={(e) => handleImageClick(e, nextImage, prevImage)}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Image Description Below Image */}
              <div className="text-[12px] text-black/70 italic font-medium leading-relaxed max-w-lg">
                {selectedReport.imageDescriptions[currentImageIndex]}
              </div>

              {/* Project Info Below Image */}
              <div className="max-w-xl pb-40 pt-4">
                <h2 className="mb-4 font-bold text-[12px] md:text-[13px]">{selectedReport.title}, {selectedReport.year}</h2>
                <div className="mb-10 text-black/90 text-[12px] md:text-[12px] leading-relaxed whitespace-pre-line">
                  {selectedReport.description}
                </div>
                
                <div className="flex items-center justify-between opacity-60">
                  <span className="tracking-[0.2em] text-[10px] md:text-[9px] uppercase">Campbell Journal 2026</span>
                  <a href="#" className="font-bold uppercase text-[10px] md:text-[9px] tracking-widest hover:opacity-75">
                    PDF Document
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl space-y-12"
            >
              <h2 className="font-bold text-[12px] md:text-[13px] mb-8">News</h2>
              <div className="space-y-12">
                <div className="space-y-2">
                  <span className="text-[10px] md:text-[9px] text-black/50 tracking-widest font-mono uppercase">15.05.2026</span>
                  <h3 className="font-bold text-[12px] md:text-[13px]">Exhibition: The Silicon Frontier in London</h3>
                  <p className="text-black/85 text-[12px] md:text-[12px] leading-relaxed">Opening next week at the Industrial Design Museum. Featuring oversized photographic prints and physical silicon artifacts.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] md:text-[9px] text-black/50 tracking-widest font-mono uppercase">02.04.2026</span>
                  <h3 className="font-bold text-[12px] md:text-[13px]">Molecular Weaves Briefing Released</h3>
                  <p className="text-black/85 text-[12px] md:text-[12px] leading-relaxed">My latest intelligence report on bio-engineered textiles is now available for download.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl space-y-10"
            >
              <h2 className="font-bold text-[12px] md:text-[13px]">Methodology</h2>
              <div className="space-y-6 text-black/90 text-[12px] md:text-[12px] leading-relaxed">
                <p>
                  I produce deep-dive visual reports that bridge the gap between complex technical research and in-depth storytelling. I help professionals understand the systems shaping their industry through rigorous research and photojournalism.
                </p>
                <p className="text-black/60 italic">
                  Turning complex systems into clear visual narratives.
                </p>
              </div>
            </motion.div>
          )}

          {activeView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl space-y-10 focus:outline-none"
            >
              <h2 className="font-bold text-[12px] md:text-[13px]">Contact</h2>
              <div className="space-y-12">
                <p className="text-black/80 text-[12px] md:text-[12px] leading-relaxed">
                  Do you have a topic you would like to get my commentary on? I accept private commissions on interesting topics.
                </p>
                
                <div className="space-y-2">
                  <div className="uppercase tracking-[0.2em] font-bold text-[10px] md:text-[9px] text-black/50">Email</div>
                  <a href="mailto:contact@campbelljournal.com" className="block text-black hover:opacity-75 transition-opacity text-[12px] md:text-[12px]">contact@campbelljournal.com</a>
                </div>

                <div className="space-y-2">
                  <div className="uppercase tracking-[0.2em] font-bold text-[10px] md:text-[9px] text-black/50">Operations</div>
                  <div className="text-black/85 text-[12px] md:text-[12px]">UK</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

