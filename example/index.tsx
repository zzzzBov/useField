import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useField } from '../.'

const App = () => {
  const {
    set,
    value
  } = useField({}, '')

  return (
    <form>
      <input type='text' value={value} onChange={(e) => set(e.currentTarget.value)} />
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
