import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div style={{ backgroundColor: "#222", color: "#fff" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {orderData !=={} ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {Array(orderData).map((data) => (
                  <React.Fragment key={data.id}>
                    
                    {data.orderData ? (
                      data.orderData.order_data
                        .slice(0)
                        .reverse()
                        .map((item) =>
                        
                          item.map((arrayData,index) => (

                            <tr key={arrayData.id}>
                              {arrayData.Order_date ? (
                                <td colSpan="5">
                                  <div className="m-auto mt-5">
                                    {arrayData.Order_date}
                                  </div>
                                  <hr />
                                </td>
                              ) : (
                                <>
                                  <td>{index}</td>
                                  <td>{arrayData.name}</td>
                                  <td>{arrayData.qty}</td>
                                  <td>{arrayData.size}</td>
                                  <td>₹{arrayData.price}/-</td>
                                </>
                              )}
                            </tr>
                          ))
                        )
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              No orders found.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
