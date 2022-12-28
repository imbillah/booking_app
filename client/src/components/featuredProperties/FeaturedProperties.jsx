import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../utils/LoadingSpinner";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const fetchUrl = `${process.env.REACT_APP_SERVER_ROOT_URL}/hotels?featured=true`;
  const { data, loading, error, reFetch } = useFetch(fetchUrl);

  return (
    <div className="fp">
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src="https://media-cdn.tripadvisor.com/media/photo-s/15/99/54/30/swimming-pool.jpg"
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
