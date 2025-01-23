import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import useMeals from "../../hooks/useMeals";
import MealGrid from "./MealGrid";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Meals = () => {
  const [value, setValue] = useState("1");
  const [meals, loading, ] = useMeals();
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // filter meals by category
  const breakfasts = meals
    .filter((meal) => meal.category === "Breakfast")
    .slice(0, 4);
  const lunchs = meals.filter((meal) => meal.category === "Lunch").slice(0, 4);
  const dinners = meals
    .filter((meal) => meal.category === "Dinner")
    .slice(0, 4);

  // function for tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto mt-16">
      <SectionTitle
        title={"Our Top Meals"}
        subtitle={
          "Whether you are looking for a hearty breakfast, a light lunch, or adelicious dinner, we have something for everyone."
        }
      ></SectionTitle>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              centered
              aria-label="lab API tabs example"
            >
              <Tab label="Breakfast" value="1" />
              <Tab label="Lunch" value="2" />
              <Tab label="Dinner" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MealGrid meals={breakfasts}></MealGrid>
          </TabPanel>
          <TabPanel value="2">
            <MealGrid meals={lunchs}></MealGrid>
          </TabPanel>
          <TabPanel value="3">
            <MealGrid meals={dinners}></MealGrid>
          </TabPanel>
        </TabContext>
      </Box>
      <Link to={"meals"} className="flex justify-center items-center">
        <Button
          text="View All Meals"
          bgColor="bg-primary"
          textColor="text-secondary"
        ></Button>
      </Link>
    </div>
  );
};

export default Meals;
