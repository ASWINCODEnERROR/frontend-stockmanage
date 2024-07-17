import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from './authorization/PrivateAuth';
import Login from '../../componets/authpages/Login';
// import Createproduct from '../../componets/productupload/Createproduct';
import PostProdut from '../../componets/productupload/PostProdut';
import Addvariant from '../../componets/productupload/Addvariant';
import ProductList from '../../componets/productupload/ProductList';
import ProductDetail from '../../componets/productupload/ProductDetail';





function AdminRoutes() {
    return (
        <div>
            <Routes>

                <Route element={<PrivateAuth />}>
   


                    {/* <Route path="/create" element={<Createproduct />}></Route> */}
                    <Route path="/addproduct" element={<PostProdut />}></Route>
                    <Route path="/add-variant/:id" element={<Addvariant />} />
                    <Route path="/productlist" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail/>} />


                    


             
                    

                    
                    

                </Route>


            </Routes>
        </div>
    )
}

export default AdminRoutes
