import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddVariant() {
    const { id } = useParams();
    const productid = id;
    const navigate = useNavigate();

    const [message, setmessage] = useState("");

    const [sizeOptions, setSizeOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [variants, setVariants] = useState([
        { size: '', color: '', stock: '', sku: '' }
    ]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const sizeResponse = await axios.get('http://127.0.0.1:8000/size-options/');
                const colorResponse = await axios.get('http://127.0.0.1:8000/color-options/');
                setSizeOptions(sizeResponse.data);
                setColorOptions(colorResponse.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newVariants = [...variants];
        newVariants[index][name] = value;
        setVariants(newVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { size: '', color: '', stock: '', sku: '' }]);
    };

    const handleRemoveVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/product-variants/bulk_create/', {
                product: productid,
                variants
            });
            console.log('Variants created successfully:', response.data);
            setmessage("Varinat added succesy full")
            navigate('/admin/productlist');
            
        } catch (error) {
            console.error('Error creating variants:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Add Variant </h1>
            <p className='font-bold text-green-700'>{message}</p>
            <form onSubmit={handleSubmit}>
                {variants.map((variant, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Size:
                                <select
                                    name="size"
                                    value={variant.size}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Size</option>
                                    {sizeOptions.map((size) => (
                                        <option key={size.id} value={size.id}>
                                            {size.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Color:
                                <select
                                    name="color"
                                    value={variant.color}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Color</option>
                                    {colorOptions.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Stock:
                                <input
                                    type="number"
                                    name="stock"
                                    value={variant.stock}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                SKU:
                                <input
                                    type="text"
                                    name="sku"
                                    value={variant.sku}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveVariant(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Remove Variant
                        </button>
                    </div>
                ))}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleAddVariant}
                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Add Another Variant
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Variants
                </button>
            </form>
        </div>
    );
}

export default AddVariant;
