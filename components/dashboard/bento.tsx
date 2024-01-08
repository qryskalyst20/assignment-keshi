import React from "react";
import CustomerOrder from "./customer-order";
import { DailySales } from "./daily-sales";

const Bento = () => {
  return (
    <div className="h-full flex flex-col gap-5 py-10 absolute w-full">
      <div className="flex-1 flex flex-row gap-10">
        <div className="flex-1 flex items-center justify-center border-[10px] rounded-[50px] border-solid border-gray-200 overflow-hidden">
          <CustomerOrder />
        </div>
        <div className="flex-1 flex items-center justify-center border-[10px] rounded-[50px] border-solid border-gray-200 overflow-hidden">
          <DailySales />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full border-[10px] rounded-[50px] border-solid border-gray-200">
        Announcement
      </div>
    </div>
  );
};

export default Bento;
