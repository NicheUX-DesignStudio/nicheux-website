"use client";

import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface TestimonialFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function TestimonialForm({ onSuccess, onClose, isOpen = false }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    roleCompany: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  // Scroll lock that preserves scroll position (prevents page jump to top)
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) return;
      if (e.key === 'Escape' && onClose) onClose();
    };

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setMessageType(null);

    try {
      console.log('🔄 Submitting testimonial:', formData);

      const response = await fetch('/api/submit-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          roleCompany: formData.roleCompany.trim(),
          message: formData.message.trim()
        })
      });

      const result = await response.json();
      console.log('📨 API Response:', result);

      if (result.success) {
        setSubmitMessage(result.message || 'Thank you! Your testimonial has been submitted.');
        setMessageType('success');
        setFormData({ name: '', roleCompany: '', message: '' });

        setTimeout(() => {
          setSubmitMessage('');
          setMessageType(null);
          if (onClose) onClose();
          if (onSuccess) onSuccess();
        }, 3000);
      } else {
        console.error('❌ API Error:', result.message);
        setSubmitMessage(result.message || 'Submission failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('❌ Catch block error:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Render via portal so fixed positioning is relative to viewport, not any transformed ancestor
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            padding: '16px',
          }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              backgroundColor: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: 'clamp(24px, 4vw, 40px)',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(22px, 4vw, 28px)',
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: '6px',
                }}>
                  Share Your Experience
                </h3>
                <p style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                }}>
                  Your feedback helps others find us
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  marginLeft: '16px',
                  padding: '6px',
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Status message */}
            {submitMessage && messageType && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '14px 16px',
                  marginBottom: '24px',
                  border: `1px solid ${messageType === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                  background: messageType === 'success' ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                {messageType === 'success' ? (
                  <CheckCircle size={15} style={{ color: 'rgba(74,222,128,0.9)', flexShrink: 0, marginTop: '1px' }} />
                ) : (
                  <AlertTriangle size={15} style={{ color: 'rgba(248,113,113,0.9)', flexShrink: 0, marginTop: '1px' }} />
                )}
                <div>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: '14px', color: '#ffffff', margin: 0 }}>
                    {submitMessage}
                  </p>
                  {messageType === 'success' && (
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: '3px' }}>
                      We'll add it to our testimonials soon.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    display: 'block',
                    marginBottom: '8px',
                  }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = '#E9C672')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    display: 'block',
                    marginBottom: '8px',
                  }}>
                    Role / Company *
                  </label>
                  <input
                    type="text"
                    name="roleCompany"
                    value={formData.roleCompany}
                    onChange={handleChange}
                    required
                    placeholder="CEO, Acme Co."
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = '#E9C672')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Your Review *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share your experience working with us..."
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#E9C672')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '4px',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  backgroundColor: isSubmitting ? 'rgba(255,255,255,0.12)' : '#E9C672',
                  color: isSubmitting ? 'rgba(255,255,255,0.4)' : '#121212',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#d4b463'; }}
                onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#E9C672'; }}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Review'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
