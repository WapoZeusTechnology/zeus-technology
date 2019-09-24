# `@zeus-technology/ad`

The purpose of the `ZeusAd` component is to embed a Zeus-managed advertisement into a React app.

## Usage

### `ZeusAd`

```js
import React, { Fragment } from ‘react’;
import { ZeusAd } from '@zeus-technology/ad';

const App = (props) => (
  <Fragment>
    <ZeusAd slotId='ad-slot-name' style={{display:visible?'':'none'}} />
  </Fragment>
)
```

### `ZeusAdWithRouter`

If you're using `react-router-dom` and you would like to have your ads refresh when your route changes, try this.

```js
import React, { Fragment } from ‘react’;
import { ZeusAd } from '@zeus-technology/ad';

const App = (props) => (
  <Router>
    <ZeusAdWithRouter changeOnNavigate={true} slotId='ad-slot-name' style={{display:visible?'':'none'}} />
  </Router>
)
```

The optional `changeOnNavigate` property defaults to `true`.
