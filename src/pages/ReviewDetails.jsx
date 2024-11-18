import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query getReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          Title
          Rating
          Body
        }
      }
    }
  }
`;

export default function ReviewDetails() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log the data to inspect its structure
  console.log(data);

  return (
    <div className="review-card">
      <div className="rating">
        {data?.review?.data?.attributes?.Rating || "No rating"}
      </div>
      <h2>{data?.review?.data?.attributes?.Title || "No Title"}</h2>
      <small>console list</small>
      <p>
        {data?.review?.data?.attributes?.Body || "No body content available"}
      </p>
    </div>
  );
}
