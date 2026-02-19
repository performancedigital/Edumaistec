
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  MessageCircle, 
  ChevronDown, 
  Star,
  Award,
  Check,
  ArrowRight,
  Zap,
  Lock,
  Search,
  Instagram,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  HardHat,
  Stethoscope,
  Briefcase,
  Monitor,
  ArrowUpRight,
  HelpCircle,
  Plus,
  Minus,
  Send,
  X,
  Building2,
  Thermometer,
  Wrench,
  Activity
} from 'lucide-react';

// --- Types ---
interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

// --- Lead Modal Component ---
const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Disparar evento de Lead para o Meta Pixel (Garante o rastreio da conversão)
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    // URL de redirecionamento conforme solicitado: hubrhino + utm_campaign=vendas
    const redirectUrl = `https://hubrhino.rhinocrm.com.br/redirect-form?campaign=meta-lp-12x89-90&utm_source=meta&utm_campaign=vendas&nome=${encodeURIComponent(formData.name)}&whatsapp=${encodeURIComponent(formData.whatsapp)}`;
    
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
const useIntersectionObserver = (options = {}) => {
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
      {/* Scroll Progress Bar */}
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
            {['Início', 'Cursos', 'Certificação', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-brandOrange transition-colors group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandOrange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
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
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter">100%</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Legalidade (LDB)</p>
                      </div>
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter">48h</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">diploma em mãos</p>
                      </div>
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter uppercase leading-none">Conselho</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Registro Profissional</p>
                      </div>
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-brandOrange mb-3 tracking-tighter leading-none">SISTEC/MEC</p>
                        <p className="text-white/60 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-tight">Validade Nacional</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-brandOrange/30 rounded-full blur-[100px]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos */}
        <section id="cursos" className="py-20 md:py-32 bg-white relative">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-16 md:mb-24">
              <span className="text-[10px] font-black text-brandOrange bg-brandOrange/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-6 inline-block">As formações que o mercado exige</span>
              <h2 className="text-4xl md:text-7xl text-navy mb-8 font-title tracking-tighter uppercase leading-none">Nossas <span className="text-brandOrange underline decoration-4 underline-offset-8">Especialidades</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Pare de perder promoções por falta de diploma. Escolha sua área de atuação e regularize sua profissão hoje mesmo.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
              {[
                { icon: ShieldCheck, title: "Segurança do Trabalho", desc: "Profissional indispensável em qualquer empresa. Garanta sua titulação oficial.", tag: "Mandatório" },
                { icon: Activity, title: "Automação Industrial", desc: "Valide sua competência em sistemas industriais e garanta melhores cargos na indústria.", tag: "Setor Industrial" },
                { icon: Building2, title: "Transações Imobiliárias", desc: "O passo obrigatório para quem deseja obter o CRECI e atuar como corretor legalizado.", tag: "Acesso ao CRECI" },
                { icon: Thermometer, title: "Refrigeração e Climatização", desc: "Especialize-se na área que mais cresce no setor de serviços prediais e industriais.", tag: "Serviços Técnicos" },
                { icon: Stethoscope, title: "Técnico em Enfermagem", desc: "Fundamental para quem atua em hospitais e clínicas.", tag: "Alta Demanda" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-brandLight p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-2 border-transparent hover:border-brandOrange hover:bg-white hover:shadow-3xl transition-all duration-500 group relative flex flex-col h-full overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brandOrange/10 rounded-bl-[4rem] transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                    <div className="mb-10 relative z-10 flex justify-between items-start">
                      <div className="bg-navy text-white p-5 rounded-2xl group-hover:bg-brandOrange transition-colors shadow-lg shadow-navy/10">
                        <c.icon size={28} />
                      </div>
                      <span className="text-[9px] font-black bg-brandOrange text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">{c.tag}</span>
                    </div>
                    <h4 className="text-2xl font-black text-navy mb-5 leading-tight group-hover:text-brandOrange transition-colors">{c.title}</h4>
                    <p className="text-gray-500 text-base font-medium leading-relaxed mb-10 flex-grow">{c.desc}</p>
                    <button 
                      onClick={openModal}
                      className="w-full bg-navy text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brandBlueLight transition-all flex items-center justify-center group/btn shadow-xl shadow-navy/10"
                    >
                      VALIDAR AGORA <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <Reveal className="text-center">
              <button 
                onClick={openModal}
                className="bg-brandOrange text-white px-10 md:px-16 py-6 md:py-7 rounded-[2rem] font-black text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-brandOrange/30 uppercase tracking-tighter flex items-center mx-auto"
              >
                VER LISTA COMPLETA DE CURSOS <ChevronDown className="ml-3" />
              </button>
            </Reveal>
          </div>
        </section>

        {/* Autoridade & Legalidade */}
        <section id="certificacao" className="py-20 md:py-32 bg-navy relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Building2 className="absolute -left-20 -bottom-20 w-96 h-96 transform -rotate-12" />
           </div>
           <div className="container mx-auto px-4 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <Reveal>
                 <span className="text-brandOrange font-black text-xs uppercase tracking-[0.4em] mb-8 inline-block">Certificação Federal</span>
                 <h2 className="text-4xl md:text-7xl text-white font-title mb-10 leading-[0.9] tracking-tighter uppercase">Diploma <span className="text-brandOrange">Válido & Seguro</span> Conforme a LDB</h2>
                 <p className="text-white/60 text-xl leading-relaxed mb-12 font-medium">
                   O <span className="text-white font-bold underline decoration-brandOrange underline-offset-4">Artigo 41 da Lei 9.394/96</span> garante que sua prática vale como educação. Não gaste 2 anos estudando o que você já sabe.
                 </p>
                 <div className="space-y-6 mb-12">
                   {[
                     "Aceito em Concursos Públicos e Processos Seletivos",
                     "Registro profissional em COREN, CFT, CRECI, etc",
                     "Autenticidade garantida pelo SISTEC do MEC",
                     "Válido em todo o território nacional"
                   ].map((t, i) => (
                     <div key={i} className="flex items-center text-white/90 font-bold text-lg">
                       <div className="bg-brandOrange/20 p-2 rounded-lg mr-5">
                          <Check size={20} className="text-brandOrange" />
                       </div>
                       {t}
                     </div>
                   ))}
                 </div>
                 <button onClick={openModal} className="bg-brandOrange text-white px-12 py-6 rounded-2xl font-black text-lg hover:brightness-110 shadow-3xl shadow-brandOrange/20 transition-all uppercase flex items-center group">
                    VALIDAR MINHA CARREIRA AGORA <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                 </button>
               </Reveal>
               <div className="relative">
                 <Reveal delay={200}>
                   <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-3xl">
                     <div className="flex flex-col space-y-10">
                       <div className="flex items-start group">
                         <div className="bg-brandOrange/20 p-5 rounded-2xl mr-8 group-hover:bg-brandOrange transition-colors">
                           <Zap className="text-brandOrange group-hover:text-white" size={32} />
                         </div>
                         <div>
                           <h4 className="text-white font-black text-2xl mb-3 tracking-tight">Análise Imediata</h4>
                           <p className="text-white/40 text-base font-medium">Nossa equipe avalia sua documentação e responde em até 24h úteis sobre sua eligibilidade.</p>
                         </div>
                       </div>
                       <div className="flex items-start group">
                         <div className="bg-brandOrange/20 p-5 rounded-2xl mr-8 group-hover:bg-brandOrange transition-colors">
                           <ShieldCheck className="text-brandOrange group-hover:text-white" size={32} />
                         </div>
                         <div>
                           <h4 className="text-white font-black text-2xl mb-3 tracking-tight">Garantia SISTEC</h4>
                           <p className="text-white/40 text-base font-medium">Após aprovação, seu registro é inserido no portal oficial do MEC para consulta pública imediata.</p>
                         </div>
                       </div>
                       <div className="pt-6">
                         <button onClick={openModal} className="w-full py-6 bg-white text-navy font-black rounded-3xl hover:bg-brandOrange hover:text-white transition-all uppercase tracking-widest text-sm">
                            Falar com um Consultor
                         </button>
                       </div>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </div>
           </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-32 bg-white">
           <div className="container mx-auto px-4 max-w-5xl">
              <Reveal className="text-center mb-16 md:mb-20">
                 <h2 className="text-4xl md:text-7xl text-navy font-title tracking-tighter uppercase mb-6 leading-none">Principais <span className="text-brandOrange">Dúvidas</span></h2>
                 <p className="text-gray-500 font-medium text-lg md:text-xl">Esclareça suas incertezas e dê o próximo passo na sua carreira.</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 {[
                   { q: "O diploma é igual ao de quem fez o curso?", a: "Sim. O documento é emitido por escola técnica credenciada e não informa se foi por competência ou regular. Validade jurídica absoluta." },
                   { q: "Posso me registrar nos conselhos?", a: "Sim! O diploma é oficial e registrado no MEC, o que garante o direito ao registro profissional nos conselhos de classe." },
                   { q: "Qual o tempo médio do processo?", a: "A partir do envio da documentação e da realização da prova, são 48 horas úteis para emissão do diploma." },
                   { q: "Preciso comprovar quanto tempo?", a: "É necessário comprovar no mínimo 1 ano de experiência profissional na área técnica desejada." }
                 ].map((f, i) => (
                   <Reveal key={i} delay={i * 100}>
                      <div onClick={openModal} className="group border-2 border-gray-100 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 hover:border-brandOrange hover:bg-brandLight transition-all cursor-pointer h-full">
                         <h4 className="text-navy font-black text-xl mb-6 flex items-start">
                            <HelpCircle className="text-brandOrange mr-4 shrink-0 mt-1" size={24} /> {f.q}
                         </h4>
                         <p className="text-gray-600 font-medium leading-relaxed text-base">{f.a}</p>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32 bg-brandOrange relative overflow-hidden">
           <div className="container mx-auto px-4 text-center relative z-10">
              <Reveal>
                 <h2 className="text-4xl md:text-8xl text-white font-black mb-12 leading-none tracking-tighter uppercase italic">
                   VALIDE SUA EXPERIÊNCIA <br className="hidden md:block"/> E MUDE DE VIDA!
                 </h2>
                 <p className="text-white/80 text-xl md:text-3xl mb-16 font-medium max-w-4xl mx-auto">
                   Não perca mais tempo. Regularize sua profissão hoje mesmo e conquiste o salário que você realmente merece.
                 </p>
                 <button 
                  onClick={openModal}
                  className="bg-navy text-white px-10 md:px-16 py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black text-xl md:text-2xl hover:bg-brandBlueLight hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-navy/30 uppercase tracking-tight"
                 >
                    SOLICITAR ANÁLISE GRATUITA AGORA
                 </button>
              </Reveal>
           </div>
        </section>

        {/* Contato */}
        <section id="contato" className="py-16 md:py-24 bg-brandLight">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {[
                 { icon: MessageCircle, title: "Central WhatsApp", val: "Falar no Chat", color: "text-green-500" },
                 { icon: Mail, title: "E-mail Atendimento", val: "edumaistecoficial@gmail.com", color: "text-red-500" },
                 { icon: Instagram, title: "Nosso Instagram", val: "@edumaistec", color: "text-pink-500" },
                 { icon: MapPin, title: "Sede Administrativa", val: "Cel. Fabriciano - MG", color: "text-navy" }
               ].map((c, i) => (
                 <div key={i} onClick={openModal} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 text-center hover:shadow-2xl transition-all group cursor-pointer">
                    <div className="w-16 h-16 bg-brandLight rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 transition-transform shadow-inner">
                       <c.icon className={c.color} size={32} />
                    </div>
                    <h5 className="font-black text-navy text-sm uppercase tracking-widest mb-3 leading-tight">{c.title}</h5>
                    <p className="text-gray-500 text-xs font-bold truncate leading-relaxed">{c.val}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-20 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center justify-center mb-12">
             <img 
               src={logoUrl} 
               alt="EdumaisTec Logo Rodapé" 
               className="h-20 md:h-28 mb-8 object-contain"
               onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.style.display = 'none';
                 const parent = target.parentElement;
                 if (parent && !parent.querySelector('.footer-fallback')) {
                    const div = document.createElement('div');
                    div.className = 'footer-fallback text-white font-black text-4xl mb-4 tracking-tighter uppercase';
                    div.innerHTML = 'EDU<span class="text-brandOrange">MAIS</span>TEC';
                    parent.prepend(div);
                 }
               }}
             />
             <div className="inline-block bg-white/10 px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                <p className="text-[12px] md:text-sm text-white/90 font-black uppercase tracking-[0.2em]">
                  CNPJ: 63.111.623/0001-51
                </p>
             </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
             <p className="text-white/40 text-[10px] md:text-xs leading-relaxed uppercase tracking-[0.15em] font-bold">
               A EdumaisTec é uma instituição de vanguarda focada no reconhecimento de competências profissionais. <br className="hidden md:block" /> 
               Todos os diplomas emitidos por nossas parceiras são registrados no SISTEC/MEC e possuem validade nacional plena.
             </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
            <span>© {new Date().getFullYear()} EDUMAISTEC</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </footer>

      {/* Persistent Sticky WhatsApp Button */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
         <button 
           onClick={openModal}
           className="bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all group animate-bounce-slow flex items-center justify-center"
         >
            <MessageCircle size={36} className="fill-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black animate-pulse">1</div>
         </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .shadow-3xl { box-shadow: 0 45px 90px -20px rgba(0, 51, 102, 0.45); }
        .animate-shine { animation: shine 1.8s infinite; }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 125%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
