import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  useEffect(() => {
    const getContent = async () => {
      setLoading(true);
      setContent([]);
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res?.data?.content);
      setLoading(false);
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  return (
    <div
      className="bg-black relative text-white px-5 md:px-20"
      onMouseEnter={() => {
        setShowArrows(true);
      }}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[250px] h-[140px] bg-gray-800 shimmer rounded-lg"
              />
            ))
          : content.map((item) => (
              <Link
                key={item.id}
                to={`/watch/${item.id}`}
                className="min-w-[250px] relative group"
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={SMALL_IMG_BASE_URL + item?.backdrop_path}
                    alt="Movie Image"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                </div>
                <p className="mt-2 text-center">{item?.title || item?.name}</p>
              </Link>
            ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-[46%] -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-[46%] -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;