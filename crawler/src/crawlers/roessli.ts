import { Page } from '../browser'
import { Crawler } from '../crawler'

export const crawler: Crawler = {
  name: 'Rössli',
  url: 'https://www.souslepont-roessli.ch/events/',
  crawl: async (page: Page) => {
    const elements = await page.query('.page-rossli-events .event a')

    return await Promise.all(
      elements.map(async (element) => {
        const [start, title, url] = await Promise.all([
          element
            .query('time.event-date')
            .then((element) => element?.getAttribute('datetime')),
          element.childText('h2'),
          element.getAttribute('href'),
        ])
        return { start, title, url }
      })
    )
  },
  prepareDate: (date: string) => {
    const cleaned = date.slice(4, 21)
    return [cleaned, 'dd. MMMM yyyy HH:mm']
  },
}