# Change Log

## [1.3.0] - 6/5/2021
- Add concept of "includes" file (./config/includes.js) that, if exists, is called before the app boots.  Provides support
for things like instrumentation libraries that need to be required before anything else.

## [1.2.4] - 5/13/2021
- Fix error reporter's require path to use src root

## [1.2.3] - 5/13/2021
- Temporarily fully disable helmet's contentSecurityPolicy

## [1.2.2] - 5/13/2021
- add port to migrate config, package bumps

## [1.2.1] - 2/15/2021
- Disable helmet's contentSecurityPolicy locally to avoid wonky browser behavior

## [1.2.0] - 2/6/2021
- Cleaner boot file & handling
- Extended waterline configuration

## [1.1.1] - 2/6/2021
- Bug fix - Fix router exports

## [1.1.0] - 1/31/2021
- Large router extension to support middleware scoped to a path and middleware blocks

## [1.0.3] - 1/26/2021
- Fix initializer directory when app overrides rootDir
- Bump dependencies

## [1.0.2] - 7/4/2020
- Fix initializer directory when app overrides rootDir
- Bump dependencies

## [1.0.1] - 6/21/2020
- Look for initializers in the correct directory (config)
- Fix migrations run from globally installed package

## [1.0.0] - 6/21/2020
- Nexi 1.0!  Initial features and conventions ironed out.
