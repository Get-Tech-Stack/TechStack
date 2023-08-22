import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import StackCollect from './StackCollect';
import { useTranslation } from 'react-i18next';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Feedback from 'components/Feedback/Feedback';

const VERSION = '1.12';

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, { credentials: 'include', ...init });
    return res.json();
}
interface TechStacksProps {
    url: string;
}

const report = async (id: string) => {
    //
    fetch('https://techstack.zeabur.app/report', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            version: VERSION,
            id: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).catch((err) => {
        console.log(err);
    });
};

const TechStacks = ({ url }: TechStacksProps) => {
    const { t } = useTranslation();

    const MAX_PROGRESS = 100;
    const INCREMENT = 1;
    const SLOWDOWN_THRESHOLD = 90;
    const SLOWDOWN_FACTOR = 3;

    const [progress, setProgress] = useState(0);

    const { data, error, isLoading } = useSWR(`https://techstack.zeabur.app/repo?url=${url}`, {
        fetcher: fetcher,
        refreshInterval: 0,
        revalidateOnFocus: false,
    });

    // create and set the fingerprint as soon as
    // the component mounts
    React.useEffect(() => {
        const reportVersion = async () => {
            const fp = await FingerprintJS.load();

            const { visitorId } = await fp.get();

            // report extension version
            if (sessionStorage.getItem('id') !== visitorId) {
                report(visitorId);
                sessionStorage.setItem('id', visitorId);
            }
        };

        reportVersion();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < SLOWDOWN_THRESHOLD) {
                setProgress((prevProgress) => prevProgress + INCREMENT);
            } else {
                setProgress((prevProgress) => prevProgress + INCREMENT / SLOWDOWN_FACTOR);
            }

            if (progress > MAX_PROGRESS) {
                setProgress(MAX_PROGRESS);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [progress]);

    if (error)
        return (
            <div className="techStackRoot">
                <div>failed to load </div>{' '}
                {/* <div className="tech-footer">
                    <a className="tech-footer-feedback" href={mailUrl} target="_blank" rel="noreferrer">
                        feedback
                    </a>
                </div> */}
            </div>
        );

    if (isLoading)
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
                {/* <div className="tech-footer">
                    <a className="tech-footer-feedback" href={mailUrl} target="_blank" rel="noreferrer">
                        feedback
                    </a>
                </div> */}
            </div>
        );

    const results: any[] = [];
    Object.entries(data || {}).forEach(([key, value]) => {
        results.push(<StackCollect name={key} key={key} deps={value} />);
    });

    return (
        <div className="techStackRoot">
            <div className="stacks">
                {results.length !== 0 && results}
                {results.length === 0 && <div>{t('no-found-prompt')}</div>}
            </div>
            <Feedback url={url} />
        </div>
    );
};

export default TechStacks;
