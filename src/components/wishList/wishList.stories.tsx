import type { Meta, StoryFn } from "@storybook/react";

import { WishList as WishListComponent } from ".";

export default {
  title: "Components/Table",
} as Meta;

const WishListStory: StoryFn<typeof WishListComponent> = (args) => (
  <WishListComponent {...args} />
);

export const WishList = WishListStory.bind({});
WishList.args = {
  data: [
    {
      id: 1,
      title: "iPad Pro",
      priority: 1,
      description: "Nyaste coola paddan",
      link: "https://www.apple.com/se/ipad-10.9/",
    },
    {
      id: 2,
      title: "iPad Pro",
      priority: 1,
      description: "Nyaste coola paddan",
      link: "https://www.apple.com/se/ipad-10.9/",
    },
  ],
};
