'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Clock, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {Link} from '../../i18n/navigation';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TiktokIcon from '../icons/TiktokIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import Footer from './Footer';
import CTA from './CTA';

export default function Contact() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const heroHeadingId = 'contact-hero-heading';
  const formHeadingId = 'contact-form-heading';
  const socialHeadingId = 'contact-social-heading';
  const faqHeadingId = 'contact-faq-heading';
  const ctaHeadingId = 'contact-cta-heading';

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const socialLinks = [
    {
      icon: InstagramIcon,
      name: t('contact.socialMedia.instagram'),
      url: "https://instagram.com/fielmedina.officiel",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: FacebookIcon,
      name: t('contact.socialMedia.facebook'), 
      url: "https://facebook.com/fielmedina.officiel",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: TiktokIcon,
      name: t('contact.socialMedia.tiktok'),
      url: "https://tiktok.com/@fielmedina_officiel",
      gradient: "from-gray-800 to-gray-900"
    },
    {
      icon: YoutubeIcon,
      name: t('contact.socialMedia.youtube'),
      url: "https://youtube.com/@fielmedina.officiel",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://formspree.io/f/xwvywvza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus('success');
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main id="main-content" className="flex flex-col bg-white">
      <section
        className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-linear-to-br from-[#FDF7EC] to-orange-50"
        aria-labelledby={heroHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 id={heroHeadingId} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              {t('contact.hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="size-4" />
              <span>{t('contact.hero.responseTime')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-gray-50"
        aria-labelledby={formHeadingId}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-linear-to-r from-[#b65d37] to-orange-500 rounded-lg flex items-center justify-center">
                    <MessageCircle className="size-5 text-white" />
                  </div>
                  <h2 id={formHeadingId} className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {t('contact.form.title')}
                  </h2>
                </div>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-6 text-green-600" />
                      <div>
                        <h4 className="text-green-800 font-semibold">{t('contact.form.success.title')}</h4>
                        <p className="text-green-600 text-sm">{t('contact.form.success.message')}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center space-x-3">
                      <XCircle className="size-6 text-red-600" />
                      <div>
                        <h4 className="text-red-800 font-semibold">{t('contact.form.error.title')}</h4>
                        <p className="text-red-600 text-sm">{t('contact.form.error.message')}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.fields.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b65d37] focus:border-transparent transition-colors"
                        placeholder={t('contact.form.placeholders.name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.fields.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b65d37] focus:border-transparent transition-colors"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.form.fields.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b65d37] focus:border-transparent transition-colors"
                      placeholder={t('contact.form.placeholders.subject')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.form.fields.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b65d37] focus:border-transparent transition-colors resize-none"
                      placeholder={t('contact.form.placeholders.message')}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#b65d37] text-white px-8 py-4 rounded-lg text-lg font-semibold 
                             hover:bg-[#a0542f] transition-all duration-300 shadow-lg hover:shadow-xl
                             flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('contact.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-5" />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('contact.location.title')}</h3>
                <div className="bg-linear-to-br from-[#b65d37]/10 to-orange-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="size-12 text-[#b65d37] mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.location.medina')}</h4>
                    <p className="text-gray-600">{t('contact.location.description')}</p>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#b65d37]/20 rounded-full" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-orange-300/30 rounded-full" />
                  <div className="absolute top-1/2 left-8 w-4 h-4 bg-[#b65d37]/30 rounded-full" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="size-6 text-[#b65d37]" />
                  <h3 className="text-xl font-bold text-gray-900">{t('contact.businessHours.title')}</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('contact.businessHours.weekdays')}</span>
                    <span className="font-semibold">{t('contact.businessHours.weekdaysTime')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.businessHours.saturday')}</span>
                    <span className="font-semibold">{t('contact.businessHours.saturdayTime')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.businessHours.sunday')}</span>
                    <span className="font-semibold">{t('contact.businessHours.sundayTime')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('contact.quickLinks.title')}</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:info@fielmedina.com"
                    className="flex items-center space-x-3 text-gray-600 hover:text-[#b65d37] transition-colors"
                  >
                    <Mail className="size-5" />
                    <span>{t('contact.quickLinks.email')}</span>
                  </a>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.fielmedina.sousse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-[#b65d37] transition-colors"
                  >
                    <MapPin className="size-5" />
                    <span>{t('contact.quickLinks.download')}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-white"
        aria-labelledby={socialHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 id={socialHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t('contact.socialSection.title')}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t('contact.socialSection.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <div className={`bg-linear-to-r ${social.gradient} rounded-2xl p-6 text-white text-center
                              shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <social.icon 
                    width="32" 
                    height="32" 
                    className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" 
                  />
                  <span className="font-semibold">{social.name}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-[#FDF7EC]"
        aria-labelledby={faqHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 id={faqHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t('contact.faq.title')}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t('contact.faq.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: t('contact.faq.questions.free.question'),
                answer: t('contact.faq.questions.free.answer')
              },
              {
                question: t('contact.faq.questions.offline.question'),
                answer: t('contact.faq.questions.offline.answer')
              },
              {
                question: t('contact.faq.questions.gps.question'),
                answer: t('contact.faq.questions.gps.answer')
              },
              {
                question: t('contact.faq.questions.contribute.question'),
                answer: t('contact.faq.questions.contribute.answer')
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />

      </main>
      <Footer />
    </div>
  );
}
