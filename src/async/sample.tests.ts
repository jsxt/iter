import test from "ava";
import sampleOne from "./sampleOne.js";

test("sampleOne with no additional argument returns a number", async (t) => {
    const data = [1, 2, 3, 4, 5, 6];
    const choice = await sampleOne(data);
    t.is(typeof choice, "number");
    t.true(data.includes(choice));
});

test("sampleOne throws given an empty sequence", async (t) => {
    const data: Array<number> = [];
    await t.throwsAsync(() => sampleOne(data));
});
