import { CSSProperties } from 'react';

export const styles: {
  layout: CSSProperties;
  header: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
} = {
  header: {
    position: 'sticky',
    zIndex: 1,
    width: '100%',
    padding: '2.5rem 2rem',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  layout: { height: 'max(100%, 100vh)' },
  content: { padding: '2rem' },
  footer: { textAlign: 'center' },
};
