# zeus-react-public
Public-facing React components

## Principles

- We publish built code so that people don't have to fight with dependencies, or build pipeline differences.
- Our tests run against un-built code so that we don't die trying to troubleshoot tests against minified code.
- We manually publish versions to prevent Jenkins from breaking the world.

**KEEP IN MIND THAT THIS MODULE IS PUBLISHED PUBLICLY ON NPMJS! NO KEYS! NO SECRET SAUCE!**

## Building and publishing

To build:

```sh
lerna run build
```

To test:

```sh
lerna run test
```

To deploy

```sh
# Prerelease versions
lerna publish prerelease

# To redo the same version (in the event of a failed publish)
lerna publish from-package

# Patch versions
lerna publish patch

# Minor versions
lerna publish minor

# Major versions
lerna publish major
```

## Troubleshooting

When in doubt, try these:

- Run `lerna run clean; lerna clean; lerna changed`
- Delete `node_modules` and re-install
