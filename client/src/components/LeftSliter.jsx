import { useNavigate } from "react-router-dom";
import link from './utilities/exportor';
import { jwtDecode } from 'jwt-decode';

function LeftSliter() {

  const Navigate = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  if (auth) {
    const deauth = jwtDecode(auth);
    var userType = deauth.role;
  }

  return (
    <div className='test-div'>
      <div className="leftSliter">
        {(userType === "ADMIN" || userType === "MANAGER" || userType === "SUPERVISOR" || userType === "WORKER") &&
          <div className="menuicon" onClick={() => { Navigate(link.url.listofProduct); }}>
            <button className="menubutton">
              <img className="menuimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuUlEQVR4nO3dPWsUQQDG8b+KIChaK6L4CbRStLJU1AQEo41NvoRtCpFr/QxiZ2EhWJmkFUEUP4EvBAUro6KFjixs4Fhm77x9mXkyeX4w5d7Ozj+b2QvkDszMzMzMbJc4COzPPQlVd4AtIBQ+PtXXKmsfsAb8FViskHA8VLw7DwGPBRYnZBrPgKOIOAG8EliUkHm8BU7njnEO+BCZ3FfgcqI5hMZI4SLwOXLuau+8QCa3gB+RSb0DziScR8gQpHISeB05/y/gburN+x7wJzKZ58CxlJMhX5DKEeBpZA7Vg80kxWZfbd6PZjxtHCC9kDHI9NNlbE2eAIfHOvFx4GXkpL+BVfIJmYPsWK3XojmfN8CpoU92FnifefNWD1K5BHxp2ezPD3WSmy2btwcLrcFP4MYQQWLFPei0BtWjcm9efAZdAweh8CC2GAcR4yBiHESMg4hxEDEOIsZBxBQXZBnYBL73eDNWHbsBLGWYf1FBJiO8U36Q+BqKCbI84p8vrie8jmKCbI4YZD3hdRQTZLtx3pUer7XSeK1vpOMgEbcdpL+NEX9lvSCdYu6QpRGDXEt4HcUEoX5EHTrGfdIqKgj1I+p6ZJNfZGzXv6ZS3hnFBtntHESMg4hxEDEOIsZBxDiIGAcR4yBiHESMg4hxEDEOIsZBxDiIGAcR4yBiHESMg4hxEDEOIsZBxDjIf1ir/9UhxXEOMsf0Z1tNEhznIDPEPmhsMuJxFQdp0fapb/MWt+txOxxkwUWdtbhdj5vmIB0WNba4XY9rcpA5ui5Q6uPSvWBmwUG0BAfREhxES3AQLcFBtAQH0RIcZG8Lfh+ixUEaQqLRxkEaHERM8B2iJTiITfMeIsZBxDiIGAcR4yB7LYgHo7yjdxDy/HD19tF3BUPFqL5Zu7erLV/R7cHCMa4MEcTMzMzMzIwB/QNdna0AcVts/gAAAABJRU5ErkJggg==" alt="product--v1" />
            </button>
            <p>Product</p>
          </div>}
        {(userType === "ADMIN" || userType === "MANAGER" || userType === "SUPERVISOR") &&
          <div className="menuicon">
            <button className="menubutton" onClick={() => { Navigate(link.url.listofEmployee); }}>
              <img className="menuimg" src="data:image/png;base64,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" alt="permanent-job"></img>
            </button>
            <p>Employee</p>
          </div>}
        {(userType === "ADMIN" || userType === "SUPERVISOR" || userType === "WORKER") &&
          <div className="menuicon" onClick={() => { Navigate(link.url.request); }}>
            <button className="menubutton">
              <img className="menuimg" src="data:image/png;base64,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" alt="ask-question--v1"></img>
            </button>
            <p>Request</p>
          </div>}
      </div>
    </div>
  );
}

export default LeftSliter;
