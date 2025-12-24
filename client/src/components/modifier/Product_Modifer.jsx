import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import link from "../utilities/exportor";
import { useAuth } from "../../AuthContext";

const prductIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACvElEQVR4nO2cvWoVQRiGH0IExUpsDYJNFAttvARL7yGgF+AlaLdofm5A2NoQSBW9AjsrEwsL7cUfTAwWHmHCyhSynuyeMzuz87PvA28V2DnzPXv2mz3ZHRBCCCGEEEIIIYQQQgghhPifW8A2cAScAmbiOQUOgS3gZsjCXwB2gFkCkzaJZmZFrIYo/usEJmgyySvfEnYSmJTJLM03wds1X5cdlk5Ts3UfAnT245xNHwKOEpiIyTTN6mgwPxOYiMk0Jz4E9A0ydUzo+khANxIQGQmIjARERgIiIwGRkYDIFClgDdizNzJN9n39rhKA4gSsAd/mjPPd/i01ihOw1zHWLulRnICTjrGOSY9JCfhBehQnYL9jrJekR3EC1m3DbY/zFbhGehQnALva2bXX/GN75qdY/GIF5IQEREYCIiMBkZGABXgMbBAGCejhAfDHPkR7G/9IQAf3Wk9wvwcu4xcJOIcbwOc5n7fGLxIwh6vAh47P7LMfSECLS8Cbns/ssx8UIeARUHk4zkrP/xNMgH6QvYA7wC97rGrkJ7nrqQu4AnxsHa8asNZfpvi++kG2Albsqzzzjlk5rvVdBAztB9kKeNpz3Mpxre+SIf0gSwH3FzxjK8e1vkvqqQi4DnxZojCV41p/rH6QlYCLwFuHwlQOa/2x+kFWAl4MKE7lsNYfox9kI+Chh+I8Gemtzbo0AXf/udnKJRsj1ifoAM3N1qcECmoC9YOkBXTdbJkMskg/SFpA382WySB1zgKmgJGAuEhAZCQgMhIQGQmIjARERgIiE7w+Xe9sKXTGy0uF2rIM57zzIWArgYmYTPPMh4BmO15tW8nS+e1zewV9C1g6z/FIsw3vQQKTMpnkIMT+0av2m6DLEedmZs9878Vv94RNuymp9hTlbw0ObeFT3VJHCCGEEEIIIYQQQgghhBDE4wySlNPQXfHsHwAAAABJRU5ErkJggg==";
const FrontEnd = () => {
  const Params = useParams();
  const Product_ID = Params.id;

  return <AddProduct id={Product_ID} />;
};

const AddProduct = ({ id }) => {
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productColour: "",
    productHeight: "",
    productLength: "",
    productWidth: "",
    productQuantity: "",
    brandName: "",
    brandOrigin: "",
    brandAddress: "",
    brandSellerName: "",
  });
  const { user } = useAuth();
  const Userid = user?.id;
  const Navigate = useNavigate();
  const [Page_Title, setPage_Title] = useState("Add Product Details");
  // To upload an image
  const [selectedFile, setSelectedFile] = useState(prductIcon);
  const [uploadFile, setuploadFile] = useState("");

  useEffect(() => {
    fetchDataEditMode();
  }, []);

  const fetchDataEditMode = async () => {
    if (id) {
      let fileName = "";
      await link.api.GetOne("products", id).then((data) => {
        fileName = data?.productImageName;
        setProductData(data);
      });
      await link.api.GetImage(fileName).then((data) => {
        setSelectedFile(data || prductIcon);
      });
      setPage_Title("Update Product Details");
    }
  };

  const [errorArr, seterrorArr] = useState([]);
  const sendData = async (event) => {
    event.preventDefault();

    seterrorArr([]);
    const hasErrors = Object.keys(productData).some((key) => {
      if (productData[key] === "") {
        seterrorArr((prev) => [...prev, key]);
      }
      return productData[key] === "";
    });
    if (hasErrors) {
      toast.error("Please fill the form correctly");
      return;
    }
    // console.log(errorArr);
    // console.log(productData);
    const fileName = crypto.randomUUID();
    const productImageName = await link.api.UploadImage(
      "product",
      uploadFile,
      fileName
    );
    if (!productImageName) {
      toast.error("Product image is missing!");
      seterrorArr("employeePhoto");
      return;
    }

    if (id) {
      link.api.Update("products", id, productData).then((status) => {
        if (status === 200) {
          toast.success(productData.productName + " updated succussfully");
          Navigate(link.url.listofProduct);
        }
      });
    } else if (!id) {
      link.api
        .Create("products", { ...productData, Userid, productImageName })
        .then((status) => {
          if (status === 200) {
            toast.success("Product added succussfully");
            resetForm();
          }
        });
    }
  };

  const resetForm = () => {
    setProductData({
      productName: "",
      productPrice: "",
      productColour: "",
      productHeight: "",
      productLength: "",
      productWidth: "",
      productQuantity: "",
      brandName: "",
      brandOrigin: "",
      brandAddress: "",
      brandSellerName: "",
    });
    setSelectedFile(prductIcon);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleImage(event) {
    const file = event.target.files[0];
    setuploadFile(file);
    const fileURL = URL.createObjectURL(file);
    setSelectedFile(fileURL);
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="product-card">
          <h1 className="pm-title">{Page_Title}</h1>
          <form className="form-grid" onSubmit={sendData}>
            <div className="col-span-2">
              <label className="form-label">
                <p className="label-text">
                  Product Name(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productName") ? "input-error" : ""
                  }`}
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Price (₹)(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productPrice") ? "input-error" : ""
                  }`}
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Colour(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productColour") ? "input-error" : ""
                  }`}
                  name="productColour"
                  value={productData.productColour}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Height(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productHeight") ? "input-error" : ""
                  }`}
                  name="productHeight"
                  value={productData.productHeight}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Length(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productLength") ? "input-error" : ""
                  }`}
                  name="productLength"
                  value={productData.productLength}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Width(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productWidth") ? "input-error" : ""
                  }`}
                  name="productWidth"
                  value={productData.productWidth}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Product Quantity(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("productQuantity") ? "input-error" : ""
                  }`}
                  name="productQuantity"
                  value={productData.productQuantity}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-span-2">
              <label className="form-label">
                <p className="label-text">
                  Brand Name(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("brandName") ? "input-error" : ""
                  }`}
                  name="brandName"
                  value={productData.brandName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-span-2">
              <label className="form-label">
                <p className="label-text">
                  Brand Address(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("brandAddress") ? "input-error" : ""
                  }`}
                  name="brandAddress"
                  value={productData.brandAddress}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Brand Origin(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("brandOrigin") ? "input-error" : ""
                  }`}
                  name="brandOrigin"
                  value={productData.brandOrigin}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Seller Name(<span>*</span>)
                </p>
                <input
                  className={`form-input ${
                    errorArr.includes("brandSellerName") ? "input-error" : ""
                  }`}
                  name="brandSellerName"
                  value={productData.brandSellerName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-span-2">
              <label htmlFor="employeeName" name="Employee_Details">
                <p className="label-text">
                  Product Pictures(<span>*</span>)
                </p>
                <img
                  className={` employeePhoto ${
                    errorArr.includes("employeePhoto") ? "input-error" : ""
                  }`}
                  src={selectedFile}
                  alt="productPhotos"
                ></img>
                <input type="file" onChange={handleImage} />
              </label>
            </div>
            <div className="col-span-2 pm_button_div">
              <button
                className="redButton"
                type="button"
                data-testid="bn-cancel"
                onClick={() => Navigate(link.url.listofProduct)}
              >
                Cancel
              </button>
              <button
                className="commonButton"
                data-testid="bn-submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FrontEnd;
