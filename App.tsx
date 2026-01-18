
import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from './constants';
import { AIChat } from './components/AIChat';

type Page = 'home' | 'education' | 'skills' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ page, label }: { page: Page, label: string }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMenuOpen(false);
      }}
      className={`relative px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
        currentPage === page ? 'text-amber-500' : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
      {currentPage === page && (
        <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen">
      <AIChat />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-black text-slate-900 shadow-lg shadow-amber-500/20">M</div>
            <span className="font-serif font-black text-2xl tracking-tight hidden sm:block">MUDASIR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <NavItem page="home" label="Overview" />
            <NavItem page="education" label="Academic" />
            <NavItem page="skills" label="Expertise" />
            <NavItem page="contact" label="Hire Me" />
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/5 p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4">
            <NavItem page="home" label="Overview" />
            <NavItem page="education" label="Academic" />
            <NavItem page="skills" label="Expertise" />
            <NavItem page="contact" label="Hire Me" />
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="container mx-auto px-6 pt-40 pb-24">
        <div key={currentPage} className="page-transition">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'education' && <EducationPage />}
          {currentPage === 'skills' && <SkillsPage />}
          {currentPage === 'contact' && <ContactPage />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-center bg-slate-950/20">
        <div className="container mx-auto px-6">
          <p className="text-slate-500 text-xs tracking-[0.4em] font-black uppercase mb-4">
            Computer Science Professional
          </p>
          <div className="h-0.5 w-12 bg-amber-500/30 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} MUHAMMAD MUDASIR
          </p>
        </div>
      </footer>
    </div>
  );
};

const HomePage = () => (
  <div className="flex flex-col items-center text-center max-w-5xl mx-auto py-12">
    <h1 className="text-6xl md:text-9xl font-serif font-black leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-600">
      {RESUME_DATA.name}
    </h1>
    
    <div className="w-24 h-1 bg-amber-500 mb-10 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
    
    <p className="text-xl md:text-3xl text-slate-400 leading-relaxed max-w-3xl mb-12 font-light">
      {RESUME_DATA.objective}
    </p>
    
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <button 
        onClick={() => {
          const contactPage = document.querySelector('button[label="Hire Me"]') as HTMLButtonElement;
          contactPage?.click();
        }}
        className="px-12 py-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/20 active:scale-95 group flex items-center gap-3 text-lg"
      >
        GET IN TOUCH
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="flex items-center gap-8 py-4 border-l border-white/5 pl-8 ml-2">
         {['SQL', 'Data Analytics', 'Professional growth'].map(s => (
           <span key={s} className="text-xs font-black text-slate-500 uppercase tracking-widest">{s}</span>
         ))}
      </div>
    </div>

    {/* Featured Stats or Icons */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 w-full pt-16 border-t border-white/5">
       {[
         { label: 'Core Tech', val: 'SQL / Office' },
         { label: 'Focus', val: 'Data Analysis' },
         { label: 'Language', val: 'Saraiki / English' },
         { label: 'Location', val: 'Muzaffargarh' }
       ].map((stat, i) => (
         <div key={i} className="space-y-2 group cursor-default">
           <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] group-hover:text-amber-400 transition-colors">{stat.label}</p>
           <p className="text-lg font-bold text-white group-hover:scale-105 transition-transform origin-left">{stat.val}</p>
         </div>
       ))}
    </div>
  </div>
);

const EducationPage = () => (
  <div className="max-w-4xl mx-auto py-10">
    <h2 className="text-5xl font-serif font-black mb-20 text-center tracking-tight">Academic History</h2>
    <div className="space-y-12">
      {RESUME_DATA.education.map((edu, i) => (
        <div key={i} className="glass p-10 rounded-[40px] border border-white/5 flex flex-col md:flex-row gap-8 items-center md:items-start hover:border-amber-500/20 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 transition-transform"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
             <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
             </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h3 className="text-2xl font-black text-white">{edu.degree}</h3>
              <span className="text-amber-500 font-mono text-xs font-black bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 tracking-[0.1em] uppercase shrink-0">{edu.period}</span>
            </div>
            <p className="text-slate-300 text-lg font-medium mb-3">{edu.institution}</p>
            <p className="text-slate-500 text-sm flex items-center justify-center md:justify-start gap-2 italic">
              <svg className="w-4 h-4 text-amber-500/50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              {edu.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsPage = () => (
  <div className="py-10">
    <h2 className="text-5xl font-serif font-black mb-20 text-center tracking-tight">Core Competencies</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Category 1: Technical & Analysis */}
      <div className="glass p-10 rounded-[40px] border border-white/5 space-y-8 group hover:border-amber-500/30 transition-all">
        <h3 className="text-amber-500 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
          <span className="w-3 h-0.5 bg-amber-500"></span>
          Data & Analytics
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Structure Query Language (SQL)", "Data Analytics", "Excel", "Computer Software"].map(s => (
            <div key={s} className="px-5 py-3 glass rounded-2xl border border-white/5 text-sm font-bold hover:bg-amber-500 hover:text-slate-950 transition-all cursor-default">
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Category 2: Digital & Comm */}
      <div className="glass p-10 rounded-[40px] border border-white/5 space-y-8 group hover:border-blue-500/30 transition-all">
        <h3 className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
          <span className="w-3 h-0.5 bg-blue-500"></span>
          Digital Tools
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Power Point", "Word", "Internet", "Good Communication"].map(s => (
            <div key={s} className="px-5 py-3 glass rounded-2xl border border-white/5 text-sm font-bold hover:bg-blue-500 hover:text-white transition-all cursor-default">
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Category 3: Languages */}
      <div className="glass p-10 rounded-[40px] border border-white/5 space-y-8 group hover:border-purple-500/30 transition-all">
        <h3 className="text-purple-500 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
          <span className="w-3 h-0.5 bg-purple-500"></span>
          Communication
        </h3>
        <div className="space-y-6">
          {RESUME_DATA.languages.map(l => (
            <div key={l} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="font-black text-xs uppercase tracking-widest text-slate-300">{l}</span>
                <span className="text-[10px] font-bold text-slate-500">PRO</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 w-[90%] shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-5xl mx-auto py-10">
    <div className="glass rounded-[50px] overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl">
      <div className="lg:w-2/5 bg-gradient-to-br from-amber-400 to-amber-600 p-16 text-slate-950">
        <h2 className="text-4xl font-black mb-10 leading-tight tracking-tighter uppercase">Let's build new heights.</h2>
        <div className="space-y-10">
          <div className="group cursor-default">
            <p className="text-[10px] font-black uppercase opacity-50 mb-2 tracking-[0.3em]">Direct Email</p>
            <p className="font-black text-lg break-all group-hover:translate-x-1 transition-transform">{RESUME_DATA.email}</p>
          </div>
          <div className="group cursor-default">
            <p className="text-[10px] font-black uppercase opacity-50 mb-2 tracking-[0.3em]">Phone Support</p>
            <p className="font-black text-lg group-hover:translate-x-1 transition-transform">{RESUME_DATA.phone}</p>
          </div>
          <div className="group cursor-default">
            <p className="text-[10px] font-black uppercase opacity-50 mb-2 tracking-[0.3em]">Official Address</p>
            <p className="font-black text-lg group-hover:translate-x-1 transition-transform leading-snug">{RESUME_DATA.address}</p>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-950/10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Mudasir Portfolio</p>
        </div>
      </div>
      <div className="lg:w-3/5 p-16 space-y-10 bg-slate-950/20 backdrop-blur-3xl">
        <h3 className="text-3xl font-black tracking-tight">Initiate Conversation</h3>
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
              <input 
                type="text" 
                placeholder="Ex. John Doe" 
                className="w-full glass border border-white/10 px-8 py-5 rounded-3xl focus:outline-none focus:border-amber-500 transition-all font-bold text-white placeholder:text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email ID</label>
              <input 
                type="email" 
                placeholder="Ex. john@vision.com" 
                className="w-full glass border border-white/10 px-8 py-5 rounded-3xl focus:outline-none focus:border-amber-500 transition-all font-bold text-white placeholder:text-slate-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Message</label>
            <textarea 
              placeholder="How can I help your organization reach new heights?" 
              rows={5}
              className="w-full glass border border-white/10 px-8 py-6 rounded-3xl focus:outline-none focus:border-amber-500 transition-all font-bold text-white placeholder:text-slate-700 resize-none"
            ></textarea>
          </div>
          <button className="w-full py-6 bg-white text-slate-950 font-black rounded-3xl hover:bg-amber-500 transition-all shadow-xl active:scale-[0.98] text-sm tracking-[0.2em] uppercase">
            SEND SECURE MESSAGE
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default App;
