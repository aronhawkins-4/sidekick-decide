import { type RouterOutputs } from "../utils/api";

type foodType = RouterOutputs["foodType"]["getAll"][0];

export const RestaurantCard = ({
  food,
  onClick,
}: {
  food: foodType | null;
  onClick: () => void;
}) => {
  return (
    <div className="card card-compact w-96 rounded-3xl bg-slate-100 text-primary-content">
      <div className="card-body items-center gap-4">
        <h2 className="card-title text-center">{food?.title}</h2>
        <div className="card-actions justify-center">
          <button
            className="btn"
            onClick={() => {
              onClick;
            }}
          >
            No
          </button>
          <button
            className="btn"
            onClick={() => {
              onClick;
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
