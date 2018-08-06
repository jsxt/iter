import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function takeUntil<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        stopWhen: () => (Promise<void> | void) | Promise<void> | void, 
    ): AsyncIterable<T>