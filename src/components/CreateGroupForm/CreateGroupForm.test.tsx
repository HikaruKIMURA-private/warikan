import userEvent from "@testing-library/user-event";
import CreateGroupForm from "./CreateGroupForm";
import { render, screen, waitFor } from "@testing-library/react";

const mockOnSubmit = jest.fn();
const user = userEvent.setup();

describe("CreateGroupForm", () => {
  beforeEach(() => {
    render(<CreateGroupForm onSubmit={mockOnSubmit} />);
  });
  it("formの内容がサブミットされる", async () => {
    await user.type(screen.getByLabelText("グループ名"), "group1");
    await user.type(screen.getByLabelText("メンバー"), "一郎, 二郎");
    await user.click(screen.getByRole("button"));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "group1",
      members: ["一郎", "二郎"],
    });

    await waitFor(() => {
      expect(screen.queryByDisplayValue("group1")).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue("一郎, 二郎")).not.toBeInTheDocument();
    });
  });

  it("初期状態でサブミットするとバリデーションエラーが発生する", async () => {
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("グループ名は必須です")).toBeInTheDocument();
    expect(screen.getByText("メンバーは2人以上必要です")).toBeInTheDocument();
  });
});
