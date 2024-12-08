import { useState } from "react";

const navbars = ["Detailed", "Compact ", "Credit ", "Debit ", "Investment"];
export default function Navbar() {
  const [select, setSelect] = useState<string>(navbars[0]);
  return (
    <div className="flex my-5 w-fit  divide-x rounded-sm flex-1 bg-[#fefefe] text-sm border-separate border border-border ">
      {navbars.map((name, i) => (
        <p
          onClick={() => setSelect(name)}
          className={` px-5 border-separate  py-2  cursor-pointer ${select === name && "bg-secondary "}`}
          key={`${i}-${name}`}
        >
          {name}
        </p>
      ))}
    </div>
  );
}
