import { useReducer } from 'react';

function useForceUpdate() {
  const [, dispatch] = useReducer((x) => x + 1, 0);
  return dispatch;
}

export default useForceUpdate