import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Achievements from "./Achievements";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";

const Portfolio = () => {
  return (
    <div className="portfolio">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Achievements />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;