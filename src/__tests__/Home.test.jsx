import Comments from "../components/Comments";
import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";

describe("Home testing", () => {
  test("", () => {
    render(<Comments selectedPost={selectedPost} user={fakeUser} />);
    expect(screen.queryByRole("addComment")).toBeInTheDocument();
  });
  test("Do not Display the addComment section if the user is not logged in", () => {
    render(<Comments selectedPost={selectedPost} />);
    expect(screen.queryByRole("addComment")).not.toBeInTheDocument();
  });
});
