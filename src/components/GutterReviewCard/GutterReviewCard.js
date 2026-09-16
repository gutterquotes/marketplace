import React from 'react';

import css from './GutterReviewCard.module.css';

const GutterReviewCard = ({ review, compact = false }) => {
  return (
    <article className={compact ? `${css.root} ${css.compact}` : css.root}>
      <div className={css.rating} aria-label={`${review.rating} out of 5 stars`}>
        <span aria-hidden="true">{'★'.repeat(review.rating)}</span>
        <span className={css.ratingText}>{review.rating}.0</span>
      </div>
      <h3>{review.title}</h3>
      <blockquote>“{review.review}”</blockquote>
      <div className={css.reviewer}>
        <strong>{review.name}</strong>
        <span>
          {review.city}, {review.state}
        </span>
      </div>
      {!compact ? (
        <div className={css.meta}>
          <span>{review.services.join(' · ')}</span>
          <span>Matched with {review.pro}</span>
        </div>
      ) : null}
    </article>
  );
};

export default GutterReviewCard;
