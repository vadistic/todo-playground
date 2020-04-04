# todo

> Testing stacks with todo apps. Inspired by [realworld](https://github.com/gothinkster/realworld) & [todomvc](https://github.com/tastejs/todomvc)

## Goal

I'm writing plethora of TODO apps with quite random stacks. The mian idea is to refresh stuff & check out stacks I would not normally use.

## Subprojects

- **db-\***
  - [db-mongoose]('./packages/db-mongoose/README.md')
  - [db-prisma]('./packages/db-mongoose/README.md')
  - [db-typeorm]('./packages/db-mongoose/README.md')
- **api-\***
  - graphql
    - [api-apollo-graphql]('./packages/api-apollo-graphql/README.md')
    - [api-nexus-graphql]('./packages/api-nest-rest/README.md')
  - rest
    - [api-nest-rest]('./packages/api-nest-rest/README.md')
- **ui-\***
- **shared-\*** - reusable styles/interfaces/tests
  - [shared-db]('./packages/shared-db/README.md')
  - [shared-styles]('./packages/shared-styles/README.md')
- **lang-\*** attempts to use non-js stacks (handling my FOMO)
  - [lang-rust]('./packages/lang-rest/README.md') [TODO]
  - [lang-go]('./packages/lang-go/README.md') [TODO]
  - [lang-csharp]('./packages/lang-csharp/README.md') [In Progress]
  - [lang-elixir]('./packages/lang-elixir/README.md') [In Progress]
  - [lang-python]('./packages/lang-python/README.md') [TODO]

## Common stack

Randomising everything would be simply to much...

- typescript
- eslint
- lerna
- jest

## Build

- shell scripts may (or may not?) be written for linux
- non-sqlite database modules need those databases avalible
- lang-\* packages need those languages installed and configured

## References

Inspired by [realworld](https://github.com/gothinkster/realworld) & [todomvc](https://github.com/tastejs/todomvc)
