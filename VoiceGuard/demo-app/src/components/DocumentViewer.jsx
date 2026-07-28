import { Shield, Zap, Cpu, Scale, Trophy, Briefcase, ChevronLeft, FileText } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function DocumentPage({ onBack }) {
  const containerRef = useRef(null);

  // Scroll Reveal Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.1, // Trigger when 10% visible
      root: containerRef.current 
    });

    const sections = document.querySelectorAll('.doc-section');
    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    const container = containerRef.current;
    if (element && container) {
      // offsetTop gives distance from the closest positioned ancestor. 
      // Since container is the scrolling area, this works perfectly.
      const topPos = element.offsetTop - 100; 
      container.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  };

  const navItemStyle = {
    color: '#86868b',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.2s',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '4px 8px'
  };

  return (
    <div ref={containerRef} style={{
      width: '100vw',
      height: '100vh',
      background: '#000000', 
      color: '#f5f5f7',
      overflowY: 'auto',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      animation: 'fadeInDoc 0.5s ease-out',
      position: 'relative'
    }}>
      <style>{`
        @keyframes fadeInDoc {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Scroll Reveal Initial State */
        .doc-section { 
          opacity: 0; 
          transform: translateY(60px); 
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Scroll Reveal Visible State */
        .doc-section.visible { 
          opacity: 1; 
          transform: translateY(0); 
        }
        
        .bento-card {
          background: #1d1d1f;
          border-radius: 24px;
          padding: 2rem;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
          border: 1px solid rgba(255,255,255,0.02);
        }
        .bento-card:hover {
          transform: scale(1.01);
          background: #252527;
        }
        .bento-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .bento-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }
        
        /* Glass Header */
        .glass-header {
          position: sticky; 
          top: 0; 
          z-index: 50;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 1rem 3rem;
          display: flex; 
          justify-content: space-between; 
          align-items: center;
        }

        .nav-link:hover {
          color: #f5f5f7 !important;
        }
        
        h1, h2, h3, h4, h5 {
          letter-spacing: -0.02em;
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #424245; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #636366; }
      `}</style>

      {/* Top Navigation Bar */}
      <div className="glass-header">
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.1)', border: 'none',
          borderRadius: '20px', padding: '8px 16px', color: '#f5f5f7',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.9rem', fontWeight: '500', transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ChevronLeft size={18} /> กลับสู่ Demo
        </button>

        {/* Landing Page Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-summary')}>Summary</span>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-problem')}>Problem</span>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-arch')}>Architecture</span>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-compliance')}>Compliance</span>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-moat')}>Moat</span>
          <span className="nav-link" style={navItemStyle} onClick={() => scrollTo('sec-business')}>Business</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 2rem 8rem 2rem' }}>

        {/* Hero Header */}
        <div className="doc-section" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 style={{
            fontSize: '4.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #86868b 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            VoiceGuard
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#86868b', maxWidth: '700px', margin: '0 auto', lineHeight: 1.4, fontWeight: '500' }}>
            AI Assistant ระหว่างการโทร<br/>ปกป้องผู้สูงอายุจากการหลอกลวงแบบ Real-time
          </p>
        </div>

        {/* Section 1: Executive Summary */}
        <div id="sec-summary" className="doc-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <FileText size={28} color="#0071e3" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>1. บทสรุปผู้บริหาร</h2>
          </div>
          <div className="bento-card">
            <p style={{ color: '#86868b', lineHeight: 1.7, fontSize: '1.1rem' }}>
              <strong style={{ color: '#f5f5f7' }}>VoiceGuard</strong> คือระบบป้องกันภัยคุกคามทางโทรศัพท์แบบ <strong style={{ color: '#0071e3' }}>Active Intervention</strong> (แทรกแซงแบบเรียลไทม์) ออกแบบมาเพื่อแก้ปัญหาแก๊งคอลเซ็นเตอร์หลอกลวงผู้สูงอายุ โดยใช้ <strong style={{ color: '#0071e3' }}>"Adaptive Risk Engine"</strong> วิเคราะห์บริบทและเนื้อหาการสนทนา หากพบความเสี่ยงสูง ระบบจะแจ้งเตือนอย่างรุนแรงและตัดสายอัตโนมัติ (Opt-in)
            </p>
          </div>
        </div>

        {/* Section 2: Problem & Why Now */}
        <div id="sec-problem" className="doc-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Zap size={28} color="#ff9f0a" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>2. ปัญหาและโอกาส</h2>
          </div>
          <div className="bento-grid-3">
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>The 40B Baht Pain</h4>
              <p style={{ color: '#86868b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                ความเสียหายจากคดีหลอกลวงออนไลน์สูงถึง <strong style={{ color: '#ff3b30' }}>4 หมื่นล้านบาท</strong> โดยผู้สูงอายุเป็นกลุ่มที่สูญเสียเงินต่อหัวสูงสุด
              </p>
            </div>
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Gen AI Era</h4>
              <p style={{ color: '#86868b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                สแกมเมอร์เริ่มใช้ <strong style={{ color: '#f5f5f7' }}>AI Voice Clone</strong> และสคริปต์อัตโนมัติ ทำให้การหลอกลวงแนบเนียนขึ้นจนแยกไม่ออก
              </p>
            </div>
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Status Quo Failure</h4>
              <p style={{ color: '#86868b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                แอปบล็อกเบอร์แบบเดิม (Blacklist) ตามเบอร์ VoIP ไม่ทัน เราจึงต้องเปลี่ยนมาป้องกันที่ <strong style={{ color: '#f5f5f7' }}>"เนื้อหา"</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Architecture */}
        <div id="sec-arch" className="doc-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Cpu size={28} color="#0071e3" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>3. สถาปัตยกรรมระบบ</h2>
          </div>

          <div className="bento-card" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#f5f5f7', marginBottom: '1rem', fontSize: '1.3rem' }}>Data Extraction Pipeline</h4>
            <div className="bento-grid-2">
              <div>
                <h5 style={{ color: '#0071e3', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Method 1: Accessibility</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  เจาะจงใช้ Accessibility Service ดึง Text จาก "Samsung Call Captions" (รองรับไทย 100% ไม่ต้องดักฟัง Audio Stream เอง)
                </p>
              </div>
              <div>
                <h5 style={{ color: '#0071e3', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Method 2: Protected Speaker</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  เปิดลำโพงอัตโนมัติเมื่อรับสายแปลกหน้า และใช้ไมโครโฟนส่งเสียงเข้า On-device Thai STT ขนาดเล็ก
                </p>
              </div>
            </div>
          </div>

          <div className="bento-card">
            <h4 style={{ color: '#f5f5f7', marginBottom: '1rem', fontSize: '1.3rem' }}>The Intervention (การแทรกแซง)</h4>
            <div className="bento-grid-2">
              <div style={{ background: '#2d2216', padding: '1.5rem', borderRadius: '16px' }}>
                <h5 style={{ color: '#ff9f0a', marginBottom: '0.5rem', fontSize: '1.1rem' }}>⚠️ Medium Risk (40-85%)</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  Intrusive Warning: หน้าจอกะพริบ บล็อกเสียงสนทนาชั่วคราว ดึงสติผู้สูงอายุ
                </p>
              </div>
              <div style={{ background: '#321414', padding: '1.5rem', borderRadius: '16px' }}>
                <h5 style={{ color: '#ff3b30', marginBottom: '0.5rem', fontSize: '1.1rem' }}>🚨 High Risk (&gt;85%)</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  Auto-Terminate: ตัดสายทิ้งทันที (ถ้าลูกหลานเปิด Opt-in) พร้อมส่ง SOS หาครอบครัว
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Defense Strategy */}
        <div id="sec-compliance" className="doc-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Scale size={28} color="#ff375f" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>4. กฎหมายและข้อจำกัด (Compliance)</h2>
          </div>
          
          <div className="bento-card" style={{ borderLeft: '4px solid #ff375f' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h5 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Wiretapping (การดักฟัง)</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  แก้ด้วย <strong style={{ color: '#ff375f' }}>Transient Processing</strong>: แปลงเสียงเป็น Text และประมวลผลบน RAM ทันที ไม่มีการเซฟไฟล์เสียงลงหน่วยความจำถาวร
                </p>
              </div>
              <div>
                <h5 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.75rem' }}>PDPA (ข้อมูลมิจฉาชีพ)</h5>
                <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                  อ้างอิงฐาน <strong style={{ color: '#ff375f' }}>Legitimate Interest</strong> เพื่อป้องกันอาชญากรรม (Fraud Prevention) ประมวลผลแบบ On-device ทั้งหมด 100%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Competitive Advantage */}
        <div id="sec-moat" className="doc-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Trophy size={28} color="#bf5af2" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>5. ความได้เปรียบ (Moat)</h2>
          </div>
          <div className="bento-grid-2">
            <div className="bento-card">
              <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.75rem' }}>เหนือกว่า Truecaller</h4>
              <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                เป็น <strong style={{ color: '#bf5af2' }}>Proactive (จับเนื้อหา)</strong> ไม่ใช่ Reactive (รอมนุษย์ Report เบอร์)
              </p>
            </div>
            <div className="bento-card">
              <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '0.75rem' }}>เหนือกว่า Google Call Screen</h4>
              <p style={{ color: '#86868b', fontSize: '1rem', lineHeight: 1.6 }}>
                เราปกป้อง <strong style={{ color: '#bf5af2' }}>"ระหว่างคุย" (During Call)</strong> ไม่ใช่แค่กรองก่อนรับสาย
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Business Model */}
        <div id="sec-business" className="doc-section" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Briefcase size={28} color="#30d158" />
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>6. โมเดลธุรกิจ (Business Model)</h2>
          </div>

          <div className="bento-card" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#f5f5f7', marginBottom: '1rem', fontSize: '1.3rem' }}>B2B2C: The InsurTech Play</h4>
            <p style={{ color: '#86868b', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              เราไม่เก็บเงินผู้สูงอายุ (Free for Vulnerable) แต่ทำรายได้ผ่านโมเดล B2B ร่วมกับพันธมิตรองค์กร:
            </p>
            
            <div className="bento-grid-3">
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏦</div>
                <h5 style={{ color: '#f5f5f7', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Banking Partners</h5>
                <p style={{ color: '#86868b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  ขาย License ให้แอปธนาคารนำไปฝัง เพื่อลดภาระความรับผิดชอบ (Liability) กรณีลูกค้าโดนหลอกโอนเงิน
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                <h5 style={{ color: '#f5f5f7', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Cyber Insurance</h5>
                <p style={{ color: '#86868b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  จับมือบริษัทประกันออก "ประกันไซเบอร์" หากผู้สูงอายุติดตั้ง VoiceGuard จะได้ส่วนลดเบี้ยประกัน (Risk Mitigation)
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📶</div>
                <h5 style={{ color: '#f5f5f7', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Telco Bundles</h5>
                <p style={{ color: '#86868b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  ผูกแพ็กเกจ Family Plan ของค่ายมือถือ เช่น "AIS Family Shield" ได้รับสิทธิ์ใช้งานระบบระดับ Premium
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
