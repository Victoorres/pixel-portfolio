'use client';

import { PixelatedModal } from '@/components/pixelated-ui';
import { MapPin } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onButtonClick: () => void;
}

export function AboutModal({ isOpen, onClose, onButtonClick }: AboutModalProps) {
  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="SOBRE MIM" showStar={false}>
      <div className="space-y-4 text-sm">
        <p>
          Desenvolvedor full-stack com mais de 7 anos de experiência em soluções web modernas, escaláveis e seguras.
        </p>
        <p>
          Atualmente contribuo com projetos da Polícia Federal, atuando pela Stefanini Group no desenvolvimento de
          sistemas críticos e de alta responsabilidade.
        </p>
        <p>
          Tenho domínio em Angular, React, Next.js, Java com Spring Boot, Node.js e NestJS — atuando do frontend ao
          backend, com foco em performance, segurança e boas práticas.
        </p>
        <p>
          Meu trabalho é guiado por código limpo, arquitetura sólida e entrega constante de valor para o usuário final.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 font-bold">
          <MapPin className="w-5 h-5" />
          <span>Anápolis, Brasil</span>
        </div>
      </div>
    </PixelatedModal>
  );
}
