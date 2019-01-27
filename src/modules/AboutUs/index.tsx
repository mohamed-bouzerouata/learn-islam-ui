import BlueHero from 'components/BlueHero'
import HomeFooter from 'components/HomeFooter'
import * as React from 'react'
import RawHTML from 'components/RawHTML'
import './styles.scss'
import {IAboutUsProps} from '../../types/aboutUs'

const AboutUsContainer = ({
  data,
  pageContext: {otherLanguagePath},
}: IAboutUsProps) => (
  <div>
    <BlueHero
      {...data}
      otherLanguagePath={otherLanguagePath}
      title={data.translations.aboutUsPageTitle}
    />
    <RawHTML className="about-us-content center pt3 pb4 ph3 ph4-m ph0-l">
      {data.translations.aboutUsPageContent}
    </RawHTML>
    <HomeFooter
      firstTrackSlug={`${data.translations.localePath}${data.api.tracks
        .edges[0] && data.api.tracks.edges[0].node.slug}`}
      t={data.translations}
    />
  </div>
)
export default AboutUsContainer
