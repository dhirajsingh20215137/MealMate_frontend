import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { IconButton, Box, Grid } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MealCarousel = ({ meals }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < Math.ceil(meals.length / 3) - 1) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const chunkMeals = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

  const slides = chunkMeals(meals, 3); // Show 3 meals per slide

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden", mt: 4 }}>
      <SwipeableViews index={index} onChangeIndex={setIndex} enableMouseEvents>
        {slides.map((group, idx) => (
          <Grid container spacing={2} key={idx} justifyContent="center">
            {group.map((meal) => (
              <Grid item key={meal.foodId}>
                <img
                  src={meal.imageUrl}
                  alt={meal.foodName}
                   className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
                  style={{ width: 200, height: 150, objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </SwipeableViews>

      {/* Navigation Arrows */}
      <Box sx={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <IconButton onClick={handlePrev} disabled={index === 0} sx={{ mx: 1, bgcolor: "white", ":hover": { bgcolor: "gray.200" } }}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={handleNext} disabled={index === slides.length - 1} sx={{ mx: 1, bgcolor: "white", ":hover": { bgcolor: "gray.200" } }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MealCarousel;
