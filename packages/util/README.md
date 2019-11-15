# `@zeus/util`

This module contains utility functions used by the Zeus Platform.

## Usage

### `zeusNotice()`

This function performs a `console.info()` with whatever your message is, but it sticks it inside obvious visual separation. It is intended to be called the same as `console.log()`, and wraps around that interface.

```
const { zeusNotice } = require('@zeus/util');

zeusNotice("Some message here.");
```

### `forceRefresh()`

This function allows you to force a refresh on one or more ad slots. It takes a single parameter, which can either be a `zeus-ad` id, or an array of `zeus-ad` ids.

```
const { forceRefresh } = require('@zeus/util');

# Force refresh a single ad
forceRefresh("top_right")

# Force refresh a specific list of ads
forceRefresh(["top_right", "bottom", "inline"])

# force refresh all zeus ads on the page
const ads = [...document.getElementsByClassName("zeus-ad")].map(node => node.id)
forceRefresh(ads)

```

### `forceRebuildAndRefresh()`

This function allows you to force a rebuild of your ad slot and refresh one or more ads. It takes a single parameter, which can either be a `zeus-ad` id, or an array of `zeus-ad` ids.

This function is useful when you have a Single Page Application and you want to rebuild your ad slots when you navigate to a new page, but do not re-render your DOM tree.

```
const { forceRebuildAndRefresh } = require('@zeus/util');

# Force rebuild a single ad
forceRebuildAndRefresh("top_right")

# Force rebuild a specific list of ads
forceRebuildAndRefresh(["top_right", "bottom", "inline"])

# force rebuild all zeus ads on the page
const ads = [...document.getElementsByClassName("zeus-ad")].map(node => node.id)
forceRebuildAndRefresh(ads)

```
