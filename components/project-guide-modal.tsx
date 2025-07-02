'use client';

import { useState } from 'react';
import { PixelatedButton, PixelatedBox, PixelatedModal } from './pixelated-ui';
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  CheckCircle,
  ArrowRight,
  Clock,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface ProjectGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectGuideModal({ isOpen, onClose }: ProjectGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const projectSteps = [
    {
      id: 1,
      title: 'PLANEJAMENTO',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'default',
      duration: '1-2 SEMANAS',
      description: 'DEFINIR OBJETIVOS E ESCOPO DO PROJETO',
      tasks: [
        'DEFINIR PROBLEMA A SER RESOLVIDO',
        'IDENTIFICAR PÚBLICO-ALVO',
        'LISTAR FUNCIONALIDADES PRINCIPAIS',
        'CRIAR CRONOGRAMA REALISTA',
        'DEFINIR TECNOLOGIAS A USAR',
        'ESTIMAR CUSTOS E RECURSOS',
      ],
      tips: [
        '💡 SEMPRE COMECE COM O MVP (PRODUTO MÍNIMO VIÁVEL)',
        '📝 DOCUMENTE TUDO DESDE O INÍCIO',
        '🎯 SEJA ESPECÍFICO NOS OBJETIVOS',
        '⏰ ADICIONE 20% A MAIS NO TEMPO ESTIMADO',
      ],
    },
    {
      id: 2,
      title: 'DESIGN & PROTOTIPAGEM',
      icon: <Palette className="w-6 h-6" />,
      color: 'purple',
      duration: '1-2 SEMANAS',
      description: 'CRIAR A INTERFACE E EXPERIÊNCIA DO USUÁRIO',
      tasks: [
        'CRIAR WIREFRAMES BÁSICOS',
        'DEFINIR PALETA DE CORES',
        'ESCOLHER TIPOGRAFIA',
        'CRIAR PROTÓTIPO INTERATIVO',
        'TESTAR USABILIDADE',
        'FINALIZAR DESIGN SYSTEM',
      ],
      tips: [
        '🎨 USE FERRAMENTAS COMO FIGMA OU SKETCH',
        '📱 PENSE MOBILE-FIRST',
        '🔄 ITERE BASEADO EM FEEDBACK',
        '♿ CONSIDERE ACESSIBILIDADE',
      ],
    },
    {
      id: 3,
      title: 'CONFIGURAÇÃO',
      icon: <Settings className="w-6 h-6" />,
      color: 'blue',
      duration: '2-3 DIAS',
      description: 'PREPARAR AMBIENTE DE DESENVOLVIMENTO',
      tasks: [
        'CONFIGURAR REPOSITÓRIO GIT',
        'INSTALAR DEPENDÊNCIAS',
        'CONFIGURAR AMBIENTE LOCAL',
        'SETUP DE FERRAMENTAS (ESLINT, PRETTIER)',
        'CONFIGURAR CI/CD BÁSICO',
        'CRIAR ESTRUTURA DE PASTAS',
      ],
      tips: [
        '🔧 USE TEMPLATES PARA ACELERAR',
        '📦 GERENCIE DEPENDÊNCIAS COM CUIDADO',
        '🔒 CONFIGURE VARIÁVEIS DE AMBIENTE',
        '📋 DOCUMENTE O SETUP NO README',
      ],
    },
    {
      id: 4,
      title: 'DESENVOLVIMENTO',
      icon: <Code className="w-6 h-6" />,
      color: 'orange',
      duration: '4-8 SEMANAS',
      description: 'IMPLEMENTAR AS FUNCIONALIDADES',
      tasks: [
        'CRIAR COMPONENTES BÁSICOS',
        'IMPLEMENTAR LÓGICA DE NEGÓCIO',
        'INTEGRAR COM APIS/BANCO DE DADOS',
        'ADICIONAR VALIDAÇÕES',
        'IMPLEMENTAR AUTENTICAÇÃO',
        'OTIMIZAR PERFORMANCE',
      ],
      tips: [
        '🧩 DIVIDA EM PEQUENAS TAREFAS',
        '🔄 FAÇA COMMITS FREQUENTES',
        '📖 COMENTE CÓDIGO COMPLEXO',
        '🧪 TESTE DURANTE O DESENVOLVIMENTO',
      ],
    },
    {
      id: 5,
      title: 'TESTES',
      icon: <TestTube className="w-6 h-6" />,
      color: 'red',
      duration: '1-2 SEMANAS',
      description: 'GARANTIR QUALIDADE E FUNCIONAMENTO',
      tasks: [
        'TESTES UNITÁRIOS',
        'TESTES DE INTEGRAÇÃO',
        'TESTES DE USABILIDADE',
        'TESTES DE PERFORMANCE',
        'TESTES EM DIFERENTES DISPOSITIVOS',
        'CORREÇÃO DE BUGS',
      ],
      tips: [
        '🐛 TESTE CASOS EXTREMOS',
        '📱 TESTE EM DISPOSITIVOS REAIS',
        '⚡ MONITORE PERFORMANCE',
        '👥 PEÇA FEEDBACK DE USUÁRIOS',
      ],
    },
    {
      id: 6,
      title: 'DEPLOY',
      icon: <Rocket className="w-6 h-6" />,
      color: 'twitter',
      duration: '3-5 DIAS',
      description: 'PUBLICAR O PROJETO',
      tasks: [
        'CONFIGURAR SERVIDOR/HOSTING',
        'CONFIGURAR DOMÍNIO',
        'SETUP DE BANCO PRODUÇÃO',
        'CONFIGURAR MONITORAMENTO',
        'FAZER DEPLOY INICIAL',
        'TESTAR EM PRODUÇÃO',
      ],
      tips: [
        '🚀 USE PLATAFORMAS COMO VERCEL/NETLIFY',
        '🔒 CONFIGURE HTTPS',
        '📊 ADICIONE ANALYTICS',
        '🔄 CONFIGURE BACKUP AUTOMÁTICO',
      ],
    },
  ];

  const currentStepData = projectSteps[currentStep];

  const nextStep = () => {
    if (currentStep < projectSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Play navigation sound
      if ((window as any).playPixelSound) {
        (window as any).playPixelSound(600, 100);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Play navigation sound
      if ((window as any).playPixelSound) {
        (window as any).playPixelSound(400, 100);
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    // Play navigation sound
    if ((window as any).playPixelSound) {
      (window as any).playPixelSound(800, 80);
    }
  };

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="🛠️ GUIA DE DESENVOLVIMENTO" showStar={true}>
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>PROGRESSO DO GUIA</span>
            <span>
              {currentStep + 1}/{projectSteps.length}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-300 relative overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / projectSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {projectSteps.map((step, index) => (
            <PixelatedButton
              key={step.id}
              variant={index === currentStep ? (step.color as any) : index < currentStep ? 'green' : 'grey'}
              className="p-2 text-xs pixel-cursor-pointer"
              onClick={() => goToStep(index)}
            >
              {index < currentStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
            </PixelatedButton>
          ))}
        </div>

        {/* Current Step Content */}
        <PixelatedBox variant={currentStepData.color as any} className="p-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              {currentStepData.icon}
              <h2 className="text-2xl font-bold">
                ETAPA {currentStepData.id}: {currentStepData.title}
              </h2>
            </div>
            {/* <div className="flex items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                {currentStepData.duration}
              </div>
            </div> */}
            <p className="mt-3 text-sm">{currentStepData.description}</p>
          </div>
        </PixelatedBox>

        {/* Tasks Checklist */}
        <div className="space-y-3">
          <PixelatedBox variant="default" className="p-3 text-center">
            <h3 className="font-bold">📋 TAREFAS DESTA ETAPA</h3>
          </PixelatedBox>

          <div className="grid gap-2">
            {currentStepData.tasks.map((task, index) => (
              <PixelatedBox key={index} variant="default" className="p-3 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">{task}</span>
              </PixelatedBox>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-3">
          <PixelatedBox variant="orange" className="p-3 text-center">
            <h3 className="font-bold">💡 DICAS IMPORTANTES</h3>
          </PixelatedBox>

          <div className="space-y-2">
            {currentStepData.tips.map((tip, index) => (
              <div key={index} className="text-sm bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-300">
          <PixelatedButton
            variant="grey"
            className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <div className="inline-flex gap-4">
              <ArrowLeft className="w-5 h-5" /> <span className='hidden md:display-flex'>ANTERIOR</span>
            </div>
          </PixelatedButton>

          <div className="text-sm opacity-70">
            ETAPA {currentStep + 1} DE {projectSteps.length}
          </div>

          {currentStep < projectSteps.length - 1 ? (
            <PixelatedButton
              variant="green"
              className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
              onClick={nextStep}
            >
              <div className="inline-flex gap-4">
                <span className='hidden md:display-flex'>PRÓXIMA</span> <ArrowRight className="w-5 h-5" />
              </div>
            </PixelatedButton>
          ) : (
            <PixelatedButton
              variant="green"
              className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
              onClick={onClose}
            >
              <div className="inline-flex gap-4">
                <span className='hidden md:display-flex'>CONCLUIR</span> <CheckCircle className="w-5 h-5" />
              </div>
            </PixelatedButton>
          )}
        </div>

        {/* Quick Actions */}
        {/* <PixelatedBox variant="blue" className="p-4">
          <h4 className="font-bold mb-3 text-center">🚀 AÇÕES RÁPIDAS</h4>
          <div className="grid grid-cols-2 gap-3">
            <PixelatedButton variant="default" className="text-xs p-2 pixel-cursor-pointer">
              📖 VER RECURSOS
            </PixelatedButton>
            <PixelatedButton variant="default" className="text-xs p-2 pixel-cursor-pointer">
              🔗 TEMPLATES
            </PixelatedButton>
            <PixelatedButton variant="default" className="text-xs p-2 pixel-cursor-pointer">
              📚 DOCUMENTAÇÃO
            </PixelatedButton>
            <PixelatedButton variant="default" className="text-xs p-2 pixel-cursor-pointer">
              💬 COMUNIDADE
            </PixelatedButton>
          </div>
        </PixelatedBox> */}
      </div>
    </PixelatedModal>
  );
}
