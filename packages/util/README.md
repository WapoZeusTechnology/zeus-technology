# `@zeus/util`

This module contains utility functions used by the Zeus Platform.

## Usage

### `zeusNotice()`

This function performs a `console.info()` with whatever your message is, but it sticks it inside obvious visual separation. It is intended to be called the same as `console.log()`, and wraps around that interface.

```
const { zeusNotice } = require('@zeus/util');

zeusNotice("Some message here.");
```
