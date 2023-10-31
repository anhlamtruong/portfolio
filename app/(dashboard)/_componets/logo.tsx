import { useStyles } from "@/hooks/useStyles";
import Image from "next/image";

const Logo = () => {
  const styles = useStyles();
  return (
    <Image
      color="red"
      style={styles.hoverText}
      height={130}
      width={130}
      alt="Cookit Logo"
      src="/dashboard/cookit-logo.png"
    />
  );
};

export default Logo;
