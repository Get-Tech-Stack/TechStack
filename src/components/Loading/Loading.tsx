import Feedback from 'components/Feedback/Feedback';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
  url: string;
}
const Loading = ({ url }: LoadingProps) => {
  const { t } = useTranslation();

  return (
    <div className="techStackRoot">
      <div className="text-center" data-hide-on-error="">
        <picture>
          <img
            src="https://github.githubassets.com/images/mona-loading-default.gif"
            width="48"
            alt="Loading your activity..."
            className="mt-4 hide-reduced-motion"
          />
        </picture>
        <div>{t('loading-prompt')}</div>
      </div>

      <Feedback url={url} />
    </div>
  );
};

export default Loading;
