import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { useAuth } from '../../AuthContext';
import link from '../utilities/exportor';
import { Pencil, Trash2 } from 'lucide-react';

function Product_Dashboard() {

  const Navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    link.api.List("products").then(data => loadPage(data, 0))
  }, [refresh]);

  let ItemPerPage = 10;
  let CurrentPage = 0;
  const [CountOfItem, setCountOfItem] = useState(0);
  const loadPage = (data, pageno) => {

    setCountOfItem(data?.length);
    if (data?.length === 0) {
      return;
    } else if (data?.length <= 10) {
      setTableData(data);
      return;
    }

    let NoOfPages = Math.ceil(data?.length / ItemPerPage);
    if (NoOfPages <= 0) {
      pageno = 0
    } else if (pageno >= NoOfPages) {
      pageno = NoOfPages - 1;
    }
    let startIndex = pageno * ItemPerPage;
    let EndIndex = startIndex + ItemPerPage;
    setTableData(data.slice(startIndex, EndIndex));
    pagenation(data)
  }

  const pagenation = (data) => {
    let NoOfPages = Math.ceil(data.length / ItemPerPage);
    const allButtons = [
      <a key="previous" className='pagination-item' onClick={() => {
        if (CurrentPage === 0) {
          return;
        }
        CurrentPage--;
        loadPage(data, CurrentPage);
      }}>Previous</a>,
      <a key="first" className={CurrentPage === 0 ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
        CurrentPage = 0;
        loadPage(data, CurrentPage);
      }
      }> First</a>,
    ];
    for (let i = 2; i < NoOfPages; i++) {
      allButtons.push(
        <a key={i} className={CurrentPage === (i - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
          CurrentPage = (i - 1);
          loadPage(data, (i - 1));
        }}>{i}</a>);
    }
    allButtons.push(
      <a key="last" className={CurrentPage === (NoOfPages - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
        CurrentPage = NoOfPages - 1
        loadPage(data, (NoOfPages - 1));
      }}>Last</a>,
      <a key="next" className='pagination-item' onClick={() => {
        if (CurrentPage === (NoOfPages - 1)) {
          return;
        }
        CurrentPage++;
        loadPage(data, CurrentPage);
      }}>Next</a>,
    );
    setButtons(allButtons);
  };

  const handleDelete = (id) => {
    link.api.Delete("products", id);
    toast.success("Delete successfully");
    setrefresh(!refresh);
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Product Inventory Overview</h1>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">S.No</th>
                  <th className="table-th" scope="col">Name</th>
                  <th className="table-th" scope="col">Price</th>
                  <th className="table-th" scope="col">Color</th>
                  <th className="table-th" scope="col">Height/Length/Width</th>
                  <th className="table-th" scope="col">Quantity</th>
                  <th className="table-th action-th" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length ?
                  (TableData.map((product, index) => (
                    <tr key={product._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td className="table-td">{product.productName}</td>
                      <td className="table-td">{product.productPrice}</td>
                      <td className="table-td">{product.productColour}</td>
                      <td className="table-td">{product.productHeight + " x " + product.productLength + " x " + product.productWidth}</td>
                      <td className="table-td">{product.productLength}</td>
                      <td className="table-td">
                        <div className="action-buttons">
                          <button className="action-btn download-btn" onClick={() => Navigate("/add-product/" + product._id)}>
                            <Pencil className='actionLucideIcon' />
                          </button>
                          <button className="action-btn delete-btn" onClick={() => { handleDelete(product._id) }}>
                            <Trash2 className='actionLucideIcon' />
                          </button>
                        </div>
                      </td>
                    </tr>)))
                  :
                  (<tr><td colSpan="12" className='errorintable'>No records found</td></tr>)
                }
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <span className="footer-text">Showing 1 to 10 of {CountOfItem} results</span>
            <nav className="pagination">
              {buttons}
            </nav>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Product_Dashboard;
