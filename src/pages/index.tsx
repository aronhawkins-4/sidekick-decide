import { type NextPage } from "next";
import { api } from "@/utils/api";
import { RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";

const Home: NextPage = () => {
  // async function logJSONData() {
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ01EBI_GCT4YREKrR1gNL1_s&fields=restaurant&key=${process.env.GOOGLE_MAPS_API_KEY}`
  //   );
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  // }
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 p-32">
        <h1 className="text-8xl text-slate-200">Rank your favorite foods.</h1>
        <p className="text-xl text-slate-200">
          Pick up to 5 of your favorite food types. This will help us when
          recommending places for you to eat.
        </p>
        <FoodGrid />
      </div>
    </div>
  );
};

export default Home;

type FoodType = RouterOutputs["foodType"]["getAll"][0];

const FoodGrid: React.FC = () => {
  const { data: sessionData } = useSession();
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
  return (
    <div>
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
      <ul className="menu rounded-box m-auto grid w-full grid-cols-3 content-center items-center gap-4 bg-base-100 p-2">
        {foodTypes?.map((foodType) => (
          <li key={foodType.id} className="flex items-center justify-center">
            <button className="btn-outline btn-wide btn-lg flex items-center justify-center">
              {foodType.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
