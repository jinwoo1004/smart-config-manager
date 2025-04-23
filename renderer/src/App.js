import React, { useState } from 'react';
import DBConnect from './components/DBConnect';
import ConfigManager from './components/ConfigManager';

function App() {
  const [dbConfig, setDbConfig] = useState(null);
  return (
    <div>
      {dbConfig
        ? <ConfigManager dbConfig={dbConfig} />
        : <DBConnect onConnect={setDbConfig} />}
    </div>
  );
}

export default App;
