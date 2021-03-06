
export default function last<T>(
    iterable: Iterable<T>,
): T {
    let item: T;
    let itemSet = false;
    for (item of iterable) {
        itemSet = true;
    }
    if (itemSet) {
        return item!;
    }
    throw new Error(`[last] Can't get last item of empty sequence`);
}

