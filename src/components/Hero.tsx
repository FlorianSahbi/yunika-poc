'use client'

import { storyblokEditable } from '@storyblok/react/rsc'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import VideoBackground from './VideoBackground'
import BigCta from './BigCta'
import type {
  HeroStoryblok,
  SlideStoryblok,
  AssetStoryblok,
  ButtonStoryblok,
} from '@/types/storyblok'
import Guard from './Guard'

interface HeroProps {
  blok: HeroStoryblok
}

const fadeInBackground = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

const fadeInContent = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, duration: 0.8, ease: 'easeOut' },
  },
}

const Hero: React.FC<HeroProps> = ({ blok }) => {
  const slides: SlideStoryblok[] = blok.slides ?? []

  return (
    <div {...storyblokEditable(blok)}>
      {slides.map((sec: SlideStoryblok, idx: number) => (
        <motion.section
          key={sec._uid || idx}
          aria-label={sec.title}
          className="relative flex h-screen w-full items-center justify-center overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={{}}
        >
          <Guard cond={!!sec.background?.url}>
            <motion.div
              className="absolute inset-0 -z-10"
              variants={fadeInBackground}
            >
              <VideoBackground
                src={sec.background!.url}
                className="absolute inset-0 object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    rgba(0,0,0,0.1) 0,
                    rgba(0,0,0,0.1) 1px,
                    transparent 1px,
                    transparent 4px
                  )`,
                }}
              />
            </motion.div>
          </Guard>

          <motion.div
            className="relative z-10 max-w-2xl space-y-6 px-6 text-center"
            variants={fadeInContent}
          >
            {'topImage' in sec &&
              sec.topImage &&
              (() => {
                const topImg = sec.topImage as AssetStoryblok
                return (
                  <Image
                    src={topImg.filename || ''}
                    alt={topImg.alt || ''}
                    fill
                    className="absolute inset-0 -z-10 object-cover object-center"
                  />
                )
              })()}

            <motion.h2
              className="text-5xl font-extrabold text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              {sec.title}
            </motion.h2>

            {sec.subtitle && (
              <motion.p
                className="text-lg text-gray-200 lg:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
              >
                {sec.subtitle}
              </motion.p>
            )}

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
            >
              {sec.buttons?.map((button: ButtonStoryblok, i: number) => (
                <BigCta
                  key={button._uid || i}
                  href={button.link?.url || '#'}
                  color="primary"
                >
                  {button.label}
                </BigCta>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      ))}
    </div>
  )
}

export default Hero
