# Change Log

## [1.7.3] - 12/31/2022
- Better session configuration

## [1.7.2] - 12/29/2022
- Shuffle migration wrapper

## [1.7.1] - 12/29/2022
- Expose knex migrate migration wrapper

## [1.7.0] - 12/17/2022
- Enable migration client for package & database flexibility (no longer bound to mysql)
- Package bumps

## [1.6.6] - 9/28/2022
- Default to memory store for session if redis is not set

## [1.6.5] - 8/27/2022
- Package bumps

## [1.6.4] - 6/26/2022
- Add dns resolver fix to cli entrypoint

- ## [1.6.3] - 6/26/2022
- Dependency version bumps

## [1.6.2] - 6/25/2022
- Set default dns result order to ipv4 first for node 18+ support

## [1.6.1] - 6/25/2022
- Decorate redis v4 correctly

- ## [1.6.0] - 6/9/2022
- Enable other database adapters

## [1.5.3] - 6/1/2022
- Fix bug decorating async decorators 

## [1.5.2] - 5/12/2022
- Better error message for undefined controller action

## [1.5.1] - 4/16/2022
- Fix broken handlebars init caused by version bump 

## [1.5.0] - 3/19/2022
- Add cli support to inject context into node repl

## [1.4.0] - 3/19/2022
- Library bumps and corresponding code changes

## [1.3.1] - 11/28/2021
- Fix bodyparser lack of configurability 

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
