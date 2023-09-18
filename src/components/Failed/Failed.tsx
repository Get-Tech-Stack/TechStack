import Feedback from 'components/Feedback/Feedback';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FailedProps {
  url: string;
}
const Failed = ({ url }: FailedProps) => {
  const { t } = useTranslation();

  return (
    <div className="techStackRoot">
      <div>{t('failed-propmpt')} </div>
      <Feedback url={url} />
    </div>
  );
};

export default Failed;
