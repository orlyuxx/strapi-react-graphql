import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useFetch(
    `http://localhost:1338/api/reviews/${id}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log the data to inspect its structure
  console.log(data);

  // Safely access the review data
  const review = data?.data || {};

  // Destructure attributes safely
  const {
    Title = "No Title",
    Body = "No body content available",
    Rating = "No rating",
  } = review?.attributes || {};

  return (
    <div className="review-card">
      <div className="rating">{Rating}</div>
      <h2>{Title}</h2>
      <small>console list</small>
      <p>{Body}</p>
    </div>
  );
}
