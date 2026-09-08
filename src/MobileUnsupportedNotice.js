import React from 'react';
import './mobile-unsupported.css';

const h = React.createElement;

export default function MobileUnsupportedNotice() {
  return h(
    'aside',
    { className: 'mobile-unsupported-notice', role: 'status', 'aria-live': 'polite' },
    h(
      'div',
      { className: 'mobile-unsupported-card' },
      h('p', { className: 'mobile-unsupported-mark' }, 'LAN / DESIGN PORTFOLIO'),
      h(
        'div',
        { className: 'mobile-unsupported-signal', 'aria-hidden': true },
        h('span', null),
        h('i', null),
        h('b', null),
      ),
      h('h1', null, '目前不支持手机端'),
      h('p', { className: 'mobile-unsupported-copy' }, '请用电脑查看，以获得完整的作品展示体验。'),
    ),
  );
}
