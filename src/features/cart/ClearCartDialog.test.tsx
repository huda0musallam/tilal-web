import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClearCartDialog from "./ClearCartDialog";
import { useCartStore } from "./cart.store";

function stubNativeDialog() {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

function getDialog() {
  return screen.getByRole("dialog", { name: "تفضي السلة؟" });
}

describe("ClearCartDialog", () => {
  beforeAll(stubNativeDialog);

  beforeEach(() => {
    useCartStore.setState({
      lines: [{ productId: "p1", weight: "250", cardamom: "none", qty: 2 }],
    });
  });

  afterEach(() => {
    cleanup();
    useCartStore.setState({ lines: [] });
  });

  it("shows the question, the description and both answers", () => {
    render(<ClearCartDialog open onClose={() => {}} />);

    const dialog = getDialog();
    expect(dialog).toHaveAccessibleDescription(
      "رح تنشال كل المنتجات والخلطات. بتقدر تضيفهم من جديد.",
    );
    expect(within(dialog).getByRole("button", { name: "خليها" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "فضّي السلة" })).toBeInTheDocument();
  });

  it("puts the keep button first so the dialog focuses it on open", () => {
    render(<ClearCartDialog open onClose={() => {}} />);

    const [firstButton] = within(getDialog()).getAllByRole("button");
    expect(firstButton).toHaveAccessibleName("خليها");
  });

  it("keeps the cart and closes when the keep button is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ClearCartDialog open onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "خليها" }));

    expect(onClose).toHaveBeenCalled();
    expect(useCartStore.getState().lines).toHaveLength(1);
  });

  it("empties the cart and closes when the clear button is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ClearCartDialog open onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "فضّي السلة" }));

    expect(onClose).toHaveBeenCalled();
    expect(useCartStore.getState().lines).toHaveLength(0);
  });

  it("closes without clearing when the native dialog closes, as it does on Escape", () => {
    const onClose = vi.fn();
    render(<ClearCartDialog open onClose={onClose} />);

    fireEvent(getDialog(), new Event("close"));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(useCartStore.getState().lines).toHaveLength(1);
  });
});
