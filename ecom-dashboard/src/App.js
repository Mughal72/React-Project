import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./Login"
import Register from "./Register"
import UpdateProduct from "./UpdateProduct"
import AddProduct from "./AddProduct";
import Protected from "./Protected"
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";


function App() {
  return (
    <div className="App">
      <BrowserRouter>

      {/* <h1>E-Comm Dashboard Project</h1> */}
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<Protected Cmp={AddProduct} />} />
      <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
      <Route path="/search" element={<Protected Cmp={SearchProduct} />} />
      <Route path="/" element={<Protected Cmp={ProductList} />} />
      </Routes>

      </BrowserRouter>
    
    </div>
  );
}

export default App;
