# Change Log
## [3.0.1] - 7/20/2025
- Fix middleware that needs context, small tradeoff is that app middleware can't be used as catch-alls

## [3.0.0] - 11/23/2024
- Express 5

## [2.0.0] - 8/3/2024
- Remove waterline as default db adapter
- Package bumps

## [1.10.10] - 3/2/2024
- Another error fix

## [1.10.9] - 3/2/2024
- And fix how validation errors are handled

## [1.10.8] - 3/2/2024
- More error options pt 2

## [1.10.7] - 3/2/2024
- More error options

## [1.10.6] - 2/4/2024
- Close the knex connection after running migrations in migration helper

## [1.10.5] - 2/3/2024
- Small migrate helper option to pass config through without parsing

## [1.10.4] - 11/29/2023
- Expose express asset config

## [1.10.3] - 10/28/2023
- Version bumps

## [1.10.2] - 9/3/2023
- Enable setting dev logger explicitly

## [1.10.0] - 8/11/2023
- Expose express app through context
- Dependency bumps

## [1.9.2] - 7/11/2023
- Fix action wrapper/express param management
 
## [1.9.1] - 7/9/2023
- Fix redis instrumentation with upgrade

## [1.9.0] - 7/9/2023
- Enable error handlers as middleware by respecting error if exists in function definition

## [1.8.4] - 3/5/2023
- Pass helmet options through to enable custom config

## [1.8.3] - 1/1/2023
- Cleaner default error reporter logging

- ## [1.8.2] - 12/31/2022
- Fix nexi error constructor

## [1.8.1] - 12/31/2022
- Clean up api error handling and response schema

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
