import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { z } from "zod";
import { Table } from "../table";

const WishListData = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  link: z.string().url({ message: "Ogiltig url" }).nullish(),
  priority: z.number(),
});
type WishListDataType = z.infer<typeof WishListData>;

interface WishListProps {
  data?: WishListDataType[];
}

const columnHelper = createColumnHelper<WishListDataType>();

export const WishList: React.FC<WishListProps> = ({ data }) => {
  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Beskrivning</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("link", {
      header: () => "Länk",
      cell: (info) => (
        <a href={info.renderValue() || ""}>{info.renderValue()}</a>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("priority", {
      header: () => <span>Prioritet</span>,
      footer: (info) => info.column.id,
    }),
  ] as ColumnDef<object>[];

  return <Table columns={columns} data={data} />;
};
