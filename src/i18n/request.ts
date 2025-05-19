import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'
import { fetchDictionary } from '@/utils/fetchDictionary'

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupère la locale demandée (segment URL ou header)
  const requested = await requestLocale

  // Vérifie qu’elle est supportée, sinon on utilise la locale par défaut
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  // On fetch le dictionnaire pour la bonne locale (dimension=locale)
  const messages = await fetchDictionary('dictionary', locale)

  return { locale, messages }
})
