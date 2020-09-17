# `@zeus-technology/ad-rrd`

[![Build Status](https://travis-ci.org/WapoZeusTechnology/zeus-technology.svg?branch=main)](https://travis-ci.org/WapoZeusTechnology/zeus-technology)

The purpose of the `ZeusAd` component is to embed a Zeus-managed advertisement into a React app.

**NOTE**: This module requires `react-router-dom`. If you do not wish to use this module, please see the `@zeus-technology/ad` module.

If you need additional routers supported, please submit an issue.

## Usage

### `ZeusAd`

If all you need is this component, do not use this module, and instead use `@zeus-technology/ad`.

```js
import React, { Fragment } from ‘react’;
import { ZeusAd } from '@zeus-technology/ad';

const App = (props) => (
  <Fragment>
    <ZeusAd slotId='ad-slot-name' allowPersonalization={true} style={{display:visible?'':'none'}} />
  </Fragment>
)
```

The `allowPersonalization` prop indicates whether or not personalization of ad slots is appropriate. The default value is `true`.

### `ZeusAdWithRouter`

If you're using `react-router-dom` and you would like to have your ads
refresh when your route changes, try this. With this module, your Zeus
ad slot can re-render (not refresh) with every change of the route.

_NOTE_: You must have a `ZeusRouteResponder` component inside of your
`Router` in order to use `ZeusAdWithRouter`. It is recommended that you
add this as the first child passed to the `Router` instance.

```js
<MemoryRouter>
  <ZeusRouteResponder />
  {/* ... */}
</MemoryRouter>
```

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
    <ZeusRouteResponder />
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
    <ZeusRouteResponder />
    <ZeusAdWithRouter
      slotId='ad-slot-name'
      debug={true}
      shouldChangeForRoute={(current,previous) => !current.search.match(/refresh=skip/)} />
  </Router>
)
```

In this example we're telling `ZeusAdWithRouter` only to change for routes which don't have
search queries matching `refresh=skip`.

There is an optional `debug` prop that causes the `ZeusAdWithRouter` component to output
debug information.

### `ZeusRouteResponder`

The `ZeusRouteResponder` component should be placed inside of your `Router` (`MemoryRouter`,
`HashRouter`, `BrowserRouter`), but _not_ inside of a route. It is recommended that you make
this the first line after you open your Router. This component works with `ZeusAdWithRouter` to
provide route-based metadata.

This component also allows you to hook in to your route to communicate key-value pairs to Zeus.
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
    <ZeusRouteResponder />
    <ZeusAdWithRouter
      shouldChangeForRoute={(current,previous) => !current.search.match(/refresh=skip/)}
      keyValuePairs={state.pageKvps} />
  </Router>
)
```

You may also use this component without the optional `keyValuePairs` property if you
already have all of your key-value pairs configured within your hosted Zeus library.

## Troubleshooting

The most common problem you may see is that of too many concurrent or repeat bids on the same screen. This is usually caused by the following:

- Use of `React.Component.forceUpdate()` - This circumvents our ability to reduce reloads.
- Use of higher-order components which trigger re-renders with asynchronous updates.
- It seems like React Transitions and CSS Transitions can cause some of these issues. If you encounter issues, try disabling these modules.

## See Also

- [Documentation for react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
