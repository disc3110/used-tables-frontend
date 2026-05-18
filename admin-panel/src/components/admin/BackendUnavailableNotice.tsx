interface BackendUnavailableNoticeProps {
  title?: string;
}

export default function BackendUnavailableNotice({
  title = "Backend server is offline",
}: BackendUnavailableNoticeProps) {
  return (
    <section className="admin-card admin-card-pad">
      <p className="admin-eyebrow">Connection</p>
      <h2 className="admin-title" style={{ fontSize: "2.4rem" }}>
        {title}
      </h2>
      <p className="admin-subtitle">
        The admin panel needs the Nest backend running before it can load
        products, inquiries, sales, or users.
      </p>
      <div
        className="list-card"
        style={{ marginTop: 24, fontFamily: "monospace" }}
      >
        npm run backend:dev
      </div>
    </section>
  );
}
