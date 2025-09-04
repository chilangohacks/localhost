import Header from "@/components/EmailHeader";

const OTPEmail = ({ name, otp }: { name: string; otp: string }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      background: '#f4f6fb',
      padding: '40px 0',
      minHeight: '100vh',
    }}
  >
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ maxWidth: 520, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(48,165,255,0.08)', border: '1px solid #e6eaf0' }}
    >
      <tbody>
        <tr>
          <td style={{ padding: 0 }}>
            <Header />
          </td>
        </tr>
        <tr>
          <td style={{ padding: '32px 32px 0 32px' }}>
            <h1 style={{ color: '#30A5FF', fontSize: 22, margin: 0, fontWeight: 700 }}>Tu código de acceso ChilangoHacks</h1>
            <hr style={{ border: 'none', borderTop: '1px solid #e6eaf0', margin: '24px 0 16px 0' }} />
            <p style={{ margin: 0, color: '#333', fontSize: 16 }}>
              ¡Hola {name}!<br />
              Usa el siguiente código para iniciar sesión:
            </p>
            <div style={{ textAlign: 'center', margin: '32px 0' }}>
              <span style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#30A5FF',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: '2px',
              }}>{otp}</span>
            </div>
            <p style={{ margin: '0 0 16px 0', color: '#333', fontSize: 15 }}>
              Este código es válido solo por unos minutos. Si no lo solicitaste, puedes ignorar este correo.
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid #e6eaf0', margin: '24px 0 16px 0' }} />
            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>
              Saludos cordiales,<br />El equipo de ChilangoHacks
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ background: '#f4f6fb', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, textAlign: 'center', padding: '18px 0 0 0', color: '#aaa', fontSize: 12 }}>
            © {new Date().getFullYear()} ChilangoHacks
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default OTPEmail;
