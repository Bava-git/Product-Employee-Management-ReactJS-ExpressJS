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

    const Navigate = useNavigate();

    const [Page_Title, setPage_Title] = useState("Add Product");
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
            setPage_Title("Update Product");
        }
    }, [])


    const Data = (event) => {
        event.preventDefault();

        setError("Error");

        const newProductdata = {
            productName, productPrice, productColour, productHeight, productLenth, productWidth, brandName,
            brandOrigin, brandAddress, brandSellerName
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

    }

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
    }

    return (
        <div className="addProduct">

            <MiniNavbar links={productLinks} />

            <header className="css-header">
                <p className="css-title">{Page_Title}</p>
            </header>

            <form action="" name="">
                <div className="FormContainer">
                    <div className="Product_Details">
                        <div className="addProductContainer">
                            <label htmlFor="Product_Name" name="Product_Details">Product Name</label>
                            <input type="text" id="Product_Name" className="Product_Name" placeholder=""
                                value={productName} onChange={(event) => setproductName(event.target.value)}
                            />
                        </div>
                        {!productName && Error && <span className="Error-Message">empty</span>}
                        <div className="addProductContainer">
                            <label htmlFor="Product_Price" name="Product_Details">Product Price</label>
                            <input type="text" id="Product_Price" className="Product_Price" placeholder=""
                                value={productPrice} onChange={(event) => setproductPrice(event.target.value)}
                            />
                        </div>
                        {!productPrice && Error && <span className="Error-Message">empty</span>}
                        <div className="addProductContainer">
                            <label htmlFor="Product_Colour" name="Product_Details">Product Colour</label>
                            <input type="text" id="Product_Colour" className="Product_Colour" placeholder=""
                                value={productColour} onChange={(event) => setproductColour(event.target.value)}
                            />
                        </div>
                        {!productColour && Error && <span className="Error-Message">empty</span>}
                        <div className="addProductContainer">
                            <label htmlFor="Product_Dimensions" name="Product_Details">Product Dimensions</label>
                            <div className="Product_Dimensions_Container">
                                <input type="number" id="Product_Dimensions" className="Product_Dimensions_Lenth" placeholder="L in cm"
                                    value={productLenth} onChange={(event) => setproductLenth(event.target.value)}
                                />
                                <input type="number" id="Product_Dimensions1" className="Product_Dimensions_Width" placeholder="W in cm"
                                    value={productWidth} onChange={(event) => setproductWidth(event.target.value)}
                                />
                                <input type="number" id="Product_Dimensions2" className="Product_Dimensions_Height" placeholder="H in cm"
                                    value={productHeight} onChange={(event) => setproductHeight(event.target.value)}
                                />
                            </div>
                        </div>
                        {/* {!productLenth && Error && <span className="Error-Message">empty</span>}
                        {!productWidth  && Error && <span className="Error-Message">empty</span>} */}
                        {(!productLenth && !productWidth && !productHeight) && Error && <span className="Error-Message">empty</span>}
                    </div>

                    <div className="Brand_Details">
                        <div className="addProductContainer">
                            <label htmlFor="Brand_Name" name="Product_Details">Brand Name</label>
                            <input type="text" id="Brand_Name" className="Brand_Name" placeholder=""
                                value={brandName} onChange={(event) => setbrandName(event.target.value)}
                            />
                        </div>
                        {!brandName && Error && <span className="Error-Message">empty</span>}

                        <div className="addProductContainer">
                            <label htmlFor="Brand_Origin" name="Product_Details">Country/Region Of Origin</label>
                            <input type="text" id="Brand_Origin" className="Brand_Origin" placeholder=""
                                value={brandOrigin} onChange={(event) => setbrandOrigin(event.target.value)}
                            />
                        </div>
                        {!brandOrigin && Error && <span className="Error-Message">empty</span>}

                        <div className="addProductContainer">
                            <label htmlFor="Brand_Address" name="Product_Details">Address</label>
                            <input type="text" id="Brand_Address" className="Brand_Address" placeholder=""
                                value={brandAddress} onChange={(event) => setbrandAddress(event.target.value)}
                            />
                        </div>
                        {!brandAddress && Error && <span className="Error-Message">empty</span>}

                        <div className="addProductContainer">
                            <label htmlFor="Brand_Seller_Name" name="Product_Details">Seller Name</label>
                            <input type="text" id="Brand_Seller_Name" className="Brand_Seller_Name" placeholder=""
                                value={brandSellerName} onChange={(event) => setbrandSellerName(event.target.value)}
                            />
                        </div>
                        {!brandSellerName && Error && <span className="Error-Message">empty</span>}

                    </div>
                </div>
                <div>
                </div>
                <div className="ButtonContainer">
                    <button className="Summit_Button" name="Product_Details" onClick={Data} >Submit</button>
                    <button className="Summit_Button" name="Product_Details" onClick={() => { Navigate(link.url.listofProduct) }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default FrontEnd;