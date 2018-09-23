import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function __findLast(iterable, predicate, hasDefault, defaultValue) {
    let found = false
    let foundItem
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            found = true
            foundItem = item
        }
    }
    if (found) {
        return foundItem
    } else if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[findLast] No item found with no default provided`)
    }
}

function _findLast(iterable, ...args) {
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    return __findLast(iterable, predicate, hasDefault, defaultValue)
}

function findLast(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[findLast] Unexpected additional arguments to find`)
    }
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        : args.length === 2 ?
            [true, ...args]
        :
            unexpectedArgs()
    assert.function(predicate, `[findLast] Expected find predicate to be a function`)
    return __findLast(iterable, predicate, hasDefault, defaultValue)
}

export default create(findLast)
export { _findLast as raw }
