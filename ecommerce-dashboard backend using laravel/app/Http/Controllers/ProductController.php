<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    //

    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name=$req->input('name');
        $product->price=$req->input('price');
        $product->description=$req->input('description');
        $product->file_path=  $req->file('file')->store('products');
        $product->save();
        return $product;

    }
    function list(){
        return Product::all();
    }

    function delete($id){
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        
        $result = $product->delete();

        if ($result){
            return ['result' => "Product has been deleted successfully"];
        } else {
            return response()->json(['error' => 'Deletion failed'], 500);
        }
    }

    function getProduct($id){
        return  Product::find($id);
    }

    function updateProduct($id, Request $req){
        // return $req->input();
        $product =  Product::find($id);
        $product->name=$req->input('name');
        $product->price=$req->input('price');
        $product->description=$req->input('description');
       if($req->file('file')){
         $product->file_path=  $req->file('file')->store('products');
       }
       
        $product->save();
        return $product;
    }

    function search($key){
        // return $key;
        return Product::where('name', 'LIKE', "%$key%")->get();
    }

}
