'use client';

import { PixelatedBox } from '@/components/pixelated-ui';
import { Trophy, Scroll, MapPin, Clock, Gem } from 'lucide-react';

interface MobileContentProps {
  currentTime: Date;
  developerStats: any;
  animatedLevel: number;
  currentXP: number;
}

export function MobileContent({ currentTime, developerStats, animatedLevel, currentXP }: MobileContentProps) {
  const achievements = [
    { name: 'FIRST COMMIT', icon: '🎯', unlocked: true, rarity: 'common' },
    { name: 'BUG SLAYER', icon: '🐛', unlocked: true, rarity: 'rare' },
    { name: 'COFFEE MASTER', icon: '☕', unlocked: true, rarity: 'epic' },
    { name: 'NIGHT CODER', icon: '🌙', unlocked: true, rarity: 'legendary' },
    { name: 'CLIENT WHISPERER', icon: '💬', unlocked: false, rarity: 'mythic' },
    { name: 'DEPLOY FRIDAY', icon: '🚀', unlocked: false, rarity: 'cursed' },
    { name: 'CODE REVIEWER', icon: '👁️', unlocked: true, rarity: 'rare' },
    { name: 'STACK OVERFLOW', icon: '📚', unlocked: true, rarity: 'common' },
  ];

  const activeQuests = [
    { name: 'DOMAR O DRAGÃO DO ERRO INVISÍVEL', progress: 70, reward: '700 XP' },
    { name: 'DESCOBRIR POR QUE O BOTÃO NÃO CLICA', progress: 45, reward: '500 XP' },
    { name: 'TRABALHAR SEM FONES DE OUVIDO', progress: 9, reward: '999 XP' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600';
      case 'rare':
        return 'text-blue-600';
      case 'epic':
        return 'text-purple-600';
      case 'legendary':
        return 'text-orange-600';
      case 'mythic':
        return 'text-pink-600';
      case 'cursed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="absolute inset-x-4 mt-20 z-10 pb-24">
      <div className="flex flex-col space-y-6">
        <PixelatedBox variant="default" className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center">
            <div className="w-full text-4xl text-center">🧙‍♂️</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="font-bold text-lg md:text-xl">VICTOR TORRES - Level {animatedLevel}</div>
              </div>
              <div className="text-xs md:text-sm opacity-80 mb-2">{developerStats.class}</div>

              {/* HP/MP Bars - Desktop Only */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-bold">HP</span>
                  <div className="w-16 h-2 bg-red-200 rounded">
                    <div className="h-full bg-red-500 rounded" style={{ width: `${developerStats.hp}%` }} />
                  </div>
                  <span className="text-xs">{developerStats.hp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-bold">MP</span>
                  <div className="w-16 h-2 bg-blue-200 rounded">
                    <div className="h-full bg-blue-500 rounded" style={{ width: `${developerStats.mp}%` }} />
                  </div>
                  <span className="text-xs">{developerStats.mp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* XP Bar - Desktop Only */}
          <div className="mt-3 space-y-1 w-full">
            <div className="flex justify-between text-xs">
              <span>EXPERIÊNCIA</span>
              <span>
                {currentXP}/{developerStats.maxXP} XP
              </span>
            </div>
            <div className="w-full h-2 bg-gray-300 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-2000 ease-out rounded-full"
                style={{ width: `${(currentXP / developerStats.maxXP) * 100}%` }}
              />
            </div>
          </div>
        </PixelatedBox>

        {/* Active Quests */}
        <PixelatedBox variant="orange" className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Scroll className="w-5 h-5" />
            <span className="text-xs font-bold">MISSÕES ATIVAS</span>
          </div>
          <div className="space-y-2">
            {activeQuests.map((quest, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{quest.name}</span>
                  <span className="text-green-600">{quest.reward}</span>
                </div>
                <div className="w-full h-1 bg-gray-300 rounded">
                  <div
                    className="h-full bg-orange-500 rounded transition-all duration-1000"
                    style={{ width: `${quest.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </PixelatedBox>

        {/* Achievements - Exclusivo do Mobile */}
        {/* <PixelatedBox variant="purple" className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-bold">
              CONQUISTAS ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {achievements.slice(0, 6).map((achievement, index) => (
              <div
                key={index}
                className={`text-center p-2 rounded transition-all ${
                  achievement.unlocked ? 'bg-yellow-100 shadow-md' : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className="text-lg mb-1">{achievement.icon}</div>
                <div className={`text-xs font-bold ${getRarityColor(achievement.rarity)}`}>
                  {achievement.name.split(' ')[0]}
                </div>
                {achievement.unlocked && <div className="text-xs text-green-600 mt-1">✓</div>}
              </div>
            ))}
          </div>
        </PixelatedBox> */}

        {/* Location & Time */}
        {/* <div className="grid grid-cols-2 gap-2">
          <PixelatedBox variant="green" className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-bold">REGIÃO</span>
            </div>
            <div className="text-xs">SÃO PAULO</div>
            <div className="text-xs opacity-70">BRASIL</div>
          </PixelatedBox>

          <PixelatedBox variant="twitter" className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-bold">TEMPO</span>
            </div>
            <div className="text-xs">
              {currentTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="text-xs opacity-70">ONLINE</div>
          </PixelatedBox>
        </div> */}

        {/* Action Button */}
        {/* <PixelatedBox variant="default" className="p-4 text-center">
          <div className="text-sm font-bold mb-2 flex items-center justify-center gap-2">
            <Gem className="w-5 h-5 text-purple-500" />
            INICIAR AVENTURA
          </div>
          <div className="text-xs opacity-80 leading-relaxed">
            ABRA O MENU PARA EXPLORAR HABILIDADES, PROJETOS E COMEÇAR SUA JORNADA!
          </div>
        </PixelatedBox> */}
      </div>
    </div>
  );
}
