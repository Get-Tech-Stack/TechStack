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
            {/* <div className="tech-footer">
                <a className="tech-footer-feedback" href={mailUrl} target="_blank" rel="noreferrer">
                    feedback
                </a>
            </div> */}
        </div>
    );
};
export default PrivateRepo;
