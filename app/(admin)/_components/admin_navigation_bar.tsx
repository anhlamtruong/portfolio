"use client";

import UserButton from "@/app/(auth)/_components/auth_account_button";

const NavigationBar = () => {
  return (
    <div className=" border-b">
      <div className="flex h-18 items-center px-4">
        <div className=" mr-auto flex items-center space-x-4 justify-center content-center">
          {/* //TODO: Add redirect whenever signing out */}
          <UserButton initialData={null}></UserButton>
        </div>
        <div>This will be a store switcher</div>
        <div>This will be router</div>
      </div>
      test
    </div>
  );
};

export default NavigationBar;
