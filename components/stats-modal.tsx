'use client';

import { useState, useEffect } from 'react';
import { PixelatedButton, PixelatedBox, PixelatedModal } from './pixelated-ui';
import { Trophy, Target, Clock, Code, Star, TrendingUp, Award, Zap } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    commits: 0,
    hours: 0,
    technologies: 0,
  });

  const finalStats = {
    experience: 7,
    projects: 15,
    clients: 20,
    commits: 1247,
    hours: 8760,
    technologies: 15,
  };

  // Animate stats when modal opens
  useEffect(() => {
    if (isOpen) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          experience: Math.floor(finalStats.experience * progress),
          projects: Math.floor(finalStats.projects * progress),
          clients: Math.floor(finalStats.clients * progress),
          commits: Math.floor(finalStats.commits * progress),
          hours: Math.floor(finalStats.hours * progress),
          technologies: Math.floor(finalStats.technologies * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(finalStats);
        }
      }, interval);

      return () => clearInterval(timer);
    } else {
      setAnimatedStats({
        experience: 0,
        projects: 0,
        clients: 0,
        commits: 0,
        hours: 0,
        technologies: 0,
      });
    }
  }, [isOpen]);

  const achievements = [
    { name: 'CAÇADOR DE BUGS', description: 'RESOLVEU ERROS IMPOSSÍVEIS', icon: '🔧', unlocked: true },
    { name: 'MÃO NA MASSA', description: 'COLOCOU UM SITE NO AR', icon: '🛠️', unlocked: true },
    { name: 'DOMINADOR DE TELAS', description: 'FEZ TELAS QUE ENCANTAM', icon: '🖥️', unlocked: true },
    { name: 'ENCANTADOR DE CLIENTES', description: 'DEIXOU MAIS DE 20 PESSOAS FELIZES', icon: '💼', unlocked: true },
    { name: 'MARATONISTA DO CÓDIGO', description: 'PROGRAMOU SEM PARAR', icon: '🏃‍♂️', unlocked: true },
    { name: 'ARQUITETO INVISÍVEL', description: 'FEZ O SISTEMA FUNCIONAR POR TRÁS', icon: '🏗️', unlocked: true },
    { name: 'DOMADOR DE TECNOLOGIAS', description: 'EXPLOROU 15 FERRAMENTAS NOVAS', icon: '🧠', unlocked: true },
    { name: 'DESIGNER DAS GALÁXIAS', description: 'CRIATIVIDADE NO VISUAL', icon: '🌌', unlocked: true },
    { name: 'CRIADOR DE MUNDOS', description: 'FEZ UM JOGO FUNCIONAR', icon: '🕹️', unlocked: true },
    { name: 'SOM EM CONSTRUÇÃO', description: 'VAI FAZER TUDO TOCAR', icon: '🎧', unlocked: false },
    { name: 'SENHOR DOS PIXELS', description: 'VAI CRIAR TELAS ÉPICAS', icon: '🎨', unlocked: false },
    { name: 'FLASH DO CÓDIGO', description: 'VAI OTIMIZAR TUDO PRA VELOCIDADE', icon: '⚡', unlocked: false },
  ];

  const skillLevels = [
    { name: 'JAVASCRIPT', level: 92, maxLevel: 100, color: '#f3e273' },
    { name: 'TYPESCRIPT', level: 95, maxLevel: 100, color: '#3178c6' },
    { name: 'REACT', level: 88, maxLevel: 100, color: '#61dafb' },
    { name: 'NEXT.JS', level: 82, maxLevel: 100, color: '#000000' },
    { name: 'ANGULAR', level: 93, maxLevel: 100, color: '#dd0031' },
    { name: 'NODE.JS', level: 85, maxLevel: 100, color: '#68a063' },
    { name: 'NESTJS', level: 87, maxLevel: 100, color: '#ea2845' },
    { name: 'SPRING BOOT', level: 90, maxLevel: 100, color: '#6db33f' },
    { name: 'HTML', level: 86, maxLevel: 100, color: '#f1753f' },
    { name: 'CSS', level: 89, maxLevel: 100, color: '#2965f1' },
    { name: 'DESIGN', level: 68, maxLevel: 100, color: '#9d28e0' },
  ];

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="📊 ESTATÍSTICAS DETALHADAS" showStar={true}>
      <div className="space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <PixelatedBox variant="orange" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.experience}+</span>
            </div>
            <div className="text-xs opacity-80">ANOS DE EXPERIÊNCIA</div>
          </PixelatedBox>

          <PixelatedBox variant="green" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Code className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.projects}</span>
            </div>
            <div className="text-xs opacity-80">PROJETOS COMPLETOS</div>
          </PixelatedBox>

          <PixelatedBox variant="purple" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.clients}</span>
            </div>
            <div className="text-xs opacity-80">CLIENTES FELIZES</div>
          </PixelatedBox>

          <PixelatedBox variant="blue" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.commits.toLocaleString()}</span>
            </div>
            <div className="text-xs opacity-80">COMMITS NO GIT</div>
          </PixelatedBox>

          <PixelatedBox variant="red" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.hours.toLocaleString()}</span>
            </div>
            <div className="text-xs opacity-80">HORAS PROGRAMANDO</div>
          </PixelatedBox>

          <PixelatedBox variant="twitter" className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{animatedStats.technologies}+</span>
            </div>
            <div className="text-xs opacity-80">TECNOLOGIAS</div>
          </PixelatedBox>
        </div>

        {/* Skill Progress */}
        <div className="space-y-4">
          <PixelatedBox variant="default" className="p-3 text-center">
            <h3 className="font-bold text-lg">🎯 NÍVEIS DE HABILIDADE</h3>
          </PixelatedBox>

          {skillLevels.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold">{skill.name}</span>
                <span>
                  {skill.level}/{skill.maxLevel}
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-4 bg-gray-300 relative overflow-hidden">
                  <div
                    className="h-full transition-all duration-2000 ease-out"
                    style={{
                      backgroundColor: skill.color,
                      width: `${(skill.level / skill.maxLevel) * 100}%`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  LEVEL {Math.floor(skill.level / 10)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <PixelatedBox variant="default" className="p-3 text-center">
            <h3 className="font-bold text-lg flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              CONQUISTAS ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </h3>
          </PixelatedBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <PixelatedBox
                key={index}
                variant={achievement.unlocked ? 'green' : 'grey'}
                className={`p-3 ${achievement.unlocked ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{achievement.name}</div>
                    <div className="text-xs opacity-80">{achievement.description}</div>
                  </div>
                  {achievement.unlocked && <Award className="w-5 h-5 text-yellow-600" />}
                </div>
              </PixelatedBox>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <PixelatedBox variant="orange" className="p-4">
          <h4 className="font-bold mb-3 text-center">🎮 FATOS CURIOSOS</h4>
          <div className="text-sm space-y-2">
            <p>• CAFÉ CONSUMIDO: ~2.190 XÍCARAS ☕</p>
            <p>• LINHAS DE CÓDIGO: ~156.000 LINHAS 📝</p>
            <p>• BUGS CORRIGIDOS: ~847 BUGS 🐛</p>
            <p>• NOITES EM CLARO: ~73 NOITES 🌙</p>
            <p>• STACKOVERFLOW: ~1.234 VISITAS 🔍</p>
            <p>• DEPLOY SEXTA-FEIRA: 0 (NUNCA!) 🚫</p>
          </div>
        </PixelatedBox>

        {/* Close Button */}
        {/* <div className="flex justify-center pt-4">
          <PixelatedButton variant="green" className="px-8 py-3 pixel-cursor-pointer" onClick={onClose}>
            FECHAR ESTATÍSTICAS
          </PixelatedButton>
        </div> */}
      </div>
    </PixelatedModal>
  );
}
