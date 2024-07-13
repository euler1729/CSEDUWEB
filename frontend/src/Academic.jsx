import { useState } from "react";
import Banner from "./component/Banner";
import AccademicProgram from "./component/AccademicProgram";

const Academic = () => {
  const [selectedItem, setSelectedItem] = useState("Undergraduate Program");

  return (
    <>
      <Banner title={selectedItem} activePage={selectedItem} />
      <div className="flex">
        <div className="w-4/5 my-10 mx-20">
          <AccademicProgram programName={selectedItem}></AccademicProgram>
        </div> 
        <div className="w-1/5">
          <div className="pt-10">
            <div className="text-xl font-bold flex items-center pb-4">
              <div className="h-[2px] w-10 bg-[#EDB516] mr-4"></div>
              <div>ACADEMIC</div>
            </div>
            <ul className="space-y-4">
              <li
                onClick={() => setSelectedItem("Undergraduate Program")}
                className="cursor-pointer"
              >
                Undergraduate
              </li>
              <li
                onClick={() => setSelectedItem("Graduate Program")}
                className="cursor-pointer"
              >
                Graduate
              </li>
              <li
                onClick={() => setSelectedItem("MPhil Program")}
                className="cursor-pointer"
              >
                MPhil
              </li>
              <li
                onClick={() => setSelectedItem("PhD Program")}
                className="cursor-pointer"
              >
                PhD
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Academic;
