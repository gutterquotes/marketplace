const STORAGE_KEY = 'gutterQuotes.requestDraft.v1';

const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

export const saveGutterQuoteDraft = draft => {
  if (!hasStorage()) {
    return;
  }

  const payload = {
    ...draft,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const readGutterQuoteDraft = () => {
  if (!hasStorage()) {
    return null;
  }

  try {
    const rawDraft = window.localStorage.getItem(STORAGE_KEY);
    return rawDraft ? JSON.parse(rawDraft) : null;
  } catch (e) {
    return null;
  }
};

export const clearGutterQuoteDraft = () => {
  if (hasStorage()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};

export const GUTTER_QUOTE_LISTING_TYPE = 'post-request';
