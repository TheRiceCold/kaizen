import { bind } from 'astal'

import Page from '../Page'

import options from 'options'
import { APP_CONFIG } from 'lib/paths'

export default() => (
  <Page name='about' homogeneous>
    <box css={bind(options.style.scheme).as(scheme =>`
      min-width: 150px;
      min-height: 150px;
      background: url('${APP_CONFIG}/assets/logo-${scheme}.png');
      background-size: contain, cover;
      background-repeat: no-repeat;
    `)} />
    <label
      wrap
      maxWidthChars={120}
      label={`Kaizen is a desktop environment for Hyprland configured using Astal and AGS. The japanese word Kaizen is a philosophy to improve continuously and change for the better. This configuration is developed to improve daily workflow and productivity for developers/users.`}
    />
  </Page>
)
