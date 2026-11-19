import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import templateUrl from '../templates/card.json?url&no-inline';
import { cards, invalidCards, members, organizerId, repository, showExamples } from './cards.js';
import './styles.css';

function Icon({ name }) {
  return <span className={`icon icon--${name}`} aria-hidden="true"><i /></span>;
}

function BranchGraphic() {
  return (
    <div className="branch-graphic" aria-hidden="true">
      <div className="branch-grid" />
      <div className="branch-main" />
      <div className="branch-path branch-path--top" />
      <div className="branch-path branch-path--bottom" />
      <div className="branch-node branch-node--start" />
      <div className="branch-node branch-node--split" />
      <div className="branch-node branch-node--top" />
      <div className="branch-node branch-node--bottom" />
      <div className="branch-node branch-node--merge" />
      <span className="branch-label branch-label--member">members/</span>
      <span className="branch-label branch-label--main">main</span>
      <span className="branch-label branch-label--pr">pull request</span>
    </div>
  );
}

function MemberCard({ card }) {
  const initials = card.initials || card.name.split(/\s+/).slice(-2).map((word) => Array.from(word)[0]).join('').toLocaleUpperCase('vi');
  const organizer = card.id === organizerId;
  const badge = organizer ? 'Người tổ chức' : card.example ? 'Minh họa' : '';

  return (
    <article className={`member-card theme--${card.theme}`}>
      <div className="member-cover">
        {card.cover ? (
          <img className="cover-image" src={card.cover} alt="" />
        ) : (
          <div className={`cover-pattern pattern--${card.pattern}`} aria-hidden="true"><span /><i /><b /></div>
        )}
        {badge && <span className="member-badge">{badge}</span>}
      </div>
      <div className="member-body">
        <div className="member-avatar" aria-hidden="true">
          {card.avatar ? <img src={card.avatar} alt="" /> : initials}
        </div>
        <h3>{card.name}</h3>
        {card.role && <p className="member-role">{card.role}</p>}
        {card.bio && <p className="member-bio">{card.bio}</p>}
        {card.tags.length > 0 && <ul className="member-tags" aria-label="Sở thích và chủ đề">
          {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>}
        {!card.example && <a className="member-link" href={`https://github.com/${card.id}`} target="_blank" rel="noreferrer">
          @{card.id} <Icon name="external" />
        </a>}
      </div>
    </article>
  );
}

function Guide({ dialogRef }) {
  return (
    <dialog ref={dialogRef} className="guide" aria-labelledby="guide-title">
      <div className="guide-heading">
        <h2 id="guide-title">Tạo thẻ của bạn</h2>
        <form method="dialog">
          <button className="icon-button" type="submit" aria-label="Đóng hướng dẫn" autoFocus><Icon name="close" /></button>
        </form>
      </div>
      <ol className="guide-steps">
        <li><strong>Tạo nhánh từ <code>main</code></strong><p>Trong repo đã clone, chạy <code>git switch -c card/ten-github</code>. Thay <code>ten-github</code> bằng username của bạn.</p></li>
        <li><strong>Sao chép rồi chỉnh thẻ mẫu</strong><p>Đặt file vào <code>members/ten-github/card.json</code>. Điền phần giới thiệu và đổi <code>theme</code>, <code>pattern</code> theo ý bạn.</p></li>
        <li><strong>Xem trước và gửi pull request</strong><p>Chạy <code>npm ci</code> lần đầu và <code>npm run dev</code> để xem thẻ. Sau đó commit, push nhánh và mở pull request vào <code>main</code>.</p></li>
      </ol>
      <div className="guide-actions">
        <a className="button button--primary" href={templateUrl} download="card.json"><Icon name="download" /> Tải thẻ mẫu</a>
        <a className="button button--secondary" href={repository} target="_blank" rel="noreferrer">Mở GitHub <Icon name="external" /></a>
      </div>
    </dialog>
  );
}

function App() {
  const [presenting, setPresenting] = useState(false);
  const guideRef = useRef(null);
  const presentButton = useRef(null);
  const exitButton = useRef(null);
  const restoreFocus = useRef(false);
  const fullscreenRequest = useRef(null);

  const endPresentation = useCallback(async () => {
    await fullscreenRequest.current;
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    setPresenting(false);
  }, []);

  useEffect(() => {
    if (presenting) {
      window.scrollTo(0, 0);
      exitButton.current?.focus();
      function onEscape(event) {
        if (event.key === 'Escape' && !document.fullscreenElement) endPresentation();
      }
      function onFullscreenChange() {
        if (!document.fullscreenElement) setPresenting(false);
      }
      window.addEventListener('keydown', onEscape);
      document.addEventListener('fullscreenchange', onFullscreenChange);
      return () => {
        window.removeEventListener('keydown', onEscape);
        document.removeEventListener('fullscreenchange', onFullscreenChange);
      };
    }

    if (restoreFocus.current) {
      presentButton.current?.focus();
      restoreFocus.current = false;
    }
  }, [presenting, endPresentation]);

  function startPresentation() {
    restoreFocus.current = true;
    setPresenting(true);
    // Keep the presentation layout if the browser denies full screen.
    fullscreenRequest.current = document.documentElement.requestFullscreen?.().catch(() => {});
  }

  const exampleCount = cards.length - members.length;
  const boardSummary = `${members.length} thành viên${showExamples ? ` · ${exampleCount} thẻ minh họa` : ''}`;

  return (
    <>
      {!presenting && <header className="site-header">
        <div className="container site-header-inner">
          <a className="brand" href="./">
            <span className="brand-icon"><Icon name="branch" /></span>
            Git Workshop
          </a>
          <a className="header-link" href={repository} target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a>
        </div>
      </header>}

      <main className={`container main-layout${presenting ? ' main-layout--presenting' : ''}`}>
        {presenting ? <h1 className="visually-hidden">Góc thành viên</h1> : (
          <section className="hero" aria-labelledby="page-title">
            <div className="hero-copy">
              <p className="hero-kicker"><span /> THỰC HÀNH GIT &amp; GITHUB</p>
              <h1 id="page-title">Góc thành viên<span>.</span></h1>
              <p className="hero-description">Tạo một thẻ giới thiệu mang dấu ấn của bạn và gửi pull request để góp mặt trên bảng chung.</p>
              <button className="button button--hero" type="button" onClick={() => guideRef.current.showModal()}><Icon name="plus" /> Tạo thẻ của bạn</button>
            </div>
            <BranchGraphic />
          </section>
        )}

        <section className="board" aria-labelledby="board-title">
          <div className="board-toolbar">
            <div>
              <h2 id="board-title">{presenting ? 'Góc thành viên' : 'Bảng giới thiệu'}</h2>
              <p>{boardSummary}</p>
            </div>
            {presenting ? (
              <button ref={exitButton} className="button button--secondary" type="button" onClick={endPresentation}><Icon name="close" /> Thoát trình chiếu</button>
            ) : (
              <button ref={presentButton} className="button button--secondary" type="button" onClick={startPresentation}><Icon name="expand" /> Trình chiếu</button>
            )}
          </div>
          {!presenting && invalidCards.length > 0 && <div className="board-warning" role="status">
            <strong>Có thẻ cần sửa</strong>
            <ul>{invalidCards.map(({ path, reason }) => <li key={path}><code>{path}</code> · {reason}</li>)}</ul>
          </div>}
          <div className="board-grid">
            {cards.map((card) => <MemberCard key={card.id} card={card} />)}
          </div>
        </section>
        {!presenting && <Guide dialogRef={guideRef} />}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
