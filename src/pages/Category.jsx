import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const CATEGORY = gql`
  query GetCategoryWithReviews($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          Name
          reviews {
            data {
              id
              attributes {
                Title
                Body
                Rating
                categories {
                  data {
                    id
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {/* Directly access the category name */}
      <h2>{data?.category?.data?.attributes?.Name} Reviews</h2>

      {/* Iterate over reviews directly from the data */}
      {data?.category?.data?.attributes?.reviews?.data?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.Rating}</div>
          <h2>{review.attributes.Title}</h2>

          {/* Access the categories associated with the review */}
          <div>
            {review.attributes.categories?.data?.map((c) => (
              <small key={c.id}>{c.attributes.Name}</small>
            ))}
          </div>

          <p>{review.attributes.Body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
