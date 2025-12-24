//  ----------------------------------------------------
//  ----------------------------------------------------
const HomePage = () => {
  return (
    <div className="pem-system">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="layout-container">
          <div className="hero-grid">
            {/* Text Content */}
            <div className="hero-content">
              <div className="badge">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px" }}
                >
                  rocket_launch
                </span>
                <span>Version 2.0 Live</span>
              </div>
              <h1 className="hero-title">
                Streamline Your <span className="text-primary">Workforce</span>{" "}
                & Inventory
              </h1>
              <p className="hero-desc">
                The comprehensive PEM System for modern enterprises. Manage your
                products and people in one unified, data-driven platform
                designed for scale.
              </p>
              <div className="btn-group">
                <button className="btn-primary">Get Started</button>
                <button
                  className="btn-secondary"
                  style={{
                    padding: "0.75rem 2rem",
                    borderRadius: "0.5rem",
                    fontWeight: "700",
                    border: "1px solid #e5e7eb",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-image-container">
              <div
                className="hero-image-bg"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOfsjs1ZeVFRialRjT5Z06o1X12MmjveGB-XuR16wa4Ub3_HZOJ05YHtOGwRna2eIJrkPjjmwQPtg1UNb3tHnQbJ_cN765kynTyQBn3EaZJ9riZSFo1TBPpvz8D7A1N0PUUKGym3sajU_10NaGjNgy2ts9yzLxCWfkIsy5x9YUDqqfUS4KqjdoJ-DCzHzVukSNR8-g08Y1LIfeUm7Y_jYLi_YRmvCYE7Wc-iqeiOXkdFe1EOzxHvsuowl1NejWrp9dBj8fgNKfVB10")`,
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="floating-card animate-bounce"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  background: "white",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    color: "#10b981",
                    background: "#ecfdf5",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                >
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "#6b7280", margin: 0 }}>
                    Efficiency
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: "800", margin: 0 }}>
                    +24% Growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: "5rem 0", background: "#f9fafb" }}>
        <div className="layout-container">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "4rem" }}
          >
            <div className="about-text">
              <div
                style={{
                  color: "var(--primary)",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                WHO WE ARE
              </div>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "900",
                  marginBottom: "1.5rem",
                }}
              >
                About Our Company
              </h2>
              <p className="hero-desc">
                We are dedicated to bridging the gap between human resources and
                product lifecycles.
              </p>
            </div>

            <div className="features-grid">
              <FeatureCard
                icon="bar_chart"
                title="Efficient Tracking"
                desc="Real-time monitoring of all your product inventory with advanced filtering."
              />
              <FeatureCard
                icon="groups"
                title="Employee Empowerment"
                desc="Tools to help your workforce succeed, track performance, and foster growth."
                color="#7c3aed"
              />
              <FeatureCard
                icon="lightbulb"
                title="Data-Driven Decisions"
                desc="Analytics that drive smarter business choices by correlating HR data."
                color="#ea580c"
              />
              <FeatureCard
                icon="security"
                title="Secure & Compliant"
                desc="Top-tier encryption and compliance standards to keep data safe."
                color="#0d9488"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "5rem 0" }}>
        <div className="layout-container" style={{ maxWidth: "1000px" }}>
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <ContactLine
                  icon="location_on"
                  text="123 Innovation Drive, Tech Valley, CA"
                />
                <ContactLine icon="call" text="+1 (555) 123-4567" />
                <ContactLine icon="mail" text="support@pemsystem.com" />
              </div>
            </div>
            <div style={{ padding: "2.5rem" }}>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <input
                  className="form-input"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email Address"
                />
                <textarea
                  className="form-input"
                  style={{ height: "120px" }}
                  placeholder="Your Message"
                ></textarea>
                <button className="btn-primary" type="button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc, color = "#1754cf" }) => (
  <div className="feature-card">
    <div
      style={{
        width: "48px",
        height: "48px",
        background: `${color}15`,
        color: color,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{title}</h3>
    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{desc}</p>
  </div>
);

const ContactLine = ({ icon, text }) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <span className="material-symbols-outlined">{icon}</span>
    <span style={{ fontSize: "14px" }}>{text}</span>
  </div>
);

export default HomePage;
