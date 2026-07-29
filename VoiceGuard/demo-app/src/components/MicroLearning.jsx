export default function MicroLearning({ onReset, onViewDocument }) {
  return (
    <div style={{
      height: '100%',
      background: '#ffffff',
      color: '#0f172a',
      padding: '4rem 1.5rem 2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.5s ease-in',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ef4444',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        display: 'inline-block',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        marginBottom: '1rem'
      }}>
        สายถูกตัดโดย VoiceGuard
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.3' }}>
        ทำไมสายเมื่อสักครู่ถึงเป็นมิจฉาชีพ?
      </h1>
      
      <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        ระบบ AI ของเราตรวจพบ <b>"เจตนาหลอกลวง" (Risk Score &gt; 80%)</b> จากบริบทการสนทนา ดังนี้:
      </p>

      <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
        <h4 style={{ color: '#b91c1c', marginBottom: '0.5rem', fontWeight: '600' }}>🚩 อ้างว่าเป็นเจ้าหน้าที่รัฐ</h4>
        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
          ตำรวจหรือเจ้าหน้าที่รัฐ <b>ไม่มีนโยบาย</b> โทรหาประชาชนเพื่อทวงถามคดีฟอกเงินหรือขอตรวจสอบบัญชีผ่านโทรศัพท์
        </p>
      </div>

      <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <h4 style={{ color: '#b91c1c', marginBottom: '0.5rem', fontWeight: '600' }}>🚩 สร้างความกลัว + เร่งรัด</h4>
        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
          การขู่ว่า <i>"จะอายัดบัญชีวันนี้"</i> หรือ <i>"ห้ามบอกใคร"</i> เป็นเทคนิคมาตรฐานของมิจฉาชีพที่ต้องการให้เหยื่อลนลานจนขาดสติ
        </p>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button 
          onClick={onViewDocument}
          style={{
            background: '#0ea5e9', color: 'white', padding: '1rem', borderRadius: '12px',
            border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(14, 165, 233, 0.3)', display: 'flex', justifyContent: 'center', gap: '8px'
          }}>
          <span>📄</span> ดู Business Plan & PDPA
        </button>

        <button 
          onClick={onReset}
          style={{
            background: 'transparent', color: '#64748b', padding: '1rem', borderRadius: '12px',
            border: '1px solid #cbd5e1', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'
          }}>
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}
