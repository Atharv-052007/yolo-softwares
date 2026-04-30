import { useEffect, useState } from 'react'

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
      <section id="services" className="py-24 md:py-32 px-6 bg-gray-50/50 relative z-10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-sm font-bold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                OUR EXPERTISE
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827]">Solutions Built to Scale</h2>
              <p className="mt-4 text-[#6B7280] text-lg md:text-xl">End-to-end software solutions designed to accelerate your growth, streamline operations, and dominate your market.</p>
            </div>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="shrink-0 hidden md:flex items-center gap-2 font-bold text-[#111827] hover:text-[#2563EB] transition-colors group text-lg">
              Discuss your project
              <span className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <ServiceCard 
              title="Custom Software" 
              description="Tailored web applications and enterprise software built from the ground up to solve your unique business challenges."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>}
            />
            <ServiceCard 
              title="Mobile Development" 
              description="High-performance, native and cross-platform mobile experiences designed to engage your users on iOS and Android."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>}
            />
            <ServiceCard 
              title="Cloud & DevOps" 
              description="Scalable, secure, and highly available cloud infrastructure designed to accelerate your deployment cycles."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>}
            />
            <ServiceCard 
              title="AI & Machine Learning" 
              description="Harness the power of AI to automate complex processes, unlock predictive insights, and drive smarter decisions."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>}
            />
            <ServiceCard 
              title="UI/UX Design" 
              description="Beautiful, intuitive interfaces crafted with a deep understanding of user behavior and conversion optimization."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>}
            />
            <ServiceCard 
              title="API Integration" 
              description="Seamlessly connect your disparate systems and third-party services to create a unified digital ecosystem."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="projects" className="py-24 md:py-32 px-6 relative z-10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">Selected Work</h2>
              <p className="mt-4 text-[#6B7280] text-lg max-w-xl">A glimpse into some of the digital experiences and products we've brought to life.</p>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-8 md:mt-0 group flex items-center gap-2 text-[#111827] font-bold hover:text-[#2563EB] transition-colors text-[16px]">
              View all projects 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProjectCard title="Fintech Dashboard" category="Web App • UI/UX" />
            <ProjectCard title="HealthTrack App" category="Mobile App" />
            <ProjectCard title="SaaS AI Assistant" category="AI Integration • Web" />
            <ProjectCard title="E-Commerce Platform" category="Web Development" />
            <ProjectCard title="Real Estate Portal" category="API • Web App" />
            <ProjectCard title="Crypto Wallet" category="Mobile App • UI/UX" />
          </div>
        </div>
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
      <section id="contact" className="py-24 md:py-32 px-6 relative z-10 reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">Ready to scale your vision?</h2>
            <p className="mt-4 text-[#6B7280] text-lg max-w-2xl mx-auto">Let's build something amazing together. Reach out and we'll get back to you within 24 hours.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT SIDE: Contact Form Card */}
            <div className="lg:col-span-3 bg-white rounded-[12px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col h-full">
              {formStatus === 'success' ? (
                <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center animate-fade-up">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-[#111827] mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">Message Sent!</h3>
                  <p className="text-[#6B7280] max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-8 px-6 py-3 bg-gray-50 text-[#111827] font-medium rounded-[8px] hover:bg-gray-100 transition-colors">Send another message</button>
                </div>
              ) : (
                <form className="space-y-6 md:space-y-8 flex flex-col flex-1 justify-center" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-[#111827]">Full Name</label>
                      <input required type="text" id="name" className="w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-[#111827]" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#111827]">Email Address</label>
                      <input required type="email" id="email" className="w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-[#111827]" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-[#111827]">Phone Number (optional)</label>
                      <input type="tel" id="phone" className="w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-[#111827]" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-[#111827]">Subject</label>
                      <input required type="text" id="subject" className="w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-[#111827]" placeholder="How can we help?" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#111827]">Message</label>
                    <textarea required id="message" rows="5" className="w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all resize-none text-[#111827]" placeholder="Tell us about your project..."></textarea>
                  </div>

                  <button type="submit" disabled={formStatus === 'submitting'} className="w-full py-4 bg-[#2563EB] text-white rounded-[8px] font-medium text-[16px] hover:bg-[#1d4ed8] transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT SIDE: Contact Information */}
            <div className="lg:col-span-2 flex flex-col gap-8 lg:gap-10">
              <div className="bg-white rounded-[12px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-[#111827] mb-8">Reach us directly</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-[#111827]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-0.5">Email</p>
                      <a href="mailto:contact@yolosoftwares.com" className="text-[#111827] font-medium hover:underline text-[15px]">contact@yolosoftwares.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-[#111827]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-0.5">Phone</p>
                      <p className="text-[#111827] font-medium text-[15px]">+91 XXXXX XXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-[#111827]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-0.5">Working Hours</p>
                      <p className="text-[#111827] font-medium text-[15px]">Mon–Fri, 9 AM – 6 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100">
                  <p className="text-sm font-medium text-[#6B7280] mb-4">Follow Us</p>
                  <div className="flex items-center gap-3 text-[#111827]">
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all" aria-label="GitHub">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.838a1.41 1.41 0 11-2.82 0 1.41 1.41 0 012.82 0z"/></svg>
                    </a>
                  </div>
                </div>

              </div>

              {/* Optional Call to Action */}
              <div className="bg-white rounded-[12px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shrink-0">
                <p className="text-[#111827] font-medium text-[15px] leading-relaxed">Prefer a quick call? Book a free consultation.</p>
                <button onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="px-6 py-3 bg-[#2563EB] text-white rounded-[8px] text-sm font-bold hover:bg-[#1d4ed8] transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap text-center flex items-center justify-center gap-2 group">
                  Book Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
        </>
      ) : (
        <AboutPage />
      )}

      {/* FOOTER */}
      <footer className="pt-16 pb-8 px-6 border-t border-gray-100 bg-white/40 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-bold text-xl text-[#111827]">
                <img src="/logo.png" alt="Yolo Softwares Logo" className="h-6 w-auto opacity-90" />
                Yolo Softwares
              </div>
              <p className="text-[#6B7280] max-w-xs leading-relaxed">Building scalable software solutions for modern enterprises and startups.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[#111827] mb-1">Quick Links</h4>
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home'); }} className="text-[#6B7280] hover:text-[#2563EB] transition-colors">Home</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('home', 'services'); }} className="text-[#6B7280] hover:text-[#2563EB] transition-colors">Services</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); navigateTo('home', 'projects'); }} className="text-[#6B7280] hover:text-[#2563EB] transition-colors">Projects</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className="text-[#6B7280] hover:text-[#2563EB] transition-colors">About</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }} className="text-[#6B7280] hover:text-[#2563EB] transition-colors">Contact</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[#111827] mb-1">Connect</h4>
              <a href="mailto:contact@yolosoftwares.com" className="text-[#6B7280] hover:text-[#2563EB] transition-colors">contact@yolosoftwares.com</a>
              <div className="flex gap-4 mt-2 text-[#6B7280]">
                <a href="#" className="hover:text-[#2563EB] transition-colors hover:-translate-y-0.5 duration-300" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="hover:text-[#2563EB] transition-colors hover:-translate-y-0.5 duration-300" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="hover:text-[#2563EB] transition-colors hover:-translate-y-0.5 duration-300" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="hover:text-[#2563EB] transition-colors hover:-translate-y-0.5 duration-300" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.838a1.41 1.41 0 11-2.82 0 1.41 1.41 0 012.82 0z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6B7280]">
            <p>© {new Date().getFullYear()} Yolo Softwares. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#111827] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111827] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ title, description, icon }) {
  return (
    <div className="group relative p-8 md:p-10 rounded-[12px] bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full">
      {/* Background glow effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform translate-x-10 -translate-y-10"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-[10px] bg-gray-50 border border-gray-100 flex items-center justify-center text-[#111827] mb-8 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[#111827] tracking-tight mb-4">{title}</h3>
        <p className="text-[#6B7280] font-medium leading-relaxed flex-1">{description}</p>
        
        <div className="mt-8 flex items-center text-sm font-bold text-[#2563EB] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ title, category, className = "" }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className={`group cursor-pointer block ${className}`}>
      <div className="w-full aspect-[4/3] rounded-2xl bg-white/50 backdrop-blur-lg mb-5 overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-[#2563EB]/30">
        
        {/* Minimal wireframe UI */}
        <div className="absolute inset-x-6 bottom-0 top-10 bg-white rounded-t-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-transform duration-500 group-hover:translate-y-2">
          <div className="h-7 border-b border-gray-50 flex items-center px-4 gap-2 bg-gray-50/50">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1 p-5 flex flex-col gap-4">
            <div className="w-1/2 h-3 bg-gray-100 rounded-full"></div>
            <div className="w-full h-20 bg-[#2563EB]/5 rounded-lg border border-[#2563EB]/10"></div>
            <div className="w-3/4 h-3 bg-gray-50 rounded-full"></div>
          </div>
        </div>

        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="px-6 py-3 bg-[#2563EB] rounded-full text-[15px] font-bold text-white shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
            View Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#2563EB] transition-colors">{title}</h3>
        <p className="text-[#6B7280] font-medium mt-1 text-[15px]">{category}</p>
      </div>
    </a>
  )
}

function TeamCard({ name, role, isHovered, isSomeHovered }) {
  const scale = isHovered ? 'scale-150 translate-y-[-40px]' : isSomeHovered ? 'scale-90 blur-[2px] opacity-40 translate-y-[10px]' : 'scale-100'
  const zIndex = isHovered ? 'z-30' : 'z-10'

  // ROLE-BASED ICONS (CoC Style Artifacts)
  const renderIcon = () => {
    const iconClass = `transition-all duration-500 ${isHovered ? 'text-[#2563EB] drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-gray-200'}`
    
    if (role.includes("CEO")) {
      return <svg className={iconClass} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z"/></svg>
    } else if (name.includes("Atharv")) {
      return <svg className={iconClass} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m16 10-4 4-4-4"/><path d="m7 21 3-3 3 3 3-3 3 3"/></svg>
    } else if (name.includes("Aayush")) {
      return <svg className={iconClass} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v19"/><path d="M5 8h14"/><path d="M15 21a3 3 0 0 0-3-3 3 3 0 0 0-3 3"/></svg>
    } else {
      return <svg className={iconClass} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 19.07-1.41-1.41"/><path d="m6.34 6.34-1.41-1.41"/></svg>
    }
  }

  return (
    <div className={`flex flex-col items-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer ${scale} ${zIndex}`}>
      {/* HERO REPRESENTATION (No Profile Pic, No Letters) */}
      <div className="relative h-32 md:h-44 flex items-center justify-center">
        {/* CONCENTRATED SPOTLIGHT ON ACTIVE HERO */}
        {isHovered && (
          <div className="absolute inset-0 bg-[#2563EB]/10 blur-[60px] rounded-full -z-10 animate-pulse"></div>
        )}
        
        {/* HERO ARTIFACT / ICON with Bobbing Animation and Holographic Scanline */}
        <div className={`relative transition-all duration-500 ${isHovered ? '' : 'animate-bob'}`}>
          {renderIcon()}
          
          {/* HOLOGRAPHIC SCANLINE EFFECT */}
          {isHovered && (
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#2563EB]/20 to-transparent absolute top-0 left-0 w-full animate-[scanline_2s_linear_infinite]"></div>
            </div>
          )}
        </div>

        {/* INDIVIDUAL FLOOR SHADOW */}
        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#2563EB]/10 blur-xl rounded-[100%] transition-all duration-500 ${isHovered ? 'opacity-100 scale-150' : 'opacity-40 scale-100'}`}></div>
        
        {/* ARENA RING (Visible on hover) */}
        {isHovered && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 border-2 border-[#2563EB]/20 rounded-[100%] animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_10px_#2563EB]"></div>
          </div>
        )}
      </div>

      {/* NAME LABEL */}
      <div className="mt-16 text-center pointer-events-none">
        <h3 className={`text-sm md:text-xl font-black tracking-[0.2em] uppercase italic transition-all duration-500 ${isHovered ? 'text-[#111827] scale-110 drop-shadow-[0_0_10px_rgba(37,99,235,0.1)]' : 'text-gray-300'}`}>
          {name}
        </h3>
        <div className={`h-0.5 bg-[#2563EB] mx-auto mt-2 transition-all duration-500 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
        
        {/* STATS / POWER BARS (Catchy detail) */}
        <div className={`flex flex-col gap-1.5 mt-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-12">Expertise</span>
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] w-[95%]"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-12">Vision</span>
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] w-[90%]"></div>
            </div>
          </div>
          <p className="text-[10px] text-[#2563EB] font-bold tracking-[0.3em] uppercase mt-2">
            {role}
          </p>

          {/* FOUNDER SIGNATURE / MISSION (More detail) */}
          <div className="mt-4 border-t border-[#2563EB]/10 pt-4 overflow-hidden">
             <p className="text-[9px] text-gray-400 italic tracking-wider leading-relaxed">
               "Driving innovation through clean code and scalable design."
             </p>
          </div>
        </div>
      </div>
    </div>
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

function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const team = [
    { name: "Prathamesh Bhujbal", role: "Founder & CEO" },
    { name: "Atharv Chougule", role: "Co-Founder" },
    { name: "Aayush Kandhare", role: "Co-Founder" },
    { name: "Govind Gandhi", role: "Co-Founder" }
  ]

  return (
    <div className="pt-32 pb-40 px-6 min-h-screen bg-white overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* ARENA BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* DISTANT MONUMENTS / STATUES */}
        <div className="absolute top-[15%] left-[10%] w-32 h-64 bg-gradient-to-b from-[#2563EB]/5 to-transparent skew-x-[-15deg] blur-md opacity-20"></div>
        <div className="absolute top-[10%] right-[15%] w-40 h-80 bg-gradient-to-b from-[#2563EB]/5 to-transparent skew-x-[12deg] blur-lg opacity-10"></div>
        
        {/* FLOATING GLIMMERS */}
        <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-[#2563EB] rounded-full animate-glimmer"></div>
        <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-glimmer" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[30%] left-[20%] w-1 h-1 bg-[#2563EB] rounded-full animate-glimmer" style={{ animationDelay: '2s' }}></div>
        
        {/* LARGE AMBIENT LIGHTS */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#2563EB]/5 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-[#2563EB]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-32">
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-[#111827] uppercase italic drop-shadow-[0_0_15px_rgba(37,99,235,0.1)]">Our Founders</h1>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#2563EB]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#2563EB]"></div>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#2563EB]"></div>
          </div>
        </div>
        
        <div className="relative pt-24 pb-12">
          {/* THE PEDESTAL / ARENA FLOOR (Multilayered for depth) */}
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[140%] h-[250px] bg-gray-50 border-t-[6px] border-[#2563EB]/5 rounded-[100%] shadow-[inset_0_40px_80px_rgba(37,99,235,0.03)] z-0">
            {/* FLOOR PATTERNS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full border-t-2 border-[#2563EB]/5 rounded-[100%] opacity-20"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[60%] h-[80%] border-t border-[#2563EB]/10 rounded-[100%] opacity-40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.02)_0%,transparent_70%)]"></div>
          </div>

          {/* HERO LINEUP */}
          <div className="flex flex-wrap justify-center items-end gap-2 md:gap-4 lg:gap-10 relative z-20">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-32 md:w-44 lg:w-52 transition-all duration-500"
              >
                <TeamCard 
                  {...member} 
                  isHovered={hoveredIndex === idx} 
                  isSomeHovered={hoveredIndex !== null}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER-LIKE INFO */}
      <div className="mt-40 text-center relative z-10">
        <div className="inline-flex items-center gap-6 px-8 py-3 bg-gray-50 border border-gray-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></div>
          <p className="text-[#6B7280] font-black uppercase tracking-[0.5em] text-[10px]">Elite Development Squad</p>
          <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default App
