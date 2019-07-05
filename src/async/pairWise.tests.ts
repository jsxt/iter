import test from "ava"
import pairWise from "../../async/pairWise.js"
import toArray from "../../async/toArray.js"

test("pairWise basic functionality", async t => {
    const data = [1, 2, 3, 4, 5, 6, 7]

    t.deepEqual(
        await toArray(pairWise(data)),
        [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    )

    const data2 = [1, 2]

    t.deepEqual(await toArray(pairWise(data2)), [[1, 2]])
})

test("pairWise throws error on arrays of insufficient length", async t => {
    const data = [1]

    await t.throwsAsync(_ => toArray(pairWise(data)))

    const data2 = []

    await t.throwsAsync(_ => toArray(pairWise(data2)))
})

test("pairWise doesn't throw error on array of insufficient length if allowShorter is true", async t => {
    const data = [1]

    t.deepEqual([], await toArray(pairWise(data, true)))

    const data2 = []

    t.deepEqual([], await toArray(pairWise(data2, true)))
})

test("pairWise throws early on invalid arguments", t => {
    t.throws(_ => pairWise())
    t.throws(_ => pairWise([], 'foo'))
    t.throws(_ => pairWise(null))
})

import CountClosing from "./helpers/CountClosing.js"

test("pairWise iterator closing", async t => {
    const data = CountClosing([1, 2, 3, 4])
    const pairs = pairWise(data)[Symbol.asyncIterator]()

    await pairs.next()
    await pairs.return()
    t.is(data.closed, 1)
})
