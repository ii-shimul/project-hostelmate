import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxios from "../../hooks/useAxios";
import InfiniteScroll from "react-infinite-scroll-component";
import DotLoader from "react-spinners/DotLoader";
import { Helmet } from "react-helmet";
import { motion } from "motion/react";
import { TextField } from "@mui/material";
import MealCard from "./MealCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Meals = () => {
  const axiosPublic = useAxios();
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    const searchMeals = async () => {
      try {
        const result = await axiosPublic.post("/search-meals", { searchValue });
        setMeals(result.data.results);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    if (searchValue) {
      searchMeals();
    }
  }, [searchValue, axiosPublic]);

  useEffect(() => {
    const searchMeals = async () => {
      try {
        const result = await axiosPublic.post("/filter-meals", {
          minPrice,
          maxPrice,
          category,
        });
        setMeals(result.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    if (minPrice || maxPrice || category) {
      searchMeals();
    }
  }, [minPrice, maxPrice, category, axiosPublic]);

  const fetchMeals = async () => {
    try {
      const response = await axiosPublic.get(`/meals?page=${page}&limit=8`);
      const { meals: newMeals, hasMore: more } = response.data;

      setMeals((prevMeals) => [...prevMeals, ...newMeals]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(more);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  if (!meals.length && page === 1) {
    fetchMeals();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto"
    >
      <Helmet>
        <title>Meals | HostelMate</title>
      </Helmet>
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl">
        <SectionTitle
          title="Delicious Meals Just for You"
          subtitle={
            "Explore a variety of freshly prepared dishes to satisfy every craving."
          }
        ></SectionTitle>
        <div className="mb-3 flex gap-2 items-center">
          <TextField
            onChange={(event) => setSearchValue(event.target.value)}
            className=""
            fullWidth
            label="Search"
            id="fullWidth"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
              <MenuItem value={"Lunch"}>Lunch</MenuItem>
              <MenuItem value={"Dinner"}>Dinner</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            onChange={(e) => setMinPrice(e.target.value)}
            label="MinPrice"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            onChange={(e) => setMaxPrice(e.target.value)}
            label="MaxPrice"
            variant="outlined"
          />
        </div>
        {searchValue !== "" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
            <MealCard meals={meals} />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={meals.length}
            next={fetchMeals}
            hasMore={hasMore}
            loader={<DotLoader className="mx-auto my-4" size={40} />}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
              <MealCard meals={meals} />
            </div>
          </InfiniteScroll>
        )}
      </div>
    </motion.div>
  );
};

export default Meals;
