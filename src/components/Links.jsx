import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import OurWork from "../pages/OurWork";
import Reviews from "../pages/Reviews";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";

import AboutPost from "./AboutPost";
import OurWorkPost from "./OurWorkPost";
import ProjectTypePosts from "../pages/ProjectType";
import ServiceDetails from "./ServiceDetails";
import ServiceDetailsExpanded from "./ServiceDetailsExpanded";
import ServiceDetailsType from "./ServiceDetailsType";


const Links = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/services/details/:slug" element={<ServiceDetailsExpanded />} />
      <Route path="/service-type/:id" element={<ServiceDetailsType />} />
      <Route path="/difficulty-level/:id" element={<ServiceDetailsType />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/ourwork" element={<OurWork />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about/:slug" element={<AboutPost />} />
      <Route path="/our-work/:slug" element={<OurWorkPost />} />
      <Route path="/our-work/project-type/:id" element={<ProjectTypePosts />} />
    </Routes>
  );
};


export default Links;
