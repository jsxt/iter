import test from "ava";
import any from "./any.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "any without argument returns true if a value is truthy",
    (t) => {
        const values1 = [true, "cats", {}, 1];
        const values2 = [false, 0, "", undefined, null];
        const values3 = [false, 0, {}, "", undefined, null];

        t.true(any(values1));
        t.false(any(values2));
        t.true(any(values3));
    },
);

test(
    "any returns true if the predicate returns true for all of the values",
    (t) => {
        const values = [1, 3, 5, 7];

        t.true(any(values, (item) => item % 2 === 1));
        t.true(any(values, (item) => item < 5));
        t.false(any(values, (item) => item > 10));
    },
);

test(
    "any vacuously true",
    (t) => {
        const values: Array<number> =[];

        t.false(any(values));
        t.false(any(values, (item) => item % 2 === 0));
    },
);

test(
    "any iterator closing",
    (t) => {
        const iter1 = new CountClosing([1, 2, 3, 4]);

        t.true(any(iter1, (value) => value > 0));
        t.is(iter1.closed, 1);

        const iter2 = new CountClosing([1, 2, 3, 4]);

        t.false(any(iter1, (value) => value === 12));
        t.is(iter2.closed, 0);
    },
);
