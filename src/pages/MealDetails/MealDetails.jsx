import { Button, Rating, Stack, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { ThumbUp } from "@mui/icons-material";
import moment from "moment/moment";
import useAxios from "../../hooks/useAxios";
import useUser from "../../hooks/useUser";
import { Helmet } from "react-helmet";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#1C64F2",
  },
});

const MealDetails = () => {
  const { user } = useAuth();
  const { userDB, loading } = useUser();
  const axiosPublic = useAxios();
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRequested, setIsRequested] = useState(true);
  const [meal, setMeal] = useState(useLoaderData());

  // check if the user already requested for the meal
  const checkIsRequested = async () => {
    const res = await axiosPublic.get(
      `/requestedMeals?userEmail=${user?.email}&mealId=${meal._id}`,
    );
    if (!res.data) {
      setIsRequested(false);
    } else if (res.data._id) {
      setIsRequested(true);
    }
  };

  if ((user?.email, meal?._id)) {
    checkIsRequested();
  }

  const {
    data: reviews,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["getReviews"],
    queryFn: async () => {
      const data = await axiosPublic.get(`/reviews/${meal._id}`);
      return data.data;
    },
  });

  const handleRequest = async () => {
    if (!user) {
      toast.error("You have to login first.");
      return;
    } else if (userDB.badge === "Bronze") {
      toast.error(`You have to subscribe to a membership.`);
      return;
    } else if (isRequested) {
      toast.error(`You've already requested for ${meal.title}`);
      return;
    }
    const request = {
      requester: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
      requestedMeal: {
        id: meal._id,
        title: meal.title,
        image: meal.image,
      },
      status: "Pending",
      requestedAt: new Date().toISOString(),
    };
    const res = await axiosPublic.post("requestedMeals", request);
    if (res.data.insertedId) {
      setIsRequested(true);
      toast.success(`Your request for ${meal.title} is submitted!`);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleReview = async (event) => {
    event.preventDefault();
    if (!rating) {
      return;
    }
    const review = event.target.review.value;
    const postedAt = new Date().toISOString();
    const newReview = {
      mealId: meal._id,
      reviewer: {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      review: review,
      rating: rating,
      postedAt: postedAt,
    };
    const response = await axiosPublic.post("/reviews", newReview);
    if (response.data.reviewInsert.insertedId) {
      refetch();
      event.target.reset();
      setRating(0);
      toast.success("Your review is posted.");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleLike = async () => {
    if (!user?.email) {
      toast.error("You have to login first.");
      return;
    }
    const res = await axiosPublic.put(`/likes/${meal._id}`);
    if (res.data.modifiedCount > 0) {
      const updatedMeal = await axiosPublic.get(`/meals/${meal._id}`);
      setMeal(updatedMeal.data);
      setIsLiked(true);
      toast.success(`You liked ${meal.title}`);
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (isPending || loading) {
    return <Loader />;
  }
  return (
    <div className="bg-white">
      <Helmet>
        <title>{meal.title} | HostelMate</title>
      </Helmet>
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className=" rounded shadow-md relative">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full aspect-[251/171] rounded object-cover mx-auto"
              />
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-800">{meal.title}</h3>
            <div className="flex items-center space-x-1 mt-2">
              <Stack spacing={1}>
                <StyledRating
                  name="customized-color"
                  defaultValue={meal.rating}
                  precision={0.1}
                  readOnly
                />
              </Stack>
              <h4 className="text-gray-500 text-base !ml-3">
                {reviews.length} Reviews
              </h4>
              <h4 className="text-gray-500 text-base !ml-3">
                {meal.likes} Likes
              </h4>
            </div>
            <p className="text-sm text-gray-500 mt-2">{meal.description}</p>
            <div className="flex flex-wrap gap-4 mt-3 md:mt-6">
              <p className="text-gray-800 text-2xl font-bold">৳{meal.price}</p>
              <p className="text-gray-500 text-base">
                <strike>৳{Math.ceil(meal.price * 1.09)}</strike>
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>
            <div className="mt-3 md:mt-6 flex-1">
              <h3 className="text-xl font-bold text-gray-800">Ingredients</h3>
              <div className="flex flex-col flex-wrap gap-1 mt-4">
                {meal.ingredients.map((ingred, indx) => {
                  return (
                    <p key={indx}>
                      {indx + 1}. {ingred}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-4 mt-3 md:mt-12 max-w-md">
              {isRequested ? (
                <Button size="large" fullWidth variant="contained" disabled>
                  Meal Requested
                </Button>
              ) : (
                <Button
                  onClick={handleRequest}
                  size="large"
                  fullWidth
                  variant="contained"
                >
                  Request Meal
                </Button>
              )}
              {isLiked ? (
                <Button
                  onClick={handleLike}
                  variant="outlined"
                  startIcon={<ThumbUp />}
                  disabled
                >
                  Liked
                </Button>
              ) : (
                <Button
                  onClick={handleLike}
                  variant="outlined"
                  startIcon={<ThumbUp />}
                >
                  Like
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Meal information</h3>
          <ul className="mt-4 space-y-2 text-gray-800">
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Category <span className="ml-4 float-right">{meal.category}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Distributor
              <span className="ml-4 float-right">{meal.distributor.name}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Distributor email
              <span className="ml-4 float-right">{meal.distributor.email}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Likes
              <span className="ml-4 float-right">{meal.likes}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Reviews
              <span className="ml-4 float-right">{reviews.length}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Rating <span className="ml-4 float-right">{meal.rating}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Posted at
              <span className="ml-4 float-right">
                {moment(meal.postTime).fromNow()}
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 mx-auto mt-5 md:mt-12 bg-secondary bg-opacity-30 rounded-lg shadow-md max-w-5xl sm:p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-3 col-span-1">
            <form
              onSubmit={handleReview}
              action
              method="POST"
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Write a review
              </h2>
              <Stack spacing={1}>
                <StyledRating
                  name="customized-color"
                  value={rating}
                  precision={1}
                  onChange={(event) => {
                    setRating(parseInt(event.target.value));
                  }}
                />
              </Stack>
              <textarea
                id="review"
                name="review"
                rows={4}
                required
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your review"
              />
              <div className="text-right py-4">
                {user?.email ? (
                  <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3">
                    Post Review
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3"
                  >
                    Login to Post Review
                  </Link>
                )}
              </div>
            </form>
          </div>
          <div className="lg:col-span-3 hidden lg:flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold text-gray-700">
              Review Guidelines
            </h1>
            <p className="text-gray-700 mb-4">
              We value your feedback and encourage you to share your experience
              with us. To ensure a positive and helpful environment, please keep
              the following in mind when writing your review:
            </p>

            <ul className="list-inside space-y-1 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold">1. Be Respectful</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold">2. Be Honest and Specific</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold">3. Stay Relevant</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold">
                  4. Avoid Sensitive Information
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold">5. Keep it Appropriate</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 md:mt-12 bg-gray-50 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
          <h3 className="text-xl font-bold text-gray-800">
            Reviews {reviews.length}
          </h3>
          <div className="lg:p-10 p-6">
            <div className="max-w-6xl max-lg:max-w-3xl mx-auto">
              <div className="max-w-2xl">
                <h2 className="text-gray-800 text-2xl font-bold">
                  What our happy customers say
                </h2>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 space-y-4 mt-12 max-sm:max-w-md max-sm:mx-auto">
                {reviews.map((review) => {
                  return (
                    <div
                      key={review._id}
                      className="break-inside-avoid p-6 rounded-lg bg-white shadow border"
                    >
                      <div className="flex items-center">
                        <img
                          src={review.reviewer.photoURL}
                          className="w-11 h-11 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="text-gray-800 text-sm font-semibold">
                            {review.reviewer.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {review.reviewer.email}
                          </p>
                          <span className="text-xs text-gray-500">
                            {moment(review.postedAt).fromNow()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                      <div className="flex space-x-1 mt-4">
                        <Stack spacing={1}>
                          <StyledRating
                            name="customized-color"
                            defaultValue={review.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </Stack>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
