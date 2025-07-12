import React from "react";

function Completed({ tasks }) {
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="fixed mt-5 lg:mr-10 right-6 flex items-center justify-center h-[25px] w-[120px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-md rounded-full hover:bg-white/20 transition-all ease-in-out delay-0 cursor-pointer z-50">
      <h1 className="lg:text-[15px] lg:font-bold md:text-[10px] ">{completedCount} Completed</h1>
    </div>
  );
}

export default Completed;
