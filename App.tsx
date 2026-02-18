
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
  TrendingUp,
  FileText,
  Lock,
  Zap,
  X
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

const TrustBar = () => (
  <div className="bg-gray-50 border-y border-gray-100 py-4">
    <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
      <div className="flex items-center font-bold text-navy"><ShieldCheck className="mr-2" /> RECONHECIDO MEC</div>
      <div className="flex items-center font-bold text-navy"><Award className="mr-2" /> LEI 9.394/96</div>
      <div className="flex items-center font-bold text-navy"><CheckCircle className="mr-2" /> VÁLIDO CFT/COREN</div>
      <div className="flex items-center font-bold text-navy"><Users className="mr-2" /> +8.500 ALUNOS</div>
    </div>
  </div>
);

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-navy font-bold text-2xl flex items-center">
          <span className="text-navy">edu</span>
          <span className="text-orange-500">mais</span>
          <span className="text-navy">tec</span>
          <div className="ml-2 w-8 h-8 bg-navy flex items-center justify-center rounded-lg rotate-12 shadow-lg shadow-blue-200">
             <Award className="text-highlight w-5 h-5" />
          </div>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-8 text-navy font-medium">
        <a href="#como-funciona" className="hover:text-orange-500 transition-colors">Como Funciona</a>
        <a href="#comparativo" className="hover:text-orange-500 transition-colors">Comparativo</a>
        <a href="#qualificador" className="bg-navy text-white px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-all shadow-md">Simulador VIP</a>
      </nav>
      <a 
        href="https://wa.me/yournumber" 
        className="flex items-center bg-conversion text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95"
      >
        <MessageCircle size={18} className="mr-2" />
        <span className="hidden sm:inline">Suporte Direto</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative bg-white pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/[0.02] -skew-x-12 transform translate-x-32"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center bg-highlight/10 text-navy px-4 py-2 rounded-full font-bold text-xs mb-8 border border-highlight/20 animate-bounce">
          <Zap className="w-4 h-4 mr-2 text-highlight" /> 
          NOVIDADE: AGORA COM EMISSÃO DIGITAL EM 48H
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight font-title text-navy tracking-tight">
          Sua experiência de <span className="relative inline-block">
            <span className="relative z-10">1 ano</span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-highlight/30 -z-10"></span>
          </span> vale um Diploma.
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
          Pare de perder promoções por falta de papel. Transforme sua jornada profissional em um <strong>Título Técnico Oficial</strong> reconhecido em todo o Brasil.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#qualificador" 
            className="w-full sm:w-auto bg-navy text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-navy/90 transition-all shadow-2xl hover:-translate-y-1 flex items-center justify-center group"
          >
            Verificar Minha Elegibilidade
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-gray-400 font-medium">
            <CheckCircle className="inline mr-1 text-conversion" size={16} /> 
            Resultado Instantâneo
          </p>
        </div>
      </div>
      
      {/* Visual Floating Cards */}
      <div className="mt-20 relative max-w-5xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200" 
            alt="Profissional certificado sorrindo" 
            className="w-full h-[400px] md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
          
          {/* Floating UX Elements */}
          <div className="absolute top-10 left-6 md:left-12 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl animate-float">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-highlight rounded-full flex items-center justify-center text-navy">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-navy">Diploma Digital</p>
                <p className="text-[10px] text-gray-500">Pronto em 48h</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 right-6 md:right-12 bg-conversion text-white p-4 rounded-2xl shadow-xl animate-float-delayed">
            <div className="flex items-center space-x-3">
              <CheckCircle size={24} />
              <p className="font-bold text-sm">Válido para CFT/COREN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Comparativo = () => (
  <section id="comparativo" className="py-24 bg-brandLight overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Por que nos escolher?</h2>
        <p className="text-gray-500">Compare e veja por que somos a solução inteligente.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Tradicional */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 opacity-60">
          <h3 className="text-xl font-bold text-gray-400 mb-8 flex items-center">
             <X className="mr-2" /> Modelo Tradicional
          </h3>
          <ul className="space-y-6">
            <li className="flex items-start text-gray-500">
              <Clock className="mr-3 shrink-0" size={20} />
              <span><strong>2 a 3 anos</strong> de estudo presencial ou EAD.</span>
            </li>
            <li className="flex items-start text-gray-500">
              <TrendingUp className="mr-3 shrink-0" size={20} />
              <span>Investimento de <strong>R$ 5.000 a R$ 12.000</strong> em mensalidades.</span>
            </li>
            <li className="flex items-start text-gray-500">
              <ClipboardCheck className="mr-3 shrink-0" size={20} />
              <span>Estudo de conteúdos que você já domina na prática.</span>
            </li>
          </ul>
        </div>
        
        {/* EdumaisTec */}
        <div className="bg-navy p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <h3 className="text-2xl font-bold text-highlight mb-8 flex items-center">
             <Check className="mr-2" /> Certificação EdumaisTec
          </h3>
          <ul className="space-y-6">
            <li className="flex items-start text-white">
              <Zap className="mr-3 shrink-0 text-highlight" size={24} />
              <span className="text-lg">Diploma oficial em <strong>48 Horas úteis</strong>.</span>
            </li>
            <li className="flex items-start text-white">
              <Lock className="mr-3 shrink-0 text-highlight" size={24} />
              <span className="text-lg">Investimento único e <strong>acessível</strong> (sem parcelas infinitas).</span>
            </li>
            <li className="flex items-start text-white">
              <Award className="mr-3 shrink-0 text-highlight" size={24} />
              <span className="text-lg">Validação legal do que você <strong>já sabe fazer</strong>.</span>
            </li>
          </ul>
          <div className="mt-10 p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
            <p className="text-highlight font-bold text-sm">REQUISITO: +1 ANO DE EXPERIÊNCIA</p>
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
      const message = `Olá! Fiz o simulador VIP de elegibilidade.
📍 Área: ${area}
🕒 Experiência: ${exp}
🎓 Escolaridade: ${schooling}
Gostaria de garantir meu diploma express de 48h!`;
      window.location.href = `https://wa.me/yournumber?text=${encodeURIComponent(message)}`;
    }, 2500);
  };

  return (
    <section id="qualificador" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-navy text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase mb-4 tracking-tighter">Área Restrita</div>
            <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Simulador de Diploma</h2>
            <p className="text-gray-500">Descubra agora se você está apto para o Título Técnico.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_40px_80px_-20px_rgba(0,51,102,0.2)] border border-gray-100 relative overflow-hidden">
            {/* Minimal Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
              <div 
                className="h-full bg-highlight transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(255,193,7,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="min-h-[400px] flex flex-col justify-center">
              {step === 1 && (
                <div className="animate-fadeIn">
                  <span className="text-highlight font-bold text-xs uppercase tracking-widest mb-2 block">Passo 01/04</span>
                  <h3 className="text-3xl font-bold text-navy mb-8">Qual sua área de atuação profissional?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {['Engenharia & Indústria', 'Saúde & Enfermagem', 'Tecnologia & TI', 'Gestão & Administrativo', 'Segurança do Trabalho'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setArea(item); setStep(2); }}
                        className="p-6 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl transition-all text-left font-bold text-navy flex justify-between items-center group shadow-sm hover:shadow-md"
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
                  <span className="text-highlight font-bold text-xs uppercase tracking-widest mb-2 block">Passo 02/04</span>
                  <h3 className="text-3xl font-bold text-navy mb-8">Há quanto tempo você atua nesta área?</h3>
                  <div className="space-y-4">
                    {['Entre 1 e 2 anos', 'De 3 a 5 anos', 'Mais de 5 anos', 'Ainda não completei 1 ano'].map((item) => (
                      <button 
                        key={item}
                        onClick={() => { setExp(item); setStep(3); }}
                        className="w-full p-6 bg-gray-50 border-2 border-transparent hover:border-navy hover:bg-white rounded-2xl shadow-sm transition-all text-left flex justify-between items-center group"
                      >
                        <span className="font-bold text-lg text-navy">{item}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-navy group-hover:bg-navy/5 transition-all"></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} className="mt-8 text-navy/40 font-bold text-xs underline w-full text-center hover:text-navy uppercase tracking-widest">Voltar</button>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fadeIn">
                  <span className="text-highlight font-bold text-xs uppercase tracking-widest mb-2 block">Passo 03/04</span>
                  <h3 className="text-3xl font-bold text-navy mb-8">Qual sua formação acadêmica?</h3>
                  <div className="space-y-4">
                    {['Ensino Médio Completo', 'Ensino Superior Incompleto', 'Ensino Superior Completo', 'Ensino Fundamental'].map((item) => (
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
                  <button onClick={() => setStep(2)} className="mt-8 text-navy/40 font-bold text-xs underline w-full text-center hover:text-navy uppercase tracking-widest">Voltar</button>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fadeIn text-center">
                  {loading ? (
                    <div className="flex flex-col items-center py-10">
                      <div className="relative">
                        <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-t-highlight rounded-full animate-spin"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-navy mt-8">Consultando Banco de Dados...</h3>
                      <p className="text-gray-400 mt-2">Validando elegibilidade via Lei 9.394/96</p>
                    </div>
                  ) : (
                    <div className="py-6">
                      <div className="w-24 h-24 bg-conversion text-white rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 shadow-2xl shadow-green-200">
                        <Check size={48} />
                      </div>
                      <h3 className="text-4xl font-bold text-navy mb-4">Elegibilidade Confirmada!</h3>
                      <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                        Seu perfil como profissional de <strong>{area}</strong> atende aos requisitos legais. Você pode emitir seu diploma em até 48 horas.
                      </p>
                      <button 
                        onClick={handleFinish}
                        className="w-full bg-conversion text-white py-6 rounded-[1.5rem] font-bold text-2xl hover:bg-green-600 shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all hover:scale-[1.03] active:scale-95 group"
                      >
                        <MessageCircle className="mr-3 group-hover:animate-pulse" /> Finalizar Registro VIP
                      </button>
                      <div className="mt-8 flex items-center justify-center space-x-6 text-navy/30 font-bold text-[9px] uppercase tracking-[0.2em]">
                        <span className="flex items-center"><Lock size={12} className="mr-1"/> Conexão Segura</span>
                        <span className="flex items-center"><Zap size={12} className="mr-1"/> Resposta em 48h</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSteps = () => (
  <section id="como-funciona" className="py-24 bg-brandLight">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl text-navy mb-6 font-title">Processo em 3 Etapas</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Simples, digital e focado no profissional que não tem tempo a perder.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-navy/5 -translate-y-1/2 z-0"></div>
        
        <div className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
          <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-8 shadow-xl shadow-blue-200">01</div>
          <h3 className="text-xl font-bold text-navy mb-4">Envio de Documentos</h3>
          <p className="text-gray-500">Envie sua comprovação de experiência (1 ano) e documentos básicos pelo nosso portal 100% digital.</p>
        </div>
        
        <div className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
          <div className="w-16 h-16 bg-highlight text-navy rounded-2xl flex items-center justify-center text-2xl font-bold mb-8 shadow-xl shadow-yellow-200">02</div>
          <h3 className="text-xl font-bold text-navy mb-4">Avaliação Técnica</h3>
          <p className="text-gray-500">Nossa banca examinadora avalia seu histórico e realiza uma verificação de competências online.</p>
        </div>
        
        <div className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-xl border-highlight border-2">
          <div className="w-16 h-16 bg-conversion text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-8 shadow-xl shadow-green-200">03</div>
          <h3 className="text-xl font-bold text-navy mb-4">Diploma em 48h</h3>
          <p className="text-gray-500">Após aprovado, seu diploma digital é emitido e enviado em até 48h úteis para uso imediato.</p>
        </div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-24 bg-navy text-white overflow-hidden relative">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-highlight/10 rounded-full blur-[120px]"></div>
    
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className="text-4xl md:text-6xl mb-20 font-title tracking-tight text-white">Resultados de quem <br/><span className="text-highlight">acelerou a carreira</span></h2>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10">
          <div className="flex mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-highlight fill-highlight" size={20} />)}
          </div>
          <p className="text-xl mb-10 italic font-light leading-relaxed">
            "Sempre tive medo de concursos por não ter o técnico. Com a EdumaisTec, resolvi minha vida em 3 dias. O suporte é incrível e o diploma é aceito em todo lugar!"
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-400 rounded-2xl overflow-hidden border-2 border-highlight">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Avatar" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Fabiano Oliveira</p>
              <p className="text-gray-400 text-sm">Técnico em Edificações</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10">
          <div className="flex mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-highlight fill-highlight" size={20} />)}
          </div>
          <p className="text-xl mb-10 italic font-light leading-relaxed">
            "A empresa exigiu o técnico para eu continuar como encarregado. Fiz o processo na terça, na quinta eu já estava com o diploma no e-mail. Salvou meu emprego."
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-400 rounded-2xl overflow-hidden border-2 border-highlight">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" alt="Avatar" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">André L. Santos</p>
              <p className="text-gray-400 text-sm">Técnico em Eletrotécnica</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 max-w-4xl mx-auto">
        <div>
          <div className="text-4xl md:text-6xl font-bold text-highlight mb-2 tracking-tighter">8.5k+</div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Diplomas</p>
        </div>
        <div>
          <div className="text-4xl md:text-6xl font-bold text-highlight mb-2 tracking-tighter">48h</div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Prazo Máx</p>
        </div>
        <div>
          <div className="text-4xl md:text-6xl font-bold text-highlight mb-2 tracking-tighter">100%</div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Legalizado</p>
        </div>
        <div>
          <div className="text-4xl md:text-6xl font-bold text-highlight mb-2 tracking-tighter">24/7</div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Suporte</p>
        </div>
      </div>
    </div>
  </section>
);

const FAQAccordion: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm transition-all hover:shadow-lg">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-bold text-lg md:text-xl pr-4 text-navy group-hover:text-orange-500 transition-colors">{question}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-navy text-white rotate-180' : 'bg-brandLight text-navy'}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-10 text-gray-600 animate-fadeIn leading-relaxed text-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-brandLight">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-navy mb-4 font-title">Perguntas Frequentes</h2>
        <p className="text-gray-500">Tudo o que você precisa saber sobre sua certificação técnica.</p>
      </div>
      <div className="space-y-4">
        <FAQAccordion 
          question="O diploma é realmente aceito pelo CFT e COREN?" 
          answer="Sim, sem restrições. A Certificação por Competência é amparada pela Lei Federal 9.394/96, Art. 41. Isso garante que o diploma emitido tem a mesma validade de um curso de 2 anos, permitindo o registro profissional imediato."
        />
        <FAQAccordion 
          question="O prazo de 48 horas é garantido?" 
          answer="Sim. Trabalhamos com processos priorizados. Assim que sua avaliação técnica é concluída e a documentação validada, nosso sistema de emissão digital gera o certificado oficial em até 48 horas úteis."
        />
        <FAQAccordion 
          question="Tenho apenas 1 ano de experiência, serve?" 
          answer="Com certeza. O requisito legal mínimo é de apenas 1 ano de atuação comprovada na área. Se você tem esse tempo (seja por carteira assinada ou contrato), já está apto."
        />
        <FAQAccordion 
          question="O processo é presencial?" 
          answer="Não, o processo é 100% digital. Desde o envio dos documentos até a avaliação de competências, tudo é feito de forma online para facilitar a vida do profissional que trabalha."
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy text-gray-500 py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="col-span-1 md:col-span-2">
           <div className="text-white font-bold text-3xl flex items-center mb-8">
            <span>edu</span>
            <span className="text-orange-500">mais</span>
            <span>tec</span>
          </div>
          <p className="max-w-md text-xl leading-relaxed font-light mb-8">
            Autoridade em Certificação por Competência no Brasil. Sua carreira não pode esperar 2 anos para decolar.
          </p>
          <div className="flex space-x-6">
             <div className="flex items-center text-white font-bold text-sm">
                <ShieldCheck className="mr-2 text-highlight" /> MEC/LDB
             </div>
             <div className="flex items-center text-white font-bold text-sm">
                <CheckCircle className="mr-2 text-highlight" /> SISTEC/VÁLIDO
             </div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Atendimento</h4>
          <p className="mb-4 text-white font-bold text-lg">0800-000-0000</p>
          <p className="mb-4">suporte@edumaistec.com.br</p>
          <p className="text-xs">Seg - Sex: 08:00 às 18:00</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Redes Sociais</h4>
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-highlight hover:text-navy cursor-pointer transition-all border border-white/10">FB</div>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-highlight hover:text-navy cursor-pointer transition-all border border-white/10">IG</div>
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 text-center text-xs font-light">
        <p>&copy; {new Date().getFullYear()} EdumaisTec. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
        <p className="mt-2 text-gray-700">A EdumaisTec atua como consultoria educacional facilitando o processo de certificação por competência junto a instituições parceiras credenciadas.</p>
      </div>
    </div>
  </footer>
);

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 animate-slideUp">
      <a 
        href="#qualificador" 
        className="block bg-navy text-white py-5 rounded-2xl text-center font-bold text-lg shadow-2xl shadow-navy/40"
      >
        Simular Elegibilidade Agora
      </a>
    </div>
  );
};

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/yournumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-50 bg-conversion text-white p-5 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle size={36} className="group-hover:rotate-12 transition-transform" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-navy px-5 py-3 rounded-2xl font-bold shadow-2xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 border border-gray-100">Falar com Consultor</span>
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
        <Comparativo />
        <LeadQualifier />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
      <WhatsAppFloat />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
