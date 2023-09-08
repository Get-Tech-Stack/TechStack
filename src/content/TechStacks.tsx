import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Category from '../components/Category/Category';
import Feedback from 'components/Feedback/Feedback';
import useSWR from 'swr';
import Loading from 'components/Loading/Loading';
import Failed from 'components/Failed/Failed';

import { useTranslation } from 'react-i18next';

const VERSION = '1.17';

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

  const [collapsed, setCollapsed] = React.useState(false);

  const open = () => {
    setCollapsed(true);
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

    chrome.storage.sync.get(['allow_report_version']).then((result) => {
      if (result['allow_report_version']) {
        reportVersion();
      }
    });
  }, []);

  if (error) return <Failed />;

  if (isLoading) return <Loading />;

  const results: any[] = [];
  Object.entries(data || {}).forEach(([key, value]) => {
    results.push(<Category name={key} key={key} deps={value} />);
  });

  return (
    <div
      className="techStackRoot"
      style={collapsed ? { height: 'auto', overflow: 'visible' } : { height: '300px', overflow: 'hidden' }}
    >
      {!collapsed && (
        <div className="techstack-collapsed-container">
          <div className="techstack-open" onClick={() => open()}>
            展开
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0.8, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="techstack-category-container">
          {results.length !== 0 && results}
          {results.length === 0 && <div>{t('no-found-prompt')}</div>}
        </div>
        <Feedback url={url} />
      </motion.div>
    </div>
  );
};

export default TechStacks;
