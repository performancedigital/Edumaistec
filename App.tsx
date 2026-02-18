
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
  Send
} from 'lucide-react';

// --- Types ---
interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  // Added key to fix TS error when Reveal is used within map loops
  key?: React.Key;
}

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

// --- Sub-Components ---

const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
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

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth((window.scrollY / scrollTotal) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-1 bg-brandOrange z-[100] transition-all duration-150" style={{ width: `${width}%` }} />
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 py-3">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-navy/20">
           <Award className="text-brandOrange w-6 h-6" />
        </div>
        <div className="text-navy font-black text-xl tracking-tighter leading-none">
          EDU<span className="text-brandOrange">MAIS</span>TEC<br/>
          <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em] uppercase">Educação Técnica</span>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-8 text-navy font-bold text-sm">
        {['Início', 'Cursos', 'Certificação', 'FAQ', 'Contato'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-brandOrange transition-colors group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandOrange transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <a 
          href="https://wa.me/yournumber" 
          className="bg-navy text-white px-6 py-3 rounded-full font-bold hover:bg-brandBlueLight hover:shadow-xl hover:shadow-navy/20 transition-all flex items-center text-sm active:scale-95"
        >
          <MessageCircle size={18} className="mr-2" />
          <span className="hidden sm:inline">Fale Conosco</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section id="início" className="relative bg-navy py-20 md:py-36 overflow-hidden">
    {/* Animated Blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brandOrange/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-brandBlueLight/30 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-brandOrange rounded-full animate-ping opacity-20"></div>
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="inline-flex items-center bg-brandOrange/10 border border-brandOrange/30 text-brandOrange px-5 py-2 rounded-full font-bold text-xs mb-8 tracking-widest uppercase animate-bounce-slow">
            <Zap size={16} className="mr-2 fill-brandOrange" /> Tecnologia & Reconhecimento
          </div>
          <h1 className="text-5xl md:text-8xl font-title text-white mb-8 leading-[1.05] tracking-tighter">
            O futuro da sua carreira <br/>
            <span className="text-brandOrange relative italic">
              começa agora
              <svg className="absolute -bottom-2 left-0 w-full opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="#FF6600" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-xl font-medium leading-relaxed">
            Certificação técnica por competência para quem já tem a prática. Reconhecido pelo MEC e válido em todo o território nacional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a href="#cursos" className="group bg-brandOrange text-white px-10 py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all text-center shadow-2xl shadow-brandOrange/30 flex items-center justify-center relative overflow-hidden">
              <span className="relative z-10 flex items-center">CONQUISTAR MEU DIPLOMA <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" /></span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
            </a>
            <a href="https://wa.me/yournumber" className="bg-white/5 border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center backdrop-blur-sm">
              Falar com um Consultor
            </a>
          </div>

          <div className="flex items-center space-x-4 text-white/40 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} /> <span>100% Legalizado</span>
            <span className="opacity-20">|</span>
            <Users size={16} /> <span>+5.000 Alunos</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 relative">
          {[
            { val: "500+", label: "Alunos Certificados", icon: <Users size={24}/>, delay: 100 },
            { val: "15+", label: "Cursos Oferecidos", icon: <GraduationCap size={24}/>, delay: 200 },
            { val: "98%", label: "Aprovação Rápida", icon: <CheckCircle size={24}/>, delay: 300 },
            { val: "4.9", label: "Satisfação Total", icon: <Star className="fill-brandOrange" size={24}/>, delay: 400 }
          ].map((stat, i) => (
            <Reveal key={i} className="h-full" delay={stat.delay}>
              <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10 text-center hover:bg-white/15 transition-all hover:-translate-y-3 group shadow-2xl overflow-hidden relative">
                <div className="absolute -top-4 -right-4 text-brandOrange opacity-5 group-hover:opacity-10 transition-opacity">
                   {stat.icon}
                </div>
                <p className="text-5xl md:text-6xl font-black text-brandOrange mb-3 tracking-tighter group-hover:scale-110 transition-transform">{stat.val}</p>
                <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CourseCard = ({ category, title, desc, icon: Icon, delay = 0 }: any) => (
  <Reveal delay={delay}>
    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-700 group relative overflow-hidden h-full flex flex-col border-b-4 border-b-transparent hover:border-b-brandOrange">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-bl-[4rem] transform translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700"></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <span className="text-[10px] font-black bg-brandLight text-brandBlueLight px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">{category}</span>
        <div className="bg-brandOrange/10 p-4 rounded-2xl text-brandOrange group-hover:bg-brandOrange group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg]">
          <Icon size={28} />
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-navy mb-5 group-hover:text-brandOrange transition-colors leading-tight">{title}</h3>
      <p className="text-gray-500 text-base leading-relaxed mb-10 flex-grow font-medium">{desc}</p>
      
      <div className="pt-8 border-t border-gray-50 flex flex-col space-y-4">
        <div className="flex items-center text-xs font-bold text-navy/60 uppercase tracking-widest">
          <Check size={16} className="text-brandOrange mr-2" /> Certificado Válido CFT/CREA
        </div>
        <button className="w-full bg-navy text-white py-5 rounded-2xl text-sm font-bold hover:bg-brandBlueLight transition-all flex items-center justify-center group/btn active:scale-95 shadow-lg shadow-navy/10 overflow-hidden relative">
          <span className="relative z-10 flex items-center">Saber Mais <ArrowUpRight size={18} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></span>
          <div className="absolute inset-0 bg-brandOrange transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>
      </div>
    </div>
  </Reveal>
);

const Courses = () => (
  <section id="cursos" className="py-24 bg-brandLight relative">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl text-navy mb-8 font-title tracking-tighter">Nossas Especialidades</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium">Selecione sua área de atuação e dê o passo definitivo para sua valorização profissional.</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        <CourseCard 
          icon={Stethoscope}
          category="Saúde" 
          title="Técnico em Enfermagem" 
          desc="Reconhecimento para quem atua na linha de frente do cuidado humano. Valide sua experiência hospitalar."
          delay={100}
        />
        <CourseCard 
          icon={HardHat}
          category="Indústria" 
          title="Eletrotécnica & Energias" 
          desc="Fundamental para profissionais de manutenção elétrica, geração e distribution. Registre-se no conselho."
          delay={200}
        />
        <CourseCard 
          icon={Monitor}
          category="TI" 
          title="Análise de Sistemas" 
          desc="O mercado de tecnologia não para. Obtenha seu diploma técnico e escale sua carreira no mundo digital."
          delay={300}
        />
        <CourseCard 
          icon={Briefcase}
          category="Gestão" 
          title="Administração & RH" 
          desc="Domine processos corporativos e lidere equipes com autoridade. Essencial para cargos de gerência."
          delay={400}
        />
        <CourseCard 
          icon={ShieldCheck}
          category="Segurança" 
          title="Segurança do Trabalho" 
          desc="Previna riscos e proteja vidas. Um dos profissionais mais requisitados por indústrias de todo o país."
          delay={500}
        />
        <CourseCard 
          icon={GraduationCap}
          category="Serviços" 
          title="Logística e Supply Chain" 
          desc="Otimize cadeias de suprimentos e impulsione a eficiência operacional de grandes empresas."
          delay={600}
        />
      </div>

      <Reveal className="flex justify-center flex-col items-center space-y-6">
        <button className="group bg-navy text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-brandBlueLight transition-all shadow-xl flex items-center active:scale-95">
          CARREGAR TODOS OS CURSOS <ChevronDown className="ml-3 group-hover:translate-y-2 transition-transform" />
        </button>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">+ de 50 opções disponíveis</p>
      </Reveal>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "É legalizado pelo MEC?", a: "Sim! Todo o processo de certificação por competência é amparado pelo Artigo 41 da LDB (Lei 9.394/96), com diplomas válidos em todo o Brasil e passíveis de registro nos conselhos de classe." },
    { q: "Qual o prazo para receber o diploma?", a: "Nossa análise documental leva em média 24h. Após a aprovação e prova, o diploma digital é emitido em até 48h úteis." },
    { q: "Quais os requisitos?", a: "É necessário ter o Ensino Médio completo e comprovar no mínimo 1 ano de experiência profissional na área desejada." },
    { q: "Preciso fazer aulas presenciais?", a: "Não. Como se trata de um reconhecimento de competências que você já possui, o processo é focado na avaliação do seu conhecimento prático e documental." }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl text-navy font-title mb-8 tracking-tighter leading-tight">Dúvidas Frequentes</h2>
            <p className="text-gray-500 text-xl mb-12 font-medium">Tudo o que você precisa saber para se sentir seguro e dar o próximo passo na sua jornada.</p>
            <div className="bg-brandLight p-8 rounded-[2.5rem] border border-gray-100">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center">
                     <HelpCircle size={24} />
                  </div>
                  <p className="text-navy font-bold">Ainda tem dúvidas?</p>
               </div>
               <a href="https://wa.me/yournumber" className="block text-center bg-brandOrange text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all">Falar com Especialista</a>
            </div>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`border-2 rounded-[2rem] transition-all overflow-hidden ${openIndex === i ? 'border-brandOrange bg-brandOrange/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center p-8 text-left"
                  >
                    <span className="text-lg font-bold text-navy">{faq.q}</span>
                    <div className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-brandOrange' : 'text-gray-400'}`}>
                      {openIndex === i ? <Minus /> : <Plus />}
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out px-8 ${openIndex === i ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contato" className="py-24 bg-brandLight">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl text-navy font-title tracking-tighter mb-4">Estamos Aqui Por Você</h2>
        <p className="text-gray-500 text-lg">Escolha o canal de sua preferência e fale conosco agora mesmo.</p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <MessageCircle className="text-green-500" />, title: "WhatsApp", detail: "(31) 97327-6886", btn: "Iniciar Chat" },
          { icon: <Mail className="text-red-500" />, title: "E-mail", detail: "edumaitecoficial@gmail.com", btn: "Enviar E-mail" },
          { icon: <Instagram className="text-pink-500" />, title: "Instagram", detail: "@edumaistec", btn: "Seguir Agora" },
          { icon: <MapPin className="text-navy" />, title: "Endereço", detail: "Cel. Fabriciano - MG", btn: "Ver Mapa" }
        ].map((item, i) => (
          <Reveal key={i} delay={(i + 1) * 100}>
            <div className="group bg-white p-10 rounded-[2.5rem] text-center border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              <div className="w-16 h-16 bg-brandLight rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h4 className="font-black text-navy mb-4 text-xl">{item.title}</h4>
              <p className="text-gray-500 text-sm mb-10 flex-grow font-medium leading-relaxed">{item.detail}</p>
              <button className="w-full py-4 rounded-xl bg-navy text-white font-bold hover:bg-brandOrange transition-all text-xs uppercase tracking-widest">
                {item.btn}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy text-white py-24 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brandOrange to-brandBlueLight"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-10 h-10 bg-brandOrange rounded-xl flex items-center justify-center shadow-lg shadow-brandOrange/20">
              <Award className="text-navy w-6 h-6" />
            </div>
            <div className="font-black text-2xl tracking-tighter uppercase">EDU<span className="text-brandOrange">MAIS</span>TEC</div>
          </div>
          <p className="text-white/40 text-sm font-medium leading-loose mb-10">
            Acelerando carreiras através da educação inteligente. Validamos sua competência profissional com agilidade e respaldo jurídico.
          </p>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brandOrange hover:border-brandOrange transition-all cursor-pointer group">
              <Instagram size={24} className="group-hover:text-white text-white/40" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brandOrange hover:border-brandOrange transition-all cursor-pointer group">
              <MessageCircle size={24} className="group-hover:text-white text-white/40" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-lg mb-10 text-white uppercase tracking-widest">Atalhos</h4>
          <ul className="space-y-6 text-white/40 text-sm font-bold uppercase tracking-tighter">
            <li className="hover:text-brandOrange cursor-pointer transition-colors">Grade Curricular</li>
            <li className="hover:text-brandOrange cursor-pointer transition-colors">Processo LDB</li>
            <li className="hover:text-brandOrange cursor-pointer transition-colors">Blog da Carreira</li>
            <li className="hover:text-brandOrange cursor-pointer transition-colors">Termos de Uso</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-lg mb-10 text-white uppercase tracking-widest">Registro</h4>
          <ul className="space-y-6 text-white/40 text-sm font-bold">
            <li className="flex items-center"><Check size={16} className="text-brandOrange mr-3" /> Cadastro MEC</li>
            <li className="flex items-center"><Check size={16} className="text-brandOrange mr-3" /> Registro SISTEC</li>
            <li className="flex items-center"><Check size={16} className="text-brandOrange mr-3" /> Lei Federal 9.394</li>
            <li className="flex items-center"><Check size={16} className="text-brandOrange mr-3" /> Selo de Qualidade</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-lg mb-10 text-brandOrange uppercase tracking-widest">Newsletter</h4>
          <p className="text-white/40 text-sm mb-6 font-medium">Receba avisos sobre novas turmas e legislação.</p>
          <div className="flex space-x-2">
            <input type="email" placeholder="Seu e-mail" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brandOrange w-full" />
            <button className="bg-brandOrange p-3 rounded-xl hover:brightness-110 transition-all"><Send size={20}/></button>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-6 opacity-30">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Logo_do_SISTEC.png/250px-Logo_do_SISTEC.png" className="h-6" alt="SISTEC" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/MEC_Logo.svg/1200px-MEC_Logo.svg.png" className="h-6" alt="MEC" />
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">
          © {new Date().getFullYear()} EDUMAISTEC • CNPJ: 62.215.924/0001-70
        </p>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-24 right-8 z-50 transition-all duration-700 transform ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
      <a 
        href="#início" 
        className="bg-brandOrange text-white p-6 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
        <Zap size={32} className="relative z-10" />
        <span className="absolute right-full mr-6 py-3 px-8 bg-white text-navy font-black text-sm rounded-2xl shadow-2xl whitespace-nowrap border-2 border-brandOrange opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">QUERO ME CERTIFICAR</span>
      </a>
    </div>
  );
};

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-6 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center animate-bounce-slow"
  >
    <MessageCircle size={36} />
    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-bold">1</div>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-brandOrange selection:text-white bg-white overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Trust Badges Marquee-like section */}
        <section className="py-12 bg-white border-b border-gray-50 flex overflow-hidden">
          <div className="container mx-auto px-4">
             <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-20 grayscale pointer-events-none">
                <span className="font-black text-2xl uppercase tracking-widest">Registro MEC</span>
                <span className="font-black text-2xl uppercase tracking-widest">SISTEC Oficial</span>
                <span className="font-black text-2xl uppercase tracking-widest">Validade Nacional</span>
                <span className="font-black text-2xl uppercase tracking-widest">LDB Artigo 41</span>
                <span className="font-black text-2xl uppercase tracking-widest">Cofeci-Creci</span>
             </div>
          </div>
        </section>

        <Courses />
        
        {/* Banner de Urgência Intermediário */}
        <section className="py-24 bg-brandOrange relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <GraduationCap className="absolute -left-20 -top-20 w-96 h-96 transform rotate-12" />
              <Briefcase className="absolute -right-20 -bottom-20 w-80 h-80 transform -rotate-12" />
           </div>
           <div className="container mx-auto px-4 relative z-10 text-center">
              <Reveal>
                 <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-none tracking-tighter">
                   TEMPO É DINHEIRO. <br/>Sua experiência vale um diploma.
                 </h2>
                 <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
                   Não perca mais tempo sendo apenas 'o cara que sabe fazer'. Seja the profissional certificado que o mercado busca.
                 </p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <a href="https://wa.me/yournumber" className="bg-navy text-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-navy/20">
                      SOLICITAR ANÁLISE GRÁTIS
                    </a>
                 </div>
                 <p className="mt-8 text-white/50 text-sm font-bold uppercase tracking-widest">Análise documental sem custo algum</p>
              </Reveal>
           </div>
        </section>

        <section id="certificacao" className="py-32 bg-white">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <Reveal>
                   <div className="relative group">
                      <div className="absolute -inset-4 bg-brandOrange/10 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                      <div className="relative bg-navy p-12 md:p-20 rounded-[3rem] text-white shadow-3xl overflow-hidden">
                         <div className="absolute top-0 right-0 p-10 opacity-5 text-brandOrange">
                            <ShieldCheck size={180} />
                         </div>
                         <h3 className="text-3xl md:text-5xl font-black mb-10 leading-tight">Certificação em <span className="text-brandOrange">3 Passos Simples</span></h3>
                         <div className="space-y-10">
                            {[
                              { step: "01", title: "Envio de Documentos", desc: "Você nos envia suas comprovações de experiência e escolaridade." },
                              { step: "02", title: "Aferição Técnica", desc: "Nossa banca avalia seus conhecimentos através de prova teórica online." },
                              { step: "03", title: "Diploma em Mãos", desc: "Aprovado, seu diploma é emitido com registro no SISTEC e validade nacional." }
                            ].map((s, i) => (
                              <div key={i} className="flex items-start group/step">
                                 <div className="text-brandOrange font-black text-4xl mr-6 opacity-40 group-hover/step:opacity-100 transition-opacity">{s.step}</div>
                                 <div>
                                    <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </Reveal>
                <Reveal delay={200}>
                   <h2 className="text-4xl md:text-6xl text-navy font-title mb-8 tracking-tighter leading-tight">Legalidade & <span className="text-brandOrange">Transparência</span></h2>
                   <p className="text-gray-500 text-xl mb-10 leading-relaxed font-medium">
                     Nossa metodologia é rigorosa e totalmente alinhada com as diretrizes da LDB. Emitimos diplomas que são aceitos em concursos públicos, processos seletivos e conselhos regionais.
                   </p>
                   <div className="space-y-6 mb-12">
                      <div className="flex items-center p-6 bg-brandLight rounded-2xl border-l-4 border-l-brandOrange">
                         <Lock className="text-brandOrange mr-4" />
                         <span className="text-navy font-bold">Processo auditado e criptografado</span>
                      </div>
                      <div className="flex items-center p-6 bg-brandLight rounded-2xl border-l-4 border-l-brandOrange">
                         <CheckCircle className="text-brandOrange mr-4" />
                         <span className="text-navy font-bold">Registro imediato no SISTEC/MEC</span>
                      </div>
                   </div>
                   <button className="w-full sm:w-auto bg-brandOrange text-white px-12 py-6 rounded-2xl font-black text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center">
                     QUERO MEU REGISTRO PROFISSIONAL <ArrowRight className="ml-3" />
                   </button>
                </Reveal>
             </div>
          </div>
        </section>

        <FAQSection />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <WhatsAppFloat />
      
      <style>{`
        @keyframes shine { 100% { left: 125%; } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-shine { animation: shine 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
        .shadow-3xl { box-shadow: 0 40px 80px -20px rgba(0, 51, 102, 0.25); }
        .font-title { font-family: 'Montserrat', sans-serif; font-weight: 800; }
        ::selection { background: #FF6600; color: white; }
      `}</style>
    </div>
  );
}
