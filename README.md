# Momentum Paginator

Momentum Paginator is a framework-agnostic headless wrapper around Laravel Pagination [meta data](https://laravel.com/docs/9.x/pagination#converting-results-to-json). It supports all basic pagination, Laravel Resources and third-party solutions, such as [laravel-data](https://spatie.be/docs/laravel-data/v1/as-a-resource/from-data-to-resource).

The package helps you build reusable pagination components with a simple API.

## Advanced Inertia

[<img src="https://advanced-inertia.com/og5.png" width="420px" />](https://advanced-inertia.com)

Make Inertia-powered frontend a breeze to build and maintain with my upcoming book [Advanced Inertia](https://advanced-inertia.com/). Join the waitlist and get **20% off** when the book is out.

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

## Credits

- [Boris Lepikhin](https://twitter.com/lepikhinb)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
