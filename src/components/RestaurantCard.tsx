import { type RouterOutputs } from "../utils/api";

type foodType = RouterOutputs["foodType"]["getAll"][0];

export const RestaurantCard = ({
  food,
  updateFoodType,
  onYesClick,
}: {
  food: foodType | null;
  updateFoodType: () => void;
  onYesClick: () => void;
}) => {
  return (
    <div className="card w-96 rounded-3xl bg-slate-100 text-primary-content">
      <div className="card-body items-center gap-4">
        <h2 className="card-title text-center text-4xl">{food?.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn-outline btn" onClick={updateFoodType}>
            No
          </button>
          <button
            className="btn"
            onClick={() => {
              updateFoodType();
              onYesClick();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
