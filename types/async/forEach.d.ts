import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function forEach<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        iteratee?: (item: T, index: number) => void | Promise<void>,
    ): Promise<void>