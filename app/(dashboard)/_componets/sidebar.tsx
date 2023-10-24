import Logo from "./logo";
const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo></Logo>
      </div>
      <div className="flex flex-col w-full"></div>
    </div>
  );
};

export default Sidebar;
