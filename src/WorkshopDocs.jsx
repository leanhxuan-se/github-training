import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import source from '../docs/git-github.md?raw';
import './workshop-docs.css';

const [titleLine, ...bodyLines] = source.replace(/^\uFEFF/, '').split(/\r?\n/);
const title = titleLine.replace(/^# /, '');
const body = bodyLines.join('\n');
const chapters = Array.from(body.matchAll(/^## (\d+)\. (.+)$/gm), ([, number, label]) => ({
  id: `tai-lieu-${number}`,
  number,
  label,
}));

const markdownComponents = {
  h2({ node, children, ...props }) {
    const number = node?.children[0]?.value?.match(/^(\d+)\. /)?.[1];
    return <h2 id={number === undefined ? undefined : `tai-lieu-${number}`} {...props}>{children}</h2>;
  },
  table({ node, ...props }) {
    return <div className="docs-table" role="region" aria-label="Bảng tra cứu" tabIndex={0}><table {...props} /></div>;
  },
};

export default function WorkshopDocs() {
  return (
    <main id="tai-lieu" className="container main-layout workshop-docs">
      <section className="docs-hero" aria-labelledby="docs-title">
        <h1 id="docs-title">{title}</h1>
        <a className="button button--hero" href="#demo">Vào demo <span aria-hidden="true">→</span></a>
      </section>

      <div className="docs-layout">
        <nav className="docs-toc" aria-label="Mục lục tài liệu">
          <h2>Mục lục</h2>
          <ol>
            {chapters.map(({ id, number, label }) => (
              <li key={id}><a href={`#${id}`}><span aria-hidden="true">{number}</span>{label}</a></li>
            ))}
          </ol>
        </nav>

        <article className="docs-content" aria-labelledby="docs-title">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{body}</Markdown>
          <div className="docs-next">
            <a className="button button--primary" href="#demo">Tiếp tục đến demo <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>
    </main>
  );
}
