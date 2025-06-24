import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { TbEdit, TbPlus, TbSearch, TbTrash } from "react-icons/tb";
import CustomPagination from "~/components/molecules/custom-pagination";
import Pagination from "~/components/molecules/custom-pagination";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import Dialog from "./dialog";
import { useDialogStore } from "~/stores/useDialogStore";
import { useConfirmDialogStore } from "~/stores/useConfirmDialogStore";
import type { SemesterResponse } from "./type";
import useSWR, { mutate } from "swr";
import { fetcher } from "~/lib/fetcher";
import TableSkeleton from "~/components/molecules/table-skeleton";
import GenerateUrl from "~/utils/generate-url";
import MyAccessToken from "~/utils/access-token";
import { toast } from "sonner";
import { useDebounce } from "~/utils/debounce";

const index = () => {
  const store = useDialogStore();
  const dialog = useConfirmDialogStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const URL = GenerateUrl(
    `${import.meta.env.VITE_BASE_URL}/api/semester`,
    `page=${page}`,
    `limit=${limit}`,
    `search=${searchQuery}`
  );

  const { data, error, isLoading } = useSWR<SemesterResponse>(URL, fetcher);

  if (error) {
    console.log("Error fetching data:", error);
  }

  const debouncedSearch = useDebounce((val: string) => {
    setSearchQuery(val);
  }, 500);

  const deleteData = async (id: number) => {
    dialog.setOnConfirm(async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/semester/${id}`;

      const respone = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MyAccessToken.get()}`,
        },
      });

      if (!respone.ok) {
        const error = await respone.json();
        toast.error(error.message || "Failed to delete data");

        return;
      }

      toast.success("Data deleted successfully!");
      mutate(URL);
    });

    dialog.setOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col space-y-2 p-4 px-5">
      <Dialog url={URL} />
      <div className="flex items-start justify-between">
        <Heading
          title="Semester"
          description="Manage semester (Server side table functionalities.)"
        />
        <Button
          onClick={() => {
            store.setData(null);
            store.setOpen(true);
          }}
          className={cn(buttonVariants(), "text-xs md:text-sm")}
        >
          <TbPlus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="mb-6" />

      {error && (
        <div className="text-red-500">Error fetching data: {error.message}</div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="flex items-center gap-2 justify-between mb-4">
            <Select
              value={limit.toString()}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-[300px] flex items-center">
              <Input
                value={search}
                onChange={(e) => {
                  setPage(1); // Reset to first page on new search
                  setSearch(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                placeholder="Search here"
                className="pr-8"
              />
              <TbSearch className="absolute right-2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Tahun Akademik</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.data.map((kelas, index) => (
                <TableRow key={kelas.id}>
                  <TableCell className="font-medium">
                    {data?.results.from + index}
                  </TableCell>
                  <TableCell>{kelas.semester}</TableCell>
                  <TableCell>{kelas.year}</TableCell>
                  <TableCell>
                    {kelas.tahun_akademik ? (
                      <Badge className="capitalize">
                        {kelas.tahun_akademik.name}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            store.setData(kelas);
                            store.setOpen(true);
                          }}
                        >
                          <TbEdit className="mr-1 h-4 w-4" /> Edit Data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            deleteData(kelas.id);
                          }}
                        >
                          <TbTrash className="mr-1 h-4 w-4" /> Delete Data
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <CustomPagination
            page={page}
            setPage={setPage}
            showItem={data?.results.data.length || 0}
            total={data?.results.total || 0}
            limit={data?.results.per_page || 10}
          />
        </>
      )}
    </div>
  );
};

export default index;
