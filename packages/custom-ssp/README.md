# `custom-ssp`

This module provides cust

**NOTE:** This module is intended to be run from within _your_ code and/or _your_ hosting environment. There is no CDN which hosts this module. _Please_ test your code with every update.

## Usage

### For ES6 with Webpack

```js
import { ZeusAdapter, ZeusSlot, ZeusBid } from '@zeus-technology/custom-ssp';

const adaptor = new ZeusAdaptor({
	zeus:window.zeus,
	load: () => ZeusAdaptor.waitForObject("someSsp", timeoutValue),
	init: () => Promise.resolve().then(() => someSsp.init({publisherId:"ABC123"})),
	startBidding: (zeusSlots) => Promise.resolve().then(
		() => someSsp.startBidding(
			zeusSlots.map(slot=>({
				slotId:slot.id, sizes:slot.sizes
			})), (responses) => {
				
			}
		))
	refreshEvent: () => new Promise(),
})
```

### For ES5 with `<script>` tags.

TODO: COMING SOON!