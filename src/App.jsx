import { useEffect, useState, useRef } from 'react'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFormStatus, setModalFormStatus] = useState('idle')
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [currentPage])

  const navigateTo = (page, hash) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('success')
    }, 1500)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    setModalFormStatus('submitting')
    setTimeout(() => {
      setModalFormStatus('success')
      setTimeout(() => {
        setIsModalOpen(false)
        setModalFormStatus('idle')
      }, 2000)
    }, 1500)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="text-[#111827] antialiased font-sans selection:bg-[#2563EB] selection:text-white relative min-h-screen overflow-x-hidden">
      {/* BOOK CALL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl p-8 md:p-10 w-full max-w-md relative z-10 shadow-2xl animate-fade-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#111827] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">Book a Consultation</h3>
            <p className="text-[#6B7280] mb-6">Pick a time that works for you, and let's talk about your project.</p>
            
            {modalFormStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h4 className="text-lg font-bold">Request Sent!</h4>
                <p className="text-[#6B7280] text-sm mt-2">We'll email you shortly to confirm the time.</p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">Name</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">Email</label>
                  <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">Preferred Time</label>
                  <select required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[#111827]">
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (1PM - 5PM)</option>
                  </select>
                </div>
                <button type="submit" disabled={modalFormStatus === 'submitting'} className="w-full py-3 mt-4 bg-[#2563EB] text-white rounded-lg font-bold hover:bg-[#1d4ed8] transition-all disabled:opacity-70 flex justify-center items-center">
                  {modalFormStatus === 'submitting' ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 -z-10 bg-[#FAFAFB]">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#2563EB]/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#2563EB]/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/60 backdrop-blur-xl shadow-sm border-b border-white/50 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 relative z-50">
            <img src="/logo.png" alt="Yolo Softwares Logo" className="h-8 w-auto" />
            Yolo Softwares
          </div>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#6B7280]">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home'); }} className="hover:text-[#2563EB] transition-colors cursor-pointer">Home</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('home', 'services'); }} className="hover:text-[#2563EB] transition-colors cursor-pointer">Services</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); navigateTo('home', 'projects'); }} className="hover:text-[#2563EB] transition-colors cursor-pointer">Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className={`transition-colors cursor-pointer ${currentPage === 'about' ? 'text-[#2563EB] font-bold' : 'hover:text-[#2563EB]'}`}>About</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }} className="hover:text-[#2563EB] transition-colors cursor-pointer">Contact</a>
          </div>
          <div className="flex items-center gap-4 relative z-50">
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }} className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white text-sm font-bold rounded-lg hover:bg-[#1d4ed8] transition-all shadow-sm group">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <button className="md:hidden p-2 -mr-2 text-[#111827]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 text-lg font-bold text-[#111827]">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home'); }}>Home</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('home', 'services'); }}>Services</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); navigateTo('home', 'projects'); }}>Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className={currentPage === 'about' ? 'text-[#2563EB]' : ''}>About</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }}>Contact</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }} className="mt-4 px-8 py-3 bg-[#2563EB] text-white rounded-lg w-3/4 text-center flex items-center justify-center gap-2">
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <>
          {/* HOMEPAGE HERO */}
      <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-24 pb-20">
        
        <div className="w-full max-w-4xl mx-auto text-center mt-10 md:mt-0">
          <div className="flex justify-center mb-8 md:mb-10 animate-fade-up">
            <img src="/logo.png" alt="Yolo Softwares" className="h-[100px] md:h-[140px] lg:h-[160px] w-auto select-none drop-shadow-sm" />
          </div>
          
          <h1 className="font-black tracking-tight leading-[1.1] text-[clamp(48px,8vw,80px)] text-[#111827]">
            <style>{`
              @keyframes fade-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes bob {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes scanline {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
              }
              @keyframes glimmer {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.2); }
              }
              .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
              .animate-bob { animation: bob 3s ease-in-out infinite; }
              .animate-spin-slow { animation: spin-slow 12s linear infinite; }
              .animate-glimmer { animation: glimmer 4s ease-in-out infinite; }
            `}</style>
            <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>You only</span>
            <span className="block mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-[#2563EB] relative">
                launch
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#2563EB]/20 -z-10 rounded-full"></span>
              </span>
              {' '}once.
            </span>
          </h1>
          
          <p className="mt-8 text-[18px] md:text-[20px] leading-relaxed text-[#6B7280] max-w-[600px] mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
            We build software that makes life easy. No bloat. Just what matters.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}
              className="px-9 py-[18px] bg-[#2563EB] text-white rounded-full font-medium text-[16px] hover:bg-[#1d4ed8] hover:shadow-[0_8px_25px_rgb(37,99,235,0.3)] active:bg-[#2563EB]/80 active:backdrop-blur-lg active:shadow-[inset_0_4px_15px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }}
              className="px-9 py-[18px] bg-white/50 backdrop-blur-md border border-white/80 shadow-sm text-[#111827] rounded-full font-medium text-[16px] hover:bg-white/80 hover:border-white active:bg-white/40 active:backdrop-blur-xl active:shadow-[inset_0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center"
            >
              See Work
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-40 px-6 bg-[#FAFAFB] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#2563EB]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-[#2563EB]/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 md:mb-32 gap-12">
            <div className="max-w-3xl reveal-on-scroll">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[#2563EB] text-xs font-black tracking-[0.2em] uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
                </span>
                Our Capabilities
              </div>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-[#111827] leading-[1.05]">
                Solutions that <span className="text-[#2563EB]">redefine</span> the possible.
              </h2>
            </div>
            <div className="lg:max-w-xs reveal-on-scroll" style={{ animationDelay: '0.2s' }}>
              <p className="text-[#6B7280] text-lg font-medium leading-relaxed mb-8">
                We blend technical mastery with strategic vision to build software that doesn't just work—it dominates.
              </p>
              <div className="h-1 w-20 bg-[#2563EB] rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-6 gap-6 md:gap-8">
            <ServiceCard 
              number="01"
              className="md:col-span-4"
              title="Scalable Web Ecosystems" 
              description="From complex enterprise portals to high-traffic SaaS platforms, we architect web experiences that scale effortlessly and convert users into advocates."
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>}
            />
            <ServiceCard 
              number="02"
              className="md:col-span-2"
              title="Immersive Mobile" 
              description="High-performance iOS and Android experiences designed with a focus on speed, fluid animations, and intuitive interaction."
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>}
            />
            <ServiceCard 
              number="03"
              className="md:col-span-2"
              title="Intelligent AI" 
              description="Integrating LLMs and predictive analytics to automate workflows and unlock data-driven insights."
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>}
            />
            <ServiceCard 
              number="04"
              className="md:col-span-2"
              title="Cloud Infrastructure" 
              description="Secure, auto-scaling architectures designed for 99.9% availability and maximum performance."
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>}
            />
             <ServiceCard 
              number="05"
              className="md:col-span-2"
              title="Experience Design" 
              description="Psychology-driven UI/UX that eliminates friction and creates meaningful digital connections."
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>}
            />
          </div>

          <div className="mt-24 text-center reveal-on-scroll">
            <p className="text-[#6B7280] font-bold mb-8">Ready to build the future?</p>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#111827] text-white rounded-full font-bold hover:bg-[#2563EB] transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-blue-500/25">
              Start Your Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="projects" className="py-24 md:py-40 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 md:mb-32">
            <div className="max-w-2xl reveal-on-scroll">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-[#2563EB]"></div>
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-[#2563EB]">Portfolio</span>
               </div>
               <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-[#111827]">Crafting Digital <span className="text-[#2563EB]">Benchmarks.</span></h2>
            </div>
            <div className="mt-8 lg:mt-0 reveal-on-scroll" style={{ animationDelay: '0.2s' }}>
              <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center gap-4 text-[#111827] font-black hover:text-[#2563EB] transition-colors text-sm uppercase tracking-widest bg-gray-50 px-8 py-4 rounded-full border border-gray-100 hover:border-[#2563EB]/20 shadow-sm">
                View all projects 
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 md:gap-20">
            <ProjectCard 
              number="P.01"
              title="Fintech Pro Dashboard" 
              category="Web Application" 
              tags={["React", "Node.js", "D3.js"]}
            />
            <ProjectCard 
              number="P.02"
              className="lg:translate-y-24"
              title="HealthTrack Mobile" 
              category="Mobile App" 
              tags={["Swift", "Kotlin", "Firebase"]}
            />
            <ProjectCard 
              number="P.03"
              title="Aura AI Assistant" 
              category="AI Integration" 
              tags={["OpenAI", "Python", "React"]}
            />
            <ProjectCard 
              number="P.04"
              className="lg:translate-y-24"
              title="Global E-Commerce" 
              category="Digital Commerce" 
              tags={["Next.js", "Stripe", "Postgres"]}
            />
          </div>
        </div>

        {/* SECTION DECORATION */}
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#2563EB]/[0.03] rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#2563EB]/[0.02] rounded-full blur-[80px] -z-0"></div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32 px-6 bg-white relative z-10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">Client Success Stories</h2>
            <p className="mt-4 text-[#6B7280] text-lg max-w-2xl mx-auto">Don't just take our word for it. Here's what our partners say.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50/50 p-8 md:p-10 rounded-2xl border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
              <svg className="absolute top-6 left-6 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="text-[#111827] font-medium leading-relaxed relative z-10 mt-6">"Yolo Softwares transformed our legacy systems into a modern, lightning-fast application. Their technical expertise is unmatched."</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-bold">SJ</div>
                <div>
                  <h4 className="font-bold text-[#111827]">Sarah Jenkins</h4>
                  <p className="text-sm text-[#6B7280]">CTO, TechNova</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 p-8 md:p-10 rounded-2xl border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
              <svg className="absolute top-6 left-6 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="text-[#111827] font-medium leading-relaxed relative z-10 mt-6">"The attention to detail and UI/UX design is phenomenal. They didn't just build an app; they crafted an experience our users love."</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-bold">DC</div>
                <div>
                  <h4 className="font-bold text-[#111827]">David Chen</h4>
                  <p className="text-sm text-[#6B7280]">Founder, GrowthMetrics</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 p-8 md:p-10 rounded-2xl border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
              <svg className="absolute top-6 left-6 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="text-[#111827] font-medium leading-relaxed relative z-10 mt-6">"Reliable, responsive, and incredibly talented. They delivered our complex API integration project weeks ahead of schedule."</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-bold">ER</div>
                <div>
                  <h4 className="font-bold text-[#111827]">Elena Rodriguez</h4>
                  <p className="text-sm text-[#6B7280]">VP of Engineering, FinFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-6 bg-gray-50/50 relative z-10 reveal-on-scroll">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            <FAQItem question="What is your typical project timeline?" answer="Depending on the scope, a typical web or mobile application takes 8-12 weeks from initial scoping to launch. We provide a detailed roadmap during our discovery phase." />
            <FAQItem question="What technologies do you use?" answer="We specialize in modern stacks: React, Next.js, React Native, Node.js, Python, and scalable cloud infrastructure like AWS and Google Cloud." />
            <FAQItem question="How does your pricing approach work?" answer="We offer both fixed-bid projects for well-defined scopes and dedicated team retainers for ongoing product development and scaling." />
            <FAQItem question="Do you provide post-launch support?" answer="Absolutely. We offer comprehensive maintenance and support packages to ensure your software remains secure, updated, and performant." />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-40 px-6 relative overflow-hidden bg-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#2563EB]/[0.02] blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#2563EB]/[0.03] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            {/* LEFT SIDE: Copy */}
            <div className="reveal-on-scroll">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-[#2563EB] text-xs font-black tracking-[0.2em] uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                Get in Touch
              </div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#111827] leading-[0.9] mb-10">
                Let's <span className="text-[#2563EB]">ignite</span> <br/> your project.
              </h2>
              <p className="text-[#6B7280] text-xl font-medium leading-relaxed max-w-lg mb-16">
                Have a vision? We have the technical mastery to bring it to life. Reach out and let's build the future together.
              </p>

              <div className="space-y-8">
                {[
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: "Email our team", value: "hello@yolosoftwares.com" },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Speak with us", value: "+91 XXXXX XXXXX" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Form Card */}
            <div className="reveal-on-scroll" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-[0_40px_100px_-20px_rgba(37,99,235,0.1)] relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-3xl -z-10"></div>
                
                {formStatus === 'success' ? (
                  <div className="py-20 text-center animate-fade-up">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-[#111827] mb-4">Message Received!</h3>
                    <p className="text-[#6B7280] font-medium">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-[#FAFAFB] border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-medium text-[#111827] placeholder:text-gray-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full bg-[#FAFAFB] border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all font-medium text-[#111827] placeholder:text-gray-300" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Project Details</label>
                      <textarea required rows="4" placeholder="Tell us about your project goals..." className="w-full bg-[#FAFAFB] border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all font-medium text-[#111827] placeholder:text-gray-300 resize-none"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full py-6 bg-[#111827] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#2563EB] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 group disabled:opacity-70"
                    >
                      {formStatus === 'submitting' ? (
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : 'Send Message'}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m12 5 7 7-7 7"/><path d="M19 12H5"/></svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      ) : currentPage === 'about' ? (
        <AboutPage onNavigate={navigateTo} />
      ) : currentPage === 'privacy' ? (
        <PrivacyPolicy onNavigate={navigateTo} />
      ) : (
        <TermsOfService onNavigate={navigateTo} />
      )}

      {/* FOOTER */}
      <footer className="bg-[#111827] text-white pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[120px] rounded-full -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">

          {/* SITEMAP */}
          <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <img src="/logo.png" alt="Yolo Softwares Logo" className="h-8 w-auto" />
                <span className="text-2xl font-black tracking-tighter">YOLO SOFTWARES</span>
              </div>
              <p className="text-gray-400 text-lg max-w-sm font-medium leading-relaxed mb-10">
                Building the digital architecture of tomorrow. 
                Based in Mumbai, serving the world.
              </p>

              <div className="flex items-center gap-6">
                {[
                  { name: 'Github', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                  { name: 'LinkedIn', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
                  { name: 'Instagram', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.838a1.41 1.41 0 11-2.82 0 1.41 1.41 0 012.82 0z"/></svg> },
                  { name: 'Twitter', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
                ].map((social) => (
                  <a key={social.name} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all transform hover:-translate-y-1" aria-label={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white mb-8">Agency</h4>
              <ul className="space-y-4">
                {['Services', 'Projects', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 font-bold hover:text-[#2563EB] transition-colors flex items-center group">
                       <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">→</span>
                       {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white mb-8">Expertise</h4>
              <ul className="space-y-4">
                {['Custom Apps', 'UI/UX Design', 'AI Solutions', 'Cloud Infra'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 font-bold hover:text-[#2563EB] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-500 text-sm font-bold tracking-wide">
              © 2026 Yolo Softwares. All rights reserved.
            </p>
            <div className="flex gap-10">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} className="text-gray-500 text-sm font-bold hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('terms'); }} className="text-gray-500 text-sm font-bold hover:text-white transition-colors">Terms of Service</a>
            </div>
            {/* Scroll to top */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-y-1 transition-transform"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ title, description, icon, number, className = "" }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div 
      className={`group relative p-8 md:p-10 rounded-[32px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SPOTLIGHT EFFECT */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(37, 99, 235, 0.06), transparent 40%)`
        }}
      ></div>

      {/* TOP DECORATION */}
      <div className="absolute top-8 right-8 text-[40px] font-black text-[#2563EB]/5 select-none transition-colors group-hover:text-[#2563EB]/10">
        {number}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mb-10 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-[#111827] tracking-tight mb-4 group-hover:text-[#2563EB] transition-colors">
          {title}
        </h3>
        
        <p className="text-[#6B7280] font-medium leading-relaxed flex-1 text-[15px] md:text-[16px]">
          {description}
        </p>
        
        <div className="mt-10 flex items-center gap-3 text-sm font-bold text-[#2563EB] transition-all duration-300 group-hover:gap-5">
          <span className="relative overflow-hidden inline-block">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Learn more</span>
            <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">Let's talk</span>
          </span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </div>

      {/* BORDER GLOW */}
      <div className={`absolute inset-0 rounded-[32px] border-2 border-transparent transition-colors duration-500 ${isHovered ? 'border-[#2563EB]/10' : ''}`}></div>
    </div>
  )
}

function ProjectCard({ title, category, number, className = "", tags = [] }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className={`group cursor-pointer block relative ${className}`}>
      <div className="relative w-full aspect-[16/10] rounded-[40px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-3 hover:border-[#2563EB]/20">
        
        {/* BACKGROUND DECO */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl group-hover:bg-[#2563EB]/10 transition-colors"></div>

        {/* FLOATING UI MOCKUP (Pure CSS/SVG) */}
        <div className="absolute inset-x-10 top-16 bottom-[-50px] bg-white rounded-t-[32px] border border-gray-100 shadow-2xl overflow-hidden flex flex-col transition-all duration-700 group-hover:translate-y-[-20px] group-hover:scale-[1.02]">
          <div className="h-10 border-b border-gray-50 flex items-center px-5 gap-2 bg-gray-50/50">
            <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
            <div className="w-2 h-2 rounded-full bg-green-400/20"></div>
          </div>
          <div className="flex-1 p-8 space-y-6">
             <div className="flex items-center justify-between">
                <div className="w-1/3 h-4 bg-gray-100 rounded-full"></div>
                <div className="w-8 h-8 rounded-full bg-[#2563EB]/10"></div>
             </div>
             <div className="space-y-3">
                <div className="w-full h-3 bg-gray-50 rounded-full"></div>
                <div className="w-4/5 h-3 bg-gray-50 rounded-full"></div>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-24 rounded-2xl bg-[#2563EB]/[0.02] border border-[#2563EB]/5 border-dashed"></div>
                <div className="h-24 rounded-2xl bg-[#2563EB]/[0.02] border border-[#2563EB]/5 border-dashed"></div>
             </div>
          </div>
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-10 group-hover:translate-y-0">
          <div className="px-8 py-4 bg-[#111827] rounded-full text-white font-bold shadow-2xl flex items-center gap-3 hover:bg-[#2563EB] transition-colors">
            Explore Case Study
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </div>
        
        {/* NUMBER BADGE */}
        <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl glass border border-white/50 flex items-center justify-center text-[#2563EB] font-black text-xs tracking-tighter shadow-sm">
          {number}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB]">{category}</span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <div className="flex gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#2563EB] transition-colors">
            {title}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </div>
      </div>
    </a>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-[12px] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#111827] hover:bg-gray-50 transition-colors">
        {question}
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-[#6B7280] leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

function AboutPage({ onNavigate }) {
  const team = [
    { 
      name: "Prathamesh Bhujbal", 
      role: "Founder & CEO", 
      desc: "Visionary leader driving innovation and growth.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    },
    { 
      name: "Atharv Chougule", 
      role: "Co-Founder", 
      desc: "Technical mastermind and architecture expert.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    },
    { 
      name: "Aayush Kandhare", 
      role: "Co-Founder", 
      desc: "Product strategist and UX specialist.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    },
    { 
      name: "Govind Gandhi", 
      role: "Co-Founder", 
      desc: "Operations expert and team coordinator.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    }
  ]

  return (
    <div className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid -z-10 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-32 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-bold tracking-widest uppercase mb-8">
            The Elite Squad
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#111827] mb-10">
             Our Team
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#6B7280] leading-relaxed">
            We are a small team of experts who love building software that works.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20 group/team">
          {team.map((member, idx) => (
            <TeamCard 
              key={idx} 
              {...member} 
              idx={idx} 
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <div className="mt-40 text-center relative z-10 reveal-on-scroll">
         <button onClick={() => onNavigate('home')} className="px-8 py-4 bg-[#111827] text-white rounded-full font-bold hover:bg-[#2563EB] transition-all shadow-lg hover:shadow-blue-500/20">Back to Home</button>
      </div>
    </div>
  )
}

function TeamCard({ name, role, desc, idx, onNavigate, icon }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (centerY - y) / 15
    const rotateY = (x - centerX) / 15
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-on-scroll transition-all duration-500 group-hover/team:[&:not(:hover)]:blur-[2px] group-hover/team:[&:not(:hover)]:opacity-50 group-hover/team:hover:scale-110"
      style={{ 
        transitionDelay: `${idx * 100}ms`,
        perspective: '1000px',
        zIndex: 10 // Default z-index
      }}
    >
      <div 
        className="group relative bg-[#FAFAFB] rounded-[40px] p-10 border border-gray-100 transition-all duration-300 hover:bg-[#2563EB] hover:shadow-2xl hover:shadow-blue-500/30 h-full flex flex-col cursor-pointer"
        style={{ 
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
          <div className="relative mb-8">
            {/* CoC-style Glow Burst */}
            <div className="absolute inset-0 bg-[#2563EB]/40 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-0 bg-[#2563EB]/20 rounded-full blur-xl scale-0 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            
            <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#2563EB] shadow-xl group-hover:scale-110 group-hover:shadow-[#2563EB]/30 transition-all duration-500 overflow-hidden">
               {/* Inner glow */}
               <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#2563EB]/5"></div>
               <div className="relative z-10">{icon}</div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors">{name}</h3>
          <p className="text-[#2563EB] font-black uppercase tracking-widest text-[10px] mb-6 group-hover:text-blue-100 transition-colors">{role}</p>
          <p className="text-gray-500 font-medium group-hover:text-blue-50 transition-colors">{desc}</p>
          
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrivacyPolicy({ onNavigate }) {
  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#111827] mb-12">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 space-y-8 font-medium">
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Data Collection</h2>
            <p>At Yolo Softwares, we value your privacy. We only collect information that you voluntarily provide to us via our contact forms or direct communication. This may include your name, email address, and project details.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. Use of Information</h2>
            <p>The information we collect is used solely to respond to your inquiries, provide our services, and improve your experience on our website. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Cookies</h2>
            <p>Our website may use cookies to analyze traffic and provide a more personalized experience. You can choose to disable cookies in your browser settings if you prefer.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>
        </div>
        <div className="mt-20 border-t pt-10">
          <button onClick={() => onNavigate('home')} className="px-8 py-4 bg-[#111827] text-white rounded-full font-bold hover:bg-[#2563EB] transition-all">Back to Home</button>
        </div>
      </div>
    </div>
  )
}

function TermsOfService({ onNavigate }) {
  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#111827] mb-12">Terms of Service</h1>
        <div className="prose prose-lg text-gray-600 space-y-8 font-medium">
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Yolo Softwares website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our site.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. Services</h2>
            <p>Yolo Softwares provides software development, UI/UX design, and AI consulting services. All projects are subject to individual service agreements and contracts.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Intellectual Property</h2>
            <p>All content, designs, and intellectual property on this website are owned by Yolo Softwares unless otherwise stated. Unauthorized use is strictly prohibited.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Limitation of Liability</h2>
            <p>Yolo Softwares is not liable for any direct, indirect, or consequential damages resulting from the use or inability to use our website or services.</p>
          </section>
        </div>
        <div className="mt-20 border-t pt-10">
          <button onClick={() => onNavigate('home')} className="px-8 py-4 bg-[#111827] text-white rounded-full font-bold hover:bg-[#2563EB] transition-all">Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default App
