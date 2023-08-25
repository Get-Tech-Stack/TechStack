import Feedback from 'components/Feedback/Feedback';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PrivateProps {
    url: string;
}

const PrivateRepo = ({ url }: PrivateProps) => {
    const { t } = useTranslation();
    return (
        <div className="techStackRoot">
            <div>{t('private-prompt')}</div>
            <Feedback url={url} />
        </div>
    );
};
export default PrivateRepo;
