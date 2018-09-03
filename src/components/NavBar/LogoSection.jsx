// @flow
import * as React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'
// import logoAr from 'images/logo-ar.png'
// import logoFr from 'images/logo-fr.png'
import logoAr from 'images/site-h-ar-1.0.png'
import logoFr from 'images/site-h-fr-1.0.png'

type Props = {
  locale: string,
  localePath: string,
  siteName: string,
}

const LogoSection = ({locale, localePath, siteName}: Props) => (
  <div>
    <section className="pv0-ns mdc-toolbar__section-ns mdc-toolbar__section-ns mdc-toolbar__section--align-start-ns">
      <Link className="mdc-toolbar__title-ns pv0-ns" to={localePath}>
        <div className="pv2 ph3">
          <img
            alt={siteName}
            width="230px"
            // height="60px"
            src={locale === 'ar' ? logoAr : logoFr}
          />
        </div>
      </Link>
    </section>
  </div>
)
export default LogoSection
