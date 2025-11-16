import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import link from '../utilities/exportor';

const FrontEnd = () => {

    const Params = useParams();
    const Product_ID = Params.id;

    return (
        <AddProduct id={Product_ID} />
    )
}

const AddProduct = ({ id }) => {

    const [productData, setProductData] = useState({
        productName: '',
        productPrice: '',
        productColour: '',
        productHeight: '',
        productLength: '',
        productWidth: '',
        productQuantity: '',
        brandName: '',
        brandOrigin: '',
        brandAddress: '',
        brandSellerName: '',
    });

    const Navigate = useNavigate();

    const [Page_Title, setPage_Title] = useState("Add Product Details");
    const [Error, setError] = useState("");

    useEffect(() => {
        if (id) {
            link.api.GetOne("products", id)
                .then(data => {
                    setProductData({
                        productName: data?.productName,
                        productPrice: data?.productPrice,
                        productColour: data?.productColour,
                        productHeight: data?.productHeight,
                        productLength: data?.productLength,
                        productWidth: data?.productWidth,
                        productQuantity: data?.productQuantity ?? "",
                        brandName: data?.brandName,
                        brandOrigin: data?.brandOrigin,
                        brandAddress: data?.brandAddress,
                        brandSellerName: data?.brandSellerName,
                    });
                    setProductData(data);
                });
            setPage_Title("Update Product Details");
        }
    }, []);


    const sendData = (event) => {
        event.preventDefault();

        setError("Error");
        const hasErrors = Object.keys(productData).some((key) => productData[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        }
        // console.log(productData);

        if (id) {
            link.api.Update("products", id, productData).then(status => {
                if (status === 200) {
                    toast.success(productData.productName + " updated succussfully");
                    Navigate(link.url.listofProduct);
                }
            });
        } else if (!id) {
            link.api.Create("products", productData).then(status => {
                if (status === 200) {
                    toast.success("Product added succussfully");
                    resetForm()
                }
            });
        }
    };

    const resetForm = () => {
        setProductData({
            productName: '',
            productPrice: '',
            productColour: '',
            productHeight: '',
            productLength: '',
            productWidth: '',
            productQuantity: '',
            brandName: '',
            brandOrigin: '',
            brandAddress: '',
            brandSellerName: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <h1 className="pm-title">{Page_Title}</h1>
                <div className="product-card">
                    <form className="form-grid" onSubmit={sendData}>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Product Name(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productName"
                                    value={productData.productName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Price (₹)(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productPrice"
                                    value={productData.productPrice}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Colour(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productColour"
                                    value={productData.productColour}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Height(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productHeight"
                                    value={productData.productHeight}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Length(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productLenth"
                                    value={productData.productLength}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Width(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productWidth"
                                    value={productData.productWidth}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Quantity(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="productQuantity"
                                    value={productData.productQuantity}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Brand Name(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="brandName"
                                    value={productData.brandName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Brand Address(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="brandAddress"
                                    value={productData.brandAddress}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Brand Origin(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="brandOrigin"
                                    value={productData.brandOrigin}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Seller Name(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="brandSellerName"
                                    value={productData.brandSellerName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-span-2 pm_button_div">
                            <button className="redButton" type="button" onClick={() => Navigate(link.url.listofProduct)}>Cancel</button>
                            <button className="commonButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default FrontEnd;