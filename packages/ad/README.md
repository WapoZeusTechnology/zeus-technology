# `@zeus-technology/ad`

[![Build Status](https://travis-ci.org/WapoZeusTechnology/zeus-technology.svg?branch=master)](https://travis-ci.org/WapoZeusTechnology/zeus-technology)

The purpose of the `ZeusAd` component is to embed a Zeus-managed advertisement into a React app.

**NOTE**: Any parts of this module which mention a "router," those have been tested with `react-router-dom`, and are peer dependencies. If you are not using the `ZeusAdWithRouter` component, you need not install this dependency.

If you need additional routers supported, please submit an issue.

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

If you're using `react-router-dom` and you would like to have your ads
refresh when your route changes, try this. With this module, your Zeus
ad slot can re-render (not refresh) with every change of the route.

The default behavior is that every change of the route will cause the
ad slot to re-render. Using the _Boolean control_, you can bind a state
variable to the component to prevent it from refreshing in certain state
conditions. Using the _function control_, you are able to have a function
which gives a finer degree of control over this behavior.

#### Boolean control

This control is achieved using the `changeOnNavigate` property.

```js
import React, { Fragment } from ‘react’;
import { ZeusAdWithRouter } from '@zeus-technology/ad';

const App = (props) => (
	<Router>
		<ZeusAdWithRouter changeOnNavigate={state.variable} slotId='ad-slot-name' />
	</Router>
)
```

The optional `changeOnNavigate` prop defaults to `true`.

#### Function control

This control is implemented by way of a function that you supply as the
`shouldChangeForRoute` prop. This function takes two arguments: the current location,
and the former location, as supplied by `react-router-dom`.

```js
import React, { Fragment } from ‘react’;
import { ZeusAdWithRouter } from '@zeus-technology/ad';

const App = (props) => (
	<Router>
		<ZeusAdWithRouter
			slotId='ad-slot-name'
			shouldChangeForRoute={(current,previous) => !current.search.match(/refresh=skip/)} />
	</Router>
)
```

In this example we're telling `ZeusAdWithRouter` only to change for routes which don't have
search queries matching `refresh=skip`.

### `ZeusRouteResponder`

This component allows you to hook in to your route to communicate key-value pairs to Zeus.
Just like `ZeusAdWithRouter`, you can use the `shouldChangeForRoute` prop to pass a function
which allows you to control whether or not this event shall fire.

This is useful for cases where you wish for key-value pairs to be supplemented with your
current "page" in a single-page application. By using this component within a route, you
can notify Zeus that you have new key-value pairs.

```js
import React, { Fragment } from ‘react’;
import { ZeusRouteResponder } from '@zeus-technology/ad';

const App = (props) => (
	<Router>
		<ZeusAdWithRouter
			shouldChangeForRoute={(current,previous) => !current.search.match(/refresh=skip/)}
			keyValuePairs={state.pageKvps} />
	</Router>
)
```

You may also use this component without the optional `keyValuePairs` property if you
already have all of your key-value pairs configured within your hosted Zeus library.

## See Also

- [Documentation for react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
