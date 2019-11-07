# `@zeus-technology/ad`

[![Build Status](https://travis-ci.org/WapoZeusTechnology/zeus-technology.svg?branch=master)](https://travis-ci.org/WapoZeusTechnology/zeus-technology)

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

## Need Router Tie-In?

If you need a router tie-in, see `@zeus-technology/ad-rrd`, which interfaces well with `react-router-dom`.
