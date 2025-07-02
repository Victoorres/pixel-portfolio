'use client';

import type React from 'react';

import { useState } from 'react';
import { PixelatedButton, PixelatedModal, PixelatedBox } from '@/components/pixelated-ui';
import { Send, Clock, CheckCircle, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onButtonClick: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactModal({ isOpen, onClose, onButtonClick }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (typeof window === 'undefined') return false; // garante que está no browser

  // Check if user can send email (30 min cooldown)
  const canSendEmail = () => {
    const savedTime = localStorage.getItem('lastEmailSent');
    if (!savedTime) return true;

    const timeDiff = Date.now() - Number.parseInt(savedTime);
    const thirtyMinutes = 30 * 60 * 1000;
    return timeDiff >= thirtyMinutes;
  };

  // Get remaining cooldown time
  const getRemainingTime = () => {
    const savedTime = localStorage.getItem('lastEmailSent');
    if (!savedTime) return 0;

    const timeDiff = Date.now() - Number.parseInt(savedTime);
    const thirtyMinutes = 30 * 60 * 1000;
    const remaining = thirtyMinutes - timeDiff;

    return remaining > 0 ? Math.ceil(remaining / (60 * 1000)) : 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return formData.name.trim() && formData.email.trim() && formData.subject.trim() && formData.message.trim();
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      onButtonClick();
      return;
    }

    if (!canSendEmail()) {
      onButtonClick();
      return;
    }

    setShowConfirmation(true);
    onButtonClick();
  };

  const sendEmail = async () => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const emailjs = await import('@emailjs/browser');

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Victor Torres',
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      localStorage.setItem('lastEmailSent', Date.now().toString());
      setLastSentTime(Date.now());

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setSendStatus('success');

      if ((window as any).playStartSound) {
        (window as any).playStartSound();
      }

      setTimeout(() => {
        setSendStatus('idle');
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSendStatus('error');

      if ((window as any).playPixelSound) {
        (window as any).playPixelSound(200, 500);
      }

      setTimeout(() => {
        setSendStatus('idle');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingMinutes = getRemainingTime();

  return (
    <>
      {/* Main Contact Modal */}
      <PixelatedModal
        isOpen={isOpen && !showConfirmation}
        onClose={onClose}
        title="📧 ENVIAR MENSAGEM"
        showStar={false}
      >
        <div className="space-y-4">
          {/* Contact Info */}
          <div className="mb-4 p-4 bg-blue-50 rounded">
            <h4 className="font-bold mb-2 text-sm">📞 INFORMAÇÕES DE CONTATO:</h4>
            <div className="text-xs space-y-1">
              <p>📧 VICTOR@EMAIL.COM</p>
              <p>📱 +55 (62) 98532-9181</p>
              <p>📍 ANÁPOLIS, BRASIL</p>
              <p>💼 DISPONÍVEL PARA FREELANCES</p>
            </div>
          </div>

          {/* Cooldown Warning */}
          {!canSendEmail() && (
            <PixelatedBox variant="orange" className="p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-bold">AGUARDE PARA ENVIAR</span>
              </div>
              <div className="text-xs">VOCÊ PODE ENVIAR OUTRO EMAIL EM {remainingMinutes} MINUTOS</div>
            </PixelatedBox>
          )}

          {/* Success Message */}
          {sendStatus === 'success' && (
            <PixelatedBox variant="green" className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">EMAIL ENVIADO COM SUCESSO!</span>
              </div>
              <div className="text-xs opacity-80">OBRIGADO PELO CONTATO. RESPONDEREI EM BREVE!</div>
            </PixelatedBox>
          )}

          {/* Error Message */}
          {sendStatus === 'error' && (
            <PixelatedBox variant="red" className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold">ERRO AO ENVIAR EMAIL</span>
              </div>
              <div className="text-xs opacity-80">TENTE NOVAMENTE OU USE O EMAIL DIRETO</div>
            </PixelatedBox>
          )}

          {/* Form */}
          {sendStatus === 'idle' && (
            <>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="SEU NOME"
                    className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-gray-400 font-mono text-sm uppercase pixel-cursor focus:border-blue-500 focus:outline-none"
                    disabled={isLoading || !canSendEmail()}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="SEU EMAIL"
                    className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-gray-400 font-mono text-sm uppercase pixel-cursor focus:border-blue-500 focus:outline-none"
                    disabled={isLoading || !canSendEmail()}
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="ASSUNTO"
                    className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-gray-400 font-mono text-sm uppercase pixel-cursor focus:border-blue-500 focus:outline-none"
                    disabled={isLoading || !canSendEmail()}
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="SUA MENSAGEM"
                  rows={4}
                  className="w-full p-3 bg-gray-100 border-2 border-gray-400 font-mono text-sm uppercase resize-none pixel-cursor focus:border-blue-500 focus:outline-none"
                  disabled={isLoading || !canSendEmail()}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <PixelatedButton
                  variant="green"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 pixel-cursor-pointer"
                  onClick={handleSubmit}
                  disabled={isLoading || !validateForm() || !canSendEmail()}
                >
                  {isLoading ? (
                    <>
                      <div className="inline-flex gap-4">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ENVIANDO...
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex gap-4">
                      <Send className="w-5 h-5" />
                      ENVIAR
                    </div>
                  )}
                </PixelatedButton>

                <PixelatedButton
                  variant="grey"
                  className="flex-1 px-4 py-3 pixel-cursor-pointer"
                  onClick={() => {
                    onClose();
                    onButtonClick();
                  }}
                  disabled={isLoading}
                >
                  CANCELAR
                </PixelatedButton>
              </div>
            </>
          )}

          {/* Form Validation Info */}
          {sendStatus === 'idle' && (
            <div className="text-xs opacity-60 text-center p-3 bg-blue-50 rounded">
              💡 PREENCHA TODOS OS CAMPOS PARA ENVIAR A MENSAGEM
            </div>
          )}
        </div>
      </PixelatedModal>

      {/* Confirmation Modal */}
      <PixelatedModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="⚠️ CONFIRMAR ENVIO"
        showStar={false}
      >
        <div className="space-y-4 text-center">
          <div className="text-lg font-bold">CONFIRMAR ENVIO DE EMAIL?</div>

          <PixelatedBox variant="orange" className="p-4">
            <div className="text-sm space-y-2">
              <p>
                📧 <strong>PARA:</strong> VICTOR TORRES
              </p>
              <p>
                📝 <strong>ASSUNTO:</strong> {formData.subject}
              </p>
              <p>
                👤 <strong>DE:</strong> {formData.name}
              </p>
            </div>
          </PixelatedBox>

          <div className="text-sm opacity-80">
            <p>⏰ VOCÊ SÓ PODE ENVIAR UM EMAIL A CADA 30 MINUTOS</p>
            <p>📨 TEM CERTEZA QUE DESEJA ENVIAR AGORA?</p>
          </div>

          <div className="flex gap-4 pt-4">
            <PixelatedButton
              variant="green"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 pixel-cursor-pointer"
              onClick={sendEmail}
            >
              <div className="inline-flex gap-4">
                <Send className="w-5 h-5" />
                ENVIAR
              </div>
            </PixelatedButton>

            <PixelatedButton
              variant="red"
              className="flex-1 px-4 py-3 pixel-cursor-pointer"
              onClick={() => {
                setShowConfirmation(false);
                onButtonClick();
              }}
            >
              CANCELAR
            </PixelatedButton>
          </div>
        </div>
      </PixelatedModal>
    </>
  );
}
