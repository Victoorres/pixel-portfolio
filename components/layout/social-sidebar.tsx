'use client';

import { PixelatedButton } from '@/components/pixelated-ui';
import { Github, Linkedin, Twitter, Volume2, VolumeX, Music, MicOffIcon as MusicOff, Instagram } from 'lucide-react';

interface SocialSidebarProps {
  onButtonClick: () => void;
  musicEnabled: boolean;
  soundEnabled: boolean;
  onToggleMusic: () => void;
  onToggleSound: () => void;
}

export function SocialSidebar({
  onButtonClick,
  musicEnabled,
  soundEnabled,
  onToggleMusic,
  onToggleSound,
}: SocialSidebarProps) {
  const handleSocialClick = (platform: string) => {
    onButtonClick();
    const links = {
      github: 'https://github.com/victortorres',
      linkedin: 'https://linkedin.com/in/victortorres',
      instagram: 'https://twitter.com/victortorres',
    };

    window.open(links[platform as keyof typeof links], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="absolute right-6 bottom-48 z-10">
      <div className="space-y-3 flex flex-col gap-1">
        {/* Sound Effects Control */}
        <PixelatedButton
          variant={soundEnabled ? 'green' : 'grey'}
          className="p-3 pixel-cursor-pointer"
          onClick={onToggleSound}
          title={soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </PixelatedButton>

        {/* Music Control - Simplified since user always interacted */}
        <PixelatedButton
          variant={musicEnabled ? 'green' : 'grey'}
          className="p-3 pixel-cursor-pointer"
          onClick={onToggleMusic}
          title={musicEnabled ? 'Pausar música' : 'Tocar música'}
        >
          {musicEnabled ? <Music className="w-5 h-5" /> : <MusicOff className="w-5 h-5" />}
        </PixelatedButton>

        {/* Social Links */}
        <PixelatedButton
          variant="default"
          className="p-3 pixel-cursor-pointer"
          onClick={() => handleSocialClick('github')}
          title="GitHub"
        >
          <Github className="w-5 h-5" />
        </PixelatedButton>

        <PixelatedButton
          variant="default"
          className="p-3 pixel-cursor-pointer"
          onClick={() => handleSocialClick('linkedin')}
          title="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </PixelatedButton>

        <PixelatedButton
          variant="default"
          className="p-3 pixel-cursor-pointer"
          onClick={() => handleSocialClick('instagram')}
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </PixelatedButton>
      </div>
    </div>
  );
}
