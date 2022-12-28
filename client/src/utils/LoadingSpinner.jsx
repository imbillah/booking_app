import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = ({ loading }) => {
  let [color, setColor] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "violet",
  };
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={75}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingSpinner;
