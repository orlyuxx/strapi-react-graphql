import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query getCategories {
    categories {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;

const SiteHeader = () => {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data?.categories?.data || [];

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Game Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.Name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
