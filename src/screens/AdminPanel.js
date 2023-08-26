import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminPanel() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/food_items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Item Deleted");
        setFoodItem((prevFoodItems) =>
          prevFoodItems.filter((item) => item._id !== itemId)
        );
        
        const deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || []; // Retrieve the array of deleted item IDs from local storage
        deletedItems.push(itemId); // Add the deleted item ID to the array
        localStorage.setItem("deletedItems", JSON.stringify(deletedItems)); // Store the updated array in local storage

      } else {
        alert("Item not deleted");
      }
    } catch (error) {
      alert("Item not deleted");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
  
      const deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || [];
      const addedItems = JSON.parse(localStorage.getItem("addedItems")) || [];
  
      const filteredItems = data[0].filter((item) => !deletedItems.includes(item._id));
      const updatedFoodItems = [...filteredItems, ...addedItems];
  
      setFoodItem(updatedFoodItems);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    const addedItems = JSON.parse(localStorage.getItem("addedItems")) || [];
    setFoodItem((prevFoodItems) => [...prevFoodItems, ...addedItems]);
    fetchData();
  }, []);
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div
            className="carousel-inner"
            id="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <div>
                              <div
                                className="card mt-3"
                                style={{ width: "18rem", maxHeight: "360px" }}
                              >
                                <img
                                  src={filterItems.img}
                                  className="card-img-top"
                                  alt="..."
                                  style={{ height: "120px", objectFit: "fill" }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {filterItems.name}
                                  </h5>
                                  <hr />
                                  <button
                                    className="btn btn-success justify-center ms-2"
                                    onClick={() => handleDelete(filterItems._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found!</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
