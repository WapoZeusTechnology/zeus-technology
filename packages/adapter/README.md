# `@zeus-technology/adapter`

## Custom Integrations with Zeus

The Zeus platform is a first-of-its-kind AdTech implementation where viewable ads are prioritized. While Zeus itself integrates with a number of SSPs out-of-the-box, it may become necessary for some publishers to construct custom integrations with SSPs or other third parties which do not have Zeus support. This document is intended to outline a simple path toward integrating with third party systems that are not presently supported by Zeus.

_Note:_ Any integrations depending on Zeus facilities not documented here are potentially unsupported. In order to minimize breaking changes over time, please limit your integrations to only documented interfaces.

## `ZeusAdapter`

The `ZeusAdapter` is the publicly-available programming facility for integrations with Zeus. This library is available on NPM, and uses a standard JavaScript event emitter to interface with the hosted Zeus library provided to you. Using NPM, you can incorporate the `ZeusAdapter` library into your code. If you are not using NPM for your project, you can obtain a copy from your integration specialist or the Zeus support team.

The `ZeusAdapter` operates by collecting hooks for specific lifecycle events, and then connecting with the Zeus event cycle. While each function has its own purpose and signature, they all conform to the same basic contract.

- Each function must accept as its first argument an instance of the `ZeusAdapter` to which it responded.
- You may call methods on the `ZeusAdapter` instance, but you may not modify any internals.
- Each function must return a `Promise`, and that `Promise` must resolve when it has finished its work.
- The value resolved by the `Promise` is ignored unless otherwise specified by the documentation for the specific hook.
- After the `onInitialization()` hook has fired, other hooks may be called in _Lifecycle Order_ for a specific ad slot or set of ad slots.

### Hooks

#### `onInitialization(adapter: ZeusAdapter): Promise<any>`

This hook is called after Zeus is connected and has initialized. Before this hook is called, you are not yet guaranteed to have a functioning Zeus setup in memory.

When returning from this function, be sure to return a promise which you resolve. If you do not, it will likely result in race conditions within either your integration, or Zeus itself.

```js
const onInitialization = adapter =>
  Promise.resolve().then(() => customSSP.init());
```

#### `onZeusAdRegistered(adapter: ZeusAdapter, zeusAdId: string): Promise<any>`

This hook is fired after the Zeus hosted library has successfully created and registered an ad slot. Some third-party integrations require that ad slots be registered with their API in memory at runtime prior to bidding. This hook is here to facilitate that functionality. This hook will only be called once for each `<zeus-ad />` element when a given ad slot is added to the DOM, but if that ad slot is removed and added a second time then this hook will be called a second time.

If the adapter is connected after Zeus has loaded and ad slots registered, then this hook will be fired immediately after onInitialization for all ad slots already connected to Zeus.

_Caution:_ Zeus will manage slots in GAM itself. Creating duplicate slots in GAM will likely result in undesired behavior. Creating slots in GAM using this hook is _strongly_ discouraged.

This function should return a `Promise` which resolves when it has finished. Please note that this hook is not guaranteed to block the bidding process, so a quick response will be important.

_Note:_ If you are using ReactJS, and informing a third party of the ad slot creation is important, consider using ReactJS lifecycle hooks and not this library to perform that notification. There is no guaranteed relationship between the execution time on this function and that of ReactJS components.

#### `onBiddingStart(adapter: ZeusAdapter, slots: Array<string>): Promise<any>`

This hook is fired immediately after bidding has _started_. When bidding starts, this hook will be fired, and if this hook wishes to contribute to the bidding outcomes then it must complete within the timeout period (configured within the Zeus configuration) in order to be counted.

This hook accepts an instance of the `ZeusAdapter` as its first argument, and an array of strings containing slot names for which bidding is taking place as the second. The return value of this function must be a `Promise`, which should be resolved once the function has completed.

The `ZeusAdapter` will automatically signal to Zeus when this hook either succeeds or throws an error, there is no need to add special handling for that. Simply `resolve()` or `reject()` the `Promise` as appropriate, and the `ZeusAdapter` will take it from there. Please note that the `resolve()` value is ignored, but when `reject()`ing, you may optionally supply an `Error` instance if error reporting within Zeus is desired.

_Note on Bidding Results:_ The `ZeusAdapter` cannot see the internals of the bids going through this hook. It is imperative that any third party library performing bids interfaces directly with the Google Publisher Tag library’s methods used to attach bid responses to ad requests. Most third parties support this out-of-the-box, please consult the third party in question if this is not known.

_Note on Bidding Timeouts:_ If the timeout expires prior to this hook completing, Zeus will stop waiting and render the ad without waiting for this hook to finish. It is imperative that this function be as quick as possible so the bids are considered at render time.

_Note on Ad Refreshes:_ If ad slots are subject to refresh, this hook will be called for the first render, as well as every refresh after that.

### Methods

#### `ZeusAdapter.connect(void): Promise<any>`

This method must be called in order to connect the `ZeusAdapter` instance to Zeus itself, and to start the event cycle.

This method takes no arguments, and returns a `Promise` which is resolved when the connection is complete.

## Lifecycle Order

### Global Hooks

- `onInitialization()` - This will always be the first hook fired following `ZeusAdapter.prototype.connect()`. If for some reason this hook isn’t firing, there is a good chance that either the instance of Zeus is not configured for customization, or there is a JavaScript error somewhere.

### Ad Slot Hooks

- `onZeusAdRegistered()` - This event is fired immediately after the `<zeus-ad />` tag is created in the DOM. _Note:_ this may fire before any ReactJS components have finished. If you're using ReactJS consider using the ReactJS components, instead of this hook, to register the events.
- `onBiddingStart()` - This event is fired when the bidding cycle has begun. It will always be given a list of ad slot IDs which have previously been passed to `onZeusAdRegistered()`.

## Example

### SSP Integration

This example details how one could use the `ZeusAdapter` for integrating a custom SSP. This also shows how you can use the adapter with the npm module and importing it into your own build process.

```sh
yarn add @zeus-technology/adapter
```

```js
import { ZeusAdapter } from "@zeus-technology/adapter";

/**
 * Boilerplate code from the vendor would go here.
 **/
window.fooSsp = {
  createSlot: name => window.__vendorApi.createSlot(name)
};

/**
 * Below is where you will connect your handlers to the Zeus adapter
 **/

// On initialize, load the script provided by the SSP
const onInitialize = adapter =>
  Promise.resolve().then(() => window.fooSsp.setPublisherId("1234"));

// This hook lets us know that a `ZeusAd` element was created.
const onZeusAdRegistered = (adapter, zeusAdId) =>
  Promise.resolve().then(() => window.fooSsp.createSlot(zeusAdId));

// This hook ties in to the bidding process.
const onBiddingStart = (adapter, slotsToBidFor) =>
  Promise.resolve()
    .then(() => doCustomBidding(slotsToBidFor))
    .catch(err => Promise.reject(err));

const adapter = new ZeusAdapter({
  onInitialize,
  onZeusAdRegistered,
  onBiddingStart
});

// This establishes the connection with Zeus.
adapter.connect();
```

### Analytics Integration

Sometimes it may become necessary to collect analytics about specific ad slots within Zeus. In order to do this, the following approach may be helpful.

```js
import {ZeusAdapter} from '@zeus-technology/adapter';
import {metrics} from './my-super-cool-metrics-lib';

// You would use the same hooks as when integrating with an SSP
const onInitialize => adapter => Promise.resolve()
  .then(() => metrics.log("Zeus Initialized."))

const onZeusAdRegistered = (adapter, zeusAdId) => Promise.resolve()
  .then(() => metrics.log(`Ad slot created: ${zeusAdId}`))

const onBiddingStart = (adapter, slots) => Promise.resolve()
  .then(() => metrics.log(`Slots up for bidding: ${slots.join(', ')}`))

// Just like with an SSP, you would then create the ZeusAdapter
// instance, and then connect it.
const adapter = new ZeusAdapter({
  onInitialize, onZeusAdRegistered, onBiddingStart
});
adapter.connect();
```

### Direct browser script integration

You can also use the adapter in script tags by loading `zeus-adapter.js` and getting the `ZeusAdapter`
from the window object `window.ZeusAdapter.ZeusAdapter`:

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
  function onBiddingStart(adapter, slotsToBidFor) {
    return Promise.resolve()
      .then(() => doCustomBidding(slotsToBidFor))
      .catch(err => Promise.reject(err));
  }

  const adapter = new window.ZeusAdapter.ZeusAdapter({
    onInitialize: onInitialize,
    onZeusAdRegistered: onZeusAdRegistered,
    onBiddingStart: onBiddingStart
  });

  // This establishes the connection with Zeus.
  adapter.connect();
</script>
```
