import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { Products } from "../components/Products";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import ScrolllToTop from "../ScrollToTop";

const Home = () => {
  return (
    <>
      <ScrolllToTop />
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products home={true} category="" filters="" sort="" />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
