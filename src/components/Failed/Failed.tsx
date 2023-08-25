import React from 'react';
import { useTranslation } from 'react-i18next';

const Failed = () => {
    const { t } = useTranslation();

    return (
        <div className="techStackRoot">
            <div>{t('failed-propmpt')} </div>
        </div>
    );
};

export default Failed;
