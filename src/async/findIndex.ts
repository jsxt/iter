import enumerate from "./enumerate.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default function findIndex<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<number | undefined>;
export default function findIndex<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
): Promise<number | undefined>;
export default function findIndex<T, Default=number>(
    iterable: AsyncOrSyncIterable<T>,
    defaultValue: Default,
    predicate: ((value: T, index: number) => any),
): Promise<number | Default>;
export default async function findIndex<T>(
    iterable: AsyncOrSyncIterable<T>,
    ...options:
    []
    | [((value: T, index: number) => any)]
    | [number, ((value: T, index: number) => any)]
) {
    let predicate: (value: T, index: number) => any;
    let hasDefault: boolean = false;
    let defaultValue: number;

    if (options.length === 0) {
        predicate = (i) => i;
        hasDefault = false;
    } else if (options.length === 1) {
        predicate = options[0];
        hasDefault = false;
    } else {
        predicate = options[1];
        defaultValue = options[0];
        hasDefault = true;
    }

    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return idx;
        }
    }

    if (hasDefault) {
        return defaultValue!;
    }
    throw new Error(`[find] No item found with no default provided`);
}
