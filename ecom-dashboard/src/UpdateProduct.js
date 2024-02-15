import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from 'react-router-dom';

function UpdateProduct(props) {
    const [data, setData] = useState({
        name: '',
        price: '',
        description: '',
        file_path: ''
    });

    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await fetch(`http://localhost:8000/api/product/${id}`);
                const productData = await result.json();
                setData(productData);
                setName(productData.name);
                setPrice(productData.price);
                setDescription(productData.description);
                setFile(productData.file_path);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    async function editProduct(productId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description)
        let result = await fetch("http://localhost:8000/api/updateproduct/"+id+"?_method=PUT", {
          method: 'POST',
          body: formData
        });
        
        alert("Data has been updated")
  
        
    }

    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Update Product Page</h1>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
                <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} /> <br /><br />
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} /> <br /><br />
                <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} /> <br /><br />
                <img style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path} alt={data.name} /><br /><br />
                <button onClick={() => editProduct(data.id)} className="update">Update</button>
            </div>
        </div>
    )
}

export default UpdateProduct;
