
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
  ArrowUpRight
} from 'lucide-react';

// --- Custom Hooks for UX ---

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

// Updated Reveal to handle children as optional and include key in the type definition to fix TS errors in JSX
const Reveal = ({ children, className = "" }: { children?: React.ReactNode, className?: string, key?: React.Key }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-3">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 group cursor-pointer">
        <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-md">
           <Award className="text-brandOrange w-6 h-6" />
        </div>
        <div className="text-navy font-black text-xl tracking-tighter leading-none">
          EDU<span className="text-brandOrange">MAIS</span>TEC<br/>
          <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em]">EDUCAÇÃO TÉCNICA</span>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-8 text-navy font-bold text-sm">
        {['Início', 'Cursos', 'Certificação', 'Contato'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-brandOrange transition-colors group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandOrange transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-3">
        <a 
          href="https://wa.me/yournumber" 
          className="bg-navy text-white px-5 py-2.5 rounded-full font-bold hover:bg-brandBlueLight hover:scale-105 transition-all shadow-md flex items-center text-sm active:scale-95"
        >
          <MessageCircle size={18} className="mr-2" />
          Fale Conosco
        </a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section id="início" className="relative bg-navy py-20 md:py-32 overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-brandOrange rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-brandBlueLight rounded-full blur-[120px]"></div>
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="inline-flex items-center bg-brandOrange/10 border border-brandOrange/20 text-brandOrange px-4 py-2 rounded-full font-bold text-xs mb-8 tracking-wider uppercase animate-bounce-slow">
            <Zap size={16} className="mr-2" /> Educação Técnica de Excelência
          </div>
          <h1 className="text-5xl md:text-7xl font-title text-white mb-8 leading-tight">
            Transformando Vidas Através da <span className="relative inline-block text-brandOrange">
              Educação
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="#FF6600" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-white/80 text-xl mb-12 max-w-lg font-medium leading-relaxed">
            Construindo profissionais do futuro com cursos técnicos por competência. Receba sua certificação oficial em tempo recorde.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-12 text-white/80 text-sm font-semibold">
            <div className="flex items-center group cursor-default">
              <div className="bg-brandOrange/20 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} className="text-brandOrange" />
              </div> 
              Certificação Oficial
            </div>
            <div className="flex items-center group cursor-default">
              <div className="bg-brandOrange/20 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <Users size={20} className="text-brandOrange" />
              </div> 
              Turmas Reduzidas
            </div>
            <div className="flex items-center group cursor-default">
              <div className="bg-brandOrange/20 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <Award size={20} className="text-brandOrange" />
              </div> 
              Mec & Sistec
            </div>
            <div className="flex items-center group cursor-default">
              <div className="bg-brandOrange/20 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <Clock size={20} className="text-brandOrange" />
              </div> 
              Emissão em 48h
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#cursos" className="group bg-brandOrange text-white px-10 py-5 rounded-xl font-bold hover:brightness-110 transition-all text-center shadow-xl shadow-brandOrange/20 flex items-center justify-center relative overflow-hidden">
              <span className="relative z-10 flex items-center">Conheça Nossos Cursos <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </a>
            <a href="https://wa.me/yournumber" className="bg-white/5 border-2 border-white/20 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center">
              Fale com um consultor
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 relative">
          {[
            { val: "500+", label: "Alunos Certificados", delay: "delay-100" },
            { val: "15+", label: "Cursos Disponíveis", delay: "delay-200" },
            { val: "98%", label: "Taxa de Aprovação", delay: "delay-300" },
            { val: "5.0", label: "Avaliação Média", icon: <Star className="inline mb-2 ml-1" size={20}/>, delay: "delay-400" }
          ].map((stat, i) => (
            <Reveal key={i} className={`h-full ${stat.delay}`}>
              <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 text-center hover:bg-white/15 transition-all hover:-translate-y-2 group shadow-2xl">
                <p className="text-5xl font-black text-brandOrange mb-2 tracking-tighter group-hover:scale-110 transition-transform">{stat.val}{stat.icon}</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            </Reveal>
          ))}
          {/* Floating Circle Efx */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brandOrange/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
);

const CourseCard = ({ category, title, desc, icon: Icon }: any) => (
  <Reveal>
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brandOrange/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <span className="text-[11px] font-bold bg-brandLight text-brandBlueLight px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">{category}</span>
        <div className="bg-brandOrange/10 p-3 rounded-2xl text-brandOrange group-hover:bg-brandOrange group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-brandOrange transition-colors line-clamp-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{desc}</p>
      
      <div className="pt-8 border-t border-gray-50 flex flex-col space-y-4">
        <div className="flex items-center text-xs font-semibold text-navy">
          <Check size={14} className="text-brandOrange mr-2" /> Certificação Nacional Inclusa
        </div>
        <button className="w-full bg-navy text-white py-4 rounded-xl text-sm font-bold hover:bg-brandBlueLight transition-all flex items-center justify-center group/btn active:scale-95">
          Quero este Curso <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </Reveal>
);

const Courses = () => (
  <section id="cursos" className="py-24 bg-white relative">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl text-navy mb-6 font-title tracking-tight">Cursos em Destaque</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Seu próximo passo profissional começa aqui. Escolha sua área e conquiste o reconhecimento que você merece.</p>
      </Reveal>

      <div className="max-w-4xl mx-auto mb-20">
        <Reveal>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ex: Técnico em Enfermagem, Eletrotécnica..." 
              className="w-full pl-8 pr-20 py-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brandOrange shadow-inner transition-all text-lg font-medium"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-brandOrange text-white p-4 rounded-2xl shadow-lg hover:brightness-110 active:scale-90 transition-all">
              <Search size={24} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        <CourseCard 
          icon={Stethoscope}
          category="Saúde" 
          title="Técnico em Enfermagem" 
          desc="Especialize-se na área da saúde com reconhecimento nacional e foco em práticas modernas de atendimento e cuidado."
        />
        <CourseCard 
          icon={HardHat}
          category="Indústria" 
          title="Eletrotécnica por Competência" 
          desc="Valide seus anos de experiência em instalações elétricas e sistemas de potência com certificação oficial para registro no conselho."
        />
        <CourseCard 
          icon={Monitor}
          category="Tecnologia" 
          title="Desenvolvimento Web Fullstack" 
          desc="Do zero ao profissional. Aprenda as tecnologias mais requisitadas pelo mercado de TI e mude de carreira."
        />
        <CourseCard 
          icon={Briefcase}
          category="Gestão" 
          title="Administração e Negócios" 
          desc="Domine processos de gestão, finanças e liderança para alcançar cargos de gerência e diretoria."
        />
        <CourseCard 
          icon={CheckCircle}
          category="Segurança" 
          title="Segurança do Trabalho" 
          desc="Torne-se o guardião da integridade física nas empresas. Curso essencial para o mercado industrial brasileiro."
        />
        <CourseCard 
          icon={GraduationCap}
          category="Educação" 
          title="Pedagogia e Gestão Escolar" 
          desc="Transforme a educação com novas metodologias de ensino e coordenação pedagógica."
        />
      </div>

      <Reveal className="flex justify-center">
        <button className="group bg-brandLight text-navy px-12 py-5 rounded-2xl font-bold hover:bg-navy hover:text-white transition-all shadow-md flex items-center">
          Ver Grade Completa de Cursos <ChevronDown className="ml-2 group-hover:translate-y-1 transition-all" />
        </button>
      </Reveal>
    </div>
  </section>
);

const CertificationSteps = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const steps = [
    {
      icon: <Monitor size={48} />,
      title: "Análise Documental",
      content: "Nossa equipe técnica analisa seu histórico profissional e comprovações de experiência para validar sua elegibilidade legal.",
      items: ["Carteira de Trabalho (Digital/Física)", "Contratos de Prestação de Serviços", "Portfólio de Projetos Realizados", "Declaração de Tempo de Serviço"]
    },
    {
      icon: <Zap size={48} />,
      title: "Avaliação Técnica",
      content: "Uma etapa crucial onde seus conhecimentos práticos são avaliados através de nossa plataforma inteligente de aferição.",
      items: ["Teste de Conhecimentos Específicos", "Entrevista Técnica (opcional)", "Simulação de Cenários Reais", "Gabarito de Proficiência"]
    },
    {
      icon: <GraduationCap size={48} />,
      title: "Registro e Emissão",
      content: "Com a aprovação, seu registro é efetuado no SISTEC e seu diploma é emitido com total validade jurídica.",
      items: ["Diploma Digital Imediato", "Documento Físico por Correio", "Validade em Todo Brasil", "Aceito por Órgãos de Classe"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % steps.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="certificacao" className="py-24 bg-brandLight relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brandOrange/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-20">
          <span className="text-[12px] font-bold text-brandOrange border border-brandOrange/30 px-5 py-2 rounded-full uppercase tracking-widest mb-6 inline-block bg-white shadow-sm">Certificação por Competência</span>
          <h2 className="text-4xl md:text-6xl text-navy font-title leading-tight mb-8 uppercase tracking-tighter">O Caminho para seu <span className="text-brandOrange">Diploma Técnico</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Processo 100% legal baseado no Artigo 41 da Lei de Diretrizes e Bases da Educação Nacional (LDB).
          </p>
        </Reveal>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Tab Navigation */}
          <div className="lg:w-1/3 space-y-4">
            {steps.map((step, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-8 rounded-3xl font-bold transition-all flex items-center relative overflow-hidden group ${
                  activeTab === idx 
                    ? 'bg-navy text-white shadow-2xl scale-105' 
                    : 'bg-white text-navy/60 hover:text-navy hover:shadow-md'
                }`}
              >
                {activeTab === idx && <div className="absolute left-0 top-0 bottom-0 w-2 bg-brandOrange"></div>}
                <span className={`text-2xl mr-6 ${activeTab === idx ? 'text-brandOrange' : 'text-gray-200'}`}>0{idx + 1}</span>
                <div className="flex flex-col">
                  <span className="text-sm uppercase tracking-widest opacity-50 mb-1">Passo</span>
                  <span className="text-xl">{step.title}</span>
                </div>
                <ArrowRight size={20} className={`ml-auto transition-transform ${activeTab === idx ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
              </button>
            ))}
            
            <Reveal className="pt-8">
              <div className="bg-brandOrange/10 border border-brandOrange/20 p-8 rounded-3xl">
                <p className="text-navy font-bold mb-4 flex items-center"><Zap size={20} className="mr-2 text-brandOrange" /> Precisando de urgência?</p>
                <p className="text-sm text-navy/70 mb-6 font-medium">Ativamos o protocolo de emissão expressa para casos de promoção interna ou concursos.</p>
                <button className="w-full bg-brandOrange text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg animate-pulse-slow">
                  Consultar Urgência
                </button>
              </div>
            </Reveal>
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <div className="bg-navy rounded-[3rem] p-10 md:p-20 text-white shadow-3xl h-full relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 p-10 opacity-10 text-brandOrange">
                {steps[activeTab].icon}
              </div>
              
              <div key={activeTab} className="animate-fade-in flex flex-col h-full">
                <div className="inline-flex items-center text-brandOrange font-bold text-sm mb-8 tracking-widest uppercase">
                  <CheckCircle className="mr-3" size={24} /> Atividade Atual
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                  {steps[activeTab].title}
                </h3>
                <p className="text-white/70 text-xl mb-12 leading-relaxed font-light">
                  {steps[activeTab].content}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                  {steps[activeTab].items.map((item, idx) => (
                    <div key={idx} className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="bg-brandOrange/20 p-2 rounded-lg mr-4">
                        <Check className="text-brandOrange" size={16} />
                      </div>
                      <span className="text-sm font-medium text-white/90">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex flex-wrap gap-4">
                  <button className="bg-brandOrange text-white px-10 py-5 rounded-2xl font-bold hover:brightness-110 shadow-xl transition-all flex items-center">
                    Iniciar esta Etapa Agora <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contato" className="py-24 bg-white relative">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-navy font-title tracking-tight mb-4">Central de Atendimento</h2>
        <p className="text-gray-500">Estamos prontos para tirar todas as suas dúvidas sobre a certificação por competência.</p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <MessageCircle className="text-green-500" />, title: "WhatsApp Oficial", detail: "(31) 97327-6886", btn: "Iniciar Chat" },
          { icon: <Mail className="text-red-500" />, title: "Canal de E-mail", detail: "edumaitecoficial@gmail.com", btn: "Enviar E-mail" },
          { icon: <Instagram className="text-pink-500" />, title: "Siga-nos", detail: "@edumaistec", btn: "Ver Perfil" },
          { icon: <MapPin className="text-navy" />, title: "Endereço Físico", detail: "Cel. Fabriciano MG", btn: "Ver Mapa" }
        ].map((item, i) => (
          <Reveal key={i} className={`delay-${(i + 1) * 100}`}>
            <div className="group bg-brandLight p-10 rounded-[2.5rem] text-center border border-gray-100 hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 h-full flex flex-col">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md group-hover:rotate-12 transition-transform duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="font-bold text-navy mb-4 text-xl">{item.title}</h4>
              <p className="text-gray-500 text-sm mb-10 flex-grow font-medium">{item.detail}</p>
              <button className="w-full py-4 rounded-xl border-2 border-navy/10 text-navy font-bold hover:bg-navy hover:text-white transition-all text-sm group-hover:border-brandOrange group-hover:text-brandOrange group-hover:bg-transparent group-hover:hover:bg-brandOrange group-hover:hover:text-white">
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
  <footer className="bg-navy text-white py-24 border-t border-white/5 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-10 h-10 bg-brandOrange rounded-xl flex items-center justify-center shadow-lg">
              <Award className="text-navy w-6 h-6" />
            </div>
            <div className="font-black text-2xl tracking-tighter">EDU<span className="text-brandOrange">MAIS</span>TEC</div>
          </div>
          <p className="text-white/50 text-base leading-relaxed mb-10 font-medium">
            O futuro da educação técnica chegou. Validamos sua jornada profissional com seriedade, ética e rapidez.
          </p>
          <div className="flex space-x-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brandOrange transition-colors cursor-pointer border border-white/10 group">
              <Instagram size={24} className="text-white/40 group-hover:text-navy" />
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brandOrange transition-colors cursor-pointer border border-white/10 group">
              <MessageCircle size={24} className="text-white/40 group-hover:text-navy" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-10 text-brandOrange tracking-widest uppercase">Especialidades</h4>
          <ul className="space-y-5 text-white/50 text-sm font-semibold">
            <li className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={14} className="-rotate-90 mr-2 opacity-30" /> Área da Saúde</li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={14} className="-rotate-90 mr-2 opacity-30" /> Construção Civil</li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={14} className="-rotate-90 mr-2 opacity-30" /> Tecnologia da Info</li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={14} className="-rotate-90 mr-2 opacity-30" /> Manutenção Industrial</li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={14} className="-rotate-90 mr-2 opacity-30" /> Eletrotécnica</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-10 text-brandOrange tracking-widest uppercase">Institucional</h4>
          <ul className="space-y-5 text-white/50 text-sm font-semibold">
            <li className="hover:text-white cursor-pointer transition-colors">Quem Somos</li>
            <li className="hover:text-white cursor-pointer transition-colors">Termos de Uso</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacidade</li>
            <li className="hover:text-white cursor-pointer transition-colors">Dúvidas Frequentes</li>
            <li className="hover:text-white cursor-pointer transition-colors">Validar Certificado</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-10 text-brandOrange tracking-widest uppercase">Atendimento</h4>
          <ul className="space-y-6 text-white/50 text-sm font-medium">
            <li className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/5">
              <MapPin size={24} className="mr-4 text-brandOrange shrink-0" />
              <span className="leading-tight">R. Rio Doce, 50 - Professores. Cel. Fabriciano MG - 35170-112</span>
            </li>
            <li className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <Mail size={20} className="mr-4 text-brandOrange shrink-0" /> 
              <span>edumaistecoficial@gmail.com</span>
            </li>
            <li className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <Phone size={20} className="mr-4 text-brandOrange shrink-0" /> 
              <span>(31) 97327-6886</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold text-center md:text-left">
          © 2024 EdumaisTec • CNPJ: 62.215.924/0001-70 • Todos os direitos reservados.
        </p>
        <div className="flex space-x-8 opacity-30">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Logo_do_SISTEC.png/250px-Logo_do_SISTEC.png" className="h-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="SISTEC" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/MEC_Logo.svg/1200px-MEC_Logo.svg.png" className="h-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="MEC" />
        </div>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-24 right-8 z-[60] transition-all duration-500 transform ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
      <a 
        href="#cursos" 
        className="bg-brandOrange text-white p-6 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <GraduationCap size={32} />
        <span className="absolute right-full mr-6 py-3 px-6 bg-white text-navy font-black text-sm rounded-2xl shadow-2xl whitespace-nowrap border-2 border-brandOrange opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">QUERO ME CERTIFICAR</span>
      </a>
    </div>
  );
};

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[60] bg-green-500 text-white p-6 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-6 py-2 px-4 bg-green-50 text-green-600 font-bold text-xs rounded-xl shadow-lg border border-green-200 whitespace-nowrap pointer-events-none">Atendimento 24h</span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-brandOrange selection:text-white bg-white overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Reveal className="py-12 bg-white flex justify-center">
            <div className="max-w-7xl w-full px-4 overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale pointer-events-none">
                    <span className="font-black text-2xl">MEC</span>
                    <span className="font-black text-2xl">SISTEC</span>
                    <span className="font-black text-2xl">LDB</span>
                    <span className="font-black text-2xl">GOV.BR</span>
                    <span className="font-black text-2xl">COREN</span>
                    <span className="font-black text-2xl">CFT</span>
                </div>
            </div>
        </Reveal>
        <Courses />
        
        {/* Aditional CTA Section */}
        <section className="py-20 bg-brandOrange overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none transform scale-150 rotate-12">
            <GraduationCap className="w-full h-full" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <Reveal className="text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Pronto para dar o próximo <br/>passo na sua carreira?</h2>
                <p className="text-white/80 text-xl font-medium max-w-xl">
                  Centenas de profissionais já validaram seus anos de prática através de nossa plataforma. O próximo pode ser você.
                </p>
              </Reveal>
              <Reveal className="delay-200">
                <a href="#certificacao" className="bg-navy text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-brandBlueLight hover:scale-105 transition-all shadow-2xl flex items-center group active:scale-95">
                  Iniciar Minha Certificação <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <CertificationSteps />
        
        {/* Testimonials Simulation Section */}
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <Reveal className="text-center mb-20">
                    <h2 className="text-4xl font-title text-navy">Quem já se certificou conosco</h2>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "José Santos", cargo: "Eletrotécnico", text: "Trabalhava há 15 anos sem diploma. Graças ao EdumaisTec consegui meu registro e um aumento de 30% no salário." },
                        { name: "Maria Oliveira", cargo: "Técnica em Enfermagem", text: "O processo foi transparente e muito rápido. Já estou com meu diploma oficial em mãos e registrada no conselho." },
                        { name: "Antônio Ferreira", cargo: "Mestre de Obras", text: "Eu tinha o conhecimento, mas faltava o papel. A certificação por competência mudou minha vida profissional." }
                    ].map((t, i) => (
                        <Reveal key={i} className={`delay-${(i+1)*100}`}>
                            <div className="bg-brandLight p-10 rounded-[2.5rem] relative hover:shadow-xl transition-all">
                                <div className="flex text-brandOrange mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-navy font-medium mb-8 leading-relaxed italic">"{t.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-navy">{t.name}</p>
                                        <p className="text-xs text-brandOrange font-bold uppercase tracking-widest">{t.cargo}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-16 text-center">
                    <button className="bg-navy text-white px-12 py-5 rounded-2xl font-bold hover:bg-brandBlueLight transition-all shadow-lg active:scale-95">
                        Ver Mais Depoimentos
                    </button>
                </Reveal>
            </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <WhatsAppFloat />
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-shine { animation: shine 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s infinite; }
        .shadow-3xl { shadow-box: 0 35px 60px -15px rgba(0, 0, 0, 0.3); }
      `}</style>
    </div>
  );
}
