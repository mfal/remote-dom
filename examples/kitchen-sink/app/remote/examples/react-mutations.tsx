/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { createRemoteComponent } from '@remote-dom/react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { RenderAPI } from '../../types.ts';
import {
  Button as ButtonElement,
  Stack as StackElement,
  Text as TextElement,
} from '../elements.ts';

export const useTimer = (ms: number) => {
  const [ellapsed, setEllapsed] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEllapsed(true);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [setEllapsed]);
  return ellapsed;
};

const Stack = createRemoteComponent('ui-stack', StackElement);
const Text = createRemoteComponent('ui-text', TextElement);
const Button = createRemoteComponent('ui-button', ButtonElement, {
  eventProps: {
    onPress: {event: 'press'},
  },
});

const TimerComponent: FC<PropsWithChildren> = ({children}) => {
  const ellapsed = useTimer(100);
  if (ellapsed) {
    return <Button>Button {children}</Button>;
  }
  return <Text>Loading {children}</Text>;
};

function App(_props: {api: RenderAPI}) {
  return (
    <Stack spacing>
      <TimerComponent>1</TimerComponent>
      <TimerComponent>2</TimerComponent>
    </Stack>
  );
}

export function renderUsingReact(root: Element, api: RenderAPI) {
  createRoot(root).render(<App api={api} />);
}
