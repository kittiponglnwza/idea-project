import { Shield, Zap, Cpu, Scale, Trophy, Briefcase, ChevronLeft, FileText } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function DocumentPage({ onBack }) {
  const containerRef = useRef(null);

  // Scroll Reveal Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, {
      threshold: 0.1,
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
      const topPos = element.offsetTop - 100;
      container.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  };

  const navItemClass = "text-[#86868b] text-sm font-semibold cursor-pointer transition-colors uppercase tracking-wide px-2 py-1 hover:text-[#f5f5f7]";

  return (
    <div ref={containerRef} className="w-full h-screen bg-black text-[#f5f5f7] overflow-y-auto font-sans relative animate-[fadeInDoc_0.5s_ease-out]">
      <style>{`
        @keyframes fadeInDoc {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #424245; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #636366; }
      `}</style>

      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-4 md:px-12 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <button onClick={onBack} className="bg-white/10 hover:bg-white/20 border-none rounded-full px-4 py-2 text-[#f5f5f7] cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors w-full md:w-auto justify-center md:justify-start">
          <ChevronLeft size={18} /> กลับสู่ Demo
        </button>

        {/* Landing Page Navigation Links */}
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <span className={navItemClass} onClick={() => scrollTo('sec-summary')}>Summary</span>
          <span className={navItemClass} onClick={() => scrollTo('sec-problem')}>Problem</span>
          <span className={navItemClass} onClick={() => scrollTo('sec-arch')}>Architecture</span>
          <span className={navItemClass} onClick={() => scrollTo('sec-compliance')}>Compliance</span>
          <span className={navItemClass} onClick={() => scrollTo('sec-moat')}>Moat</span>
          <span className={navItemClass} onClick={() => scrollTo('sec-business')}>Business</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12 pb-32">

        {/* Hero Header */}
        <div className="doc-section opacity-0 translate-y-12 transition-all duration-1000 text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 bg-gradient-to-b from-white to-[#86868b] text-transparent bg-clip-text">
            VoiceGuard
          </h1>
          <p className="text-lg md:text-2xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-medium">
            AI Assistant ระหว่างการโทร<br />ปกป้องผู้สูงอายุจากการหลอกลวงแบบ Real-time
          </p>
        </div>

        {/* Section 1: Executive Summary */}
        <div id="sec-summary" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={28} className="text-[#0071e3]" />
            <h2 className="text-2xl md:text-3xl font-bold">1. บทสรุปผู้บริหาร</h2>
          </div>
          <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
            <p className="text-[#86868b] leading-relaxed text-base md:text-lg">
              <strong className="text-[#f5f5f7]">VoiceGuard</strong> คือระบบป้องกันภัยคุกคามทางโทรศัพท์แบบ <strong className="text-[#0071e3]">Active Intervention</strong> (แทรกแซงแบบเรียลไทม์) ออกแบบมาเพื่อแก้ปัญหาแก๊งคอลเซ็นเตอร์หลอกลวงผู้สูงอายุ โดยใช้ <strong className="text-[#0071e3]">"Adaptive Risk Engine"</strong> วิเคราะห์บริบทและเนื้อหาการสนทนา หากพบความเสี่ยงสูง ระบบจะแจ้งเตือนอย่างรุนแรงและตัดสายอัตโนมัติ (Opt-in)
            </p>
          </div>
        </div>

        {/* Section 2: Problem & Why Now */}
        <div id="sec-problem" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={28} className="text-[#ff9f0a]" />
            <h2 className="text-2xl md:text-3xl font-bold">2. ปัญหาและโอกาส</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5 flex flex-col justify-center">
              <h4 className="text-[#f5f5f7] text-lg font-semibold mb-2">The 40B Baht Pain</h4>
              <p className="text-[#86868b] leading-relaxed text-sm md:text-base">
                ความเสียหายจากคดีหลอกลวงออนไลน์สูงถึง <strong className="text-[#ff3b30]">8 หมื่นล้านบาท</strong> โดยผู้สูงอายุเป็นกลุ่มที่สูญเสียเงินต่อหัวสูงสุด
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5 flex flex-col justify-center">
              <h4 className="text-[#f5f5f7] text-lg font-semibold mb-2">Gen AI Era</h4>
              <p className="text-[#86868b] leading-relaxed text-sm md:text-base">
                สแกมเมอร์เริ่มใช้ <strong className="text-[#f5f5f7]">AI Voice Clone</strong> และสคริปต์อัตโนมัติ ทำให้การหลอกลวงแนบเนียนขึ้นจนแยกไม่ออก
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5 flex flex-col justify-center">
              <h4 className="text-[#f5f5f7] text-lg font-semibold mb-2">Status Quo Failure</h4>
              <p className="text-[#86868b] leading-relaxed text-sm md:text-base">
                แอปบล็อกเบอร์แบบเดิม (Blacklist) ตามเบอร์ VoIP ไม่ทัน เราจึงต้องเปลี่ยนมาป้องกันที่ <strong className="text-[#f5f5f7]">"เนื้อหา"</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Architecture */}
        <div id="sec-arch" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Cpu size={28} className="text-[#0071e3]" />
            <h2 className="text-2xl md:text-3xl font-bold">3. สถาปัตยกรรมระบบ</h2>
          </div>

          <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5 mb-6">
            <h4 className="text-[#f5f5f7] text-xl font-semibold mb-4">Data Extraction Pipeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-[#0071e3] font-semibold text-lg mb-2">Method 1: Accessibility</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  เจาะจงใช้ Accessibility Service ดึง Text จาก "Samsung Call Captions" (รองรับไทย 100% ไม่ต้องดักฟัง Audio Stream เอง)
                </p>
              </div>
              <div>
                <h5 className="text-[#0071e3] font-semibold text-lg mb-2">Method 2: Protected Speaker</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  เปิดลำโพงอัตโนมัติเมื่อรับสายแปลกหน้า และใช้ไมโครโฟนส่งเสียงเข้า On-device Thai STT ขนาดเล็ก
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
            <h4 className="text-[#f5f5f7] text-xl font-semibold mb-4">The Intervention (การแทรกแซง)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2d2216] p-6 rounded-2xl">
                <h5 className="text-[#ff9f0a] font-semibold text-lg mb-2">⚠️ Medium Risk (60-80%)</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  Intrusive Warning: เครื่องสั่นเตือนต่อเนื่อง
                  พร้อมเด้งข้อความแจ้ง
                  เตือน ฉุกเฉินเต็มหน้าจอ
                  (สไตล์ Cell Broadcast)
                  บังคับให้ผู้ใช้อ่าน และ ต้อง
                  กด ‘รับทราบ ก่อนระบบถึง
                  จะยอมให้คุยสายต่อได้
                </p>
              </div>
              <div className="bg-[#321414] p-6 rounded-2xl">
                <h5 className="text-[#ff3b30] font-semibold text-lg mb-2">🚨 High Risk (&gt;80%)</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  แจ้งเตือนระดับสูงสุด!
                  หน้าจอระบุชัดเจนว่า
                  “สายนี้อันตรายมาก”
                  ให้สิทธิ์ผู้ใช้ตัดสินใจขั้น
                  สุดท้ายว่าจะตัดสายทิ้ง
                  ทันทีหรือไม่ ส่ง SMS แบบ
                  ฉุกเฉินหาลูกหลาน เพื่อให้
                  รีบติดต่อกลับมาช่วยเหลือ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Defense Strategy */}
        <div id="sec-compliance" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Scale size={28} className="text-[#ff375f]" />
            <h2 className="text-2xl md:text-3xl font-bold">4. กฎหมาย PDPA และความเป็นส่วนตัว</h2>
          </div>

          <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5 border-l-4 border-l-[#ff375f] mb-6">
            <h4 className="text-[#f5f5f7] text-xl font-semibold mb-6">3-Layer PDPA Defense Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-[#ff375f] font-semibold text-lg mb-3">1. Explicit Consent</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  ผู้ใช้งานหรือลูกหลานกดยอมรับเงื่อนไข <strong className="text-[#f5f5f7]">(Opt-in)</strong> อย่างชัดเจนตอนติดตั้งแอป เพื่ออนุญาตให้ AI ประมวลผลเสียงปกป้องตนเอง
                </p>
              </div>
              <div>
                <h5 className="text-[#ff375f] font-semibold text-lg mb-3">2. Implied Consent</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  ระบบมี <strong className="text-[#f5f5f7]">Automated Voice Warning</strong> แจ้งเตือนคู่สายทันทีว่า "สายนี้ถูกคุ้มครองโดย AI" หากคู่สายพูดต่อ ถือเป็นการยินยอมโดยปริยาย
                </p>
              </div>
              <div>
                <h5 className="text-[#ff375f] font-semibold text-lg mb-3">3. Legitimate Interest</h5>
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                  อ้างอิงฐาน <strong className="text-[#f5f5f7]">ประโยชน์อันชอบธรรม</strong> (Fraud Prevention) เพื่อป้องกันอาชญากรรม ซึ่งมีน้ำหนักทางกฎหมายเหนือกว่าสิทธิของมิจฉาชีพ
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
              <h4 className="text-[#f5f5f7] font-semibold text-lg mb-3">Zero Data Breach (On-Device)</h4>
              <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                ทำงานแบบ Local บนชิปมือถือ 100% <strong className="text-[#f5f5f7]">ไม่มีการส่งไฟล์เสียงหรือข้อความขึ้น Cloud</strong> จึงปิดประตูความเสี่ยงเรื่องข้อมูลรั่วไหลได้อย่างเด็ดขาด
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
              <h4 className="text-[#f5f5f7] font-semibold text-lg mb-3">Transient Processing</h4>
              <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                แปลงเสียงเป็น Text และประมวลผลลบจาก RAM ทันที <strong className="text-[#f5f5f7]">ไม่มีการบันทึกไฟล์เสียง (No Audio Logging)</strong> รอดพ้นข้อหาดักฟัง (Wiretapping)
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Competitive Advantage */}
        <div id="sec-moat" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Trophy size={28} className="text-[#bf5af2]" />
            <h2 className="text-2xl md:text-3xl font-bold">5. ความได้เปรียบ (Moat)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
              <h4 className="text-[#f5f5f7] font-semibold text-xl mb-3">เหนือกว่า Truecaller</h4>
              <p className="text-[#86868b] text-base md:text-lg leading-relaxed">
                เป็น <strong className="text-[#bf5af2]">Proactive (จับเนื้อหา)</strong> ไม่ใช่ Reactive (รอมนุษย์ Report เบอร์)
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
              <h4 className="text-[#f5f5f7] font-semibold text-xl mb-3">เหนือกว่า Google Call Screen</h4>
              <p className="text-[#86868b] text-base md:text-lg leading-relaxed">
                เราปกป้อง <strong className="text-[#bf5af2]">"ระหว่างคุย" (During Call)</strong> ไม่ใช่แค่กรองก่อนรับสาย
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Business Model */}
        <div id="sec-business" className="doc-section opacity-0 translate-y-12 transition-all duration-1000 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase size={28} className="text-[#30d158]" />
            <h2 className="text-2xl md:text-3xl font-bold">6. โมเดลธุรกิจ (Business Model)</h2>
          </div>

          <div className="bg-[#1d1d1f] rounded-3xl p-6 md:p-8 hover:scale-[1.01] hover:bg-[#252527] transition-all duration-300 border border-white/5">
            <h4 className="text-[#f5f5f7] font-semibold text-xl mb-4">B2B2C: The InsurTech Play</h4>
            <p className="text-[#86868b] text-base md:text-lg leading-relaxed mb-6">
              เราไม่เก็บเงินผู้สูงอายุ (Free for Vulnerable) แต่ทำรายได้ผ่านโมเดล B2B ร่วมกับพันธมิตรองค์กร:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-5 rounded-2xl">
                <div className="text-3xl mb-3">🏦</div>
                <h5 className="text-[#f5f5f7] font-semibold text-lg mb-2">Banking Partners</h5>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  ขาย License ให้แอปธนาคารนำไปฝัง เพื่อลดภาระความรับผิดชอบ (Liability) กรณีลูกค้าโดนหลอกโอนเงิน
                </p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl">
                <div className="text-3xl mb-3">🛡️</div>
                <h5 className="text-[#f5f5f7] font-semibold text-lg mb-2">Cyber Insurance</h5>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  จับมือบริษัทประกันออก "ประกันไซเบอร์" หากผู้สูงอายุติดตั้ง VoiceGuard จะได้ส่วนลดเบี้ยประกัน (Risk Mitigation)
                </p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl">
                <div className="text-3xl mb-3">📶</div>
                <h5 className="text-[#f5f5f7] font-semibold text-lg mb-2">Telco Bundles</h5>
                <p className="text-[#86868b] text-sm leading-relaxed">
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
