import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuggestionBox from "./SuggestionBox";

describe("SuggestionBox", () => {
  it("shows both error messages when the empty form is sent", async () => {
    const user = userEvent.setup();
    render(<SuggestionBox />);

    await user.click(screen.getByRole("button", { name: "أرسل" }));

    expect(screen.getByText("اكتب اقتراحك أو تعليقك أول.")).toBeInTheDocument();
    expect(screen.getByText("اختار تقييم من نجمة لخمس نجوم.")).toBeInTheDocument();
  });
});
