import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Loading = () => {
  const { t } = useTranslation();

  const MAX_PROGRESS = 100;
  const INCREMENT = 1;
  const SLOWDOWN_THRESHOLD = 90;
  const SLOWDOWN_FACTOR = 3;

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < SLOWDOWN_THRESHOLD) {
        setProgress((prevProgress: number) => prevProgress + INCREMENT);
      } else {
        setProgress((prevProgress) => prevProgress + INCREMENT / SLOWDOWN_FACTOR);
      }

      if (progress > MAX_PROGRESS) {
        setProgress(MAX_PROGRESS);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="techStackRoot">
      <motion.div
        initial={{ opacity: 0.8, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <progress
            id="file"
            className={`${progress == 100 ? 'tech-stack-jump-animation' : ''}`}
            value={progress}
            max="100"
          >
            {progress}%
          </progress>
        </div>
        <div>
          {progress >= 100 ? '🏃' : ''}
          {t('loading-prompt')}
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
