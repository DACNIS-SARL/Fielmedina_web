"use client";

import { motion } from "framer-motion";
import { Heart, Target, Users, Award, MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import Footer from "./Footer";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function About() {
  const locale = useLocale();
  const googlePlayImage =
    locale === "fr" ? "/googleplay-fr.svg" : "/googleplay-en.svg";
  const iosImage = locale === "fr" ? "/ios-fr.svg" : "/ios-en.svg";
  const t = useTranslations();
  const heroHeadingId = "about-hero-heading";
  const missionHeadingId = "about-mission-heading";
  const valuesHeadingId = "about-values-heading";
  const timelineHeadingId = "about-timeline-heading";
  const ctaHeadingId = "about-cta-heading";

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const values = [
    {
      icon: Heart,
      title: t("about.values.heritage.title"),
      description: t("about.values.heritage.description"),
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: Target,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
      gradient: "from-[#b65d37] to-orange-600",
    },
    {
      icon: Users,
      title: t("about.values.community.title"),
      description: t("about.values.community.description"),
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Award,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const milestones = [
    {
      year: t("about.timeline.vision.year"),
      title: t("about.timeline.vision.title"),
      description: t("about.timeline.vision.description"),
    },
    {
      year: t("about.timeline.development.year"),
      title: t("about.timeline.development.title"),
      description: t("about.timeline.development.description"),
    },
    {
      year: t("about.timeline.beta.year"),
      title: t("about.timeline.beta.title"),
      description: t("about.timeline.beta.description"),
    },
    {
      year: t("about.timeline.launch.year"),
      title: t("about.timeline.launch.title"),
      description: t("about.timeline.launch.description"),
    },
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
            <h1 id={heroHeadingId} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              {t("about.hero.subtitle")}
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <MapPin className="size-4" />
                <span>{t("about.hero.location")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="size-4" />
                <span>{t("about.hero.founded")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-white"
        aria-labelledby={missionHeadingId}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 id={missionHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("about.mission.paragraph1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("about.mission.paragraph2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-linear-to-r from-[#b65d37] to-orange-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {t("about.whyFielmedina.title")}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 shrink-0" />
                    <span>{t("about.whyFielmedina.feature1")}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 shrink-0" />
                    <span>{t("about.whyFielmedina.feature2")}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 shrink-0" />
                    <span>{t("about.whyFielmedina.feature3")}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 shrink-0" />
                    <span>{t("about.whyFielmedina.feature4")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-gray-50"
        aria-labelledby={valuesHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          >
            <h2 id={valuesHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("about.values.title")}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t("about.values.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 mb-6 rounded-xl bg-linear-to-r ${value.gradient} 
                              flex items-center justify-center text-white group-hover:scale-110 
                              transition-transform duration-300`}
                >
                  <value.icon className="size-7" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-[#FDF7EC]"
        aria-labelledby={timelineHeadingId}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          >
            <h2 id={timelineHeadingId} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("about.timeline.title")}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t("about.timeline.subtitle")}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-[#b65d37]" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 last:mb-0 ${
                    index % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-2 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-4 h-4 bg-[#b65d37] rounded-full border-4 border-white shadow-lg" />

                  <div
                    className={`bg-white rounded-2xl p-6 shadow-lg ml-12 lg:ml-0 lg:w-5/12 ${
                      index % 2 === 0
                        ? "lg:mr-auto lg:pr-12"
                        : "lg:ml-auto lg:pl-12"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#b65d37] mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24 bg-linear-to-r from-[#b65d37] to-[#b65c37] text-white"
        aria-labelledby={ctaHeadingId}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-6"
            id={ctaHeadingId}
          >
            {t("about.cta.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            {t("about.cta.subtitle")}
          </motion.p>

          <div className="flex gap-4 justify-center items-center">
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
                  alt="Play Store"
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
                  alt="Apple Store"
                  width={205}
                  height={100}
                  className="h-[40px] w-auto object-contain"
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
