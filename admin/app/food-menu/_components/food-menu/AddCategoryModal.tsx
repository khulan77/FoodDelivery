"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/services/create-category";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const AddCategoryModal = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const { mutate } = useSWRConfig();

  const createCategoryName = async () => {
    await createCategory({ categoryName });

    setCategoryName("");
    mutate("categories-with-count");
    mutate("foods-with-categories");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-9 h-9 bg-red-500 hover:bg-red-600">
          <Plus width={16} height={16} strokeWidth={1.5} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 flex flex-col gap-6 bg-white">
        <div className="mb-4 flex justify-between items-center">
          <DialogTitle>Add new category</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded-full w-9 h-9">
              <X strokeWidth={1.5} />
            </Button>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-semibold">
            Category name
          </Label>
          <Input id="name" placeholder="Type category name..." value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-4 w-full" onClick={createCategoryName} disabled={!categoryName.trim()}>
              Add category
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
