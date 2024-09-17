import { Settlement } from "../../type";
import SettlementList from "./SettlementList";
import { render } from "@testing-library/react";

describe("SettlementList", () => {
  it("snapshot", () => {
    const settlements: Settlement[] = [
      { from: "一郎", to: "二郎", amount: 1000 },
    ];
    const { container } = render(<SettlementList settlements={settlements} />);
    expect(container).toMatchSnapshot();
  });
});
