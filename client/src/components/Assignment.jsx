import { TbCirclesFilled } from "react-icons/tb";
import { HiRectangleStack } from "react-icons/hi2";


const Assignment = () => {
  return (
    <div className="Assignment m-10">
      <div className="flex justify-between">
        <h2 className="font-bold">My Assignments</h2>
        <span className="font-semibold text-gray-600 cursor-pointer">View all</span>
      </div>
      <div className="card mt-5 flex flex-col gap-4">

        <div className="info flex justify-between items-center">

          <div className="flex gap-3 items-center">
            <div className="p-2 bg-purple-400 rounded-lg"><HiRectangleStack /></div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">FIltering and Sorting</span>
              <span className="text-gray-500 text-[13px] font-semibold">Design Composition</span>
            </div>
          </div>

          <div className="text-gray-600 font-semibold text-sm">21 Oct, 2023</div>
          <div>...</div>

        </div>

        <div className="info flex justify-between items-center">

          <div className="flex gap-3 items-center">
            <div className="p-2 bg-yellow-200 rounded-lg"><TbCirclesFilled /></div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Color Theory</span>
              <span className="text-gray-500 text-[13px] font-semibold">UX Design Foundations</span>
            </div>
          </div>

          <div className="text-gray-600 font-semibold text-sm">21 Oct, 2023</div>
          <div>...</div>

        </div>
      </div>
    </div>
  );
}

export default Assignment;