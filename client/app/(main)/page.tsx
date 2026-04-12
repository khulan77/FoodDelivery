import { HeroImage } from "./_components";
import { FoodCategories } from "./_components/food-with-category/FoodCategories";

export default function Home() {
  return (
    <div>
      <HeroImage imgSource="/hero.png" />
      <div className="container mx-auto my-9">
        <FoodCategories />
      </div>
    </div>
  );
}
