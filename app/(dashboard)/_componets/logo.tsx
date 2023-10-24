import Image from "next/image";

const Logo = () => {
  return (
    <Image
      height={130}
      width={130}
      alt="Logo"
      src="/dashboard/Cookit-logo.png"
    />
  );
};

export default Logo;
