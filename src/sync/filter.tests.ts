import test from "ava";
import filter from "./filter.js";
import toArray from "./toArray.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./--iterator.js";

test("filter basic functionality", (t) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    t.deepEqual(
        toArray(filter(data, (x) => x % 3 === 0)),
        [3, 6, 9],
    );
});

test("filter receives correct arguments", (t) => {
    const data = [4, 3, 2, 1];

    t.deepEqual(
        toArray(filter(data, (_, idx) => idx % 2 === 0)),
        [4, 2],
    );

    toArray(filter(data, (_, __, ...rest) => t.deepEqual(rest, [])));
});

test("filter iterator closing", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(filter(data, (x) => x % 2 === 0));

    seq.next();
    seq.return!();
    t.is(data.closed, 1);
});

test("filter iterator closing on predicate error", (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(filter(data, () => {
        throw new Error("Error");
    }));

    t.throws(() => seq.next());
    t.is(data.closed, 1);
});
