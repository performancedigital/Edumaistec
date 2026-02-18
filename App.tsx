
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ChevronDown, 
  Cpu,
  Stethoscope,
  HardHat,
  Briefcase,
  Star,
  Award,
  Check,
  ArrowRight,
  Zap,
  Lock,
  Search,
  History,
  AlertCircle,
  TrendingUp,
  FileCheck
} from 'lucide-react';

// --- Sub-Components ---

const UrgencyBanner = () => (
  <div className="bg-highlight text-navy py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest z-[60] relative">
    <span className="animate-pulse">⚠️ Atenção:</span> Apenas 3 vagas restantes para o lote de emissão expressa de 48h.
  </div>
);

const NotificationToast = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', course: '' });
  
  const notifications = [
    { name: 'Ricardo S.', course: 'Eletrotécnica' },
    { name: 'Juliana F.', course: 'Enfermagem' },
    { name: 'Marcos A.', course: 'Mecânica' },
    { name: 'Patrícia K.', course: 'Segurança do Trabalho' },
    { name: 'Felipe D.', course: 'Edificações' }
  ];

  useEffect(() => {
    const showNotification = () => {
      const random = notifications[Math.floor(Math.random() * notifications.length)];
      setData(random);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showNotification, 20000);
    setTimeout(showNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-50 animate-slide-in">
      <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center space-x-3 max-w-xs">
        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
          <FileCheck size={20} />
        </div>
        <div>
          <p className="text-[11px] font-bold text-navy leading-tight">{data.name} emitiu seu Diploma Técnico</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Área: {data.course} • Há 3 min</p>
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 glass shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-navy font-black text-2xl tracking-tighter flex items-center">
          EDU<span className="text-highlight">MAIS</span>TEC
          <div className="ml-2 w-6 h-6 bg-navy flex items-center justify-center rounded-md rotate-12">
             <Award className="text-highlight w-4 h-4" />
          </div>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-8 text-navy font-semibold text-xs uppercase tracking-widest">
        <a href="#como-funciona" className="hover:text-highlight transition-colors">Como Funciona</a>
        <a href="#qualificador" className="hover:text-highlight transition-colors">Simular Diploma</a>
      </nav>
      <a 
        href="https://wa.me/yournumber" 
        className="bg-conversion text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95 flex items-center text-sm"
      >
        <MessageCircle size={16} className="mr-2" />
        Falar com Consultor
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative pt-16 pb-24 md:pt-32 md:pb-48 overflow-hidden bg-gradient-to-b from-white to-gray-50">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/[0.03] -skew-x-12 translate-x-24"></div>
    <div className="container mx-auto px-4 relative z-10 text-center">
      <div className="inline-flex items-center bg-white border border-gray-200 px-4 py-2 rounded-full font-bold text-[10px] mb-10 shadow-sm animate-bounce">
        <Zap className="w-3.5 h-3.5 mr-2 text-highlight fill-highlight" /> 
        FILA EXPRESSA DISPONÍVEL: RECEBA EM 48H
      </div>
      <h1 className="text-5xl md:text-8xl mb-8 leading-[1.1] font-title text-navy tracking-tighter max-w-5xl mx-auto">
        Sua experiência <br/><span className="text-highlight">agora é Diploma.</span>
      </h1>
      <p className="text-lg md:text-2xl mb-14 text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
        Se você tem +1 ano de profissão, você já é técnico. Nós apenas formalizamos seu conhecimento com validade nacional.
      </p>
      
      <div className="flex flex-col items-center space-y-6">
        <a 
          href="#qualificador" 
          className="w-full sm:w-auto bg-navy text-white px-12 py-7 rounded-2xl font-bold text-xl hover:bg-navy/90 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center group"
        >
          Verificar Minha Elegibilidade
          <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="flex flex-wrap justify-center gap-6 opacity-40">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/MEC_Logo.svg/1200px-MEC_Logo.svg.png" className="h-6 object-contain" alt="MEC" />
           <div className="flex items-center text-navy font-bold text-xs tracking-tighter uppercase"><ShieldCheck className="mr-1" size={14} /> Lei Federal 9.394/96</div>
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
  const [phase, setPhase] = useState(0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    setLoading(true);
    const textPhases = ["Iniciando Scanner...", "Cruzando Dados LDB Art 41...", "Validando Experiência...", "Verificando Vagas Expressas...", "Elegibilidade Aprovada!"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < textPhases.length) {
        setPhase(i);
      } else {
        clearInterval(interval);
        const message = `Olá! Finalizei o simulador VIP.
Área: ${area}
Experiência: ${exp}
Escolaridade: ${schooling}
Gostaria de garantir meu diploma em 48h!`;
        window.location.href = `https://wa.me/yournumber?text=${encodeURIComponent(message)}`;
      }
    }, 1000);
  };

  const stepsData = {
    1: {
      q: "Qual sua área de atuação?",
      options: ['Engenharia & Indústria', 'Saúde & Enfermagem', 'TI & Tecnologia', 'Administração & Gestão', 'Segurança do Trabalho', 'Outros']
    },
    2: {
      q: "Tempo comprovado na área?",
      options: ['De 1 a 2 anos', 'De 3 a 5 anos', 'Mais de 5 anos', 'Ainda não tenho 1 ano']
    },
    3: {
      q: "Qual sua escolaridade?",
      options: ['Ensino Médio Completo', 'Superior Incompleto', 'Superior Completo', 'Médio Incompleto']
    }
  };

  return (
    <section id="qualificador" className="py-24 bg-brandLight">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
              <div 
                className="h-full bg-highlight transition-all duration-700 shadow-[0_0_10px_#FBBF24]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="min-h-[400px] flex flex-col justify-center">
              {step <= 3 && (
                <div className="animate-fade-in">
                  <span className="text-highlight font-black text-[10px] uppercase tracking-widest mb-4 block">Passo 0{step} de 04</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-10 leading-tight">{stepsData[step as 1|2|3].q}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {stepsData[step as 1|2|3].options.map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => {
                          if (step === 1) setArea(opt);
                          if (step === 2) setExp(opt);
                          if (step === 3) setSchooling(opt);
                          setStep(step + 1);
                        }}
                        className="p-5 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl transition-all text-left font-bold text-navy flex justify-between items-center group"
                      >
                        {opt}
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-navy group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  {!loading ? (
                    <div className="animate-fade-in py-6">
                      <div className="w-20 h-20 bg-navy text-white rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 shadow-xl">
                        <Search size={32} />
                      </div>
                      <h3 className="text-3xl font-bold text-navy mb-4">Dados Coletados</h3>
                      <p className="text-gray-500 mb-10 text-lg">Pronto para rodar a análise de conformidade legal.</p>
                      <button 
                        onClick={handleFinish}
                        className="w-full bg-navy text-white py-6 rounded-2xl font-bold text-xl hover:bg-navy/90 shadow-2xl transition-all"
                      >
                        Verificar Elegibilidade Agora
                      </button>
                    </div>
                  ) : (
                    <div className="py-12">
                      <div className="relative w-32 h-32 mx-auto mb-10">
                        <div className="absolute inset-0 border-[6px] border-gray-100 rounded-full"></div>
                        <div className="absolute inset-0 border-[6px] border-t-highlight rounded-full animate-spin"></div>
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2 tracking-tight">
                        {["Iniciando Scanner...", "Cruzando Dados LDB Art 41...", "Validando Experiência...", "Verificando Vagas Expressas...", "Elegibilidade Aprovada!"][phase]}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Aguarde a validação</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center space-x-4 opacity-50">
               <div className="flex items-center text-[10px] font-bold text-navy uppercase tracking-tighter"><Lock size={12} className="mr-1" /> Dados Protegidos</div>
               <div className="flex items-center text-[10px] font-bold text-navy uppercase tracking-tighter"><ShieldCheck size={12} className="mr-1" /> Consulta Oficial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSteps = () => (
  <section id="como-funciona" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Como decolar sua carreira</h2>
        <p className="text-gray-500 text-lg">Um processo limpo, digital e sem burocracia excessiva.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Search />, title: "Análise Prévia", desc: "Enviamos sua documentação para uma banca técnica que valida seu tempo de casa." },
          { icon: <FileCheck />, title: "Aferição Técnica", desc: "Você realiza uma avaliação online para comprovar as habilidades que já exerce." },
          { icon: <History />, title: "Registro e Diploma", desc: "Após aprovado, seu diploma é emitido e registrado no SISTEC em tempo recorde." }
        ].map((item, idx) => (
          <div key={idx} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-highlight transition-all group">
            <div className="w-14 h-14 bg-white text-navy rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-navy group-hover:text-white transition-all">
              {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-conversion text-white p-6 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
    <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-navy text-white px-5 py-3 rounded-2xl font-bold shadow-2xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 border border-white/10">Dúvida? Fale com a gente!</span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-highlight selection:text-navy">
      <UrgencyBanner />
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProcessSteps />
        <LeadQualifier />
        
        {/* Trust Section */}
        <section className="py-20 bg-navy text-white text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-highlight/10 rounded-full blur-[100px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl mb-12 font-title tracking-tight text-white">Milhares de profissionais <br/><span className="text-highlight">reconhecidos todo mês.</span></h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="text-center">
                  <p className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">8.5K+</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-highlight">Diplomas Emitidos</p>
               </div>
               <div className="text-center">
                  <p className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">48H</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-highlight">Prazo de Emissão</p>
               </div>
               <div className="text-center">
                  <p className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">100%</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-highlight">MEC/SISTEC</p>
               </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-16 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <div className="text-navy font-black text-xl mb-6 opacity-30 tracking-tighter">EDUMAISTEC</div>
          <p className="text-[10px] font-bold uppercase tracking-widest max-w-lg mx-auto leading-loose">
            Processos em conformidade com o Artigo 41 da Lei nº 9.394/96 (LDB). <br/>
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <NotificationToast />
      <WhatsAppFloat />
      
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
