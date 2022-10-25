import Skeleton from "react-loading-skeleton";

const SkeletonPoster = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 0.5,
        border: "1px solid gray",
        borderRadius: 5,
      }}
    >
      <Skeleton width={100} height={40} />
    </div>
  );
};

export default SkeletonPoster;
