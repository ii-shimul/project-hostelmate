import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Meals from "./Meals";
import Membership from "./Membership";
import Features from "./Features";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | HostelMate</title>
      </Helmet>
      <Banner />
      <Meals />
      <Features/>
      <Membership/>
      <FAQ/>
    </div>
  );
};

export default Home;
