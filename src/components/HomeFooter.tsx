import * as React from 'react'
import {Link} from 'gatsby'
import cx from 'classnames'
import Facebook from 'react-icons/lib/fa/facebook'
import Telegram from 'react-icons/lib/fa/paper-plane'
import Twitter from 'react-icons/lib/fa/twitter'
import Youtube from 'react-icons/lib/fa/youtube-play'
import {ObjectOfStrings} from 'interfaces'
import Button from './Button'
import RawHTML from './RawHTML'

const icons = Object.entries({
  Facebook,
  Twitter,
  Youtube,
  Telegram,
})

interface Props {
  dark?: boolean
  firstTrackSlug: string
  t: ObjectOfStrings
}

const HomeFooter = ({
  dark,
  firstTrackSlug,
  t: {
    copyright,
    footerSocialTitle,
    homeFooterCTA,
    homeStartTrack,
    siteName,
    siteSlogan,
    ...t
  },
}: Props) => (
  <section
    className={cx('pt5 pb4 ph4 ph5-l flex flex-column white', {
      'mdc-theme--primary-bg': !dark,
      'mdc-theme--secondary-bg': dark,
    })}
  >
    <div className="mh5-ns ph5-ns tc">
      <h2 className="ph5-l f4 fw4">{homeFooterCTA}</h2>
    </div>
    <div className="mt4 mt5-ns tc">
      <Link to={`${firstTrackSlug}/`} className="no-underline">
        <Button
          className={cx('ph4 b', {
            'mdc-theme--secondary': dark,
          })}
          elevated
          inverse
        >
          {homeStartTrack}
        </Button>
      </Link>
    </div>
    <div className="mt5 tc">
      <div className="flex flex-column flex-row-ns justify-between items-center items-end-ns">
        <div className="mh2 tc tl-ns">
          <div className="">{siteName}</div>
          <div className="f6">{siteSlogan}</div>
        </div>
        <div className="mt4 mt0-ns tc tr-ns">
          <div className="mh2">{footerSocialTitle}</div>
          <div className="mt3">
            {icons.map(([icon, Icon], i) => (
              <a
                key={i}
                href={t[`url${icon}`]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  className={cx('mh2 pa1 f4 bg-white mdc-theme--primary', {
                    'mdc-theme--primary': !dark,
                    'mdc-theme--secondary': dark,
                  })}
                />
                {/* <Button className="pa0" inverse>
                  <Icon className="mdc-button__icon" />
                </Button> */}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="pt3 tc">
      <RawHTML>{copyright}</RawHTML>
    </div>
  </section>
)
export default HomeFooter