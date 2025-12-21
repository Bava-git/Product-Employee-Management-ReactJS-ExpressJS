import React from "react";

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="not-found-container">
      <main className="content-wrapper">
        <h1 className="error-code">404</h1>

        <h2 className="error-heading">Not Found</h2>

        <p className="error-description">
          Sorry, we couldn't find the page you're looking for. It seems this
          route doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="button-group">
          <a href="/" className="btn btn-primary">
            Go to Homepage
          </a>

          <button className="btn btn-outline" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
