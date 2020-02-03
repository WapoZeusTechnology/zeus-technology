# `@zeus-technology/adapter`

This module provides an API for custom hooks into the Zeus library.

**NOTE:** This module is intended to be run from within _your_ code and/or _your_ hosting environment. There is no CDN which hosts this module. _Please_ test your code with every update.

## Usage

### For ES6 with Webpack

```js
import { ZeusAdapter } from "@zeus-technology/adapter";

/**
 * Below is where you will connect your handlers to the Zeus adapter
 **/

const onInitialize = adapter =>
  Promise.resolve().then(() =>
    // custom SSP initilization code
    window.fooSsp.setPublisherId("1234")
  );

// This hook lets us know that a `ZeusAd` element was created.
const onZeusAdRegistered = (adapter, zeusAdId) =>
  Promise.resolve().then(() => window.fooSsp.createSlot(zeusAdId));

// This hook ties in to the bidding process.
const onBidStart = (adapter, slotsToBidFor) =>
  Promise.resolve()
    .then(() => doCustomBidding(slotsToBidFor))
    .catch(err => Promise.reject(err));

const adapter = new ZeusAdapter({
  onInitialize,
  onZeusAdRegistered,
  onBidStart
});

// This establishes the connection with Zeus.
adapter.connect();
```

### For browsers with `<script>` tags.

```html
<script src="/dist/zeus-adapter.js" type="application/javascript"></script>
<script type="application/javascript">
  /**
   * Below is where you will connect your handlers to the Zeus adapter
   **/
  function onInitialize(adapter) {
    return Promise.resolve().then(() =>
      // custom SSP initilization code
      window.fooSsp.setPublisherId("1234")
    );
  }

  // This hook lets us know that a `ZeusAd` element was created.
  function onZeusAdRegistered(adapter, zeusAdId) {
    return Promise.resolve().then(() => window.fooSsp.createSlot(zeusAdId));
  }

  // This hook ties in to the bidding process.
  function onBidStart(adapter, slotsToBidFor) {
    return Promise.resolve()
      .then(() => doCustomBidding(slotsToBidFor))
      .catch(err => Promise.reject(err));
  }

  const adapter = new window.ZeusAdapter.ZeusAdapter({
    onInitialize: onInitialize,
    onZeusAdRegistered: onZeusAdRegistered,
    onBidStart: onBidStart
  });

  // This establishes the connection with Zeus.
  adapter.connect();
</script>
```
