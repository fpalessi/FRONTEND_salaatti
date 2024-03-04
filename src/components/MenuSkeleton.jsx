import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// eslint-disable-next-line react/prop-types
const MenuSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div key={i} style={{ margin: "1rem" }}>
        <Skeleton width={"3rem"} />
        <div>
          <Skeleton width={"16rem"} height={"12rem"} />
        </div>
        <Skeleton width={"5rem"} />
      </div>
    ));
};

export default MenuSkeleton;
