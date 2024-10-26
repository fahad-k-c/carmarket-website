import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import Header from "./components/ui/Header";
import Hero from "./components/ui/Hero";
import Category from "./components/ui/Category";
import MostSearchedCar from "./components/ui/MostSearchedCar";
import InfoSection from "./components/ui/InfoSection";
import Footer from "./components/ui/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Category />
      <MostSearchedCar />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Home;
