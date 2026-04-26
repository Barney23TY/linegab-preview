export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a, #1a1a2e)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      <div>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "800",
          background: "linear-gradient(135deg, #f97316, #fb923c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "16px"
        }}>LineGab</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>
          Marketplace du Gabon
        </p>
        <a href="https://linegab5.web.app" style={{
          display: "inline-block",
          marginTop: "32px",
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          color: "white",
          padding: "14px 32px",
          borderRadius: "14px",
          fontWeight: "700",
          textDecoration: "none"
        }}>
          Voir les annonces
        </a>
      </div>
    </div>
  );
}
