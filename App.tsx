
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  Users, 
  Clock, 
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 relative z-10 shadow-3xl animate-fade-in border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors">
          <X size={24} />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brandOrange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="text-brandOrange" size={32} />
          </div>
          <h3 className="text-2xl font-black text-navy leading-tight mb-2 uppercase tracking-tighter">Garanta sua Vaga!</h3>
          <p className="text-gray-500 font-medium">Insira seus dados para receber a <span className="text-brandOrange font-bold">Análise Documental Gratuita</span> via WhatsApp e validar seu diploma técnico rápido.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Seu Nome Completo</label>
            <input required type="text" placeholder="Ex: João Silva" className="w-full bg-brandLight border-2 border-transparent focus:border-brandOrange px-6 py-4 rounded-2xl font-medium outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">WhatsApp (DDD + Número)</label>
            <input required type="tel" placeholder="(00) 00000-0000" className="w-full bg-brandLight border-2 border-transparent focus:border-brandOrange px-6 py-4 rounded-2xl font-medium outline-none transition-all" />
          </div>
          <button type="submit" className="w-full bg-brandOrange text-white py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-brandOrange/20 active:scale-95 flex items-center justify-center group uppercase tracking-tight">
            Validar Experiência Agora <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest pt-4">
            <Lock size={10} className="inline mr-1" /> Seus dados estão protegidos pela LGPD.
          </p>
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

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollWidth((window.scrollY / scrollTotal) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-brandOrange selection:text-white bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-brandOrange z-[110] transition-all duration-150" style={{ width: `${scrollWidth}%` }} />
      
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-navy/20">
               <Award className="text-brandOrange w-6 h-6" />
            </div>
            <div className="text-navy font-black text-xl tracking-tighter leading-none">
              EDU<span className="text-brandOrange">MAIS</span>TEC<br/>
              <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em] uppercase">Certificação Técnica</span>
            </div>
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
            className="bg-navy text-white px-8 py-3.5 rounded-full font-bold hover:bg-brandBlueLight hover:shadow-xl hover:shadow-navy/10 transition-all flex items-center text-sm active:scale-95"
          >
            <MessageCircle size={18} className="mr-2" />
            Análise Grátis
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Aumentado o espaçamento para criar impacto visual */}
        <section id="início" className="relative bg-navy pt-56 pb-32 md:pt-80 md:pb-56 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brandOrange/20 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-brandBlueLight/30 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <Reveal>
                <div className="inline-flex items-center bg-white/5 border border-white/10 text-brandOrange px-6 py-2 rounded-full font-bold text-xs mb-8 tracking-[0.2em] uppercase backdrop-blur-md">
                  <Zap size={16} className="mr-2 fill-brandOrange" /> 1 ano de prática = 1 diploma técnico válido
                </div>
                <h1 className="text-5xl md:text-8xl font-title text-white mb-8 leading-[1] tracking-tighter">
                  Sua experiência profissional vale um <span className="text-brandOrange italic">Diploma Técnico</span>
                </h1>
                <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-xl font-medium leading-relaxed">
                  Regularize sua profissão em tempo recorde. Se você tem <span className="text-white font-bold underline decoration-brandOrange">1 ano de experiência</span>, já pode obter seu diploma técnico reconhecido pelo MEC e registro no SISTEC sem aulas cansativas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <button 
                    onClick={openModal}
                    className="group bg-brandOrange text-white px-12 py-7 rounded-2xl font-black text-xl hover:brightness-110 transition-all text-center shadow-3xl shadow-brandOrange/30 flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center uppercase tracking-tight">CONQUISTAR MEU DIPLOMA <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" /></span>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
                  </button>
                </div>

                <div className="mt-12 flex flex-wrap gap-10 opacity-60">
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Reconhecido MEC</div>
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Válido p/ Concursos</div>
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest"><CheckCircle size={18} className="mr-3 text-brandOrange" /> Registro no SISTEC</div>
                </div>
              </Reveal>

              <div className="relative">
                <Reveal delay={200} className="relative z-10">
                  <div className="bg-white/10 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/20 shadow-3xl">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-black text-brandOrange mb-2 tracking-tighter">100%</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Legalidade (LDB)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-black text-brandOrange mb-2 tracking-tighter">45</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Dias p/ Diploma</p>
                      </div>
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-black text-brandOrange mb-2 tracking-tighter">COREN</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Registro Profissional</p>
                      </div>
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-black text-brandOrange mb-2 tracking-tighter">ONLINE</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Em Todo o Brasil</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-brandOrange/30 rounded-full blur-[100px]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Autoridade & Prova Social */}
        <section className="py-16 bg-brandLight border-b border-gray-100">
          <div className="container mx-auto px-4">
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-40 grayscale contrast-125">
                <span className="font-black text-xl uppercase tracking-[0.4em]">Cadastro MEC</span>
                <span className="font-black text-xl uppercase tracking-[0.4em]">Registro SISTEC</span>
                <span className="font-black text-xl uppercase tracking-[0.4em]">Lei Federal 9.394</span>
                <span className="font-black text-xl uppercase tracking-[0.4em]">LDB Artigo 41</span>
             </div>
          </div>
        </section>

        {/* Sessão 2 - Cursos Técnicos Reconhecidos (Pareto) */}
        <section id="cursos" className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-24">
              <span className="text-[10px] font-black text-brandOrange bg-brandOrange/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-6 inline-block">Sua regularização profissional rápida</span>
              <h2 className="text-4xl md:text-7xl text-navy mb-8 font-title tracking-tighter uppercase leading-none">Cursos em <span className="text-brandOrange underline decoration-4 underline-offset-8">Destaque</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Pare de perder oportunidades por falta de titulação. Estes são os cursos técnicos online reconhecidos com maior taxa de empregabilidade hoje.
              </p>
            </Reveal>

            {/* HIGH SELLERS */}
            <div className="mb-20">
              <div className="flex items-center space-x-6 mb-12">
                <div className="h-0.5 bg-gray-100 flex-grow"></div>
                <h3 className="text-navy font-black text-xs uppercase tracking-[0.2em] flex items-center">
                  <Star className="text-brandOrange mr-2 fill-brandOrange" size={16} /> Especialidades de Alta Performance
                </h3>
                <div className="h-0.5 bg-gray-100 flex-grow"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                  { icon: Stethoscope, title: "Técnico em Enfermagem", desc: "Consiga seu registro no COREN e atue legalmente em hospitais e clínicas particulares ou públicas.", tag: "Campeão de Vendas" },
                  { icon: Building2, title: "Transações Imobiliárias", desc: "O passo obrigatório para quem deseja obter o CRECI e ser um corretor de imóveis de sucesso.", tag: "Acesso ao CRECI" },
                  { icon: Activity, title: "Automação Industrial", desc: "Valide sua prática com sistemas complexos e garanta as melhores promoções no setor industrial.", tag: "Indústria 4.0" },
                  { icon: ShieldCheck, title: "Segurança do Trabalho", desc: "Formação indispensável. Proteja vidas e garanta que sua empresa cumpra todas as normas técnicas vigentes.", tag: "Altíssima Demanda" },
                  { icon: Thermometer, title: "Refrigeração e Climatização", desc: "A área de serviços que nunca para de crescer. Obtenha seu diploma e gerencie seus próprios projetos.", tag: "Setor de Serviços" },
                ].map((c, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="bg-brandLight p-10 rounded-[3rem] border-2 border-transparent hover:border-brandOrange hover:bg-white hover:shadow-3xl transition-all duration-500 group relative flex flex-col h-full overflow-hidden">
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
                        Validar Experiência <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* LOW SELLERS */}
            <div className="mb-24">
              <div className="flex items-center space-x-6 mb-12">
                <div className="h-0.5 bg-gray-100 flex-grow"></div>
                <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Outras Formações Estratégicas</h3>
                <div className="h-0.5 bg-gray-100 flex-grow"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { title: "Mecatrônica", icon: Wrench },
                  { title: "Optometria", icon: Search },
                  { title: "Podologia", icon: Activity },
                  { title: "Enfermagem do Trabalho", icon: Stethoscope },
                ].map((c, i) => (
                  <button 
                    key={i} 
                    onClick={openModal}
                    className="flex flex-col items-center justify-center p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl hover:border-brandOrange transition-all group"
                  >
                    <c.icon className="text-gray-300 group-hover:text-brandOrange mb-6 transition-colors" size={32} />
                    <span className="text-navy font-black text-xs text-center uppercase tracking-tighter leading-tight">{c.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <Reveal className="text-center">
              <button 
                onClick={openModal}
                className="bg-brandOrange text-white px-16 py-7 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-brandOrange/30 uppercase tracking-tighter flex items-center mx-auto"
              >
                VER LISTA COMPLETA (+50 CURSOS) <ChevronDown className="ml-3" />
              </button>
            </Reveal>
          </div>
        </section>

        {/* Seção de Autoridade & Legalidade - SEO Focus */}
        <section id="certificacao" className="py-32 bg-navy relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Building2 className="absolute -left-20 -bottom-20 w-96 h-96 transform -rotate-12" />
           </div>
           <div className="container mx-auto px-4 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <Reveal>
                 <span className="text-brandOrange font-black text-xs uppercase tracking-[0.4em] mb-8 inline-block">Certificação por Experiência Profissional</span>
                 <h2 className="text-4xl md:text-7xl text-white font-title mb-10 leading-[0.9] tracking-tighter uppercase">Diploma Técnico <span className="text-brandOrange">Válido & Reconhecido</span> em Todo o Brasil</h2>
                 <p className="text-white/60 text-xl leading-relaxed mb-12 font-medium">
                   Não perca mais tempo sendo apenas "o cara que sabe fazer". A <span className="text-white font-bold underline decoration-brandOrange underline-offset-4">Certificação por Competência</span> é a forma mais rápida de validar seu conhecimento prático através do Art. 41 da Lei de Diretrizes e Bases da Educação Nacional (Lei 9.394/96).
                 </p>
                 <div className="space-y-6 mb-12">
                   {[
                     "Diploma aceito em qualquer Concurso Público",
                     "Registro imediato nos Conselhos (CFT, CRECI, COREN, etc)",
                     "Consulta oficial pelo SISTEC/MEC (Autenticidade Garantida)",
                     "Segurança jurídica e validade nacional vitalícia"
                   ].map((t, i) => (
                     <div key={i} className="flex items-center text-white/90 font-bold text-lg">
                       <div className="bg-brandOrange/20 p-2 rounded-lg mr-5">
                          <Check size={20} className="text-brandOrange" />
                       </div>
                       {t}
                     </div>
                   ))}
                 </div>
                 <button onClick={openModal} className="bg-brandOrange text-white px-12 py-6 rounded-2xl font-black text-lg hover:brightness-110 shadow-3xl shadow-brandOrange/20 transition-all uppercase flex items-center">
                    Garantir Meu Registro Profissional <ArrowRight size={20} className="ml-3" />
                 </button>
               </Reveal>
               <div className="relative">
                 <Reveal delay={200}>
                   <div className="bg-white/5 backdrop-blur-2xl p-14 rounded-[4rem] border border-white/10 shadow-3xl">
                     <div className="flex flex-col space-y-10">
                       <div className="flex items-start group">
                         <div className="bg-brandOrange/20 p-5 rounded-2xl mr-8 group-hover:bg-brandOrange transition-colors">
                           <Zap className="text-brandOrange group-hover:text-white" size={32} />
                         </div>
                         <div>
                           <h4 className="text-white font-black text-2xl mb-3 tracking-tight">Processo Acelerado</h4>
                           <p className="text-white/40 text-base font-medium">Esqueça os 2 anos de banco de escola. Sua experiência de 1 ano reduz o tempo de certificação para apenas 45 dias médios.</p>
                         </div>
                       </div>
                       <div className="flex items-start group">
                         <div className="bg-brandOrange/20 p-5 rounded-2xl mr-8 group-hover:bg-brandOrange transition-colors">
                           <ShieldCheck className="text-brandOrange group-hover:text-white" size={32} />
                         </div>
                         <div>
                           <h4 className="text-white font-black text-2xl mb-3 tracking-tight">Zero Burocracia</h4>
                           <p className="text-white/40 text-base font-medium">Análise documental 100% digital. Você envia os documentos pelo computador ou celular e nossa equipe cuida de tudo.</p>
                         </div>
                       </div>
                       <div className="pt-6">
                         <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
                            <p className="text-brandOrange font-black text-3xl mb-1">SISTEC</p>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Consulta de Autenticidade no MEC</p>
                         </div>
                       </div>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </div>
           </div>
        </section>

        {/* FAQ Persuasivo - Quebra de Objeções */}
        <section id="faq" className="py-32 bg-white">
           <div className="container mx-auto px-4 max-w-5xl">
              <Reveal className="text-center mb-20">
                 <h2 className="text-4xl md:text-7xl text-navy font-title tracking-tighter uppercase mb-6 leading-none">Perguntas <span className="text-brandOrange">Frequentes</span></h2>
                 <p className="text-gray-500 font-medium text-xl">Resolvemos suas dúvidas para que você dê o próximo passo com segurança.</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { q: "O diploma é igual ao de um curso presencial?", a: "Sim, absolutamente. O diploma tem a mesma validade jurídica e não contém qualquer observação de que foi obtido por competência." },
                   { q: "Posso realmente me registrar no COREN ou CRECI?", a: "Sim! Milhares de nossos alunos já obtiveram seus registros profissionais nos conselhos de classe através dessa modalidade legal." },
                   { q: "Quanto custa o processo?", a: "O valor é infinitamente menor que uma mensalidade de 2 anos. Clique em qualquer botão para receber a tabela de investimento via WhatsApp." },
                   { q: "E se eu não for aprovado na prova?", a: "Nosso suporte pedagógico te orienta durante todo o processo. Você terá novas chances de realizar a avaliação sem custos adicionais." }
                 ].map((f, i) => (
                   <Reveal key={i} delay={i * 100}>
                      <div className="group border-2 border-gray-100 rounded-[2.5rem] p-10 hover:border-brandOrange hover:bg-brandLight transition-all cursor-pointer h-full">
                         <h4 className="text-navy font-black text-xl mb-6 flex items-start">
                            <HelpCircle className="text-brandOrange mr-4 shrink-0 mt-1" size={24} /> {f.q}
                         </h4>
                         <p className="text-gray-600 font-medium leading-relaxed text-base">{f.a}</p>
                      </div>
                   </Reveal>
                 ))}
              </div>
              <div className="mt-16 text-center">
                <button onClick={openModal} className="text-navy font-black text-sm uppercase tracking-widest border-b-2 border-brandOrange pb-2 hover:text-brandOrange transition-colors">
                   Tenho outra dúvida, quero falar com um especialista
                </button>
              </div>
           </div>
        </section>

        {/* CTA Matador */}
        <section className="py-32 bg-brandOrange relative overflow-hidden">
           <div className="container mx-auto px-4 text-center relative z-10">
              <Reveal>
                 <h2 className="text-5xl md:text-8xl text-white font-black mb-12 leading-none tracking-tighter uppercase">
                   Não deixe sua <br className="hidden md:block"/> promoção passar!
                 </h2>
                 <p className="text-white/80 text-xl md:text-3xl mb-16 font-medium max-w-4xl mx-auto">
                   O mercado exige titulação técnica. Obtenha seu diploma por experiência profissional hoje mesmo e garanta sua estabilidade financeira.
                 </p>
                 <button 
                  onClick={openModal}
                  className="bg-navy text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-brandBlueLight hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-navy/30 uppercase tracking-tight"
                 >
                    SOLICITAR ANÁLISE DOCUMENTAL GRÁTIS
                 </button>
                 <div className="mt-12 flex flex-wrap justify-center gap-10 opacity-40">
                    <div className="flex items-center text-navy text-[10px] font-black uppercase tracking-widest"><Lock size={16} className="mr-3" /> Ambiente 100% Seguro</div>
                    <div className="flex items-center text-navy text-[10px] font-black uppercase tracking-widest"><Clock size={16} className="mr-3" /> Resposta em até 24h</div>
                 </div>
              </Reveal>
           </div>
           {/* Background Decorations */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </section>

        {/* Localização & Contato */}
        <section id="contato" className="py-24 bg-brandLight">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                 { icon: MessageCircle, title: "WhatsApp Oficial", val: "(31) 97327-6886", color: "text-green-500" },
                 { icon: Mail, title: "E-mail Atendimento", val: "edumaistecoficial@gmail.com", color: "text-red-500" },
                 { icon: Instagram, title: "Siga no Instagram", val: "@edumaistec", color: "text-pink-500" },
                 { icon: MapPin, title: "Sede Administrativa", val: "Cel. Fabriciano - MG", color: "text-navy" }
               ].map((c, i) => (
                 <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 text-center hover:shadow-2xl transition-all group cursor-default">
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
      <footer className="bg-navy text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-12">
             <div className="w-10 h-10 bg-brandOrange rounded-xl flex items-center justify-center shadow-lg shadow-brandOrange/20">
                <Award className="text-navy w-6 h-6" />
             </div>
             <div className="font-black text-2xl tracking-tighter uppercase">EDU<span className="text-brandOrange">MAIS</span>TEC</div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mb-16 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-brandOrange transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-brandOrange transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-brandOrange transition-colors">Portal do SISTEC</a>
            <a href="#" className="hover:text-brandOrange transition-colors">Trabalhe Conosco</a>
          </div>
          <div className="max-w-3xl mx-auto mb-16 opacity-20">
            <p className="text-[10px] leading-relaxed uppercase tracking-widest font-bold">
              Edumaistec Educação Profissional Ltda. • CNPJ: 62.215.924/0001-70 • Processo Amparado pelo Artigo 41 da Lei de Diretrizes e Bases da Educação Nacional (Lei 9.394/96). Todos os Direitos Reservados.
            </p>
          </div>
          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.6em]">
            © {new Date().getFullYear()} EDUMAISTEC • Liderança em Certificação por Competência
          </p>
        </div>
      </footer>

      {/* Persistent Sticky CTAs */}
      <div className="fixed bottom-10 right-10 z-[80] flex flex-col space-y-5">
         <button 
           onClick={openModal}
           className="bg-brandOrange text-white p-7 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all group relative animate-bounce-slow"
         >
            <Zap size={36} />
            <span className="absolute right-full mr-8 bg-white text-navy px-8 py-4 rounded-2xl font-black text-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border-2 border-brandOrange translate-x-4 group-hover:translate-x-0">
               QUERO MEU DIPLOMA HOJE!
            </span>
         </button>
         <a 
           href="https://wa.me/5531973276886" 
           target="_blank" 
           rel="noopener noreferrer"
           className="bg-green-500 text-white p-7 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative group"
         >
            <MessageCircle size={36} />
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-black animate-pulse">1</div>
            <span className="absolute right-full mr-8 bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-black text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-green-200">Consultoria Online</span>
         </a>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .shadow-3xl { box-shadow: 0 45px 90px -20px rgba(0, 51, 102, 0.35); }
        .animate-shine { animation: shine 1.8s infinite; }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 125%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
