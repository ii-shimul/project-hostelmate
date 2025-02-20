import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Meals from "./Meals";
import Membership from "./Membership";
import Features from "./Features";
import FAQ from "./FAQ";
import Stats from "./Stats";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | HostelMate</title>
      </Helmet>
      <Banner />
      <Meals />
      <Features/>
      <Stats/>
      <Membership/>
      <Testimonials/>
      <Newsletter/>
      <FAQ/>
    </div>
  );
};

export default Home;
