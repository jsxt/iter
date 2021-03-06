import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

function subSequences<T>(
    iterable: Iterable<T>,
    size: 1,
    allowShorter?: false,
): Generator<[T], void>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 2,
    allowShorter?: false,
): Generator<[T, T], void>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 3,
    allowShorter?: false,
): Generator<[T, T, T], void>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 4,
    allowShorter?: false,
): Generator<[T, T, T, T], void>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: number,
    allowShorter?: boolean,
): Generator<Array<T>, void>;
function* subSequences<T>(
    iterable: Iterable<T>,
    subSequenceSize: number,
    allowShorter=false,
): Generator<Array<T>, void> {
    if (subSequenceSize < 1) {
        throw new RangeError(`[subSequences] subSequenceSize must be at least one`);
    }
    const iter = iterator(iterable);
    try {
        const buff: Array<T> = [];
        for (let i = 0; i < subSequenceSize; i += 1) {
            const res = iter.next();
            if (res.done) {
                if (allowShorter) {
                    return;
                }
                const message = `[subSequence] Can't get a subSequence of size ${ subSequenceSize } from a sequence of length ${ i }`;
                throw new Error(message);
            }
            buff.push(res.value);
        }

        for (const item of iter) {
            yield [...buff];
            buff.shift();
            buff.push(item);
        }
        yield [...buff];
    } finally {
        iter.return();
    }
}

type SubSequences = {
    <T>(
        iterable: Iterable<T>,
        size: 1,
        allowShorter?: false,
    ): Iterable<[T]>,
    <T>(
        iterable: Iterable<T>,
        size: 2,
        allowShorter?: false,
    ): Iterable<[T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: 3,
        allowShorter?: false,
    ): Iterable<[T, T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: 4,
        allowShorter?: false,
    ): Iterable<[T, T, T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: number,
        allowShorter?: boolean,
    ): Iterable<Array<T>>,
};

export default iterableGenerator(subSequences) as SubSequences;
