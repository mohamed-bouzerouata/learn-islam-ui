// @flow
import React from 'react'
import Link from 'gatsby-link'
import Button from './Button'
import Card from './Card'
import RawHTML from './RawHTML'
// import Card from 'preact-material-components/Card'
// import 'preact-material-components/Card/style.css'
// import 'preact-material-components/Button/style.css'

type Props = {
  localePath: string,
  slug: string,
  soon: number,
  strings: {
    description: string,
    title: string,
  },
  t: {
    soon: string,
    start: string,
  },
}
const HomeTrackCard = ({localePath, slug, soon, strings: s, t}: Props) => (
  <Card
    className="mt3 ph3 pv1 flex flex-column flex-row-l justify-around items-center"
    rounded
  >
    <div className="mh2 flex flex-column item-center item-start-l">
      <h2 className="mb1 f5 self-center self-start-l">{s.title}</h2>
      <RawHTML className="child-p-mt0 mdc-typography--body1 black-50">
        {s.description}
      </RawHTML>
    </div>
    {soon ? (
      <Button
        className="mv2 cursor-default no-underline"
        raised
        rounded
        secondary
      >
        {t.soon}
      </Button>
    ) : (
      <Link className="mv2 no-underline" to={`${localePath}${slug}`}>
        <Button raised rounded secondary>
          {t.start}
        </Button>
      </Link>
    )}
  </Card>
)

export default HomeTrackCard
