import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
            <div>
                <progress id="file" className={`${progress == 100 ? 'jump' : ''}`} value={progress} max="100">
                    {progress}%
                </progress>
            </div>
            <div>
                {progress >= 100 ? '🏃' : ''}
                {t('loading-prompt')}
            </div>
        </div>
    );
};

export default Loading;
