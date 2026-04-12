"use client";

import { z } from "zod";
import { useSWRConfig } from "swr";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./ImageUploader";
import { uploadImage } from "@/lib/uploadImage";
import { createFood } from "@/services/create-food";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const foodSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Price must be a positive number"),
  ingredients: z.string().min(1, "Ingredients are required"),
});

type FoodFormValues = z.infer<typeof foodSchema>;

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
};

export const AddFoodModal = ({ categoryName, categoryId }: AddFoodModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
  });

  const onSubmit = async (data: FoodFormValues) => {
    const foodData = {
      foodName: data.foodName,
      price: parseFloat(data.price),
      ingredients: data.ingredients,
      image: "",
      category: categoryId,
    };

    if (uploadedImage) {
      const imageUrl = await uploadImage(uploadedImage);
      await createFood({ ...foodData, image: imageUrl });
    } else {
      await createFood(foodData);
    }

    reset();
    setUploadedImage(undefined);
    mutate("foods-with-categories");
    mutate("categories-with-count");
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadedImage(event.target.files[0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border rounded-3xl h-56.75 flex flex-col gap-6 justify-center items-center m-1 cursor-pointer hover:bg-accent/50 transition-colors bg-gray-100">
          <Button className="bg-red-500 hover:bg-red-600 rounded-full w-9 h-9">
            <Plus width={16} height={16} strokeWidth={1.5} />
          </Button>
          <p className="text-sm text-center w-36 text-muted-foreground">Add new Dish to {categoryName}</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 flex flex-col gap-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded-full w-9 h-9">
              <X strokeWidth={1.5} />
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex w-full gap-6">
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="foodName" className="ml-1 font-semibold">
                Food name
              </Label>
              <Input id="foodName" placeholder="Type food name..." {...register("foodName")} />
              {errors.foodName && <p className="text-xs text-red-500">{errors.foodName.message}</p>}
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="price" className="font-semibold">
                Food price
              </Label>
              <Input id="price" type="number" placeholder="Enter price..." {...register("price")} />
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ingredients" className="font-semibold">
              Ingredients
            </Label>
            <Input id="ingredients" placeholder="List ingredients..." {...register("ingredients")} />
            {errors.ingredients && <p className="text-xs text-red-500">{errors.ingredients.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image" className="font-semibold">
              Food image
            </Label>
            <ImageUploader onFileChange={onFileChange} imgFile={uploadedImage} />
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Dish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
