import Posts from "../components/Posts";
import { describe, test, expect } from "vitest";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const postData = [
  {
    id: 3,
    title: "postTitle1",
    userId: 2,
    text: "dummy data 1 to test the Post data rendering",
    summary: "dummy data 1",
    comments: [
      {
        id: 1,
        text: "comment 1",
      },
      {
        id: 2,
        text: "comment 2",
      },
      {
        id: 3,
        text: "comment 3",
      },
      {
        id: 4,
        text: "comment 4",
      },
      {
        id: 5,
        text: "comment 5",
      },
    ],
    published: true,
    edited: null,
    created: Date.now(),
  },
  {
    id: 4,
    title: "postTitle2",
    userId: 2,
    text: "dummy data 2 to test the Post data rendering",
    summary: "dummy data 2",
    comments: [
      {
        id: 1,
        text: "comment 1",
      },
      {
        id: 2,
        text: "comment 2",
      },
      {
        id: 3,
        text: "comment 3",
      },
      {
        id: 4,
        text: "comment 4",
      },
      {
        id: 5,
        text: "comment 5",
      },
    ],
    published: true,
    created: Date.now(),
  },
];

describe("Post Func Testing", () => {
  test("Posts are displayed when given post data", async () => {
    render(<Posts data={postData} />);
    expect(await screen.findByText(/postTitle2/)).toBeInTheDocument();
  });
  // TODO: change the expect msg with the text in the err msg to be used
  test("Display error message if no post data is given", async () => {
    render(<Posts />);
    expect(
      await screen.findByText(/No Posts are Available/),
    ).toBeInTheDocument();
  });
  test("Display the selected post if a post is selected", async () => {
    const user = userEvent;
    render(<Posts data={postData} />);
    const seePost = screen.getByRole("button", { name: "see3" });
    await act(async () => user.click(seePost));
    expect(await screen.findByText(/data rendering/)).toBeInTheDocument();
  });
  test("Do not display full text if there is no post selected", () => {
    render(<Posts data={postData} />);
    expect(screen.queryByText(/data rendering/)).not.toBeInTheDocument();
  });
});
