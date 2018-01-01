import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function __findIndex(iterable, predicate, hasDefault, defaultValue) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return idx
        }
    }
    if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[findIndex] No item found with no default index provided`)
    }
}

function _findIndex(iterable, ...args) {
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    /* eslint-enable indent */
    return __findIndex(iterable, predicate, hasDefault, defaultValue)
}

function findIndex(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[findIndex] Unexpected additional arguments to findIndex`)
    }
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        : args.length === 2 ?
            [true, ...args]
        :
            unexpectedArgs()
    /* eslint-enable indent */
    assert.function(predicate, `[findIndex] Expected findIndex predicate to be a function`)
    return __findIndex(iterable, predicate, hasDefault, defaultValue)
}

export default create(findIndex)
export { _findIndex as raw }