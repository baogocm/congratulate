import { useState, useEffect } from 'react'
import './App.css'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import video1 from './assets/v1.mp4'
import video2 from './assets/v2.mp4'

function App() {
  const [currentVideo, setCurrentVideo] = useState(video1);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [sparkles, setSparkles] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [celebrationText, setCelebrationText] = useState('');

  const celebrationTexts = [
    "🎉 Chúc mừng tốt nghiệp! 🎉",
    "🌟 Tự hào về Linh! 🌟",
    "🎓 Xuất sắc lắm! 🎓",
    "✨ Chúc Linh vui vẻ ✨",
    "🌈 Vững bước tiếp tục tiến lên phía trước nhé! 🌈"
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setIsTypingDone(true);
      }, 5000);

      const videoInterval = setInterval(() => {
        setCurrentVideo(prev => prev === video1 ? video2 : video1);
      }, 30000);

      const createSparkle = () => {
        const sparkle = {
          id: Date.now(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 10 + 4,
          animationDuration: Math.random() * 2 + 1
        };
        setSparkles(prev => [...prev, sparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
        }, sparkle.animationDuration * 1000);
      };

      const sparkleInterval = setInterval(createSparkle, 300);

      return () => {
        clearInterval(videoInterval);
        clearInterval(sparkleInterval);
      };
    }
  }, [isAuthenticated]);

  const createFirework = (x, y) => {
    const colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
      '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'
    ];

    const firework = {
      id: Date.now(),
      x,
      y,
      particles: Array.from({ length: 30 }, (_, i) => ({
        id: i,
        angle: (i * 12) * Math.PI / 180,
        velocity: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        finalX: Math.cos((i * 12) * Math.PI / 180) * (100 + Math.random() * 50),
        finalY: Math.sin((i * 12) * Math.PI / 180) * (100 + Math.random() * 50)
      }))
    };

    setFireworks(prev => [...prev, firework]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => f.id !== firework.id));
    }, 1000);
  };

  const showCelebrationText = () => {
    const text = celebrationTexts[Math.floor(Math.random() * celebrationTexts.length)];
    setCelebrationText(text);
    setTimeout(() => setCelebrationText(''), 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === 'lê thị mỹ tiên' || 
        name.trim().toLowerCase() === 'le thi my tien') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Tên không đúng. Vui lòng thử lại!');
      setName('');
    }
  };

  const playCongrats = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = 20 + Math.random() * 60;
        const y = 20 + Math.random() * 60;
        createFirework(x, y);
      }, i * 300);
    }
    showCelebrationText();
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Xin chào! 👋</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="login-input"
              placeholder="Nhập tên của Tiên nè..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Tiếp tục ▶️
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
        >
          {firework.particles.map(particle => (
            <div
              key={particle.id}
              className="firework-particle"
              style={{
                backgroundColor: particle.color,
                '--final-x': `${particle.finalX}px`,
                '--final-y': `${particle.finalY}px`
              }}
            />
          ))}
        </div>
      ))}

      {celebrationText && (
        <div className="celebration-text show">{celebrationText}</div>
      )}

      <div className="sparkles">
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animation: `sparkle-animation ${sparkle.animationDuration}s ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="graduation-card">
        <h1 className="title">Chúc Mừng Tốt Nghiệp! 🎓</h1>
        <div className="message-container">
          <p className={`message ${!isTypingDone ? 'typing' : ''}`}>
            Chúc mừng Linh đã chính thức tốt nghiệp – một cột mốc quan trọng trong hành trình trưởng thành của Linh!

Na biết suốt những năm qua Linh đã nỗ lực không ngừng, có những lúc mệt mỏi, có lúc muốn buông xuôi, nhưng cuối cùng Linh đã kiên trì và vượt qua tất cả. Na tự hào về Linh lắm!

Rất tiếc Na không thể tham gia buổi lễ hôm nay, nhưng đây là món quà Na muốn gửi đến Linh như lời chúc mừng đặc biệt nhất. Chúc Linh tiếp tục vững bước trên con đường phía trước, chạm tới những ước mơ mới và giữ mãi ngọn lửa đam mê trong tim. Dù ở đâu, Linh luôn có Na ở bên, cổ vũ và tin tưởng vào tất cả những điều tuyệt vời mà Linh sẽ làm!
          </p>
          <div className="signature">- Na -</div>
        </div>

        <div className="media-section">
          <h2 className="section-title">Kỷ niệm đẹp 📸</h2>
          <div className="gallery">
            {[img1, img2, img3, img4, img5].map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`Kỷ niệm ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <h2 className="section-title">Những khoảnh khắc đáng nhớ 🎬</h2>
          <div className="video-container">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              controls
              src={currentVideo}
            />
          </div>
        </div>

        <button className="button" onClick={playCongrats}>
          🎆 Bắn pháo hoa chúc mừng 🎆
        </button>
      </div>
    </div>
  )
}

export default App