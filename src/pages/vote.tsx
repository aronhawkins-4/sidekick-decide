import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { ContinueButton } from "@/components/ContinueButton";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useState } from "react";
import { RouterOutputs } from "@/utils/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type FoodType = RouterOutputs["foodType"]["getAll"][0];
type Vote = RouterOutputs["vote"]["getAll"][0];

const Vote: NextPage = () => {
  const { data: sessionData } = useSession();
  const [currentFoodType, setCurrentFoodType] = useState<FoodType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [foodTypesSize, setFoodTypesSize] = useState<number>(0);
  const {
    data: foodTypes,
    refetch: refetchFoodTypes,
    isLoading: foodTypesLoading,
  } = api.foodType.getAll.useQuery(
    undefined, // no input
    {
      onSuccess: (data) => {
        void setCurrentFoodType(currentFoodType ?? data[0] ?? null);
        void setFoodTypesSize(data.length);
      },
    }
  );
  const foodTypesLength = foodTypes?.length;

  const {
    data: votes,
    refetch: refetchVotes,
    isLoading: votesLoading,
  } = api.vote.getAll.useQuery(
    undefined // no input
  );
  const createVote = api.vote.create.useMutation({
    onSuccess: () => {
      void refetchFoodTypes();
    },
  });
  const deleteVote = api.vote.delete.useMutation({});

  if (foodTypesLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        {foodTypesLength! + 1 > currentIndex && (
          <RestaurantCard
            food={currentFoodType}
            updateFoodType={() => {
              setCurrentIndex(currentIndex + 1);
              setCurrentFoodType(foodTypes?.at(currentIndex) ?? null);
            }}
            onYesClick={() => {
              createVote.mutate({
                votedForTitle: currentFoodType?.title!,
              });
            }}
          />
        )}
        {foodTypesLength! < currentIndex && <div>THATS ALL</div>}
      </div>
      <div className="grid w-96 grid-cols-2">
        <div className="h-full w-full">
          <h2 className="text-center text-3xl">Yes</h2>
          <ul className="flex flex-col gap-2">
            {foodTypes?.map((foodType) => {
              return (
                <li key={foodType.id} className="flex gap-4">
                  <span>{foodType.title}</span>
                  <span>{foodType.voteFor.length}</span>
                  {foodType.voteFor.length > 5 && <div>POPULAR</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        className="btn-secondary btn w-48 rounded-full"
        onClick={() => {
          votes?.map((vote) => {
            deleteVote.mutate({ id: vote.id });
          });
          refetchFoodTypes();
        }}
      >
        Reset Votes
      </button>
      <ContinueButton location={"/"} text={"Go Back"} />
    </div>
  );
};

export default Vote;
