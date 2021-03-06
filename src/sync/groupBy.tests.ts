import test from "ava";
import groupBy from "./groupBy.js";
import CountClosing from "./helpers/CountClosing.js";

test(
    "groupBy returns a map of arrays indexed by each key",
    (t) => {
        const data = [1, 2, 3, 4, 5, 6];

        const groups = groupBy(data, (i) => i % 2 === 0 ? "even" : "odd");

        t.deepEqual(groups.get("even"), [2, 4, 6]);
        t.deepEqual(groups.get("odd"), [1, 3, 5]);
    },
);

test(
    "groupBy defaults to identity",
    (t) => {
        const data = [1, 2, 3, 1, 1, 2];

        const groups = groupBy(data);

        t.deepEqual(groups.get(1), [1, 1, 1]);
        t.deepEqual(groups.get(2), [2, 2]);
        t.deepEqual(groups.get(3), [3]);
    },
);

test(
    "groupBy iterator closing on toKey error",
    (t) => {
        const iter = new CountClosing([1, 2, 3, 4, 5]);

        t.throws(() => groupBy(iter, (i) => {
            if (i === 3) {
                throw new Error("Test");
            }
        }));

        t.is(iter.closed, 1);
    },
);

