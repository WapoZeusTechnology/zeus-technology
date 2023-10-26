# DEPRECATED: zeus-technology

_**This repository and it's packages are no longer maintained and supported.**_

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

After updating the version and merging the PR, create a new release in Github and add a changelog for this new version. Once the release is published a GitHub action will run automatically that will release the changes to npm on the new version. See: https://github.com/WapoZeusTechnology/zeus-technology/actions/workflows/release.yml


## Troubleshooting

When in doubt, try these:

- Run `lerna run clean; lerna clean; lerna changed`
- Delete `node_modules` and re-install
