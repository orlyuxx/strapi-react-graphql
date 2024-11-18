import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { loading, error, data } = useFetch(
    "http://localhost:1338/api/reviews"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Full response:", data);
  console.log("Review data:", data?.data); // Log review data separately

  const reviews = data?.data || [];

  return (
    <div>
      {reviews.map((review) => {
        const { id, attributes } = review;
        const {
          Title = "No Title",
          Body = "No body content available",
          Rating = "No rating",
        } = attributes || {};

        return (
          <div key={id} className="review-card">
            <div className="rating">{Rating}</div>
            <h2>{Title}</h2>
            <small>console list</small>
            <p>{Body.length > 200 ? Body.substring(0, 200) + "..." : Body}</p>
            <Link to={`/details/${id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
}
