import { describe, expect, it } from "vitest";
import { addLine, setQty } from "./cart.logic";
import type { CartLine } from "./cart.types";

const line: CartLine = { productId: "brazil-dark", weight: "250", cardamom: "none", qty: 1 };
const lineKey = "brazil-dark-250-none";

describe("cart logic", () => {
  it("adding the same product with the same options twice keeps one line with quantity 2", () => {
    const lines = addLine(addLine([], line), line);

    expect(lines).toHaveLength(1);
    expect(lines[0].qty).toBe(2);
  });

  it("setting the quantity below 1 removes the line", () => {
    const lines = addLine([], line);

    const result = setQty(lines, lineKey, 0);

    expect(result).toHaveLength(0);
  });

  it("adding a line does not change the original cart", () => {
    const lines: CartLine[] = [];

    addLine(lines, line);

    expect(lines).toHaveLength(0);
  });
});
