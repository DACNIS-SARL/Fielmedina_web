'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Header from './Header';
import BubbleIcon from '../icons/BubbleIcon';
import WorldIcon from '../icons/WorldIcon';
import NavigatorIcon from '../icons/NavigatorIcon';
import CTA from './CTA';

export default function Home({ partners }: { partners?: React.ReactNode }) {
  const t = useTranslations();
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const googlePlayImage =
    locale === "fr" ? "/googleplay-fr.svg" : "/googleplay-en.svg";
  const iosImage = locale === "fr" ? "/ios-fr.svg" : "/ios-en.svg";

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const sliderImages = [
    "/slider/001.png",
    "/slider/002.png",
    "/slider/003.png",
    "/slider/004.png",
    "/slider/005.png",
    "/slider/006.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const rawHighlights = t.raw('home.hero.highlights') as unknown;
  const highlights = Array.isArray(rawHighlights) ? (rawHighlights as string[]) : [];

  const features = [
    {
      icon: NavigatorIcon,
      title: t('home.features.smartNavigation.title'),
      description: t('home.features.smartNavigation.description'),
      gradient: 'from-gray-700 to-[#b65d37]'
    },
    {
      icon: BubbleIcon,
      title: t('home.features.localInsights.title'),
      description: t('home.features.localInsights.description'),
      gradient: 'from-[#b65d37] to-gray-800'
    },
    {
      icon: (props: { width?: string | number; height?: string | number }) => (
        <WorldIcon width="32" height="32" {...props} />
      ),
      title: t('home.features.culturalGuide.title'),
      description: t('home.features.culturalGuide.description'),
      gradient: 'from-gray-700 to-[#b65d37]'
    }
  ];

  const stats = [
    { number: t('home.stats.rating'), label: t('home.stats.ratingLabel') },
    {
      number: t('home.stats.locations'),
      label: t('home.stats.locationsLabel')
    },
    {
      number: t('home.stats.languages'),
      label: t('home.stats.languagesLabel')
    }
  ];

  const testimonials = [
    {
      name: t('home.testimonials.ahmed.name'),
      role: t('home.testimonials.ahmed.role'),
      text: t('home.testimonials.ahmed.text'),
      rating: 5
    },
    {
      name: t('home.testimonials.sarah.name'),
      role: t('home.testimonials.sarah.role'),
      text: t('home.testimonials.sarah.text'),
      rating: 5
    },
    {
      name: t('home.testimonials.mohamed.name'),
      role: t('home.testimonials.mohamed.role'),
      text: t('home.testimonials.mohamed.text'),
      rating: 5
    }
  ];

  const rawFaqs = t.raw('home.faq.items') as unknown;
  const faqs = Array.isArray(rawFaqs)
    ? (rawFaqs as Array<{ question: string; answer: string }>)
    : [];

  const rawCities = t.raw('home.cities.items') as unknown;
  const cities = Array.isArray(rawCities)
    ? (rawCities as Array<{
      name: string;
      country: string;
      description: string;
      highlights: string[];
    }>)
    : [];

  const heroHeadingId = 'home-hero-heading';
  const featuresHeadingId = 'home-features-heading';
  const citiesHeadingId = 'home-cities-heading';
  const testimonialsHeadingId = 'home-testimonials-heading';
  const faqHeadingId = 'home-faq-heading';

  return (
    <div className="min-h-screen bg-[#FDF7EC]">
      <Header />
      <main id="main-content" className="flex flex-col">
        <section
          id="home"
          className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden"
          aria-labelledby={heroHeadingId}
        >
          <div className="section-decoration" aria-hidden="true">
            <Image
              src="/yellow_dotes.webp"
              alt=""
              className="section-decoration__image opacity-50"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1243}
              height={1238}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                animate="animate"
                className="text-center lg:text-left"
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-block bg-[#b65d37]/10 text-[#b65d37] px-4 py-2 rounded-full text-md font-medium mb-6"
                >
                  {t('home.hero.badge')}
                </motion.div>

                <motion.h1
                  id={heroHeadingId}
                  variants={fadeInUp}
                  className="text-responsive-2xl font-bold text-gray-900 leading-tight mb-6"
                >
                  {t('home.hero.title.line1')}
                  <span className="text-[#b65d37] block">
                    {t('home.hero.title.line2')}
                  </span>
                  {t('home.hero.title.line3')}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  {t('home.hero.subtitle')}
                </motion.p>

                <div className="flex gap-4">
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
                  >
                    <motion.a
                      href="https://play.google.com/store/apps/details?id=com.fielmedina.sousse"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-all duration-300"
                    >
                      <Image
                        src={googlePlayImage}
                        alt={t('common.badges.googlePlayAlt')}
                        width={220}
                        height={100}
                        className="h-[40px] w-auto object-contain"
                      />
                    </motion.a>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
                  >
                    <motion.a
                      href="https://apps.apple.com/us/app/fielmedina/id6751167445"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-all duration-300"
                    >
                      <Image
                        src={iosImage}
                        alt={t('common.badges.appStoreAlt')}
                        width={205}
                        height={100}
                        className="h-[40px] w-auto object-contain"
                      />
                    </motion.a>
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeInUp}
                  className="mt-4 lg:mt-6"
                >
                  <h2 className="sr-only">{t('home.hero.highlightsTitle')}</h2>
                  <ul className="space-y-3 text-left max-w-xl mx-auto lg:mx-0" role="list">
                    {highlights.map((highlight, index) => (
                      <motion.li
                        key={highlight}
                        className="flex items-start gap-3 text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle
                          className="mt-1 h-5 w-5 shrink-0 text-[#b65d37]"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-2xl lg:text-3xl font-bold text-[#b65d37] mb-1">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 text-sm lg:text-base">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center"
              >
                <div
                  className="absolute inset-0 bg-linear-to-r from-[#b65d37]/20 to-blue-500/20 
                            rounded-full blur-3xl scale-75 opacity-60"
                />

                <div
                  className="relative z-10 bg-gray-900 rounded-[3rem] p-3 shadow-2xl 
                            transform hover:rotate-2 transition-transform duration-500 rotate-0"
                >
                  <div className="bg-white rounded-[2.5rem] overflow-hidden w-72 lg:w-80 aspect-[9/19.5] flex flex-col">
                    <div className="relative flex-1 overflow-hidden bg-gray-100 min-h-0">
                      <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        {sliderImages.map((image, index) => (
                          <div
                            key={index}
                            className="w-full h-full shrink-0 relative"
                          >
                            <Image
                              src={image}
                              alt={t("home.phoneUI.screenshotAlt", {
                                number: index + 1,
                              })}
                              fill
                              sizes="(max-width: 768px) 288px, 320px"
                              className="object-cover"
                              priority={index === 0}
                              fetchPriority={index === 0 ? "high" : "auto"}
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {sliderImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                              ? "bg-white shadow-lg"
                              : "bg-white/50 hover:bg-white/70"
                              }`}
                            aria-label={t("common.goToSlide", {
                              number: index + 1,
                            })}
                          />
                        ))}
                      </div>

                      <div className="absolute top-4 left-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
                          <h2 className="text-lg font-bold">
                            {t("home.appBranding.title")}
                          </h2>
                          <p className="text-white/80 text-sm">
                            {t("home.appBranding.subtitle")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section
          id="cities"
          className="py-16 lg:py-24 bg-white"
          aria-labelledby={citiesHeadingId}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
            >
              <h2
                id={citiesHeadingId}
                className="text-responsive-2xl font-bold text-gray-900 mb-6"
              >
                {t('home.cities.title')}
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {t('home.cities.subtitle')}
              </p>
            </motion.div>

            <div className="grid gap-8 lg:gap-12 lg:grid-cols-3 max-w-6xl mx-auto">
              {cities.map((city, index) => (
                <motion.article
                  key={`${city.name}-${city.country}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3 text-[#b65d37]">
                    <div className="w-12 h-12 rounded-2xl bg-[#b65d37]/10 flex items-center justify-center">
                      <MapPin className="size-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {city.name}
                      </h3>
                      <p className="text-sm uppercase tracking-wide text-gray-500">
                        {city.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {city.description}
                  </p>
                  {city.highlights?.length ? (
                    <ul className="space-y-2 text-gray-700">
                      {city.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-1 inline-flex size-2 rounded-full bg-[#b65d37]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="features"
          className="py-16 lg:py-24"
          aria-labelledby={featuresHeadingId}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
            >
              <h2
                id={featuresHeadingId}
                className="text-responsive-2xl font-bold text-gray-900 mb-6"
              >
                {t('home.features.title')}
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {t('home.features.subtitle')}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto ">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-r ${feature.gradient} 
                              flex items-center justify-center text-white shadow-lg group-hover:scale-110 
                              transition-transform duration-300`}
                  >
                    <feature.icon width="32" height="32" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="reviews"
          className="py-16 lg:py-24 bg-white"
          aria-labelledby={testimonialsHeadingId}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2
                id={testimonialsHeadingId}
                className="text-responsive-2xl font-bold text-gray-900 mb-6"
              >
                {t('home.testimonials.title')}
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {t('home.testimonials.rating')}
                </span>
              </div>
              <p className="text-gray-600">{t('home.testimonials.basedOn')}</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <Quote className="size-8 text-[#b65d37] mb-4" />

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 bg-linear-to-r from-[#b65d37] to-orange-500 
                                rounded-full flex items-center justify-center mr-4"
                    >
                      <span className="text-white font-bold">
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="py-16 lg:py-24"
          aria-labelledby={faqHeadingId}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
            >
              <h2 id={faqHeadingId} className="text-responsive-2xl font-bold text-gray-900 mb-6">
                {t('home.faq.title')}
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {t('home.faq.subtitle')}
              </p>
            </motion.div>

            <div className="grid gap-6 max-w-5xl mx-auto">
              {faqs.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-[#f0d9c9] rounded-2xl p-6 lg:p-8 text-left shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="footer-decoration"></div>
          {partners}
        </section>

        <CTA />
      </main>
    </div>
  );
}
