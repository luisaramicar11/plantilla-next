"use client"
import { useTranslations } from "next-intl";

const HomePage = () => {
  const traduction = useTranslations("Navbar");
  return (
    <div>
      <h1>{traduction("home")}</h1>
    </div>
  );
};
export default HomePage;