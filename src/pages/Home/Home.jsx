import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Meals from "./Meals";
import Membership from "./Membership";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | HostelMate</title>
      </Helmet>
      <Banner />
      <Meals />
      <Membership/>
    </div>
  );
};

export default Home;
