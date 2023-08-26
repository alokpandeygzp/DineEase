import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddProducts() {
  const [products, setProducts] = useState({
    CategoryName: "",
    name: "",
    options: [],
    description: "",
    img: "",
  });

  const onChange = (event) => {
    setProducts({ ...products, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/addproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid details");
    }
    if (json.success) {
      alert("Product added successfully");
      
    
      const addedItems = JSON.parse(localStorage.getItem("addedItems")) || [];
      addedItems.push(json.itemId);
      localStorage.setItem("addedItems", JSON.stringify(addedItems));

      setProducts({
        CategoryName: "",
        name: "",
        options: [],
        description: "",
        img: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <h3 className="text-center">Adding Product:</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <select
              className="form-select"
              name="CategoryName"
              value={products.CategoryName}
              onChange={onChange}
            >
              <option value="">Select a category</option>
              <option value="Biryani/Rice">Biryani/Rice</option>
              <option value="Starter">Starter</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={products.name}
              onChange={onChange}
            />
          </div>

          {products.CategoryName === "Biryani/Rice" ||
          products.CategoryName === "Starter" ? (
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label>Full:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full"
                    value={products.options.full || ""}
                    onChange={(e) =>
                      setProducts({
                        ...products,
                        options: { ...products.options, full: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col">
                  <label>Half:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="half"
                    value={products.options.half || ""}
                    onChange={(e) =>
                      setProducts({
                        ...products,
                        options: { ...products.options, half: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ) : products.CategoryName === "Pizza" ? (
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label>Regular:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="regular"
                    value={products.options.regular || ""}
                    onChange={(e) =>
                      setProducts({
                        ...products,
                        options: { ...products.options, regular: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col">
                  <label>Medium:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="medium"
                    value={products.options.medium || ""}
                    onChange={(e) =>
                      setProducts({
                        ...products,
                        options: { ...products.options, medium: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col">
                  <label>Large:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="large"
                    value={products.options.large || ""}
                    onChange={(e) =>
                      setProducts({
                        ...products,
                        options: { ...products.options, large: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              name="img"
              value={products.img}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={products.description}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Add Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
