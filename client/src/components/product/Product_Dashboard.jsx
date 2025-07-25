import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';
import MiniNavbar, { productLinks } from '../Mini-Nav';
import link from '../utilities/exportor';
import { toast } from 'sonner';

function Product_Dashboard() {

  const Navigate = useNavigate();
  const [FilterData, setFilterData] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    link.api.List("products").then(data => loadPage(data, 0))
  }, [refresh]);

  let ItemPerPage = 10;
  let CurrentPage = 0;


  const loadPage = (data, pageno) => {

    if (data?.length === 0) {
      return;
    }

    let NoOfPages = Math.ceil(data.length / ItemPerPage);
    if (NoOfPages <= 0) {
      pageno = 0
    } else if (pageno >= NoOfPages) {
      pageno = NoOfPages - 1;
    }
    let startIndex = pageno * ItemPerPage;
    let EndIndex = startIndex + ItemPerPage;
    setFilterData(data.slice(startIndex, EndIndex));
    pagenation(data)
  }

  const pagenation = (data) => {
    let NoOfPages = Math.ceil(data.length / ItemPerPage);
    const allButtons = [
      <button key="previous" className='pagenationBn' onClick={() => {
        if (CurrentPage === 0) {
          return;
        }
        CurrentPage--;
        loadPage(data, CurrentPage);
      }}>Previous</button>,
      <button key="first" className={CurrentPage === 0 ? "active-button" : "inactive-button"} onClick={() => {
        CurrentPage = 0;
        loadPage(data, CurrentPage);
      }
      }> First</button >,
    ];
    for (let i = 2; i < NoOfPages; i++) {
      allButtons.push(<button key={i} className={CurrentPage === (i - 1) ? "active-button" : "inactive-button"} onClick={() => {
        CurrentPage = (i - 1);
        loadPage(data, (i - 1));
      }}>{i}</button>);
    }
    allButtons.push(
      <button key="last" className={CurrentPage === (NoOfPages - 1) ? "active-button" : "inactive-button"} onClick={() => {
        CurrentPage = NoOfPages - 1
        loadPage(data, (NoOfPages - 1));
      }}>Last</button>,
      <button key="next" className='pagenationBn' onClick={() => {
        if (CurrentPage === (NoOfPages - 1)) {
          return;
        }
        CurrentPage++;
        loadPage(data, CurrentPage);
      }}>Next</button>,
    );
    setButtons(allButtons);
  };



  const handleDelete = (id) => {
    link.api.Delete("products", id);
    toast.success("Delete successfully");
    setrefresh(!refresh);
  }

  return (

    <div className="Product_Dashboard">

      < MiniNavbar links={productLinks} />

      <header className="css-header">
        <div className='titleDiv'>
          <p className="css-title">Products</p>
        </div>
      </header>
      <div className='tableContainer'>

        <table border={"1"}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Color</th>
              <th>Height</th>
              <th>Length</th>
              <th>Width</th>
              <th>Brand Name</th>
              <th>Brand Origin</th>
              <th>Brand Address</th>
              <th>Seller Name</th>
              {(role === "MANAGER" || role === "SUPERVISOR") && <th>Action</th>}
            </tr>
          </thead>

          <tbody >
            {FilterData.length > 0 ? FilterData.map((item, index) =>

              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.productPrice}</td>
                <td>{item.productColour}</td>
                <td>{item.productHeight}</td>
                <td>{item.productLength}</td>
                <td>{item.productWidth}</td>
                <td>{item.brandName}</td>
                <td>{item.brandOrigin}</td>
                <td>{item.brandAddress}</td>
                <td>{item.brandSellerName}</td>

                {(role === "MANAGER" || role === "SUPERVISOR") && <td>
                  <div className='actionButtons'>
                    <button onClick={() => Navigate("/add-product/" + item._id)} className='prodash-updateBn'>
                      <img className='prodash-updateBnIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABD0lEQVR4nO2WSwoCMRBE6xLj90TqgXSr59KFSxH8g3oLmZ2riFADYUgYEcVq6QcNgU6gHzUZAjiOWZYA1vgDAss8wUXE8ETU8ETU8ETU8ETU8ETU8ETU8ETU8ETU8ETUMJPIhtV5Q+R5Zg9gBQF2HPSckcmJdHjm2dtCgBaAEwe6Aui9INKOzlwSZ34qc8zI1EVkJZpkYpG6RBeitBIylUgscVaWSN2Z6jLH6xP3mKAAcIgkgqUkmmRyv2dTMkeuTT8lii9JhNy8Zt5ExEXUCP5pWUmkZEPuEZegz1lvqeaCzTH0mXDWeao5YvNOGcVkepztzlkHuY2zxPtItaZN1kNGVt0ZpSo5WzYJx8FneQA1z+TbVl1r6gAAAABJRU5ErkJggg==" alt="installing-updates--v1"></img>
                    </button>
                    <button onClick={() => { handleDelete(item._id) }} className='prodash-deleteBn'>
                      <img className='prodash-deleteBnIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABAElEQVR4nOXUO2oCYRwE8CkknVcw6AV81BG9gI/aBwHbaNqINpY+WkUvoGir6AUU0yrJBQxaxV5Bg2FlKqv5S0AkA1+x8JtvtlgW+C+pADhdnOo1F53+6NxuwMknkf/8pCXAzoeCJ8Qxw0CcnbGCO8QvhoE8O20Fl6/4SmrslBScJe4aBnrsZBQcJZ4aBmbsRBTsI14ZBr7Y8Sr4AcAPgCMAl+Adc2DH6UrZ8I08gn2kXcOQd5aeBBumnVsGBiylBJum7VsGGiy9CbZIW7cMvLLUFGyLtmAZSLI0FOyINmEZCLG0EOySNmgZcAPYG/7/O3ZMyQHYCpd/A3i2Xn4/+QVXaHujT54Q+AAAAABJRU5ErkJggg==" alt="filled-trash" />
                    </button>
                  </div>
                </td>}
              </tr>
            ) : (<tr><td colSpan="12" className='errorintable'>No records found</td></tr>)}
          </tbody>
          <tfoot>
          </tfoot>
        </table>

      </div>
      <div className="pagenationDiv">{buttons}</div>
    </div>
  )
}

export default Product_Dashboard;
