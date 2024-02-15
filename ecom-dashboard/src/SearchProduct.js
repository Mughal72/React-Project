import React, { useState } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";

function SearchProduct() {
  const [data, setData] = useState([]);

  async function search(key) {
    if (key.length > 1) {
      let result = await fetch("http://localhost:8000/api/search/" + key);
      result = await result.json();
      console.warn(result);
      setData(result);
    }
  }

  return (
    <div>
      <Header />

      <div className="col-sm-6 offset-sm-3">
        <br />
        <h1>Search Product</h1>
        <br />
       
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            className="form-control"
            placeholder="Search product"
          />
        
        <br />
        {data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      style={{ width: 100 }}
                      src={"http://localhost:8000/" + item.file_path}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
<span >Search Product </span>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
