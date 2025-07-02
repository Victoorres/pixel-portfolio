'use client';

import { useState } from 'react';
import { PixelatedButton, PixelatedBox, PixelatedModal } from '../pixelated-ui';
import {
  User,
  Target,
  Mail,
  Gamepad2,
  BarChart3,
  BookOpen,
  Volume2,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'BEM-VINDO AO MEU PORTFÓLIO!',
      icon: '👋',
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            ESTE É UM PORTFÓLIO INTERATIVO ESTILO PIXEL ART ONDE VOCÊ PODE EXPLORAR MEUS PROJETOS E HABILIDADES DE FORMA
            DIVERTIDA!
          </p>
          <PixelatedBox variant="blue" className="p-3 text-center">
            <div className="text-xs">🎮 NAVEGUE COMO SE FOSSE UM JOGO RETRÔ!</div>
          </PixelatedBox>
        </div>
      ),
    },
    {
      title: 'BOTÕES PRINCIPAIS',
      icon: '🎯',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <User className="w-5 h-5 text-blue-600" />
              <div className="text-xs">
                <div className="font-bold">SOBRE MIM</div>
                <div className="opacity-70">CONHEÇA MINHA HISTÓRIA</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
              <Target className="w-5 h-5 text-green-600" />
              <div className="text-xs">
                <div className="font-bold">HABILIDADES</div>
                <div className="opacity-70">TECNOLOGIAS QUE DOMINO</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-cyan-50 rounded">
              <Mail className="w-5 h-5 text-cyan-600" />
              <div className="text-xs">
                <div className="font-bold">CONTATO</div>
                <div className="opacity-70">VAMOS TRABALHAR JUNTOS?</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'RECURSOS EXTRAS',
      icon: '⭐',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-2 bg-red-50 rounded">
              <Gamepad2 className="w-5 h-5 text-red-600" />
              <div className="text-xs">
                <div className="font-bold">JOGAR SNAKE</div>
                <div className="opacity-70">JOGO CLÁSSICO PARA RELAXAR</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-orange-50 rounded">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <div className="text-xs">
                <div className="font-bold">ESTATÍSTICAS</div>
                <div className="opacity-70">DADOS SOBRE MINHA CARREIRA</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <div className="text-xs">
                <div className="font-bold">GUIA DE PROJETOS</div>
                <div className="opacity-70">COMO DESENVOLVO PROJETOS</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'CONTROLES DE ÁUDIO',
      icon: '🔊',
      content: (
        <div className="space-y-4">
          <p className="text-sm">ESTE PORTFÓLIO TEM EFEITOS SONOROS E MÚSICA DE FUNDO ESTILO JOGOS RETRÔ!</p>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
            <Volume2 className="w-5 h-5 text-green-600" />
            <div className="text-xs">
              <div className="font-bold">CONTROLE DE SOM</div>
              <div className="opacity-70">CLIQUE NO ÍCONE DE SOM NO CANTO DIREITO</div>
            </div>
          </div>

          <PixelatedBox variant="orange" className="p-3 text-center">
            <div className="text-xs">💡 DICA: ATIVE O SOM PARA UMA EXPERIÊNCIA COMPLETA!</div>
          </PixelatedBox>
        </div>
      ),
    },
    {
      title: 'REDES SOCIAIS',
      icon: '🌐',
      content: (
        <div className="space-y-4">
          <p className="text-sm">CONECTE-SE COMIGO NAS REDES SOCIAIS ATRAVÉS DOS BOTÕES NO LADO DIREITO:</p>

          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Github className="w-5 h-5" />
              <span className="text-xs font-bold">GITHUB</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
              <Linkedin className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold">LINKEDIN</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-cyan-50 rounded">
              <Twitter className="w-5 h-5 text-cyan-600" />
              <span className="text-xs font-bold">TWITTER</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'PRONTO PARA COMEÇAR!',
      icon: '🚀',
      content: (
        <div className="space-y-4 text-center">
          <p className="text-sm">AGORA VOCÊ JÁ SABE COMO NAVEGAR PELO MEU PORTFÓLIO PIXELADO!</p>

          <PixelatedBox variant="green" className="p-4">
            <div className="text-sm font-bold mb-2">✨ DICAS FINAIS:</div>
            <div className="text-xs space-y-1">
              <p>• CLIQUE NOS BOTÕES PARA EXPLORAR</p>
              <p>• ATIVE O SOM PARA MAIS DIVERSÃO</p>
              <p>• TESTE O JOGO SNAKE QUANDO QUISER</p>
              <p>• ENTRE EM CONTATO SE TIVER INTERESSE!</p>
            </div>
          </PixelatedBox>

          <div className="text-xs opacity-70">ESTE TUTORIAL NÃO APARECERÁ NOVAMENTE</div>
        </div>
      ),
    },
  ];

  const currentStepData = tutorialSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
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

  const handleClose = () => {
    // Mark tutorial as completed
    localStorage.setItem('tutorialCompleted', 'true');
    onClose();

    // Play completion sound
    if ((window as any).playStartSound) {
      (window as any).playStartSound();
    }
  };

  return (
    <PixelatedModal
      isOpen={isOpen}
      onClose={handleClose}
      title="🎮 TUTORIAL DO PORTFÓLIO"
      showStar={true}
      className="text-initial"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>PROGRESSO</span>
            <span>
              {currentStep + 1}/{tutorialSteps.length}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-300 relative overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="text-center">
          <div className="text-4xl mb-3">{currentStepData.icon}</div>
          <h3 className="text-lg font-bold mb-4">{currentStepData.title}</h3>
          {currentStepData.content}
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
              <ArrowLeft className="w-5 h-5" /> ANTERIOR
            </div>
          </PixelatedButton>

          <div className="text-sm opacity-70">
            {currentStep + 1} DE {tutorialSteps.length}
          </div>

          {currentStep < tutorialSteps.length - 1 ? (
            <PixelatedButton
              variant="blue"
              className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
              onClick={nextStep}
            >
              <div className="inline-flex gap-4">
                PRÓXIMO <ArrowRight className="w-5 h-5" />
              </div>
            </PixelatedButton>
          ) : (
            <PixelatedButton
              variant="green"
              className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
              onClick={handleClose}
            >
              <div className="inline-flex gap-4">
                COMEÇAR! <CheckCircle className="w-5 h-5" />
              </div>
            </PixelatedButton>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center pt-2 border-t border-gray-200">
          <button onClick={handleClose} className="text-xs opacity-60 hover:opacity-80 transition-opacity">
            PULAR TUTORIAL
          </button>
        </div>
      </div>
    </PixelatedModal>
  );
}
