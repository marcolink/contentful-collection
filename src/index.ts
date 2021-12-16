type CollectionProp<ItemType> = {
    total: number,
    items: ItemType[]
}

type CollectionQuery = {
    skip?: number,
    limit?: number
}

type CollectionFuncResponse<TItem> = Promise<CollectionProp<TItem>>;

type CollectionFunc<TItem> = (query: CollectionQuery) => CollectionFuncResponse<TItem>;

export default async function getContentfulCollection<TItem>(
    endpoint: CollectionFunc<TItem>,
    query?: CollectionQuery & Record<string, any>,
): Promise<Array<TItem>> {
    const getResult: (currentSkip: number) => Promise<any[] | TItem[]> = async (currentSkip: number) => {
        const result = await endpoint({...query, skip: currentSkip});
        const length = currentSkip + result.items.length;
        if (result.total > length) {
            return [...result.items, ...(await getResult(length))];
        } else {
            return result.items;
        }
    };
    return getResult(query?.skip || 0);
}
