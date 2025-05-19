import { storyblokInit } from '@storyblok/react/rsc'

import Page from '@/components/Page'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DoubleImage from '@/components/DoubleImages'
import ImageEdito from '@/components/ImageEdito'

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  components: {
    page: Page,
    hero: Hero,
    'double images': DoubleImage,
    'image edito': ImageEdito,
    header: Navigation,
    footer: Footer,
  },
})
