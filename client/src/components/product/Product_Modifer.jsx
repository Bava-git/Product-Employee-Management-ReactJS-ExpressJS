import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import MiniNavbar, { productLinks } from '../Mini-Nav';
import link from '../utilities/exportor';
import { toast } from 'sonner';

const FrontEnd = () => {

    const Params = useParams();
    const Product_ID = Params.id;

    return (
        <AddProduct id={Product_ID} />
    )
}

const AddProduct = ({ id }) => {
    // To update an product details
    const [productName, setproductName] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const [productColour, setproductColour] = useState("");
    const [productLenth, setproductLenth] = useState("");
    const [productWidth, setproductWidth] = useState("");
    const [productHeight, setproductHeight] = useState("");
    const [brandName, setbrandName] = useState("");
    const [brandOrigin, setbrandOrigin] = useState("");
    const [brandAddress, setbrandAddress] = useState("");
    const [brandSellerName, setbrandSellerName] = useState("");

    const [productData, setProductData] = useState({
        productName: '',
        productPrice: '',
        productColour: '',
        productHeight: '',
        productLenth: '',
        productWidth: '',
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
                    setproductName(data.productName);
                    setproductPrice(data.productPrice);
                    setproductColour(data.productColour);
                    setproductLenth(data.productLenth);
                    setproductWidth(data.productWidth);
                    setproductHeight(data.productHeight);
                    setbrandName(data.brandName);
                    setbrandOrigin(data.brandOrigin);
                    setbrandAddress(data.brandAddress);
                    setbrandSellerName(data.brandSellerName);
                })
            setPage_Title("Update Product Details");
        }
    }, []);


    const Data = (event) => {
        event.preventDefault();

        setError("Error");

        const newProductdata = {
            productName, productPrice, productColour, productHeight, productLenth, productWidth, productQuntity, brandName,
            brandOrigin, brandAddress, brandSellerName,
        };

        // console.log(newProductdata);

        if (id) {
            link.api.Update("products", id, newProductdata).then(status => {
                if (status === 200) {
                    toast.success(newProductdata.productName + " updated succussfully");
                    Navigate(link.url.listofProduct);
                }
            });
        } else if (!id) {
            link.api.Create("products", newProductdata).then(status => {
                if (status === 200) {
                    toast.success("Product added succussfully");
                    resetForm()
                }
            });
        }
    };

    const resetForm = () => {
        setproductName("");
        setproductPrice("");
        setproductColour("");
        setproductLenth("");
        setproductWidth("");
        setproductHeight("");
        setbrandName("");
        setbrandOrigin("");
        setbrandAddress("");
        setbrandSellerName("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', productData);
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
                    <form className="form-grid" onSubmit={handleSubmit}>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Product Name</p>
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
                                <p className="label-text">Product Price (₹)</p>
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
                                <p className="label-text">Product Colour</p>
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
                                <p className="label-text">Product Height</p>
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
                                <p className="label-text">Product Length</p>
                                <input
                                    className="form-input"
                                    name="productLenth"
                                    value={productData.productLenth}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Product Width</p>
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
                                <p className="label-text">Product Quantity</p>
                                <input
                                    className="form-input"
                                    name="productQuntity"
                                    value={productData.productQuntity}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Brand Name</p>
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
                                <p className="label-text">Brand Address</p>
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
                                <p className="label-text">Brand Origin</p>
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
                                <p className="label-text">Seller Name</p>
                                <input
                                    className="form-input"
                                    name="brandSellerName"
                                    value={productData.brandSellerName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="col-span-2 pm_button_div">
                            <button className="pm_button pm_cancel-button" type="button">Cancel</button>
                            <button className="pm_button pm_submit-button" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default FrontEnd;