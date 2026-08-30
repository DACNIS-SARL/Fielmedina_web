'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Shield, AlertTriangle, Clock, Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePage } from '@/lib/hooks/usePages';
import Footer from './Footer';
import CTA from './CTA';

function TermsConditionsContent() {
  const locale = useLocale();
  const t = useTranslations('common.api');
  
  const apiSlug = locale === 'fr' 
    ? 'conditions-generales-dutilisation' 
    : 'terms-and-conditions';
  
  const { data: pageData, loading, error } = usePage(apiSlug);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-2 text-gray-600">{t('loading')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        {t('errorLoadingContent')}: {error.message}
      </div>
    );
  }

  if (!pageData?.page) {
    return (
      <div className="text-gray-600">
        {t('contentNotAvailable')}
      </div>
    );
  }
  const content = locale === 'fr' ? pageData.page.contentFr : pageData.page.contentEn;

  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default function TermsConditions() {
  const t = useTranslations();
  const heroHeadingId = 'terms-hero-heading';
  const keyPointsHeadingId = 'terms-keypoints-heading';
  const detailHeadingId = 'terms-detail-heading';

  const keyPoints = [
    {
      icon: FileText,
      title: t('legal.termsConditions.keyPoints.freeService.title'),
      description: t('legal.termsConditions.keyPoints.freeService.description'),
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: t('legal.termsConditions.keyPoints.userResponsibility.title'),
      description: t('legal.termsConditions.keyPoints.userResponsibility.description'),
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: t('legal.termsConditions.keyPoints.limitation.title'),
      description: t('legal.termsConditions.keyPoints.limitation.description'),
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: AlertTriangle,
      title: t('legal.termsConditions.keyPoints.acceptableUse.title'),
      description: t('legal.termsConditions.keyPoints.acceptableUse.description'),
      gradient: "from-[#b65d37] to-orange-600"
    }
  ];

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#b65d37] rounded-2xl mb-6">
              <FileText className="size-8 text-white" />
            </div>
            <h1 id={heroHeadingId} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('legal.termsConditions.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              {t('legal.termsConditions.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="size-4" />
              <span>{t('legal.termsConditions.lastUpdated')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-white"
        aria-labelledby={keyPointsHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 id={keyPointsHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t('legal.termsConditions.keyPoints.title')}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t('legal.termsConditions.keyPoints.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-12 h-12 mb-4 rounded-xl bg-linear-to-r ${point.gradient} 
                              flex items-center justify-center text-white`}>
                  <point.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-linear-to-br from-[#FDF7EC] to-orange-50"
        aria-labelledby={detailHeadingId}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <TermsConditionsContent />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('legal.termsConditions.sections.contact.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('legal.termsConditions.sections.contact.content1')}
              </p>
              
              <div className="flex items-start space-x-4 bg-[#b65d37]/10 p-4 rounded-lg">
                <Mail className="size-6 text-[#b65d37] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('legal.termsConditions.sections.contact.contactTitle')}</h3>
                  <p className="text-gray-600 mb-2">{t('legal.termsConditions.sections.contact.contactMessage')}</p>
                  <a 
                    href="mailto:info@fielmedina.com" 
                    className="text-[#b65d37] font-medium hover:underline"
                  >
                    {t('legal.termsConditions.sections.contact.email')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
      </main>
      <Footer />
    </div>
  );
}
