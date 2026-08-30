"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

export default function CTA() {
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
  return (
    <section className="py-16 lg:py-24 bg-linear-to-r from-[#b65d37] to-[#b65c37] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-responsive-2xl font-bold mb-6"
        >
          {t("home.cta.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90"
        >
          {t("home.cta.subtitle")}
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
                alt={t("common.badges.googlePlayAlt")}
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
                alt={t("common.badges.appStoreAlt")}
                width={205}
                height={100}
                className="h-[40px] w-auto object-contain"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full" />
      </div>
    </section>
  );
}
