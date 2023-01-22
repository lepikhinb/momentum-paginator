# Momentum Paginator

Momentum Paginator is a framework-agnostic headless wrapper around Laravel Pagination [meta data](https://laravel.com/docs/9.x/pagination#converting-results-to-json). It supports all basic pagination, Laravel Resources and third-party solutions, such as [laravel-data](https://spatie.be/docs/laravel-data/v1/as-a-resource/from-data-to-resource).

The package helps you build reusable pagination components with a simple API.

## Installation

You can install the package via npm or yarn:

```bash
npm i momentum-paginator
# or
yarn add momentum-paginator
```

## Usage

Import the package, and init the paginator by passing paginated data you receive from backend.

```typescript
import { usePaginator } from "momentum-paginator";

const paginator = usePaginator(users);
// or
const { from, to, total, previous, next, pages } = usePaginator(users);
```

### Basic example

```vue
<template>
  <a v-for="page in items" :href="page.url">{{ page.label }}</a>
</template>
```

### Advanced example (Vue 3)

```vue
<script lang="ts" setup>
import { usePaginator } from "momentum-paginator";

const props = defineProps<{ users: Paginator<UserResource> }>();

const { from, to, total, previous, next, pages } = usePaginator(props.users);
</script>

<template>
  <div>
    <component
      :is="previous.isActive ? 'a' : 'span'"
      :href="previous.url"
      :class="{
        'text-gray-400 hover:text-gray-500': previous.isActive,
        'cursor-not-allowed text-gray-300': !previous.isActive,
      }"
    >
      &laquo;
    </component>

    <component
      v-for="page in pages"
      :is="page.isActive ? 'a' : 'span'"
      :href="page.url"
      :class="{
        'text-blue-600': page.isCurrent,
        'text-blue-400': page.isActive,
        'hover:text-blue-500': !page.isCurrent && page.isActive,
      }"
    >
      {{ page.label }}
    </component>

    <component
      :is="next.isActive ? 'a' : 'span'"
      :href="next.url"
      :class="{
        'text-gray-400 hover:text-gray-500': next.isActive,
        'cursor-not-allowed text-gray-300': !next.isActive,
      }"
    >
      &raquo;
    </component>
  </div>
</template>
```

## Types

### Properties

| name     | type   | description                                            |
| -------- | ------ | ------------------------------------------------------ |
| items    | Page[] | All page items, including `previous` and `next`        |
| pages    | Page[] | Reduced list of pages, excluding `previous` and `next` |
| previous | Page   | Previous page                                          |
| next     | Page   | Next page                                              |
| first    | Page   | First page                                             |
| last     | Page   | Last page                                              |
| total    | number | Total amount of results available                      |
| from     | number | Starting number of the current results                 |
| to       | number | Ending number of the current results                   |

### Page instance

| name        | type    | description                                                                       |
| ----------- | ------- | --------------------------------------------------------------------------------- |
| url         | string  | URL of the page                                                                   |
| label       | string  | Text label of the item (_page number, separator, previous and next page markers_) |
| isActive    | boolean | Indicates if the page is available for navigation                                 |
| isCurrent   | boolean | Indicates if the page is the current one.                                         |
| isSeparator | boolean | Indicates if the item is a separator                                              |

## Advanced Inertia

[<img src="https://advanced-inertia.com/og.png" width="420px" />](https://advanced-inertia.com)

Take your Inertia.js skills to the next level with my book [Advanced Inertia](https://advanced-inertia.com/).
Learn advanced concepts and make apps with Laravel and Inertia.js a breeze to build and maintain.

## Momentum

Momentum is a set of packages designed to improve your experience building Inertia-powered apps.

- [Modal](https://github.com/lepikhinb/momentum-modal) — Build dynamic modal dialogs for Inertia apps
- [Preflight](https://github.com/lepikhinb/momentum-preflight) — Realtime backend-driven validation for Inertia apps
- [Paginator](https://github.com/lepikhinb/momentum-paginator) — Headless wrapper around Laravel Pagination
- [Trail](https://github.com/lepikhinb/momentum-trail) — Frontend package to use Laravel routes with Inertia
- [Lock](https://github.com/lepikhinb/momentum-lock) — Frontend package to use Laravel permissions with Inertia
- [Layout](https://github.com/lepikhinb/momentum-layout) — Persistent layouts for Vue 3 apps
- [Vite Plugin Watch](https://github.com/lepikhinb/vite-plugin-watch) — Vite plugin to run shell commands on file changes

## Credits

- [Boris Lepikhin](https://twitter.com/lepikhinb)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
