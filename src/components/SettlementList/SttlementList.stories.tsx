import { Settlement } from "../../type";
import SettlementList from "./SettlementList";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "SettlementList",
  component: SettlementList,
} as Meta<typeof SettlementList>;

export default meta;

type Story = StoryObj<typeof SettlementList>;

const settlements: Settlement[] = [
  { from: "一郎", to: "二郎", amount: 1000 },
  { from: "二郎", to: "三郎", amount: 2000 },
];

export const Default: Story = {
  args: {
    settlements,
  },
};
