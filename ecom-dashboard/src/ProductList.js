import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Header from "./Header";
import {Link} from 'react-router-dom';

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
    // const fetchData = async () => {
    //   try {
    //     const result = await fetch("http://localhost:8000/api/list");
    //     const responseData = await result.json();
    //     setData(responseData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, []);
   async   function deleteOperation(id){
       let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method: "DELETE"
        });
        result = await result.json();
        console.warn(result)
        getData()
        //  alert(id)
     }
//   console.warn("data", data);

async function getData(){
    let result = await fetch("http://localhost:8000/api/list");
    result = await result.json();
    setData(result)

}

  return (
    <div>
      <Header />
      <div className="col-sm-10 offset-sm-1">
      <h1>ProductList Page</h1>
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
              <td><span onClick={ () =>{deleteOperation(item.id)}}  className="delete">Delete</span></td>
              <td><Link to={'update/'+item.id}><span className="update">Update</span></Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export default ProductList;
