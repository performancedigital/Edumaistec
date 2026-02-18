
import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface FAQItemProps {
  question: string;
  answer: string;
}

interface CourseCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-highlight">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-navy font-bold text-2xl flex items-center">
          <span className="text-navy">edu</span>
          <span className="text-orange-500">mais</span>
          <span className="text-navy">tec</span>
          <div className="ml-2 w-8 h-8 bg-navy flex items-center justify-center rounded-sm rotate-12">
             <Award className="text-highlight w-5 h-5" />
          </div>
        </div>
      </div>
      <a 
        href="#qualificador" 
        className="hidden md:flex items-center bg-conversion text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:-translate-y-1"
      >
        <MessageCircle size={20} className="mr-2" />
        Consultar Especialista
      </a>
      <button className="md:hidden text-conversion">
        <MessageCircle size={28} />
      </button>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative bg-navy text-white py-16 md:py-32 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-highlight/5 -skew-x-12 transform translate-x-20"></div>
    
    <div className="container mx-auto px-4 relative z-10 text-center md:text-left md:flex items-center">
      <div className="md:w-3/5">
        <div className="inline-flex items-center bg-highlight/20 border border-highlight/30 text-highlight px-4 py-1.5 rounded-full font-bold text-xs mb-8 uppercase tracking-widest animate-pulse">
          <Clock className="w-4 h-4 mr-2" /> Certificação Express: Diploma em até 48 Horas
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight font-title">
          Não perca mais tempo. Tenha seu <span className="text-highlight">Diploma Técnico</span> agora!
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-gray-300 font-light leading-relaxed max-w-2xl">
          Se você tem pelo menos 1 ano de experiência, já possui o conhecimento. Nós entregamos o reconhecimento oficial que o mercado exige.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
          <a 
            href="#qualificador" 
            className="bg-conversion text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(37,211,102,0.4)] group"
          >
            Começar Simulação Gratuita
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <ShieldCheck className="text-highlight w-6 h-6" />
            <span className="text-left leading-tight">100% Legalizado<br/>Lei Federal 9.394/96</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-2/5 mt-12 md:mt-0 pl-12">
        <div className="relative">
          <div className="absolute -inset-4 bg-highlight rounded-3xl opacity-10 blur-2xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
            alt="Jovem profissional qualificado" 
            className="relative rounded-[2.5rem] shadow-2xl border-2 border-white/10 z-10 w-full object-cover aspect-[4/5] object-top"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-gray-100">
             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={24} />
             </div>
             <div>
                <p className="text-navy font-bold leading-none">Aprovado</p>
                <p className="text-gray-500 text-xs">Pronto para emissão</p>
             </div>
          </div>
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

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      const message = `Olá! Fiz o simulador de elegibilidade.
📍 Área: ${area}
🕒 Experiência: ${exp}
🎓 Escolaridade: ${schooling}
Gostaria de garantir meu diploma em 48h!`;
      window.location.href = `https://wa.me/yournumber?text=${encodeURIComponent(message)}`;
    }, 2000);
  };

  return (
    <section id="qualificador" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl text-navy mb-4 font-title">Simulador de Elegibilidade</h2>
            <p className="text-gray-500 text-lg">Descubra em segundos se você já pode receber seu diploma.</p>
          </div>

          <div className="bg-brandLight rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,51,102,0.15)] border border-white relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
              <div 
                className="h-full bg-highlight transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="min-h-[350px] flex flex-col">
              {step === 1 && (
                <div className="animate-fadeIn">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <label className="text-2xl font-bold text-navy">Qual sua área de atuação principal?</label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Engenharia & Indústria', 'Saúde & Bem-estar', 'Tecnologia', 'Gestão & Negócios', 'Segurança do Trabalho', 'Outros'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setArea(item); setStep(2); }}
                        className="p-5 bg-white border-2 border-transparent hover:border-highlight hover:bg-yellow-50 rounded-2xl shadow-sm transition-all text-left font-bold text-navy flex justify-between items-center group"
                      >
                        {item}
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-highlight transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fadeIn">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <label className="text-2xl font-bold text-navy">Tempo comprovado na área?</label>
                  </div>
                  <div className="space-y-4">
                    {['De 1 a 2 anos', 'De 3 a 5 anos', 'Mais de 5 anos'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setExp(item); setStep(3); }}
                        className="w-full p-6 bg-white border-2 border-transparent hover:border-navy rounded-2xl shadow-sm transition-all text-left flex justify-between items-center group"
                      >
                        <span className="font-bold text-lg text-navy">{item}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-navy transition-colors"></div>
                      </button>
                    ))}
                    <p className="text-center text-gray-400 text-sm italic">Mínimo exigido: 1 ano comprovado.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="mt-8 text-navy/50 font-bold text-sm underline w-full text-center hover:text-navy">Voltar</button>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fadeIn">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <label className="text-2xl font-bold text-navy">Qual sua escolaridade atual?</label>
                  </div>
                  <div className="space-y-4">
                    {['Ensino Médio Completo', 'Ensino Superior Cursando/Completo', 'Ensino Médio Incompleto'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setSchooling(item); setStep(4); }}
                        className="w-full p-6 bg-white border-2 border-transparent hover:border-navy rounded-2xl shadow-sm transition-all text-left flex justify-between items-center group"
                      >
                        <span className="font-bold text-lg text-navy">{item}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-navy transition-colors"></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="mt-8 text-navy/50 font-bold text-sm underline w-full text-center hover:text-navy">Voltar</button>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fadeIn text-center py-4">
                  {loading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 border-8 border-gray-100 border-t-highlight rounded-full animate-spin mb-6"></div>
                      <h3 className="text-2xl font-bold text-navy">Processando seu Perfil...</h3>
                      <p className="text-gray-500 mt-2">Validando competências conforme Art. 41 da LDB.</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-conversion text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_15px_30px_-10px_rgba(37,211,102,0.5)]">
                        <Check size={50} />
                      </div>
                      <h3 className="text-4xl font-bold text-navy mb-4">Acesso Liberado!</h3>
                      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Excelente! Seu perfil para <strong>{area}</strong> é compatível com a Certificação por Competência. Agora você só precisa finalizar o envio dos documentos.
                      </p>
                      <button 
                        onClick={handleFinish}
                        className="w-full bg-conversion text-white py-6 rounded-2xl font-bold text-2xl hover:bg-green-600 shadow-xl flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <MessageCircle className="mr-3" /> Receber Diploma em 48h
                      </button>
                      <div className="mt-6 flex items-center justify-center space-x-2 text-navy/60 font-bold uppercase text-[10px] tracking-widest">
                        <Clock size={14} className="text-highlight" />
                        <span>Vagas Prioritárias: Restam apenas 04 hoje</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-navy/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"></div>
    </section>
  );
};

const Benefits = () => (
  <section className="py-24 bg-brandLight">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="group p-10 rounded-[2.5rem] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
            <Clock className="text-highlight" size={32} />
          </div>
          <h3 className="text-2xl mb-4 text-navy font-bold">Velocidade Recorde</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Pare de esperar anos. Se aprovado, seu certificado digital é liberado em até <strong>48 horas úteis</strong>.</p>
        </div>
        <div className="group p-10 rounded-[2.5rem] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-2xl transition-all scale-105 border-t-8 border-t-highlight">
          <div className="w-16 h-16 bg-highlight rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-yellow-100 group-hover:-rotate-6 transition-transform">
            <ShieldCheck className="text-navy" size={32} />
          </div>
          <h3 className="text-2xl mb-4 text-navy font-bold">100% Legalizado</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Amparado legalmente pela <strong>Lei Federal 9.394/96</strong>. Aceito em empresas, concursos e órgãos de classe.</p>
        </div>
        <div className="group p-10 rounded-[2.5rem] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 bg-conversion rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-100 group-hover:rotate-6 transition-transform">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h3 className="text-2xl mb-4 text-navy font-bold">Sua Prática Vale</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Apenas <strong>1 ano de experiência</strong> comprovada é o necessário para transformar seu saber em um título técnico.</p>
        </div>
      </div>
    </div>
  </section>
);

const CourseCard: React.FC<CourseCardProps> = ({ title, icon, description }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 hover:border-highlight transition-all group relative overflow-hidden">
    <div className="text-navy mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
    <h4 className="text-2xl mb-3 text-navy font-bold">{title}</h4>
    <p className="text-gray-500 mb-6 leading-relaxed">{description}</p>
    <a href="#qualificador" className="text-navy font-bold flex items-center text-sm group-hover:text-conversion transition-colors">
      Consultar Disponibilidade <MessageCircle size={18} className="ml-2" />
    </a>
  </div>
);

const CoursesSection = () => (
  <section id="courses" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl text-navy mb-6 font-title">Áreas de Atuação</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Temos certificações para as áreas que mais contratam no Brasil.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <CourseCard 
          title="Saúde" 
          icon={<Stethoscope size={48} className="text-navy" />} 
          description="Técnico em Enfermagem, Estética, Radiologia e mais." 
        />
        <CourseCard 
          title="Tecnologia" 
          icon={<Cpu size={48} className="text-navy" />} 
          description="TI, Desenvolvimento de Sistemas e Redes." 
        />
        <CourseCard 
          title="Engenharia" 
          icon={<HardHat size={48} className="text-navy" />} 
          description="Eletrotécnica, Mecânica, Edificações e Segurança." 
        />
        <CourseCard 
          title="Gestão" 
          icon={<Briefcase size={48} className="text-navy" />} 
          description="Administração, Logística, RH e Contabilidade." 
        />
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-24 bg-navy text-white relative">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl mb-16 font-title">Quem já mudou de vida</h2>
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/10 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-highlight rounded-full flex items-center justify-center border-4 border-navy shadow-2xl">
           <Star className="text-navy fill-navy" size={32} />
        </div>
        <p className="text-xl md:text-3xl mb-10 italic font-light leading-relaxed pt-4">
          "Fui promovido em tempo recorde! Eu tinha a experiência de campo, mas faltava o técnico para assumir a coordenação. Em 48 horas após a prova, eu já tinha o diploma em mãos e meu registro no conselho."
        </p>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 border-2 border-highlight overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="Depoimento" />
          </div>
          <span className="font-bold text-highlight text-2xl">André Santos</span>
          <span className="text-gray-400">Técnico em Eletrotécnica</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
        <div>
          <div className="text-4xl font-bold text-highlight mb-1">8k+</div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Alunos Diplomas</p>
        </div>
        <div>
          <div className="text-4xl font-bold text-highlight mb-1">48h</div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Prazo Médio</p>
        </div>
        <div>
          <div className="text-4xl font-bold text-highlight mb-1">100%</div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Validado MEC</p>
        </div>
        <div>
          <div className="text-4xl font-bold text-highlight mb-1">1 ano</div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Exp. Mínima</p>
        </div>
      </div>
    </div>
  </section>
);

const FAQAccordion: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left transition-colors focus:outline-none"
      >
        <span className="font-bold text-lg md:text-xl pr-4 text-navy">{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-highlight rotate-180' : 'bg-brandLight'}`}>
          <ChevronDown className={isOpen ? 'text-navy' : 'text-navy/50'} size={20} />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-8 text-gray-600 animate-fadeIn leading-relaxed text-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-brandLight">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-4xl md:text-6xl text-navy mb-16 text-center font-title">Ficou com dúvidas?</h2>
      <div className="space-y-4">
        <FAQAccordion 
          question="Em quanto tempo recebo meu diploma?" 
          answer="É o processo mais rápido do mercado. Após a conclusão da avaliação e validação documental, seu diploma oficial é emitido em até 48 horas úteis."
        />
        <FAQAccordion 
          question="Tenho apenas 1 ano de experiência, posso fazer?" 
          answer="Sim! O requisito mínimo de experiência é de apenas 1 ano comprovado na área desejada. Se você tem esse tempo de atuação, já está apto ao processo."
        />
        <FAQAccordion 
          question="O diploma é aceito em concursos e órgãos como CFT/COREN?" 
          answer="Com certeza. Nossos diplomas são emitidos por instituições credenciadas e possuem amparo legal total pela Lei Federal 9.394/96 (LDB), com validade nacional garantida."
        />
        <FAQAccordion 
          question="Como funciona a prova?" 
          answer="A prova é uma avaliação de competências técnicas realizada de forma online. Ela serve para comprovar formalmente o conhecimento que você já adquiriu na prática do seu trabalho."
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy text-gray-400 py-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="col-span-1 md:col-span-2">
           <div className="text-white font-bold text-4xl flex items-center mb-8">
            <span>edu</span>
            <span className="text-orange-500">mais</span>
            <span>tec</span>
          </div>
          <p className="max-w-md text-xl leading-relaxed font-light">
            Especialistas em aceleração de carreira através da Certificação por Competência. Sua experiência é o seu maior patrimônio.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8">Menu</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-highlight transition-colors font-medium">Início</a></li>
            <li><a href="#qualificador" className="hover:text-highlight transition-colors font-medium">Simulador VIP</a></li>
            <li><a href="#courses" className="hover:text-highlight transition-colors font-medium">Áreas de Atuação</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8">Fale Conosco</h4>
          <p className="mb-4 text-lg">suporte@edumaistec.com.br</p>
          <p className="text-highlight font-bold text-2xl">0800-000-0000</p>
          <div className="flex space-x-4 mt-8">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-highlight hover:text-navy cursor-pointer transition-all">FB</div>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-highlight hover:text-navy cursor-pointer transition-all">IG</div>
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 text-center text-sm font-light">
        <p>&copy; {new Date().getFullYear()} EdumaisTec. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
        <p className="mt-2 text-gray-600">Certificações em conformidade com o Art. 41 da Lei de Diretrizes e Bases da Educação Nacional.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-conversion text-white p-5 rounded-[1.5rem] shadow-[0_20px_40px_-5px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle size={36} className="group-hover:rotate-12 transition-transform" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-navy px-5 py-3 rounded-2xl font-bold shadow-2xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 border border-gray-100">Dúvidas? Fale com a gente!</span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-highlight selection:text-navy">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LeadQualifier />
        <Benefits />
        <CoursesSection />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
