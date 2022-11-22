export interface Paginator<T> {
  data: T[];
  meta?: PaginatorMeta;
  links?: PaginatorLink[];
}

interface PaginatorLink {
  url: string | null | undefined;
  label: string;
  active: boolean;
}

interface PaginatorItem {
  url: string | null | undefined;
  label: string;
  isPage: boolean;
  isActive: boolean;
  isPrevious: boolean;
  isNext: boolean;
  isCurrent: boolean;
  isSeparator: boolean;
}

interface PaginatorMeta {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null | undefined;
  path: string;
  per_page: number;
  prev_page_url: string | null | undefined;
  to: number | null;
  total: number;
  links?: PaginatorLink[];
}

export const usePaginator = <T>(data: Paginator<T> | PaginatorMeta) => {
  const meta = (data as Paginator<T>).meta ?? (data as PaginatorMeta);

  const links = (meta.links ?? data.links!).map((link) => {
    return {
      ...link,
      url: link.url ? decodeURIComponent(link.url!) : null,
    };
  });

  const items = links.map((link, index) => {
    return {
      url: link.url,
      label: link.label,
      isPage: !isNaN(+link.label),
      isPrevious: index === 0,
      isNext: index === links.length - 1,
      isCurrent: link.active,
      isSeparator: link.label == "...",
      isActive: !!link.url && !link.active,
    };
  }) as PaginatorItem[];

  const pages: PaginatorItem[] = items.filter(
    (item) => item.isPage || item.isSeparator
  );

  const current = items.find((item) => item.isCurrent);
  const previous = items.find((item) => item.isPrevious)!;
  const next = items.find((item) => item.isNext)!;

  const first = {
    ...items[1],
    isActive: items[1].url !== current?.url,
    label: "&laquo;",
  };

  const last = {
    ...items[items.length - 1],
    isActive: items[items.length - 1].url !== current?.url,
    label: "&raquo;",
  };

  const from = meta.from;
  const to = meta.to;
  const total = meta.total;

  return { pages, items, previous, next, first, last, total, from, to };
};
