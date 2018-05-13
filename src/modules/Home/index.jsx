// @flow
import Footer from 'components/Footer'
import HomeFooter from 'components/HomeFooter'
import * as React from 'react'
import HomeCourses from './HomeCourses'
import HomeFeatures from './HomeFeatures'
import HomeHero from './HomeHero'
import HomeNewsletter from './HomeNewsletter'

type Props = {
  data: {
    otherLocaleTranslations: Object,
    tracks: Array,
    translations: Object,
  },
  pathContext: Object,
}
const HomeContainer = ({data}: Props) => (
  <div>
    <HomeHero {...data} />
    <HomeFeatures {...data.translations} />
    <HomeCourses {...data.translations} />
    <HomeNewsletter {...data.translations} />
    <HomeFooter
      {...data.translations}
      firstTrackSlug={`${data.translations.localePath}${data.tracks[0] &&
        data.tracks[0].slug}`}
    />
    <Footer />
  </div>
)
export default HomeContainer
