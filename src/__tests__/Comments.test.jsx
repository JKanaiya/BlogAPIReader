import Comments from "../components/Comments";
import { describe, test, expect } from "vitest";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const selectedPost = {
  id: 3,
  comments: [
    {
      id: 4,
      text: "blabla",
      comments: [
        {
          id: 5,
          text: "blagain",
          comments: [],
        },
      ],
    },
  ],
};

const fakeUser = {
  id: 5,
  role: "READER",
  comments: [],
};

describe("Comment testing", () => {
  test("Display the addComment section if the user is logged in", () => {
    render(<Comments user={fakeUser} selectedPost={selectedPost} />);
    expect(screen.queryByRole("addComment")).toBeInTheDocument();
  });
  test("Do not Display the addComment section if the user is not logged in", () => {
    render(<Comments selectedPost={selectedPost} />);
    expect(screen.queryByRole("addComment")).not.toBeInTheDocument();
  });
  test("Selecting a Comment loads that comment and its comments", async () => {
    const user = userEvent;
    render(<Comments selectedPost={selectedPost} user={fakeUser} />);
    const seeComment4 = await screen.findByRole("4");
    await act(async () => user.click(seeComment4));
    expect(await screen.findByText("blagain")).toBeInTheDocument();
  });
});
