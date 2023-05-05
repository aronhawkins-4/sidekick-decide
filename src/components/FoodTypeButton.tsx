import { useState } from "react";
import Link from "next/link";
import { type RouterOutputs } from "../utils/api";

type foodType = RouterOutputs["activityType"]["getAll"][0];

export const FoodTypeButton = ({
  food,
  onDelete,
}: {
  food: foodType;
  onDelete: () => void;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Link
      href="#"
      className={
        isSelected
          ? "relative flex w-full items-center justify-center gap-4 rounded-full border-2 border-red-500 p-4 text-center text-xl font-bold capitalize text-red-500"
          : "relative flex w-full flex-col rounded-full border-2 border-slate-300 p-4 text-center text-xl font-bold capitalize text-slate-300"
      }
      onClick={(evt) => {
        evt.preventDefault();
        setIsSelected(!isSelected);
      }}
    >
      {food.title}
      {isSelected && (
        <>
          <div className="btn-accent absolute right-4 top-[-8px] flex h-6 w-6 items-center justify-center rounded-full">
            !
          </div>
          <button
            className="btn-warning btn-xs btn w-24 rounded-full px-5"
            onClick={onDelete}
          >
            Delete
          </button>
        </>
      )}
    </Link>
  );
};
