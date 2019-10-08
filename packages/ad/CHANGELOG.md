# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.0 (2019-08-30)

**Note:** Version bump only for package @zeus-platform/ad

## [**1.0.8**] - 2019-09-10

### Changed

* Newly licensed under the MIT license
* New public repository

## [**1.0.9**] - 2019-09-23

### Added

* Support for navigation in single-page-applications so that by default the ad changes whenever the route changes. This only supports `react-router-dom` and compatible variants. Use the `ZeusAdWithRouter` component to take advantage of this.

## [**1.0.10**] - 2019-10-04

### Fixed

* Dependency issue with `react-router-dom` is now repaired.

### Changed

* Re-factored components to be more module and testable.

### Added

* Travis-CI support!

## [**1.0.10**] - 2019-10-08

### Added

* Support for disabling the `react-router-dom`-based ad slot refreshing.
* Support for screen-based granularity in key-value pairs.

### Fixed

* Issue where ad re-rendering was counting as a refresh.
