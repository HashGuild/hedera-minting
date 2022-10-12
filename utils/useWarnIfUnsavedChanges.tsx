import { useEffect } from 'react';
import Router from 'next/router';

const useWarningOnExit = (shouldWarn: boolean, warningText?: string) => {
  const message = warningText || 'Are you sure that you want to leave?';

  useEffect(() => {
    let isWarned = false;

    const routeChangeStart = (url: string) => {
      if (Router.asPath !== url && shouldWarn && !isWarned) {
        isWarned = true;
        if (window.confirm(message)) {
          Router.push(url);
        } else {
          isWarned = false;
          Router.events.emit('routeChangeError');
          Router.replace(Router, Router.asPath, { shallow: true });
          // eslint-disable-next-line no-throw-literal, @typescript-eslint/no-throw-literal
          throw 'Abort route change. Please ignore this error.';
        }
      }
    };

    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldWarn && !isWarned) {
        const event = e || window.event;
        event.returnValue = message;
        return message;
      }
      return null;
    };

    Router.events.on('routeChangeStart', routeChangeStart);
    window.addEventListener('beforeunload', beforeUnload);
    Router.beforePopState(({ url }) => {
      if (Router.asPath !== url && shouldWarn && !isWarned) {
        isWarned = true;
        if (window.confirm(message)) {
          return true;
        }
        isWarned = false;
        window.history.pushState(null, '', url);
        Router.replace(Router, Router.asPath, { shallow: true });
        return false;
      }
      return true;
    });

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      window.removeEventListener('beforeunload', beforeUnload);
      Router.beforePopState(() => true);
    };
  }, [message, shouldWarn]);
};
export default useWarningOnExit;
