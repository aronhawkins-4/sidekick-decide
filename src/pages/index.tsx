import { type NextPage } from "next";
import { api } from "@/utils/api";
import { RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { FoodTypeButton } from "@/components/FoodTypeButton";
import { ContinueButton } from "@/components/ContinueButton";

const Home: NextPage = () => {
  // const [data, setData] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/place/textsearch/json?query=waco+tx+restaurants&key=${process.env.GOOGLE_MAPS_API_KEY}`
  //     )
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center gap-4 p-32">
        <h1 className="text-8xl text-secondary">Rank your favorite foods.</h1>
        <p className="text-xl text-secondary">
          Pick up to 5 of your favorite food types. This will help us when
          recommending places for you to eat.
        </p>
        <FoodGrid />
        <ContinueButton location={"/vote"} text={"Vote"} />
      </div>
    </div>
  );
};

export default Home;

type FoodType = RouterOutputs["foodType"]["getAll"][0];

const FoodGrid: React.FC = () => {
  const { data: sessionData } = useSession();

  const [foodTypeLength, setFoodTypeLength] = useState<number>(0);
  const { data: foodTypes, refetch: refetchFoodTypes } =
    api.foodType.getAll.useQuery(
      undefined, // no input
      {
        enabled: sessionData?.user !== undefined,
      }
    );
  const createFoodType = api.foodType.create.useMutation({
    onSuccess: () => {
      void refetchFoodTypes();
    },
  });

  const deleteFoodType = api.foodType.delete.useMutation({
    onSuccess: () => {
      void refetchFoodTypes();
    },
  });

  return (
    <div className="w-full">
      <input
        type="text"
        className="input-bordered input input-sm w-full"
        placeholder="New Food Type"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createFoodType.mutate({
              title: e.currentTarget.value,
            });
            e.currentTarget.value = "";
          }
        }}
      />

      <ul className="m-auto mt-4 grid w-full grid-cols-3 content-center items-center gap-4 bg-base-100 p-2">
        {foodTypes?.map((foodType) => (
          <li key={foodType.id} className="flex items-center justify-center">
            <FoodTypeButton
              food={foodType}
              onDelete={() => deleteFoodType.mutate({ title: foodType.title })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
