import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useFireWork from 'react-use-firework';
import storage from '../../utils/storage';

interface PrivateProps {
  url: string;
}

const like = async (url: string) => {
  fetch('https://techstack.zeabur.app/like?url=' + url, {
    method: 'GET',
    credentials: 'include',
  }).catch((err) => {
    console.log(err);
  });
};

const unlike = async (url: string) => {
  fetch('https://techstack.zeabur.app/unlike?url=' + url, {
    method: 'GET',
    credentials: 'include',
  }).catch((err) => {
    console.log(err);
  });
};

const Feedback = ({ url }: PrivateProps) => {
  const likeRef = useRef(null);
  const unlikeRef = useRef(null);

  const [enableFeedback, setEnableFeedback] = React.useState(true);

  useFireWork(likeRef);
  useFireWork(unlikeRef);

  const [liked, setLiked] = React.useState(false);

  const { t } = useTranslation();

  const handleLikeBtnClick = async (url: string) => {
    like(url);
    setLiked(true);
  };

  const handleUnlikeBtnClick = async (url: string) => {
    unlike(url);
    setLiked(true);
  };

  const mailUrl =
    'mailto:a778917369@gmail.com?subject=TechStack%20feedback%3A%20%5B' +
    url +
    "%5D&body=What's%20the%20problem%3F%0D%0A%0D%0AAny%20suggestions%3F";

  storage.get(['enable_feedback']).then((result: any) => {
    setEnableFeedback(result['enable_feedback'] || result['enable_feedback'] === undefined);
  });

  if (enableFeedback) {
    return (
      <div className="techstack-footer">
        <div className="techstack-feedback">
          {!liked ? (
            <>
              <div>{t('feedback-prompt')}</div>
              <div ref={likeRef} className="cursor-pointer" onClick={() => handleLikeBtnClick(url)}>
                👍
              </div>
              <div ref={unlikeRef} className="cursor-pointer" onClick={() => handleUnlikeBtnClick(url)}>
                👎
              </div>
            </>
          ) : (
            <div>{t('feedback-thank')}</div>
          )}
        </div>
        <a className="techstack-footer-feedback" href={mailUrl} target="_blank" rel="noreferrer">
          feedback
        </a>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Feedback;
