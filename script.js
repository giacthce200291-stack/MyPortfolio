/* ==========================================================================
   script.js — phần tương tác, viết bằng JavaScript thuần.
   Làm 3 việc: đổi ngôn ngữ VI/EN, đổi giao diện sáng/tối, sao chép email/SĐT.
   ========================================================================== */

(() => {
  'use strict';

  const STORAGE_KEYS = { language: 'portfolio_lang', theme: 'portfolio_theme' };
  const SUPPORTED_LANGUAGES = ['vi', 'en'];
  const DEFAULT_LANGUAGE = 'vi';
  const SUPPORTED_THEMES = ['light', 'dark'];
  const COPY_FEEDBACK_MS = 2000;

  const content = window.PORTFOLIO_CONTENT;
  const copyStatusElement = document.getElementById('copy-status');
  let copyFeedbackTimer = null;

  // localStorage có thể bị chặn (chế độ riêng tư): khi đó chỉ là không nhớ được lựa chọn, trang vẫn chạy bình thường.
  function readStoredValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storeValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* bỏ qua, xem ghi chú ở readStoredValue */
    }
  }

  function detectInitialLanguage() {
    const stored = readStoredValue(STORAGE_KEYS.language);
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  }

  /* ---------- Ngôn ngữ ---------- */

  function applyLanguage(language) {
    const dictionary = content[language];
    if (!dictionary) return;

    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const text = dictionary[element.dataset.i18n];
      if (text === undefined) {
        console.warn(`Thiếu bản dịch "${element.dataset.i18n}" cho ngôn ngữ "${language}"`);
        return;
      }
      element.textContent = text;
    });

    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
      const text = dictionary[element.dataset.i18nLabel];
      if (text !== undefined) element.setAttribute('aria-label', text);
    });

    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });

    document.title = dictionary['meta.title'];
    storeValue(STORAGE_KEYS.language, language);
  }

  /* ---------- Giao diện sáng/tối ---------- */

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    if (!SUPPORTED_THEMES.includes(next)) return;

    document.documentElement.setAttribute('data-theme', next);
    storeValue(STORAGE_KEYS.theme, next);
  }

  /* ---------- Sao chép ---------- */

  function copyWithLegacyApi(text) {
    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.opacity = '0';
    document.body.append(scratch);
    scratch.select();

    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
    } catch {
      succeeded = false;
    }
    scratch.remove();
    return succeeded;
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Trang mở bằng file:// hoặc bị từ chối quyền: thử cách cũ bên dưới.
      }
    }
    return copyWithLegacyApi(text);
  }

  function showCopyFeedback(message) {
    if (!copyStatusElement) return;

    copyStatusElement.textContent = message;
    window.clearTimeout(copyFeedbackTimer);
    copyFeedbackTimer = window.setTimeout(() => {
      copyStatusElement.textContent = '';
    }, COPY_FEEDBACK_MS);
  }

  async function handleCopyClick(button) {
    const language = document.documentElement.lang;
    const dictionary = content[language] ?? content[DEFAULT_LANGUAGE];
    const succeeded = await copyText(button.dataset.copy);

    showCopyFeedback(
      succeeded
        ? `${dictionary['ui.copyDone']}: ${button.dataset.copy}`
        : dictionary['ui.copyFailed']
    );
  }

  /* ---------- Gắn sự kiện ---------- */

  document.addEventListener('click', (event) => {
    const languageButton = event.target.closest('[data-lang]');
    if (languageButton) {
      applyLanguage(languageButton.dataset.lang);
      return;
    }

    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) {
      handleCopyClick(copyButton);
      return;
    }

    if (event.target.closest('#theme-toggle')) {
      toggleTheme();
    }
  });

  applyLanguage(detectInitialLanguage());
})();
