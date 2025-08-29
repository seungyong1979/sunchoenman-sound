const { useState, useEffect } = React;

const App = () => {
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const styles = {
        section: {
            padding: '80px 20px',
            maxWidth: '1200px',
            margin: '0 auto',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s ease-out'
        },
        sectionVisible: {
            opacity: 1,
            transform: 'translateY(0)'
        },
        hero: {
            position: 'relative',
            height: '100vh',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("data:image/svg+xml,%3Csvg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="sky" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FFE4C8"%2F%3E%3Cstop offset="50%25" style="stop-color:%23FFA668"%2F%3E%3Cstop offset="100%25" style="stop-color:%238B6B47"%2F%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1920" height="1080" fill="url(%23sky)"%2F%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            flexDirection: 'column',
            maxWidth: '100%',
            margin: 0
        },
        heroTitle: {
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        },
        heroSubtitle: {
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: '300',
            maxWidth: '600px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
        },
        scrollIndicator: {
            position: 'absolute',
            bottom: '40px',
            animation: 'bounce 2s infinite'
        },
        quoteBlock: {
            background: '#F5F0E8',
            padding: '40px 30px',
            borderRadius: '20px',
            marginBottom: '40px',
            textAlign: 'center',
            fontSize: '1.3rem',
            color: '#5D4E37',
            fontStyle: 'italic',
            position: 'relative'
        },
        narrativeText: {
            fontSize: '1.1rem',
            lineHeight: '2',
            color: '#4A4A4A',
            marginBottom: '30px'
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#3B2F2F',
            textAlign: 'center'
        },
        highlightCard: {
            background: '#FFFFFF',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            transition: 'transform 0.3s ease',
            cursor: 'default'
        },
        highlightIcon: {
            fontSize: '2.5rem',
            marginBottom: '15px',
            display: 'block'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '40px'
        },
        infoItem: {
            background: '#FAF8F3',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: '4px solid #CD853F'
        },
        ctaButton: {
            display: 'inline-block',
            padding: '20px 50px',
            fontSize: '1.2rem',
            fontWeight: '600',
            background: '#CD853F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(205, 133, 63, 0.3)',
            marginTop: '30px'
        }
    };

    const programHighlights = [
        { icon: '🧘‍♀️', text: '방파제 요가 & 멍 명상' },
        { icon: '🚣', text: '뻘배 타기 & 갯벌 생태 체험' },
        { icon: '🦀', text: '칠게 망 털기 실습' },
        { icon: '🌅', text: '노을과 달빛 음악회' },
        { icon: '🍚', text: '마을 주민과의 대화와 식사' },
        { icon: '⏰', text: '순천만의 느린 시간에 머무르기' }
    ];

    return (
        <>
            <style jsx>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
                
                .highlight-card:hover {
                    transform: translateY(-5px);
                }
                
                .cta-button:hover {
                    background: #B8763F;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(205, 133, 63, 0.4);
                }
                
                @media (max-width: 768px) {
                    .section {
                        padding: 60px 15px !important;
                    }
                }
            `}</style>

            {/* Hero Section */}
            <section style={styles.hero}>
                <div>
                    <h1 style={styles.heroTitle}>
                        2025 생생뻘배학교 – 거차마을이 여는 슬로우 네이처 스쿨
                    </h1>
                    <p style={styles.heroSubtitle}>
                        자연은 늘 그 자리에 있었습니다. 이제, 그 곁에 머무는 법을 배웁니다.
                    </p>
                </div>
                <div style={styles.scrollIndicator}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M15 5L15 25M15 25L10 20M15 25L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </section>

            {/* Intro Section */}
            <section id="intro" className="fade-in" style={{
                ...styles.section,
                ...(isVisible.intro ? styles.sectionVisible : {})
            }}>
                <div style={styles.quoteBlock} className="serif">
                    "뻘배는 우리 갯벌을 닮았습니다. 느리지만 묵묵하게 길을 내지요."
                </div>
                <p style={styles.narrativeText}>
                    순천만의 아침은 바다보다 먼저 깨어나는 사람들의 손끝에서 시작됩니다. 
                    갯벌 위를 미끄러지듯 달리는 '뻘배'는 순천만의 삶을 상징하는 작은 배입니다. 
                    이제 이 뻘배가 단순한 어업 도구를 넘어, 순천만의 문화자원으로 다시 태어나려 합니다.
                </p>
            </section>

            {/* About Section */}
            <section id="about" className="fade-in" style={{
                ...styles.section,
                background: '#FAFAFA',
                ...(isVisible.about ? styles.sectionVisible : {})
            }}>
                <h2 style={styles.sectionTitle}>거차마을, 뻘배학교를 열다</h2>
                <p style={styles.narrativeText}>
                    거차마을 주민들이 여는 '생생 뻘배학교'에서는 오랜 세월 뻘배와 살아온 주민들이 
                    직접 뻘배 타는 법을 가르치고, 참여자들은 순천만 갯벌 생태와 조류, 
                    물때에 맞춰 숨 쉬는 자연의 리듬을 온몸으로 배웁니다.
                </p>
            </section>

            {/* Program Highlights */}
            <section id="highlights" className="fade-in" style={{
                ...styles.section,
                ...(isVisible.highlights ? styles.sectionVisible : {})
            }}>
                <h2 style={styles.sectionTitle}>이런 경험을 합니다</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {programHighlights.map((item, index) => (
                        <div key={index} style={styles.highlightCard} className="highlight-card">
                            <span style={styles.highlightIcon}>{item.icon}</span>
                            <p style={{ fontSize: '1.1rem', color: '#5D4E37' }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why It Matters */}
            <section id="why" className="fade-in" style={{
                ...styles.section,
                background: '#F5F0E8',
                ...(isVisible.why ? styles.sectionVisible : {})
            }}>
                <h2 style={styles.sectionTitle}>단순한 체험이 아닙니다</h2>
                <div style={{
                    fontSize: '1.2rem',
                    lineHeight: '2',
                    color: '#4A4A4A',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <p style={{ marginBottom: '30px', fontWeight: '500' }}>
                        "갯벌에 직접 나가서 뻘배를 타보면, 단순히 '재미'가 아닙니다.<br/>
                        뻘 속 생명, 그 생명을 돌보는 어민의 삶, 그 모든 것이 연결돼 있다는 걸 느끼게 됩니다."
                    </p>
                    <p>
                        생생뻘배학교는 '전시용 체험'이 아니라 지속 가능한 생태관광을 꿈꿉니다. 
                        그 중심에는 마을이 있습니다.
                    </p>
                </div>
            </section>

            {/* Info Section */}
            <section id="info" className="fade-in" style={{
                ...styles.section,
                ...(isVisible.info ? styles.sectionVisible : {})
            }}>
                <h2 style={styles.sectionTitle}>운영정보</h2>
                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <h3 style={{ marginBottom: '10px', color: '#CD853F' }}>📅 날짜</h3>
                        <p>2025년 일정 상시 운영 (1박 2일)</p>
                    </div>
                    <div style={styles.infoItem}>
                        <h3 style={{ marginBottom: '10px', color: '#CD853F' }}>📍 장소</h3>
                        <p>전라남도 순천시 해룡면 거차마을</p>
                    </div>
                    <div style={styles.infoItem}>
                        <h3 style={{ marginBottom: '10px', color: '#CD853F' }}>🏘️ 주최</h3>
                        <p>거차마을 어촌계</p>
                    </div>
                    <div style={styles.infoItem}>
                        <h3 style={{ marginBottom: '10px', color: '#CD853F' }}>🎯 주관</h3>
                        <p>2025 순천세계유산축전</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="cta" className="fade-in" style={{
                ...styles.section,
                textAlign: 'center',
                paddingBottom: '100px',
                ...(isVisible.cta ? styles.sectionVisible : {})
            }}>
                <h2 style={styles.sectionTitle}>참여 신청하기</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#666' }}>
                    자연과 마을의 삶을 느껴보고 싶은 분이라면 누구든지 환영합니다.
                </p>
                <a 
                    href="https://scwhf.com/tiny/apps/form/form.php?id=24" 
                    style={styles.ctaButton}
                    className="cta-button"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    생생뻘배학교 신청하러 가기
                </a>
            </section>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));