import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { ContinueButton } from "@/components/ContinueButton";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useState } from "react";
import { RouterOutputs } from "@/utils/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type FoodType = RouterOutputs["foodType"]["getAll"][0];
const Vote: NextPage = () => {
  const { data: sessionData } = useSession();
  const [currentFoodType, setCurrentFoodType] = useState<FoodType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [foodTypesSize, setFoodTypesSize] = useState<number>(0);
  //   const [noFoods, setNoFoods] = useState<FoodType[] | null>
  const {
    data: foodTypes,
    refetch: refetchFoodTypes,
    isLoading: loading,
  } = api.foodType.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        void setCurrentFoodType(currentFoodType ?? data[0] ?? null);
        void setFoodTypesSize(data.length);
      },
    }
  );
  function getCurrentIndex(foodType: FoodType) {
    return foodType.title === currentFoodType?.title;
  }

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <RestaurantCard
          food={currentFoodType}
          updateFoodType={() => {
            currentIndex === foodTypesSize - 1
              ? setCurrentIndex(0)
              : setCurrentIndex(currentIndex + 1);
            setCurrentFoodType(foodTypes?.at(currentIndex) ?? null);
          }}
        />
      </div>
      <div className="grid w-96 grid-cols-2">
        <div className="h-full w-full">
          <h2 className="text-center text-3xl">No</h2>
        </div>
        <div className="h-full w-full">
          <h2 className="text-center text-3xl">Yes</h2>
        </div>
      </div>
      <ContinueButton location={"/"} text={"Go Back"} />
    </div>
  );
};

export default Vote;
