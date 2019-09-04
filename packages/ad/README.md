# `@zeus-technology/ad`

The purpose of the `ZeusAd` component is to embed a Zeus-managed advertisement into a React app.

## Usage

```js
import React, { Fragment } from ‘react’;
import { ZeusAd } from '@zeus-technology/ad';

const App = (props) => (
  <Fragment>
    <ZeusAd slotId='ad-slot-name' style={{display:visible?'':'none'}} />
  </Fragment>
)
```
