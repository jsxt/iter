type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;
import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

const reverse = iterableGenerator(
    async function* reverse<T>(iterable: AsyncOrSyncIterable<T>) {
        const arr = await toArray(iterable);
        yield* arr.reverse();
    },
);

export { reverse as default };
