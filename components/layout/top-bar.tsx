'use client';

import { PixelatedBox, PixelatedButton } from '@/components/pixelated-ui';
import { Crown, Menu, Scroll } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TopBarProps {
  isMobile: boolean;
  onMenuClick: () => void;
  onButtonClick: () => void;
  developerStats: any;
  animatedLevel: number;
  currentXP: number;
}

export function TopBar({
  isMobile,
  onMenuClick,
  onButtonClick,
  developerStats,
  animatedLevel,
  currentXP,
}: TopBarProps) {
  const activeQuests = [
    { name: 'DOMAR O DRAGÃO DO ERRO INVISÍVEL', progress: 70, reward: '700 XP' },
    { name: 'DESCOBRIR POR QUE O BOTÃO NÃO CLICA', progress: 45, reward: '500 XP' },
    { name: 'TRABALHAR SEM FONES DE OUVIDO', progress: 9, reward: '999 XP' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
      <div className="flex justify-end md:justify-between items-start">
        {/* Character Profile with HP/MP */}
        {!isMobile && (
          <PixelatedBox variant="default" className="px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🧙‍♂️</div>
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
            <div className="mt-3 space-y-1">
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
        )}

        {/* Active Quests - Desktop Only */}
        {!isMobile && (
          <div className="flex gap-4">
            {activeQuests.map((quest, index) => (
              <PixelatedBox key={index} variant="orange" className="px-4 py-3 text-center min-w-[200px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Scroll className="w-5 h-5" />
                  <div className="text-xs opacity-80">MISSÃO ATIVA</div>
                </div>
                <div className="font-bold text-sm mb-2">{quest.name}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>PROGRESSO</span>
                    <span className="text-green-600">{quest.reward}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-300 rounded">
                    <div
                      className="h-full bg-orange-500 rounded transition-all duration-1000"
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>
                  <div className="text-xs opacity-70">{quest.progress}% COMPLETO</div>
                </div>
              </PixelatedBox>
            ))}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <PixelatedButton
            variant="default"
            className="px-3 py-2 md:px-4 md:py-3 pixel-cursor-pointer"
            onClick={() => {
              onMenuClick();
              onButtonClick();
            }}
          >
            <Menu className="w-5 h-5" />
          </PixelatedButton>
        )}
      </div>
    </div>
  );
}
