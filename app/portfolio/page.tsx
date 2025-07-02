'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SoundManager } from '@/components/sound-manager';
import { SnakeGame } from '@/components/snake-game';
import { SettingsModal } from '@/components/settings-modal';
import { StatsModal } from '@/components/stats-modal';
import { ProjectGuideModal } from '@/components/project-guide-modal';
import { TopBar } from '@/components/layout/top-bar';
import { Sidebar } from '@/components/layout/sidebar';
import { RPGSidebar } from '@/components/layout/rpg-sidebar';
import { SocialSidebar } from '@/components/layout/social-sidebar';
import { MobileContent } from '@/components/mobile/mobile-content';
import { MobileMenu } from '@/components/mobile/mobile-menu';
import { AboutModal } from '@/components/modals/about-modal';
import { SkillsModal } from '@/components/modals/skills-modal';
import { ProjectsModal } from '@/components/modals/projects-modal';
import { ContactModal } from '@/components/modals/contact-modal';
import { Footer } from '@/components/layout/footer';
import { TutorialModal } from '@/components/modals/tutorial-modal';

export default function GamePortfolio() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showProjectGuideModal, setShowProjectGuideModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [currentXP, setCurrentXP] = useState(0);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  const developerStats = {
    level: 25,
    class: 'DESENVOLVEDOR FULL STACK',
    xp: 8750,
    maxXP: 10000,
    hp: 100,
    mp: 85,
  };

  useEffect(() => {
    const cameFromHome = sessionStorage.getItem('cameFromHomePage');
    const userHasInteracted = sessionStorage.getItem('userHasInteracted');
    const interactionTimestamp = sessionStorage.getItem('interactionTimestamp');

    const isRecentInteraction =
      interactionTimestamp && Date.now() - Number.parseInt(interactionTimestamp) < 0.1 * 60 * 1000;

    // ALWAYS redirect to home if any condition is not met
    if (!cameFromHome || !userHasInteracted || !isRecentInteraction) {
      console.log('Redirecting to home page - user must start from there');
      // Clear any existing flags to force fresh start
      sessionStorage.removeItem('cameFromHomePage');
      sessionStorage.removeItem('userHasInteracted');
      sessionStorage.removeItem('interactionTimestamp');
      localStorage.removeItem('cameFromHomePage');
      localStorage.removeItem('userHasInteracted');

      router.replace('/');
      return;
    }

    setIsLoading(false);
  }, [router]);

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentXP(developerStats.xp);
      setAnimatedLevel(developerStats.level);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't run other effects while loading

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Check audio states from localStorage and sync with component
    const updateAudioStates = () => {
      const savedMusic = localStorage.getItem('musicEnabled');
      const savedSound = localStorage.getItem('soundEnabled');
      if (savedMusic !== null) {
        setMusicEnabled(savedMusic === 'true');
      }
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }
    };

    // Initial check
    updateAudioStates();

    // Listen for storage changes (when localStorage is updated)
    window.addEventListener('storage', updateAudioStates);

    // Listen for custom audio state change events
    const handleAudioStateChange = (event: CustomEvent) => {
      const { soundEnabled: newSoundEnabled, musicEnabled: newMusicEnabled } = event.detail;
      setSoundEnabled(newSoundEnabled);
      setMusicEnabled(newMusicEnabled);
    };

    window.addEventListener('audioStateChanged', handleAudioStateChange as EventListener);

    // Check if it's the first visit (but only if user came from home)
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowTutorialModal(true);
      localStorage.setItem('hasVisited', 'true');
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('storage', updateAudioStates);
      window.removeEventListener('audioStateChanged', handleAudioStateChange as EventListener);
      clearInterval(timer);
    };
  }, [isLoading]);

  const handleButtonClick = () => {
    if ((window as any).playPixelSound) {
      (window as any).playPixelSound(800, 100);
    }
  };

  const toggleMusic = () => {
    if ((window as any).toggleMusic) {
      (window as any).toggleMusic();
    }
    // State will be updated via the custom event
  };

  const toggleSound = () => {
    if ((window as any).toggleSound) {
      (window as any).toggleSound();
    }
    // State will be updated via the custom event
  };

  // Show loading or redirect message while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e1dac5] font-mono">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#594c3d] mb-4">🎮 CARREGANDO PORTFOLIO...</div>
          <div className="text-sm text-[#594c3d] opacity-70">VERIFICANDO ACESSO...</div>
        </div>
      </div>
    );
  }

  return (
    <SoundManager>
      <div
        className="min-h-screen relative font-mono text-[#594c3d]"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#e1dac5]/05" />

        {/* Top Bar */}
        <TopBar
          isMobile={isMobile}
          developerStats={developerStats}
          currentXP={currentXP}
          animatedLevel={animatedLevel}
          onMenuClick={() => setShowMobileMenu(true)}
          onButtonClick={handleButtonClick}
        />

        {/* Desktop Layout */}
        {!isMobile && (
          <>
            <Sidebar
              onAboutClick={() => setShowAboutModal(true)}
              onSkillsClick={() => setShowSkillsModal(true)}
              onProjectsClick={() => setShowProjectsModal(true)}
              onContactClick={() => setShowContactModal(true)}
              onGameClick={() => setShowGameModal(true)}
              onStatsClick={() => setShowStatsModal(true)}
              onGuideClick={() => setShowProjectGuideModal(true)}
              onButtonClick={handleButtonClick}
            />
            <RPGSidebar onButtonClick={handleButtonClick} />
            <SocialSidebar
              onButtonClick={handleButtonClick}
              musicEnabled={musicEnabled}
              soundEnabled={soundEnabled}
              onToggleMusic={toggleMusic}
              onToggleSound={toggleSound}
            />
          </>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <MobileContent
            currentTime={currentTime}
            developerStats={developerStats}
            currentXP={currentXP}
            animatedLevel={animatedLevel}
          />
        )}

        {/* Footer */}
        <Footer isMobile={isMobile} />

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          onAboutClick={() => {
            setShowAboutModal(true);
            setShowMobileMenu(false);
          }}
          onSkillsClick={() => {
            setShowSkillsModal(true);
            setShowMobileMenu(false);
          }}
          onProjectsClick={() => {
            setShowProjectsModal(true);
            setShowMobileMenu(false);
          }}
          onContactClick={() => {
            setShowContactModal(true);
            setShowMobileMenu(false);
          }}
          onStatsClick={() => {
            setShowStatsModal(true);
            setShowMobileMenu(false);
          }}
          onGuideClick={() => {
            setShowProjectGuideModal(true);
            setShowMobileMenu(false);
          }}
          onButtonClick={handleButtonClick}
        />

        {/* All Modals */}
        <AboutModal
          isOpen={showAboutModal}
          onClose={() => setShowAboutModal(false)}
          onButtonClick={handleButtonClick}
        />
        <SkillsModal
          isOpen={showSkillsModal}
          onClose={() => setShowSkillsModal(false)}
          onButtonClick={handleButtonClick}
        />
        <ProjectsModal
          isOpen={showProjectsModal}
          onClose={() => setShowProjectsModal(false)}
          onButtonClick={handleButtonClick}
        />
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          onButtonClick={handleButtonClick}
        />
        <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
        <StatsModal isOpen={showStatsModal} onClose={() => setShowStatsModal(false)} />
        <ProjectGuideModal isOpen={showProjectGuideModal} onClose={() => setShowProjectGuideModal(false)} />
        <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />

        {/* Game Modal - Desktop Only */}
        {!isMobile && showGameModal && <SnakeGame isOpen={showGameModal} onClose={() => setShowGameModal(false)} />}
      </div>
    </SoundManager>
  );
}
