// @flow
import React from 'react'
import R from 'ramda'
import HomeContainer from '../containers/Home'

type Props = {
  data: {
    tracks: {
      edges: Array<{
        node: {
          strings: Array<{
            locale: string,
          }>,
        },
      }>,
    },
    translations: Object,
  },
  pathContext: Object,
}

const filterLanguage = R.curry((locale, str) =>
  R.evolve(
    {
      strings: R.find(R.propEq('locale', locale)),
    },
    str,
  ),
)

const enhance = (props, locale) =>
  R.evolve({
    data: {
      tracks: (tracks) =>
        R.map(
          (node) => filterLanguage(locale, R.prop('node', node)),
          R.prop('edges', tracks),
        ),
    },
  })(props)

const Home = (props: Props) => (
  <HomeContainer {...enhance(props, props.pathContext.locale)} />
)

export default Home

// $FlowIgnore
export const pageQuery = graphql`
  query homeQuery($locale: String!) {
    translations: feathersTranslations(locale: {eq: $locale}) {
      aboutUs
      connect
      courses
      enroll
      feature1Text
      feature2Text
      feature3Text
      feature1Title
      feature2Title
      feature3Title
      featuredCoursesTitle
      featuresTitle
      footerSocialTitle
      homeTitle
      homeDescription
      homeEmailTitle
      homeEmailPlaceHolder
      homeFooterCTA
      homeStartTrack
      localeName
      localePath
      siteName
      siteSlogan
      soon
      start
      tracks
      urlFacebook
      urlTelegram
      urlTwitter
      urlYoutube
    }
    otherLocaleTranslations: feathersTranslations(locale: {ne: $locale}) {
      localeName
      localePath
    }
    tracks: allFeathersTracks(limit: 3, sort: {fields: [order], order: ASC}) {
      edges {
        node {
          order
          slug
          soon
          strings: tracksStrings {
            title
            description
            locale
          }
        }
      }
    }
  }
`
