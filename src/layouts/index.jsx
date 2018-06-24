// @flow
import Footer from 'components/Footer'
import * as React from 'react'
// import 'tachyons/css/tachyons.min.css' // TODO: do not include in footer
import 'styles/theme.scss'
import 'typeface-amiri'
import 'typeface-open-sans'

type Props = {
  children: Function,
}
const DefaultLayout = ({children}: Props) => (
  <div className="mdc-typography">
    {children()}
    <Footer />
  </div>
)
export default DefaultLayout
