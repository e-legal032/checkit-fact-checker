import { useEffect, useState } from 'react';
import splashImg from '../assets/SplashScreen.png';


export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.(); // avisamos al padre que terminó
    }, 2000); // duración total de la splash (ms)

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="splash-screen">
      <img src={splashImg} alt="Splash CheckIt" className="splash-logo" />
    </div>
  );
}
