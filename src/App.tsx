/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black p-6 md:p-12 lg:p-20 gap-10 md:gap-12 lg:gap-20">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[210px] flex flex-col shrink-0 gap-12">
        <div className="space-y-1">
          <button 
            onClick={() => { setActiveView('home'); setCurrentProjectIndex(0); }}
            className="font-bold tracking-tight text-[12px] md:text-[14px] hover:opacity-50 transition-opacity text-left block"
          >
            Campbell Journal
          </button>
          <p className="text-[9px] tracking-widest text-black/40 uppercase">
            Journalist & Documentarian
          </p>
        </div>

        <nav className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            {REPORTS.map((report) => (
              <button
                key={report.id}
                onClick={() => selectProject(report)}
                className={`text-left text-[11px] md:text-[12px] tracking-wide transition-all hover:text-black ${
                  activeView === 'works' && selectedReport?.id === report.id ? 'text-black font-bold' : 'text-black/60'
                }`}
              >
                {report.title}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 pt-4">
            <button 
              onClick={() => setActiveView('news')}
              className={`text-left text-[11px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'news' ? 'text-black font-bold' : 'text-black/60'}`}
            >
              News
            </button>
            <button 
              onClick={() => setActiveView('about')}
              className={`text-left text-[11px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'about' ? 'text-black font-bold' : 'text-black/60'}`}
            >
              Methodology
            </button>
            <button 
              onClick={() => setActiveView('contact')}
              className={`text-left text-[11px] md:text-[12px] tracking-wide transition-all hover:text-black ${activeView === 'contact' ? 'text-black font-bold' : 'text-black/60'}`}
            >
              Contact
            </button>
          </div>
        </nav>

        <div className="mt-auto hidden md:block opacity-30 text-[9px] tracking-[0.2em] leading-relaxed">
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
              <div className="flex justify-between items-center text-[10px] text-black/40 uppercase tracking-widest font-mono">
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
                    onClick={nextHomeProject}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Home Description */}
              <div className="text-[11px] md:text-[12px] text-black/50 italic font-medium leading-relaxed max-w-lg mb-6">
                {REPORTS[currentProjectIndex].imageDescriptions[0]}
              </div>

              <div className="max-w-xl pt-4">
                <div className="text-[11px] md:text-[12px]">
                  From:{' '}
                  <button 
                    onClick={() => selectProject(REPORTS[currentProjectIndex])}
                    className="font-bold hover:opacity-50 transition-opacity underline underline-offset-4 decoration-black/10 hover:decoration-black/40"
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
              <div className="flex justify-between items-center text-[10px] text-black/40 uppercase tracking-widest font-mono">
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
                    onClick={nextImage}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Image Description Below Image */}
              <div className="text-[11px] md:text-[12px] text-black/50 italic font-medium leading-relaxed max-w-lg mb-6">
                {selectedReport.imageDescriptions[currentImageIndex]}
              </div>

              {/* Project Info Below Image */}
              <div className="max-w-xl pb-40 pt-4">
                <h2 className="mb-4 font-bold text-[11px] md:text-[13px]">{selectedReport.title}, {selectedReport.year}</h2>
                <div className="mb-10 text-black/80 text-[10px] md:text-[12px] leading-relaxed whitespace-pre-line">
                  {selectedReport.description}
                </div>
                
                <div className="flex items-center justify-between opacity-40">
                  <span className="tracking-[0.2em] text-[9px] uppercase">FY {selectedReport.year} briefing</span>
                  <a href="#" className="font-bold uppercase text-[9px] tracking-widest hover:opacity-50">
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
              <h2 className="font-bold text-[11px] md:text-[13px] mb-8">News</h2>
              <div className="space-y-12">
                <div className="space-y-2">
                  <span className="text-[9px] opacity-30 tracking-widest font-mono uppercase">15.05.2024</span>
                  <h3 className="font-bold">Exhibition: The Silicon Frontier in London</h3>
                  <p className="text-black/60">Opening next week at the Industrial Design Museum. Featuring oversized photographic prints and physical silicon artifacts.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] opacity-30 tracking-widest font-mono uppercase">02.04.2024</span>
                  <h3 className="font-bold">Molecular Weaves Briefing Released</h3>
                  <p className="text-black/60">Our latest intelligence report on bio-engineered textiles is now available for download.</p>
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
              <h2 className="font-bold text-[11px] md:text-[13px]">Methodology</h2>
              <div className="space-y-6 text-black/80 leading-relaxed">
                <p>
                  We operate at the intersection of technical systems and visual storytelling. Our product is a premium, visual-heavy PDF report that combines rigorous research with professional photojournalism.
                </p>
                <p>
                  By combining high-resolution photojournalism with engineering-grade research, we create Campbell Journal Briefings that aren't just informative—they are definitive.
                </p>
                <p className="text-black/40 italic">
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
              <h2 className="font-bold text-[11px] md:text-[13px]">Contact</h2>
              <div className="space-y-12">
                <p className="text-black/60 leading-relaxed">
                  Do you have a complex industrial process or technical breakthrough that needs a clear narrative? We accept private commissions for deep-dive audits and reporting.
                </p>
                
                <div className="space-y-2">
                  <div className="uppercase tracking-[0.2em] font-bold text-[9px] text-black/30">Email</div>
                  <a href="mailto:contact@campbelljounal.com" className="block text-black hover:opacity-50">contact@campbelljounal.com</a>
                </div>

                <div className="space-y-2">
                  <div className="uppercase tracking-[0.2em] font-bold text-[9px] text-black/30">Operations</div>
                  <div className="text-black/60">London / Berlin / Tokyo</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

