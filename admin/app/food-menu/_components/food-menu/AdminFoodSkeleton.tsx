export const AdminFoodSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-4 p-6 bg-gray-200 animate-pulse rounded-xl">
            <div className="flex items-center text-xl font-semibold gap-2">
              <div className="h-6 bg-gray-300 rounded w-32"></div>
              <div className="h-6 bg-gray-300 rounded w-10"></div>
            </div>

            <div className="flex flex-wrap gap-3">
              {Array(4)
                .fill(null)
                .map((_, foodIndex) => (
                  <div key={foodIndex} className="border rounded-[20px] p-4 border-border bg-background flex flex-col gap-5 w-67.5 animate-pulse">
                    <div className="bg-gray-300 w-full h-[129px] rounded-xl flex justify-end items-end p-5">
                      <div className="h-11 w-11 bg-gray-400 rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                      </div>
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
