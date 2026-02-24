
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
  Stethoscope,
  Menu,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

// --- Lead Modal Component ---
const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Disparar evento de Lead para o Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead');
    }

    try {
      // Disparar Webhook
      await fetch('https://webhook.educaminas.com.br/webhook/lp-89', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          url: window.location.href,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.error('Webhook error:', err);
    }

    // URL de redirecionamento solicitada com parâmetros de track
    const redirectUrl = `https://hubrhino.rhinocrm.com.br/redirect-form?campaign=meta-lp-12x89-90&utm_source=meta&utm_campaign=vendas&nome=${encodeURIComponent(formData.name)}&whatsapp=${encodeURIComponent(formData.whatsapp)}`;
    
    // Abrir o CRM em nova aba e fechar o modal
    window.open(redirectUrl, '_blank');
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/90 backdrop-blur-md" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-md p-8 md:p-10 relative z-10 shadow-3xl border border-white/20"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors p-2">
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
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brandOrange text-white py-6 rounded-2xl font-black text-xl hover:brightness-110 transition-all shadow-xl shadow-brandOrange/20 active:scale-95 flex items-center justify-center group uppercase tracking-tight disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    PROCESSANDO...
                  </div>
                ) : (
                  <>
                    INICIAR CERTIFICAÇÃO <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center pt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-4">
                 <span className="flex items-center"><Lock size={12} className="mr-1" /> Dados Protegidos</span>
                 <span className="flex items-center"><CheckCircle size={12} className="mr-1" /> SISTEC Oficial</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Mobile Menu Component ---
const MobileMenu = ({ isOpen, onClose, openModal }: { isOpen: boolean, onClose: () => void, openModal: () => void }) => {
  const menuItems = [
    { name: 'Início', href: '#início' },
    { name: 'Cursos', href: '#cursos' },
    { name: 'Certificação', href: '#certificacao' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/95 backdrop-blur-xl" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white p-8 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-navy font-black text-xl tracking-tighter uppercase">MENU</span>
              <button onClick={onClose} className="text-navy p-2 bg-brandLight rounded-xl">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-black text-navy hover:text-brandOrange transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <ChevronRight className="text-brandOrange opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <button 
                onClick={() => { onClose(); openModal(); }}
                className="w-full bg-brandOrange text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-brandOrange/20 active:scale-95 flex items-center justify-center uppercase tracking-tight"
              >
                Análise Grátis
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- App Root ---
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} openModal={openModal} />

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 py-2 shadow-xl backdrop-blur-md' : 'bg-white py-4 shadow-sm'}`}>
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
            {['Início', 'Cursos', 'Certificacao', 'FAQ', 'Contato'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="relative hover:text-brandOrange transition-colors group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brandOrange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={openModal}
              className={`bg-navy text-white rounded-full font-bold hover:bg-brandBlueLight hover:shadow-xl hover:shadow-navy/10 transition-all flex items-center text-sm active:scale-95 hidden sm:flex ${isScrolled ? 'px-6 py-2.5' : 'px-8 py-4'}`}
            >
              <MessageCircle size={isScrolled ? 16 : 18} className="mr-2" />
              Análise Grátis
            </button>
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-3 bg-brandLight text-navy rounded-2xl hover:bg-brandOrange hover:text-white transition-all active:scale-90"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="início" className="relative bg-navy pt-32 pb-20 md:pt-48 md:pb-48 overflow-hidden scroll-mt-24">
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
                  <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-3xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-brandOrange/20 rounded-full blur-3xl group-hover:bg-brandOrange/30 transition-colors duration-700" />
                    <div className="grid grid-cols-2 gap-6 md:gap-10 relative z-10">
                      {[
                        { val: "100%", label: "Legalidade", sub: "Baseado na LDB" },
                        { val: "48h", label: "Agilidade", sub: "Diploma em mãos" },
                        { val: "Oficial", label: "Conselho", sub: "Registro Profissional" },
                        { val: "SISTEC", label: "MEC", sub: "Validade Nacional" },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-brandOrange mb-1 tracking-tighter">{stat.val}</p>
                          <p className="text-white font-bold text-[10px] md:text-[12px] uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-white/40 text-[8px] md:text-[10px] font-medium uppercase tracking-widest">{stat.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                
                {/* Decorative elements */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-24 h-24 bg-brandBlueLight/20 rounded-full blur-2xl pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Especialidades */}
        <section id="cursos" className="py-24 md:py-40 bg-white relative scroll-mt-24">
          <div className="container mx-auto px-4 text-center mb-20">
            <Reveal>
              <div className="inline-block bg-brandOrange/10 text-brandOrange px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Áreas de Atuação
              </div>
              <h2 className="text-4xl md:text-7xl text-navy mb-8 font-title tracking-tighter uppercase leading-none">Nossas <span className="text-brandOrange italic">Especialidades</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium">Pare de perder promoções por falta de diploma. Regularize sua profissão com quem é autoridade.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {[
                { icon: ShieldCheck, title: "Segurança do Trabalho", desc: "Profissional indispensável em qualquer obra ou indústria. Garanta sua titulação oficial." },
                { icon: Activity, title: "Automação Industrial", desc: "O futuro é agora. Valide sua competência em sistemas industriais e robótica." },
                { icon: Building2, title: "Transações Imobiliárias", desc: "O passo obrigatório para obter o CRECI e atuar legalmente no mercado imobiliário." },
                { icon: Thermometer, title: "Refrigeração", desc: "Especialize-se na área que mais cresce no setor predial e industrial." },
                { icon: Stethoscope, title: "Técnico em Enfermagem", desc: "Fundamental para quem já atua na linha de frente da saúde e busca valorização." },
                { icon: Wrench, title: "Mecânica Industrial", desc: "Regularize sua atuação nas grandes indústrias e aumente seu teto salarial." },
              ].map((c, i) => (
                <Reveal key={`course-${i}`} delay={i * 100}>
                  <div onClick={openModal} className="bg-brandLight p-10 rounded-[3rem] border-2 border-transparent hover:border-brandOrange hover:bg-white hover:shadow-3xl transition-all duration-500 cursor-pointer group h-full flex flex-col items-start text-left">
                    <div className="bg-navy text-white p-5 rounded-2xl mb-8 group-hover:bg-brandOrange group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <c.icon size={32} />
                    </div>
                    <h4 className="text-2xl font-black text-navy mb-4 group-hover:text-brandOrange transition-colors">{c.title}</h4>
                    <p className="text-gray-500 leading-relaxed mb-8 flex-grow">{c.desc}</p>
                    <div className="flex items-center text-brandOrange font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Saiba Mais <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certificação Section */}
        <section id="certificacao" className="py-24 md:py-40 bg-navy relative overflow-hidden scroll-mt-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brandOrange/5 rounded-full blur-[120px]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <Reveal>
                <div className="inline-block bg-white/5 border border-white/10 text-brandOrange px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                  Processo Simplificado
                </div>
                <h2 className="text-4xl md:text-7xl text-white font-title tracking-tighter uppercase mb-6">Como <span className="text-brandOrange italic">Funciona</span></h2>
                <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium">3 passos simples para transformar sua experiência em um diploma oficial.</p>
              </Reveal>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { step: "01", title: "Análise Gratuita", desc: "Nossa equipe jurídica valida sua experiência profissional e documentos em tempo recorde." },
                { step: "02", title: "Avaliação Técnica", desc: "Você realiza uma prova de competência online para validar seus conhecimentos práticos." },
                { step: "03", title: "Diploma em Mãos", desc: "Após a aprovação, seu diploma é emitido e registrado no SISTEC/MEC em até 48h." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 200}>
                  <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brandOrange/30 transition-all duration-500 group h-full">
                    <span className="text-6xl md:text-8xl font-black text-white/5 absolute -top-4 -left-4 group-hover:text-brandOrange/10 transition-colors duration-500">{item.step}</span>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black text-white mb-4 group-hover:text-brandOrange transition-colors">{item.title}</h4>
                      <p className="text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={600}>
              <div className="mt-20 text-center">
                <button 
                  onClick={openModal}
                  className="bg-white text-navy px-12 py-6 rounded-2xl font-black text-xl hover:bg-brandOrange hover:text-white transition-all shadow-2xl active:scale-95 uppercase tracking-tight"
                >
                  Quero Iniciar Agora
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-40 bg-brandLight scroll-mt-24">
          <div className="container mx-auto px-4 max-w-5xl text-center mb-16">
            <Reveal>
              <div className="inline-block bg-navy/5 text-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Dúvidas Frequentes
              </div>
              <h2 className="text-4xl md:text-7xl text-navy font-title tracking-tighter uppercase mb-6">Principais <span className="text-brandOrange italic">Dúvidas</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium mb-12">Tudo o que você precisa saber para dar o próximo passo na sua carreira.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
              {[
                { q: "O diploma é oficial?", a: "Sim. Emitido por escola credenciada e registrado no SISTEC/MEC com validade nacional plena para todas as finalidades." },
                { q: "Quanto tempo demora?", a: "Após a prova e entrega dos documentos, a emissão ocorre em até 48 horas úteis. Rápido e sem burocracia." },
                { q: "Preciso fazer aulas?", a: "Não. O processo é baseado na Lei 9.394/96 Art. 41, que valida sua experiência profissional comprovada." },
                { q: "Quais os requisitos?", a: "Ter pelo menos 18 anos, Ensino Médio completo e comprovar no mínimo 1 ano de experiência na área desejada." }
              ].map((f, i) => (
                <Reveal key={`faq-${i}`} delay={i * 100}>
                  <div onClick={openModal} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:border-brandOrange/20 transition-all duration-500 cursor-pointer group h-full">
                    <h4 className="text-navy font-black text-xl mb-4 flex items-start group-hover:text-brandOrange transition-colors">
                      <HelpCircle className="text-brandOrange mr-4 mt-1 flex-shrink-0" size={24} /> {f.q}
                    </h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{f.a}</p>
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
      <footer id="contato" className="bg-navy text-white py-24 scroll-mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <img src={logoUrl} alt="Logo" className="h-24 mx-auto mb-10 object-contain hover:scale-110 transition-transform duration-500" />
            <p className="text-white/60 text-sm font-medium max-w-2xl mx-auto leading-relaxed mb-8">
              A EdumaisTec é uma instituição de vanguarda focada no reconhecimento de competências profissionais, conectando talentos ao mercado de trabalho através da certificação oficial.
            </p>
            <div className="flex justify-center space-x-8 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <a href="#início" className="hover:text-brandOrange transition-colors">Início</a>
              <a href="#cursos" className="hover:text-brandOrange transition-colors">Cursos</a>
              <a href="#faq" className="hover:text-brandOrange transition-colors">FAQ</a>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Reconhecimento • Valorização • Carreira</p>
            <p className="text-white/20 text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} EDUMAISTEC | CNPJ: 63.111.623/0001-51 | Todos os direitos reservados</p>
          </div>
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
