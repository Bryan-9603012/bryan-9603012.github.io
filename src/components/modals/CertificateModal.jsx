import "./CertificateModal.css";

export default function CertificateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cert-overlay" onMouseDown={onClose}>
      <div className="cert-shell" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cert-toolbar">
          <div>
            <strong>AIWave · Taiwan Generative AI Applications Hackathon</strong>
            <span>Certificate preview</span>
          </div>
          <button onClick={onClose} aria-label="Close certificate">✕</button>
        </div>

        <div className="cert-scroll">
          <article className="certificate">
            <div className="cert-corners" aria-hidden="true" />
            <p className="cert-kicker">CERTIFICATE OF ACHIEVEMENT</p>
            <p className="cert-granted">is hereby granted to</p>
            <h2>劉興源</h2>
            <div className="cert-rule" />
            <p className="cert-copy">
              in recognition of your outstanding participation in the
              <strong> AIWave: Taiwan Generative AI Applications Hackathon</strong>
              <br />held on August 1st &amp; 2nd
            </p>

            <div className="cert-signatures">
              <div>
                <span className="signature">Robert Wang</span>
                <i />
                <strong>Managing Director</strong>
                <small>AWS Taiwan</small>
              </div>
              <div>
                <span className="signature">Colley Hwang</span>
                <i />
                <strong>President</strong>
                <small>DIGITIMES</small>
              </div>
            </div>

            <div className="cert-bottom">
              <strong>powered by aws</strong>
              <strong>DIGITIMES</strong>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
