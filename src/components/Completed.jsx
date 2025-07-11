import React from "react";

function Completed({ tasks }) {
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="fixed mt-5 right-6 flex items-center justify-center h-[40px] w-[150px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-md rounded-full hover:bg-white/20 transition-all ease-in-out delay-0 cursor-pointer z-50">
      <h1 className="text-[15px] font-bold ">{completedCount} Completed</h1>
    </div>
  );
}

export default Completed;
