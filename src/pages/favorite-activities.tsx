import { type NextPage } from "next";
import { api } from "@/utils/api";
import { RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { ContinueButton } from "@/components/ContinueButton";
import { ActivityTypeButton } from "@/components/ActivityTypeButton";

const FavoriteActivities: NextPage = () => {
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
      <div className="flex flex-col gap-4 p-32">
        <h1 className="text-8xl text-secondary">
          Rank your favorite activities to do.
        </h1>
        <p className="text-xl text-secondary">
          Pick up to 5 of your activities. This will help us when recommending
          fun things for you to do.
        </p>
        <ActivityGrid />
        <ContinueButton location={"/"} text={"Continue"} />
      </div>
    </div>
  );
};

export default FavoriteActivities;

type FoodType = RouterOutputs["foodType"]["getAll"][0];

const ActivityGrid: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: activityTypes, refetch: refetchActivityTypes } =
    api.activityType.getAll.useQuery(
      undefined, // no input
      {
        enabled: sessionData?.user !== undefined,
      }
    );

  const createActivityType = api.activityType.create.useMutation({
    onSuccess: () => {
      void refetchActivityTypes();
    },
  });
  const deleteActivityType = api.activityType.delete.useMutation({
    onSuccess: () => {
      void refetchActivityTypes();
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
            createActivityType.mutate({
              title: e.currentTarget.value,
            });
            e.currentTarget.value = "";
          }
        }}
      />
      <ul className="m-auto mt-4 grid w-full grid-cols-3 content-center items-center gap-4 bg-base-100 p-2">
        {activityTypes?.map((activityType) => (
          <li
            key={activityType.id}
            className="flex items-center justify-center"
          >
            <ActivityTypeButton
              activity={activityType}
              onDelete={() =>
                deleteActivityType.mutate({ title: activityType.title })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
