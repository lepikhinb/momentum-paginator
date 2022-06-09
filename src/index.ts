type Link = {
    url: string | undefined,
    label: string,
    active: boolean
}

type Item = {
    url: string | undefined,
    label: string,
    isPage: boolean,
    isActive: boolean,
    isPrevious: boolean,
    isNext: boolean,
    isCurrent: boolean,
    isSeparator: boolean
}

type PaginatorMeta = {
    current_page: number,
    first_page_url: string
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string | undefined,
    path: string,
    per_page: number,
    prev_page_url: string | undefined,
    to: number,
    total: number,
    links?: Link[]
}

type PaginatorData = {
    meta?: PaginatorMeta,
    links?: Link[]
} & PaginatorMeta

export const usePaginator = (data: PaginatorData) => {
    const meta = data.meta ?? data
    const links = meta.links ?? data.links!

    const items = links.map((link, index) => {
        return {
            url: link.url,
            label: link.label,
            isPage: !isNaN(+link.label),
            isPrevious: index === 0,
            isNext: index === links.length - 1,
            isCurrent: link.active,
            isSeparator: link.label == '...',
            isActive: !!link.url && !link.active,
        }
    }) as Item[]

    const pages: Item[] = items.filter(item => item.isPage || item.isSeparator)
    const current = items.find(item => item.isCurrent)
    const previous = items.find(item => item.isPrevious)!
    const next = items.find(item => item.isNext)!
    const first = { ...items[1], isActive: items[1].url !== current?.url, label: '&laquo;' }
    const last = { ...items[items.length - 1], isActive: items[items.length - 1].url !== current?.url, label: '&raquo;' }
    const from = meta.from
    const to = meta.to
    const total = meta.total

    return { pages, items, previous, next, first, last, total, from, to }
}