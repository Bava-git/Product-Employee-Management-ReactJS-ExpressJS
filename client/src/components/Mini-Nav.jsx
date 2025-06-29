import { Link } from 'react-router-dom';

import * as url from './utilities/urlController';

const MiniNavbar = ({ links }) => {
    return (
        <div className="inner-div">
            <ul className="inner-ul">
                {links.map((title, index) => (
                    <li key={index}><Link to={title.link}>{title.name}</Link></li>
                ))}
            </ul>
        </div>


    );
};

export const productLinks = [
    { name: 'Home', link: url.listofProduct },
    { name: 'Add Product', link: url.addProduct },
];

export const employeeLinks = [
    { name: 'Home', link: url.listofEmployee },
    { name: 'New Recruit', link: url.addEmployee },
    { name: 'Requests', link: url.requestEmployee },
];

export const requestLinks = [
    { name: 'New Request', link: url.request },
    { name: 'Request Status', link: url.requestStatus },
];

export default MiniNavbar;





