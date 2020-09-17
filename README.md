# zeus-technology

[![Build Status](https://travis-ci.org/WapoZeusTechnology/zeus-technology.svg?branch=main)](https://travis-ci.org/WapoZeusTechnology/zeus-technology)

React components for Zeus Technology.

## Building and publishing

**Note:** Be sure to use the version of lerna installed by the package. Do not use a globally installed version of lerna.

To build:

```sh
lerna run clean
lerna run build
```

To test:

```sh
lerna run test
```

To version:

- Update your `CHANGELOG.md` first
- Commit your version change in the PR before attempting to publish

```sh
# Prerelease versions
lerna version prerelease

# Patch versions
lerna version patch

# Minor versions
lerna version minor

# Major versions
lerna version major
```

To publish:

```sh
# To redo the same version (in the event of a failed publish)
lerna publish from-package
```

## Troubleshooting

When in doubt, try these:

- Run `lerna run clean; lerna clean; lerna changed`
- Delete `node_modules` and re-install
