import React, { createContext, useContext, useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  CirclePlus,
  LayoutList,
  User2,
} from "lucide-react";
import { MdCategory } from "react-icons/md";

const SidebarContext = createContext();

const SidebarItem = ({ icon, text, active, alert, setDisplay, setActive }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative group flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
      onClick={() => {
        setDisplay(text)
        setActive(text)
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
        onClick={() => setDisplay(text)}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="min-h-screen">
      <nav
        className={`h-full  flex flex-col bg-white border-r shadow-sm ${
          expanded ? "w-52" : "w-16"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logoipsum-295.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div>
              <h4 className="font-semibold">Admin</h4>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

const SidebarAdmin = ({ setDisplay }) => {
  const [active, setActive] = useState("Users");

  return (
    <Sidebar>
      <SidebarItem
        setDisplay={setDisplay}
        setActive={setActive}
        icon={<User2 size={30} />}
        text="Users"
        active={active === "Users" && true}
      />
      <SidebarItem
        setDisplay={setDisplay}
        setActive={setActive}
        icon={<MdCategory size={30} />}
        text="Add Category"
        active={active === "Add Category" && true}
      />
      {/* <SidebarItem
        setDisplay={setDisplay}
        icon={<LayoutList size={30} />}
        text="List Question"
        setActive={setActive}
        active={active === "List Question" && true}
      /> */}
    </Sidebar>
  );
};

export default SidebarAdmin;
