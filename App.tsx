
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Stethoscope,
  HardHat,
  Briefcase,
  Star,
  Award,
  ClipboardCheck,
  Check,
  GraduationCap,
  ArrowRight,
  Zap,
  Lock,
  Search,
  History,
  AlertCircle
} from 'lucide-react';

// --- Components ---

const NotificationToast = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', course: '' });
  
  const notifications = [
    { name: 'Marcos R.', course: 'Eletrotécnica' },
    { name: 'Ana P.', course: 'Enfermagem' },
    { name: 'Lucas M.', course: 'Edificações' },
    { name: 'Roberto J.', course: 'Segurança do Trabalho' },
    { name: 'Carla S.', course: 'Administração' }
  ];

  useEffect(() => {
    const showNotification = () => {
      const random = notifications[Math.floor(Math.random() * notifications.length)];
      setData(random);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-50 animate-slideRight">
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-navy">{data.name} acabou de emitir seu diploma</p>
          <p className="text-[10px] text-gray-500">Técnico em {data.course} • Há 2 min</p>
        </div>
      </div>
    </div>
  );
};

const TrustBar = () => (
  <div className="bg-gray-50 border-y border-gray-100 py-6">
    <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
      <div className="flex items-center font-bold text-navy text-sm md:text-base"><ShieldCheck className="mr-2 text-navy" /> MEC/SISTEC</div>
      <div className="flex items-center font-bold text-navy text-sm md:text-base"><Award className="mr-2 text-navy" /> LEI 9.394/96</div>
      <div className="flex items-center font-bold text-navy text-sm md:text-base"><CheckCircle className="mr-2 text-navy" /> VÁLIDO CFT/COREN</div>
      <div className="flex items-center font-bold text-navy text-sm md:text-base"><Users className="mr-2 text-navy" /> +8.500 ALUNOS</div>
    </div>
  </div>
);

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-navy font-bold text-2xl flex items-center">
          <span className="text-navy">edu</span>
          <span className="text-highlight">mais</span>
          <span className="text-navy">tec</span>
          <div className="ml-2 w-8 h-8 bg-navy flex items-center justify-center rounded-lg rotate-12 shadow-lg shadow-blue-200">
             <Award className="text-highlight w-5 h-5" />
          </div>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-10 text-navy font-bold text-sm uppercase tracking-widest">
        <a href="#como-funciona" className="hover:text-highlight transition-colors">Processo</a>
        <a href="#qualificador" className="hover:text-highlight transition-colors">Simular Elegibilidade</a>
        <a href="#faq" className="hover:text-highlight transition-colors">Dúvidas</a>
      </nav>
      <a 
        href="#qualificador" 
        className="bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-navy/90 transition-all shadow-xl active:scale-95 text-sm"
      >
        Simulador VIP
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative bg-white pt-16 pb-20 md:pt-28 md:pb-40 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/[0.02] -skew-x-12 transform translate-x-32"></div>
    <div className="container mx-auto px-4 relative z-10 text-center">
      <div className="inline-flex items-center bg-highlight/20 text-navy px-4 py-2 rounded-full font-bold text-xs mb-10 border border-highlight/30">
        <Zap className="w-4 h-4 mr-2 text-navy fill-highlight" /> 
        FILA DE EMISSÃO PRIORITÁRIA ABERTA (48H)
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl mb-10 leading-tight font-title text-navy tracking-tight max-w-5xl mx-auto">
        Transforme <span className="text-highlight italic">1 Ano</span> de Experiência em um Diploma Técnico
      </h1>
      <p className="text-xl md:text-2xl mb-14 text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
        Regularize sua profissão agora. Processo 100% online, legalizado pela LDB e reconhecido em todo o território nacional.
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <a 
          href="#qualificador" 
          className="w-full sm:w-auto bg-conversion text-white px-16 py-7 rounded-2xl font-bold text-2xl hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
          Verificar Minha Elegibilidade
          <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="flex items-center space-x-6 text-navy/40 font-bold text-[10px] uppercase tracking-widest">
          <span className="flex items-center"><ShieldCheck size={14} className="mr-1 text-conversion" /> MEC/SISTEC</span>
          <span className="flex items-center"><CheckCircle size={14} className="mr-1 text-conversion" /> Válido CRT/COREN</span>
          <span className="flex items-center"><Lock size={14} className="mr-1 text-conversion" /> 100% Seguro</span>
        </div>
      </div>
    </div>
  </section>
);

const LeadQualifier = () => {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState('');
  const [exp, setExp] = useState('');
  const [schooling, setSchooling] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    setLoading(true);
    const phases = ["Analisando Dados...", "Verificando LDB Art. 41...", "Consultando Banco de Dados...", "Validando Experiência...", "Elegibilidade Confirmada!"];
    
    let currentPhase = 0;
    const interval = setInterval(() => {
      currentPhase++;
      if (currentPhase < phases.length) {
        setAnalysisPhase(currentPhase);
      } else {
        clearInterval(interval);
        const message = `Olá! Fiz o simulador de elegibilidade VIP.
📍 Área: ${area}
🕒 Experiência: ${exp}
🎓 Escolaridade: ${schooling}
Gostaria de emitir meu diploma em 48h!`;
        window.location.href = `https://wa.me/yournumber?text=${encodeURIComponent(message)}`;
      }
    }, 1200);
  };

  const phasesText = ["Analisando Dados...", "Verificando LDB Art. 41...", "Consultando Banco de Dados...", "Validando Experiência...", "Elegibilidade Confirmada!"];

  return (
    <section id="qualificador" className="py-24 bg-brandLight">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Simulador de Diploma</h2>
            <p className="text-gray-500 text-lg">Responda para saber se você pode ser certificado hoje.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
              <div 
                className="h-full bg-highlight transition-all duration-700 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="min-h-[420px] flex flex-col justify-center">
              {step === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-navy mb-10">Qual sua área principal de atuação?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Engenharia & Indústria', 'Saúde & Enfermagem', 'Tecnologia & TI', 'Gestão & Administrativo', 'Segurança do Trabalho', 'Outros'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setArea(item); setStep(2); }}
                        className="p-6 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl transition-all text-left font-bold text-navy flex justify-between items-center group shadow-sm"
                      >
                        {item}
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-navy group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-navy mb-10">Tempo de experiência profissional?</h3>
                  <div className="space-y-4">
                    {['De 1 a 2 anos', 'De 3 a 5 anos', 'Mais de 5 anos'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setExp(item); setStep(3); }}
                        className="w-full p-6 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl shadow-sm transition-all text-left flex justify-between items-center group"
                      >
                        <span className="font-bold text-lg text-navy">{item}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-navy transition-all"></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} className="mt-10 text-navy/40 font-bold text-xs uppercase underline w-full text-center">Voltar</button>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-navy mb-10">Qual seu nível de escolaridade?</h3>
                  <div className="space-y-4">
                    {['Ensino Médio Completo', 'Ensino Superior Cursando/Completo', 'Ensino Médio Incompleto'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setSchooling(item); setStep(4); }}
                        className="w-full p-6 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl shadow-sm transition-all text-left flex justify-between items-center group"
                      >
                        <span className="font-bold text-lg text-navy">{item}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-navy transition-all"></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="mt-10 text-navy/40 font-bold text-xs uppercase underline w-full text-center">Voltar</button>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fadeIn text-center">
                  {!loading ? (
                    <div className="py-6">
                      <div className="w-24 h-24 bg-navy text-white rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-12 shadow-2xl">
                        <Search size={48} />
                      </div>
                      <h3 className="text-4xl font-bold text-navy mb-6">Pronto para a Análise</h3>
                      <p className="text-gray-500 mb-10 text-lg">Inicie o scanner para verificar sua conformidade com a Lei Federal 9.394/96.</p>
                      <button 
                        onClick={handleFinish}
                        className="w-full bg-navy text-white py-7 rounded-2xl font-bold text-2xl hover:bg-navy/90 shadow-2xl transition-all"
                      >
                        Iniciar Scanner Técnico
                      </button>
                    </div>
                  ) : (
                    <div className="py-10">
                      <div className="relative w-40 h-40 mx-auto mb-10">
                        <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
                        <div className="absolute inset-0 border-8 border-t-highlight rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <History className="text-navy animate-pulse" size={40} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-2 tracking-tight">{phasesText[analysisPhase]}</h3>
                      <div className="w-full bg-gray-100 h-2 rounded-full max-w-xs mx-auto overflow-hidden">
                        <div 
                          className="h-full bg-conversion transition-all duration-500"
                          style={{ width: `${(analysisPhase + 1) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center items-center space-x-2 text-navy/40 text-xs font-bold uppercase tracking-widest">
            <AlertCircle size={14} />
            <span>Restam apenas 3 vagas para emissão digital esta semana</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSteps = () => (
  <section id="como-funciona" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl text-navy mb-6 font-title">O Caminho Mais Curto</h2>
        <p className="text-gray-500 text-lg">Do anonimato profissional ao diploma oficial em 3 passos.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="relative p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl">
          <div className="absolute -top-10 left-10 w-20 h-20 bg-navy text-white rounded-3xl flex items-center justify-center text-3xl font-bold shadow-2xl">01</div>
          <h3 className="text-2xl font-bold text-navy mb-6 mt-6">Análise de Perfil</h3>
          <p className="text-gray-600 leading-relaxed">Verificamos sua experiência de no mínimo 1 ano na área através de documentos e histórico profissional.</p>
        </div>
        
        <div className="relative p-10 bg-white border border-highlight/30 rounded-[3rem] shadow-xl">
          <div className="absolute -top-10 left-10 w-20 h-20 bg-highlight text-navy rounded-3xl flex items-center justify-center text-3xl font-bold shadow-2xl">02</div>
          <h3 className="text-2xl font-bold text-navy mb-6 mt-6">Avaliação de Proficiência</h3>
          <p className="text-gray-600 leading-relaxed">Você realiza uma avaliação técnica online para validar formalmente seus conhecimentos práticos.</p>
        </div>
        
        <div className="relative p-10 bg-white border border-conversion/30 rounded-[3rem] shadow-xl">
          <div className="absolute -top-10 left-10 w-20 h-20 bg-conversion text-white rounded-3xl flex items-center justify-center text-3xl font-bold shadow-2xl">03</div>
          <h3 className="text-2xl font-bold text-navy mb-6 mt-6">Emissão do Diploma</h3>
          <p className="text-gray-600 leading-relaxed">Certificado digital emitido em até 48h úteis e diploma físico enviado pelos correios.</p>
        </div>
      </div>
    </div>
  </section>
);

// Define the interface for the FAQAccordion component props
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-bold text-xl pr-4 text-navy">{question}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-navy text-white rotate-180' : 'bg-gray-100 text-navy'}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-10 text-gray-500 animate-fadeIn leading-relaxed text-lg font-light">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="py-24 bg-brandLight">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Dúvidas Frequentes</h2>
        <p className="text-gray-500">Transparência total sobre seu futuro profissional.</p>
      </div>
      <div className="space-y-4">
        <FAQAccordion 
          question="O diploma é realmente aceito pelo CFT e COREN?" 
          answer="Sim! A Certificação por Competência é amparada pela Lei Federal 9.394/96, Art. 41. O diploma emitido tem a mesma validade de um curso convencional, permitindo registro em qualquer conselho de classe."
        />
        <FAQAccordion 
          question="Em quanto tempo sai meu certificado?" 
          answer="Trabalhamos com o fluxo de emissão expressa. Assim que aprovado na avaliação técnica e documental, seu certificado digital é liberado em até 48 horas úteis."
        />
        <FAQAccordion 
          question="Preciso de quanto tempo de experiência?" 
          answer="O requisito legal mínimo é de apenas 1 ano de atuação comprovada na área desejada (seja via carteira de trabalho, contrato ou declaração profissional)."
        />
        <FAQAccordion 
          question="O processo é seguro?" 
          answer="Absolutamente. Somos especialistas em legislação educacional e trabalhamos apenas com instituições credenciadas pelo MEC e registradas no SISTEC."
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy text-gray-500 py-24">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
        <div className="col-span-1 md:col-span-2">
           <div className="text-white font-bold text-4xl flex items-center mb-10">
            <span>edu</span>
            <span className="text-highlight">mais</span>
            <span>tec</span>
          </div>
          <p className="max-w-md text-xl leading-relaxed font-light text-white/70">
            Acelerando carreiras através do reconhecimento legal da experiência profissional. Sua prática vale um diploma.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-10 uppercase tracking-widest">Links Rápidos</h4>
          <ul className="space-y-4 font-bold text-sm">
            <li><a href="#" className="hover:text-highlight transition-colors">Início</a></li>
            <li><a href="#qualificador" className="hover:text-highlight transition-colors">Simulador</a></li>
            <li><a href="#como-funciona" className="hover:text-highlight transition-colors">Processo</a></li>
            <li><a href="#faq" className="hover:text-highlight transition-colors">Dúvidas</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-10 uppercase tracking-widest">Contato</h4>
          <p className="mb-4 text-white font-bold">suporte@edumaistec.com.br</p>
          <p className="text-3xl text-highlight font-bold">0800 000 0000</p>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 text-center text-xs font-light space-y-2">
        <p>&copy; {new Date().getFullYear()} EdumaisTec. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
        <p className="text-white/20">Em conformidade com a Lei Federal de Diretrizes e Bases da Educação Nacional (Lei 9.394/96).</p>
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-conversion text-white p-6 rounded-[2rem] shadow-[0_20px_40px_-5px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle size={36} className="group-hover:rotate-12 transition-transform" />
    <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-navy px-6 py-3 rounded-2xl font-bold shadow-2xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 border border-gray-100">Falar com Consultor</span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-highlight selection:text-navy bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <ProcessSteps />
        <LeadQualifier />
        <FAQ />
      </main>
      <Footer />
      <NotificationToast />
      <WhatsAppFloat />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideRight { animation: slideRight 0.5s ease-out forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
