import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { ContinueButton } from "@/components/ContinueButton";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useState } from "react";
import { RouterOutputs } from "@/utils/api";

type FoodType = RouterOutputs["foodType"]["getAll"][0];
const Vote: NextPage = () => {
  const { data: sessionData } = useSession();
  const [currentFoodType, setCurrentFoodType] = useState<FoodType | null>(null);
  const { data: foodTypes, refetch: refetchFoodTypes } =
    api.foodType.getAll.useQuery(
      undefined, // no input
      {
        enabled: sessionData?.user !== undefined,
        onSuccess: (data) => {
          void setCurrentFoodType(currentFoodType ?? data[0] ?? null);
        },
      }
    );
  function getCurrentIndex(foodType: FoodType) {
    return foodType.title === currentFoodType?.title;
  }
  return (
    <div className="align-center flex h-screen w-screen justify-center">
      <div className="flex items-center justify-center gap-4">
        <RestaurantCard
          food={currentFoodType}
          onClick={() => {
            console.log(foodTypes?.findIndex(getCurrentIndex));
          }}
        />
      </div>
    </div>
  );
};

export default Vote;
