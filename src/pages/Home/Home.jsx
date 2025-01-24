import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Meals from "./Meals";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | HostelMate</title>
      </Helmet>
      <Banner />
      <Meals />
    </div>
  );
};

export default Home;
