import Header from "@/components/EmailHeader";


const CompleteProfileEmail = ({ name, completeProfileUrl }: { name: string; completeProfileUrl: string }) => (
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
                        <h1 style={{ color: '#30A5FF', fontSize: 22, margin: 0, fontWeight: 700 }}>¡Bienvenidx a ChilangoHacks, {name}!</h1>
                        <hr style={{ border: 'none', borderTop: '1px solid #e6eaf0', margin: '24px 0 16px 0' }} />
                        <p style={{ margin: 0, color: '#333', fontSize: 16 }}>
                            Antes que nada, queremos ofrecerte una disculpa por la pausa prolongada en la organización del evento. Para el equipo ha sido un gran reto formalizar y asegurar un espacio adecuado para recibir a cada participante como se merece. Aunque aún estamos afinando algunos detalles, queremos asegurarte que estamos trabajando con dedicación para que todo esté listo lo más pronto posible. Por ahora, podemos adelantarte que el hackatón se llevará a cabo en</p>
                        <p style={{ margin: '24px 0 0', color: '#333', fontSize: 16 }}>
                            📍 Ciudad Universitaria (UNAM)
                        </p>
                        <p style={{ margin: 0, color: '#333', fontSize: 16 }}>
                            📅 7 - 9 de enero (tentativamente).
                        </p>
                        <p style={{ margin: '24px 0 0 0', color: '#333', fontSize: 16 }}>
                            Si tienes disponibilidad para esas fechas, te invitamos a completar tu perfil para asegurar tu lugar en el evento. Solo necesitas hacer clic en el siguiente botón:
                        </p>
                        <div style={{ textAlign: 'center', margin: '32px 0' }}>
                            <a
                                href={completeProfileUrl}
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 32px',
                                    backgroundColor: '#30A5FF',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    boxShadow: '0 2px 8px rgba(48,165,255,0.12)',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Completa tu perfil
                            </a>
                        </div>
                        <p style={{ margin: '0 0 16px 0', color: '#333', fontSize: 15 }}>
                            Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos respondiendo a este correo o al Instagram <a href="https://www.instagram.com/chilangohacks/" target="_blank" rel="noopener noreferrer" style={{
                                color: '#30A5FF',
                                textDecoration: 'none',
                                fontWeight: 600,
                            }}>@chilangohacks</a>. Estamos aquí para ayudarte en lo que necesites. (es posible que te respondamos con el correo personal de alguno de los organizadores, ¡no te asustes!).
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

export default CompleteProfileEmail;