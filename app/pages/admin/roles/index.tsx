import { MoreHorizontal } from "lucide-react";
import React from "react";
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

const index = () => {
  const store = useDialogStore();
  const dialog = useConfirmDialogStore();

  return (
    <div className="flex flex-1 flex-col space-y-2 p-4 px-5">
      <Dialog />
      <div className="flex items-start justify-between">
        <Heading
          title="Roles & Permissions"
          description="Manage roles & permissions (Server side table functionalities.)"
        />
        <Button
          onClick={() => {
            store.reset();
            store.setOpen(true);
          }}
          className={cn(buttonVariants(), "text-xs md:text-sm")}
        >
          <TbPlus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="mb-6" />

      <div className="flex items-center gap-2 justify-between mb-4">
        <Select value="10">
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
          <Input placeholder="Search here" className="pr-8" />
          <TbSearch className="absolute right-2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Guard Name</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Super Admin</TableCell>
            <TableCell>super-admin</TableCell>
            <TableCell className="max-w-[200px]">
              <div className="flex gap-2 flex-wrap">
                <Badge>User</Badge>
                <Badge>Student</Badge>
                <Badge>Employee</Badge>
                <Badge>Kelas</Badge>
              </div>
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
                      store.setData({
                        id: 1,
                        name: "Super Admin",
                        guardName: "super-admin",
                        permissions: [
                          "Get User",
                          "Tambah User",
                          "Update User",
                          "Delete User",
                        ],
                      });
                      store.setOpen(true);
                    }}
                  >
                    <TbEdit className="mr-1 h-4 w-4" /> Edit Data
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      dialog.setOnConfirm(async () => {
                        await fetch("/api/delete-data", { method: "DELETE" });
                        alert("Data berhasil dihapus");
                      })

                      dialog.setOpen(true);
                      
                    }}
                  >
                    <TbTrash className="mr-1 h-4 w-4" /> Delete Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination
        page={1}
        setPage={() => {}}
        showItem={10}
        total={100}
        limit={10}
      />
    </div>
  );
};

export default index;
