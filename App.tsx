
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  MessageCircle, 
  Check,
  ArrowRight,
  Zap,
  Lock,
  GraduationCap,
  HelpCircle,
  X,
  Building2,
  Thermometer,
  Wrench,
  Activity,
  // Added Stethoscope to the imports to fix "Cannot find name 'Stethoscope'" error.
  Stethoscope
} from 'lucide-react';

// --- Types ---
interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  // A propriedade key é necessária para o TS quando usado em loops
  key?: React.Key;
}

// --- Lead Modal Component ---
const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Disparar evento de Lead para o Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead');
    }

    // URL de redirecionamento solicitada com parâmetros de track
    const redirectUrl = `https://hubrhino.rhinocrm.com.br/redirect-form?campaign=meta-lp-12x89-90&utm_source=meta&utm_campaign=vendas&nome=${encodeURIComponent(formData.name)}&whatsapp=${encodeURIComponent(formData.whatsapp)}`;
    
    // Abrir o CRM em nova aba e fechar o modal
    window.open(redirectUrl, '_blank');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 relative z-10 shadow-3xl animate-fade-in border border-white/20">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors">
          <X size={24} />
        </button>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-brandOrange/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="text-brandOrange" size={40} />
          </div>
          <h3 className="text-3xl font-black text-navy leading-none mb-3 uppercase tracking-tighter italic">Análise Gratuita</h3>
          <p className="text-gray-500 font-medium text-sm leading-relaxed">
            Nossa equipe jurídica e técnica vai validar sua experiência agora mesmo. Insira seus dados para receber o diagnóstico.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-brandOrange transition-colors">Seu Nome Completo</label>
            <input 
              required 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: João da Silva" 
              className="w-full bg-brandLight border-2 border-transparent focus:border-brandOrange px-6 py-4 rounded-2xl font-bold outline-none transition-all placeholder:text-gray-300" 
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-brandOrange transition-colors">WhatsApp com DDD</label>
            <input 
              required 
              type="tel" 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="(00) 00000-0000" 
              className="w-full bg-brandLight border-2 border-transparent focus:border-brandOrange px-6 py-4 rounded-2xl font-bold outline-none transition-all placeholder:text-gray-300" 
            />
          </div>
          <button type="submit" className="w-full bg-brandOrange text-white py-6 rounded-2xl font-black text-xl hover:brightness-110 transition-all shadow-xl shadow-brandOrange/20 active:scale-95 flex items-center justify-center group uppercase tracking-tight">
            INICIAR CERTIFICAÇÃO <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center pt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-4">
             <span className="flex items-center"><Lock size={12} className="mr-1" /> Dados Protegidos</span>
             <span className="flex items-center"><CheckCircle size={12} className="mr-1" /> SISTEC Oficial</span>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Custom Hooks ---
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [targetRef, isIntersecting] as const;
};

// --- Reveal Animation ---
const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

// --- App Root ---
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollWidth((window.scrollY / scrollTotal) * 100);
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = "https://raw.githubusercontent.com/performancedigital/Edumaistec/main/logo.png"; 

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-brandOrange selection:text-white bg-white overflow-x-hidden">
      {/* Barra de progresso do scroll */}
      <div className="fixed top-0 left-0 h-1 bg-brandOrange z-[120] transition-all duration-150" style={{ width: `${scrollWidth}%` }} />
      
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 py-1 shadow-md backdrop-blur-md' : 'bg-white py-3 shadow-sm'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src={logoUrl} 
              alt="EdumaisTec Logo" 
              className={`transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-text')) {
                  const span = document.createElement('span');
                  span.className = 'fallback-text text-navy font-black text-xl tracking-tighter uppercase';
                  span.innerHTML = 'EDU<span class="text-brandOrange">MAIS</span>TEC';
                  parent.appendChild(span);
                }
              }}
            />
          </div>
          <nav className="hidden lg:flex items-center space-x-10 text-navy font-bold text-sm tracking-tight">
            <a href="#início" className="relative hover:text-brandOrange transition-colors group">Início</a>
            <a href="#cursos" className="relative hover:text-brandOrange transition-colors group">Cursos</a>
            <a href="#certificacao" className="relative hover:text-brandOrange transition-colors group">Certificação</a>
            <a href="#faq" className="relative hover:text-brandOrange transition-colors group">FAQ</a>
            <a href="#contato" className="relative hover:text-brandOrange transition-colors group">Contato</a>
          </nav>
          <button 
            onClick={openModal}
            className={`bg-navy text-white rounded-full font-bold hover:bg-brandBlueLight hover:shadow-xl hover:shadow-navy/10 transition-all flex items-center text-sm active:scale-95 ${isScrolled ? 'px-6 py-2' : 'px-8 py-3.5'}`}
          >
            <MessageCircle size={isScrolled ? 16 : 18} className="mr-2" />
            Análise Grátis
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="início" className="relative bg-navy pt-28 pb-16 md:pt-40 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brandOrange/20 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-brandBlueLight/30 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal>
                <div className="inline-flex items-center bg-white/5 border border-white/10 text-brandOrange px-6 py-2 rounded-full font-bold text-xs mb-8 tracking-[0.2em] uppercase backdrop-blur-md">
                  <Zap size={16} className="mr-2 fill-brandOrange" /> Transforme experiência em reconhecimento
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.5rem] font-title text-white mb-6 md:mb-8 leading-[1.05] tracking-tighter">
                  Sua experiência de 1 ano vale um <span className="text-brandOrange italic underline decoration-white/20">Diploma Técnico</span>
                </h1>
                <p className="text-white/80 text-lg md:text-2xl mb-10 md:mb-12 max-w-xl font-medium leading-relaxed">
                  Sem provas longas. Sem aulas desnecessárias. Valide seu conhecimento profissional pelo MEC e conquiste o registro oficial no <span className="text-white font-bold underline decoration-brandOrange">SISTEC</span> agora.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <button 
                    onClick={openModal}
                    className="group bg-brandOrange text-white px-10 md:px-12 py-6 md:py-7 rounded-2xl font-black text-lg md:text-xl hover:brightness-110 transition-all text-center shadow-3xl shadow-brandOrange/30 flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center uppercase tracking-tight">CONQUISTAR MEU DIPLOMA <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" /></span>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 md:gap-10 opacity-60">
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest leading-none"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Reconhecido MEC</div>
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest leading-none"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Válido p/ Concursos</div>
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest leading-none"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Registro no SISTEC</div>
                </div>
              </Reveal>

              {/* Quadro Direito */}
              <div className="relative mt-12 lg:mt-0">
                <Reveal delay={200} className="relative z-10">
                  <div className="bg-white/10 backdrop-blur-xl p-10 md:p-14 lg:p-12 xl:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-3xl">
                    <div className="grid grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter">100%</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Legalidade (LDB)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter">48h</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">diploma em mãos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter uppercase leading-none">Conselho</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Registro Profissional</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter leading-none">SISTEC/MEC</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Validade Nacional</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Especialidades */}
        <section id="cursos" className="py-20 md:py-32 bg-white relative">
          <div className="container mx-auto px-4 text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-7xl text-navy mb-8 font-title tracking-tighter uppercase leading-none">Nossas <span className="text-brandOrange">Especialidades</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium">Pare de perder promoções por falta de diploma.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[
                { icon: ShieldCheck, title: "Segurança do Trabalho", desc: "Profissional indispensável. Garanta sua titulação oficial." },
                { icon: Activity, title: "Automação Industrial", desc: "Valide sua competência em sistemas industriais." },
                { icon: Building2, title: "Transações Imobiliárias", desc: "O passo obrigatório para obter o CRECI." },
                { icon: Thermometer, title: "Refrigeração", desc: "Especialize-se na área que mais cresce no setor predial." },
                { icon: Stethoscope, title: "Técnico em Enfermagem", desc: "Fundamental para quem já atua na saúde." },
                { icon: Wrench, title: "Mecânica Industrial", desc: "Regularize sua atuação nas grandes indústrias." },
              ].map((c, i) => (
                <Reveal key={`course-${i}`} delay={i * 100}>
                  <div onClick={openModal} className="bg-brandLight p-10 rounded-[2.5rem] border-2 border-transparent hover:border-brandOrange hover:bg-white hover:shadow-3xl transition-all cursor-pointer group">
                    <div className="bg-navy text-white p-5 rounded-2xl w-fit mb-8 group-hover:bg-brandOrange transition-colors">
                      <c.icon size={28} />
                    </div>
                    <h4 className="text-2xl font-black text-navy mb-4">{c.title}</h4>
                    <p className="text-gray-500">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-32 bg-brandLight">
          <div className="container mx-auto px-4 max-w-5xl text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-7xl text-navy font-title tracking-tighter uppercase mb-6">Principais <span className="text-brandOrange">Dúvidas</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
              {[
                { q: "O diploma é oficial?", a: "Sim. Emitido por escola credenciada e registrado no SISTEC/MEC com validade nacional plena." },
                { q: "Quanto tempo demora?", a: "Após a prova e entrega dos documentos, a emissão ocorre em até 48 horas úteis." },
                { q: "Preciso fazer aulas?", a: "Não. O processo é baseado na Lei 9.394/96 Art. 41, que valida sua experiência profissional." },
                { q: "Quais os requisitos?", a: "Ter pelo menos 18 anos, Ensino Médio completo e comprovar no mínimo 1 ano de experiência na área." }
              ].map((f, i) => (
                <Reveal key={`faq-${i}`} delay={i * 100}>
                  <div onClick={openModal} className="bg-white p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all cursor-pointer">
                    <h4 className="text-navy font-black text-xl mb-4 flex items-start">
                      <HelpCircle className="text-brandOrange mr-4 mt-1" size={20} /> {f.q}
                    </h4>
                    <p className="text-gray-600 font-medium">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32 bg-brandOrange text-center text-white">
          <Reveal>
            <h2 className="text-4xl md:text-8xl font-black mb-12 uppercase italic tracking-tighter">MUDE DE VIDA AGORA!</h2>
            <button onClick={openModal} className="bg-navy text-white px-10 md:px-16 py-6 md:py-8 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-3xl uppercase">
              SOLICITAR ANÁLISE GRATUITA
            </button>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <img src={logoUrl} alt="Logo" className="h-20 mx-auto mb-8 object-contain" />
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">A EdumaisTec é uma instituição de vanguarda focada no reconhecimento de competências.</p>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} EDUMAISTEC | CNPJ: 63.111.623/0001-51</p>
        </div>
      </footer>

      {/* WhatsApp Floating */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={openModal} className="bg-[#25D366] text-white p-5 rounded-full shadow-3xl hover:scale-110 transition-all group animate-bounce-slow">
          <MessageCircle size={32} className="fill-white" />
        </button>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .shadow-3xl { box-shadow: 0 45px 90px -20px rgba(0, 51, 102, 0.45); }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
