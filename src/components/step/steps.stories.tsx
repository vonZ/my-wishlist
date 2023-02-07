import type { Meta, StoryFn } from "@storybook/react";

import { ListDate as ListDateComponent } from "./listDate";
import { ListSummary as ListSummaryComponent } from "./listSummary";
import { ListTitle as ListTitleComponent } from "./listTitle";

export default {
  title: "Components/Steps",
} as Meta;

const ListTitleStory: StoryFn<typeof ListTitleComponent> = (args) => (
  <ListTitleComponent {...args} />
);

export const ListTitle = ListTitleStory.bind({});
ListTitle.args = {
  onSubmit: () => null,
};

const ListDateStory: StoryFn<typeof ListDateComponent> = (args) => (
  <ListDateComponent {...args} />
);

export const ListDate = ListDateStory.bind({});
ListDate.args = {
  onSubmit: () => null,
};

const ListSummaryStory: StoryFn<typeof ListSummaryComponent> = (args) => (
  <ListSummaryComponent {...args} />
);

export const ListSummary = ListSummaryStory.bind({});
ListSummary.args = {
  onSubmit: () => null,
};
