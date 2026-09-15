import { SearchX } from "lucide-react";
import { useSelector } from "react-redux";

const NoSearchResults = () => {
const {search} = useSelector((state)=> state.blogs);
  return (
    <div className="w-full min-h-100 flex  justify-center">
      <div className="flex flex-col items-center text-center max-w-md px-6">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center mb-6">
          <SearchX size={28} strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          No articles found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 leading-6">
          We couldn't find any articles matching{" "}
          <span className="font-medium text-black">
            "{search}"
          </span>
        </p>

        {/* Suggestion */}
        <p className="mt-2 text-xs text-gray-400">
          Try searching with a different keyword.
        </p>
      </div>
    </div>
  );
};

export default NoSearchResults;