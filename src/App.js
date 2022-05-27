import { useEffect } from 'react';
import { main } from './utils/text';

function App() {
  useEffect(() => {
    main();
  }, []);

  return (
    <div className='App'>
      <canvas className='webgl'></canvas>
    </div>
  );
}

export default App;
