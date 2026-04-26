import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://linegab-preview.vercel.app";
const ANDROID_PACKAGE = process.env.NEXT_PUBLIC_ANDROID_PACKAGE || "com.example.sms_clean";

export default function ArticlePage({ article, id, error }) {
  if (error || !article) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logo}>LineGab</div>
          <p style={styles.errorText}>Annonce introuvable ou supprimée.</p>
          <a href="https://linegab5.web.app" style={styles.btn}>
            Voir les annonces
          </a>
        </div>
      </div>
    );
  }

  const image = article.images?.[0] || "";
  const titre = article.titre || "Annonce LineGab";
  const prix = article.prix ? `${Number(article.prix).toLocaleString("fr-FR")} FCFA` : "";
  const description = article.description || "";
  const lieu = article.lieu || "";
  const etat = article.etat || "";
  const pageUrl = `${APP_URL}/article/${id}`;
  const deepLink = `linegab://article/${id}`;

  const ogDescription = [prix, etat, lieu, description].filter(Boolean).join(" • ");

  return (
    <>
      <Head>
        {/* Open Graph — WhatsApp lit ces tags */}
        <title>{titre} — LineGab</title>
        <meta name="description" content={ogDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${titre} — ${prix}`} />
        <meta property="og:description" content={ogDescription} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LineGab" />
        <meta property="og:locale" content="fr_GA" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${titre} — ${prix}`} />
        <meta name="twitter:description" content={ogDescription} />
        {image && <meta name="twitter:image" content={image} />}

        {/* Deep Link Android */}
        <meta name="al:android:url" content={deepLink} />
        <meta name="al:android:package" content={ANDROID_PACKAGE} />
        <meta name="al:android:app_name" content="LineGab" />

        {/* Redirect automatique */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var deepLink = "${deepLink}";
                var storeUrl = "https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}";
                var fallback = "https://linegab5.web.app";
                
                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf('android') > -1;
                
                if (isAndroid) {
                  var start = Date.now();
                  window.location = deepLink;
                  setTimeout(function() {
                    if (Date.now() - start < 3000) {
                      window.location = storeUrl;
                    }
                  }, 2000);
                }
              })();
            `,
          }}
        />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.logo}>LineGab</span>
            <span style={styles.badge}>Marketplace Gabon</span>
          </div>

          {/* Image */}
          {image && (
            <div style={styles.imageWrapper}>
              <img src={image} alt={titre} style={styles.image} />
            </div>
          )}

          {/* Contenu */}
          <div style={styles.content}>
            <h1 style={styles.titre}>{titre}</h1>

            {prix && <div style={styles.prix}>{prix}</div>}

            <div style={styles.tags}>
              {etat && <span style={styles.tag}>{etat}</span>}
              {lieu && <span style={styles.tag}>📍 {lieu}</span>}
            </div>

            {description && (
              <p style={styles.description}>{description}</p>
            )}
          </div>

          {/* CTA */}
          <div style={styles.cta}>
            <a href={deepLink} style={styles.btnPrimary}>
              📱 Ouvrir dans LineGab
            </a>
            <a href="https://linegab5.web.app" style={styles.btnSecondary}>
              Voir sur le web
            </a>
          </div>

          <p style={styles.footer}>
            Télécharge l'app LineGab pour acheter et vendre au Gabon
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "440px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  badge: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.08)",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "16/9",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "20px 24px 0",
  },
  titre: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px",
    lineHeight: "1.3",
  },
  prix: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#f97316",
    marginBottom: "12px",
  },
  tags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  tag: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.08)",
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  description: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
    lineHeight: "1.6",
    margin: "0",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cta: {
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  btnPrimary: {
    display: "block",
    textAlign: "center",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "15px",
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
  },
  btnSecondary: {
    display: "block",
    textAlign: "center",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.6)",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "500",
    fontSize: "14px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  btn: {
    display: "inline-block",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    textDecoration: "none",
    marginTop: "16px",
  },
  errorText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "15px",
    margin: "16px 0",
  },
  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "rgba(255,255,255,0.2)",
    padding: "0 24px 20px",
    margin: 0,
  },
};

// ─── Server Side Props ────────────────────────────────────
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const ref = doc(db, "annonces", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return { props: { article: null, id, error: "not_found" } };
    }

    const data = snap.data();

    // Sérialiser le timestamp Firebase
    const article = {
      titre: data.titre || null,
      prix: data.prix || null,
      description: data.description || null,
      images: data.images || [],
      lieu: data.lieu || null,
      etat: data.etat || null,
      status: data.status || null,
    };

    return { props: { article, id, error: null } };
  } catch (e) {
    console.error("Firestore error:", e);
    return { props: { article: null, id, error: "firestore_error" } };
  }
}
