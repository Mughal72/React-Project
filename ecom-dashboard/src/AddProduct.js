import React, {useState} from "react";
import Header from "./Header";
function AddProduct(){
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


  async  function addProduct(){
      console.warn(name, file, price, description);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description)
      let result = await fetch("http://localhost:8000/api/addProduct", {
        method: 'POST',
        body: formData
      });
      
      alert("Data has been saved")

    }
    return(

        <div>
        <Header/>
        
        <div className="col-sm-6 offset-sm-3">
               <br />
            <input type="text" className="form-control" placeholder="name" 
            onChange={(e)=>setName(e.target.value)}/> <br />
           <input type="file" name="file" className="form-control" placeholder="file" onChange={(e)=>setFile(e.target.files[0])}/> <br />

            <input type="text" className="form-control" placeholder="price"
             onChange={(e)=>setPrice(e.target.value)}/> <br />
            <input type="text" className="form-control" placeholder="description"
             onChange={(e)=>setDescription(e.target.value)}/> <br />
            <button onClick={addProduct} className="btn btn-primary">Add Product</button>
        </div>
        </div>
    )
}
export default AddProduct;