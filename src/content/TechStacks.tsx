import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Category from '../components/Category/Category';
import Feedback from 'components/Feedback/Feedback';
import useSWR from 'swr';
import Loading from 'components/Loading/Loading';
import Failed from 'components/Failed/Failed';

import { useTranslation } from 'react-i18next';
import AnimateHeight, { Height } from 'react-animate-height';
import storage from '../utils/storage';

const VERSION = '1.22';

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, { credentials: 'include', ...init });
  return res.json();
}
interface TechStacksProps {
  url: string;
}

const reportVersionRequest = async (id: string) => {
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
  const { data, error, isLoading } = useSWR(`https://techstack.zeabur.app/repo?url=${url}`, {
    fetcher: fetcher,
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const techstackRef = useRef<any>(null);

  const [expand, setExpand] = useState(false);
  const [height, setHeight] = useState(0);

  // the status is to renew get the height of the techstack container
  const [loadStatus, setLoadStatus] = useState(false);

  const open = () => {
    setExpand(true);
  };

  const { t } = useTranslation();

  useEffect(() => {
    const reportVersion = async () => {
      const fp = await FingerprintJS.load();

      const { visitorId } = await fp.get();
      // report extension version
      if (sessionStorage.getItem('id') !== visitorId) {
        reportVersionRequest(visitorId);
        sessionStorage.setItem('id', visitorId);
      }
    };

    storage.get(['allow_report_version']).then((result) => {
      if (result['allow_report_version'] || result['allow_report_version'] === undefined) {
        reportVersion();
      }
    });
  }, []);

  useEffect(() => {
    storage.get(['auto_collapsed']).then((result) => {
      if (result['auto_collapsed'] || result['auto_collapsed'] == undefined) {
        setExpand(false);
      } else {
        setExpand(true);
      }
    });
  }, []);

  useLayoutEffect(() => {
    const height = techstackRef?.current?.offsetHeight;
    if (!height) {
      return;
    }
    setHeight(height);
  }, [loadStatus]);

  if (error) return <Failed />;

  if (isLoading) return <Loading />;

  const results: any[] = [];
  Object.entries(data || {}).forEach(([key, value]) => {
    results.push(<Category name={key} key={key} deps={value} />);
  });

  // the status is for to trigger the useEffect to get the height of the techstack container
  if (!loadStatus) {
    setLoadStatus(true);
  }

  return (
    <div
      className="techStackRoot"
      ref={techstackRef}
      style={expand ? { height: 'auto', overflow: 'visible' } : { maxHeight: '450px', overflow: 'hidden' }}
    >
      {!expand && !(height < 450) && (
        <div className={`techstack-collapsed-container`}>
          <div className="techstack-open" onClick={() => open()}>
            {t('expand-all')}
          </div>
        </div>
      )}

      <div className="techstack-category-container">
        {results.length !== 0 && results}
        {results.length === 0 && <div>{t('no-found-prompt')}</div>}
      </div>
      <Feedback url={url} />
    </div>
  );
};

const TechstackAnimation = ({ url }: TechStacksProps) => {
  const [height, setHeight] = useState<Height>('auto');
  const contentDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setHeight(contentDiv?.current?.clientHeight || 'auto');
    });

    resizeObserver.observe(contentDiv?.current || document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <AnimateHeight height={height} contentClassName="auto-content" contentRef={contentDiv}>
      <TechStacks url={url} />
    </AnimateHeight>
  );
};
export default TechstackAnimation;
