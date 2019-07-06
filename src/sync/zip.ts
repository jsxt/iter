import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends Iterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> };

const zip = iterableGenerator(
    function* zip<Iterables extends Array<Iterable<any>> | [Iterable<any>]>(
        iterables: Iterables,
    ): Generator<ZipUnwrapped<Iterables>, void> {
        const iteratorsDone = new Set();
        const iterators: Array<Generator<any, void>> = [];
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable));
            }

            while (true) {
                const nexts = iterators.map((iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: undefined };
                    }
                    const result = iterator.next();
                    const { done } = result;
                    if (done) {
                        iteratorsDone.add(iterator);
                    }
                    return { done, value: result.value };
                });
                if (nexts.some(({ done }) => done)) {
                    return;
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>;
            }
        } finally {
            for (const iterator of iterators) {
                try {
                    iterator.return();
                } catch (error) {
                    /* Ensure all iterators close */
                }
            }
        }
    },
);

export { zip as default };
