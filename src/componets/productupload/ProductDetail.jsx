import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct(id);
    }, [id,product]);

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/productslist/${productId}/`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleCheckout = async (variantId) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/decrement-stock/${variantId}/`);
            setProduct(prevProduct => {
                const updatedVariants = prevProduct.variants.map(variant => 
                    variant.id === variantId ? { ...variant, stock: response.data.stock } : variant
                );
                return { ...prevProduct, variants: updatedVariants };

            });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            {product ? (
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                    <img 
                            src={`${product.ProductImage}`}  
                            alt={product.ProductName} 
                            className="w-full h-96 object-cover rounded-lg shadow-md mb-4 md:mb-0"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.ProductName} </h2>
                        <p className="text-lg text-gray-700 mb-2"><strong>Product Code:</strong> {product.ProductCode}</p>
                        <p className="text-lg text-gray-700 mb-2"><strong>HSN Code:</strong> {product.HSNCode}</p>
                        <p className="text-lg text-gray-700 mb-2"><strong>Total Stock:</strong> {product.TotalStock}</p>
                        <p className="text-lg text-gray-700 mb-2"><strong>Is Favourite:</strong> {product.IsFavourite ? 'Yes' : 'No'}</p>
                        <p className="text-lg text-gray-700 mb-2"><strong>Active:</strong> {product.Active ? 'Yes' : 'No'}</p>

                        {product.variants && product.variants.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Variants</h3>
                                <div className="space-y-4">
                                    {product.variants.map(variant => (
                                        <div key={variant.id} className="p-4 bg-gray-100 rounded-lg shadow">
                                            <p className="text-lg text-gray-700"><strong>Size:</strong> {variant.size.name}</p>
                                            <p className="text-lg text-gray-700"><strong>Color:</strong> {variant.color.name}</p>
                                            <p className="text-lg text-gray-700"><strong>Stock:</strong> {variant.stock}</p>
                                            <p className="text-lg text-gray-700"><strong>SKU:</strong> {variant.sku}</p>
                                            <button 
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                                                onClick={() => handleCheckout(variant.id)}
                                            >
                                                Check Out
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-700">Loading product details...</p>
            )}
        </div>
    );
}

export default ProductDetail;
