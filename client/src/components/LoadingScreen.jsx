const LoadingScreen = () => {
  const progress = Math.floor(Math.random() * (100 - 60 + 1)) + 60;

  return (
    <div className="loading-wrapper">
      {/* Subtle Background Pattern */}
      <div className="bg-pattern" />

      <div className="loading-container">
        {/* Brand Logo / Icon */}
        <div className="brand-icon">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "48px" }}
          >
            inventory_2
          </span>
        </div>

        {/* Headline */}
        <h1 className="loading-title">Initializing System</h1>

        {/* Sub-text */}
        <p className="loading-subtitle">
          Please wait while we set up your secure workspace and sync employee
          data.
        </p>

        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Loading modules...</span>
            <span style={{ fontWeight: "bold" }}>{progress}%</span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              <div className="shimmer" />
            </div>
          </div>

          {/* Checklist style Status Items */}
          <div className="status-list">
            <div className="status-item">
              <span
                className="material-symbols-outlined"
                style={{ color: "var(--primary)", fontSize: "18px" }}
              >
                check_circle
              </span>
              <span>Verifying user credentials</span>
            </div>

            <div className="status-item">
              <span
                className="material-symbols-outlined"
                style={{ color: "var(--primary)", fontSize: "18px" }}
              >
                check_circle
              </span>
              <span>Connecting to product database</span>
            </div>

            <div className="status-item active">
              <span
                className="material-symbols-outlined spin-slow"
                style={{ color: "var(--primary)", fontSize: "18px" }}
              >
                sync
              </span>
              <span>Syncing employee records...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
