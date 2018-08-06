import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function map<In, Out>(
        asyncIterable: AsyncOrSyncIterable<In>,
        mapper?: (item: In, index: number) => Out | Promise<Out>,
    ): AsyncIterable<Out>