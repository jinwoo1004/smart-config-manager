import React, { useState } from 'react';

export default function DBConnect({ onConnect }) {
  const [cfg, setCfg] = useState({ host:'', port:'3306', database:'', user:'', password:'' });
  const [msg, setMsg] = useState('');

  const handle = async () => {
    const res = await window.api.connect(cfg);
    if (res.success) onConnect(cfg);
    else setMsg(`연결 실패: ${res.message}`);
  };

  return (
    <div>
      <h3>DB 연결</h3>
      {['host','port','database','user','password'].map(k => (
        <div key={k}>
          <input
            type={k==='password'?'password':'text'}
            placeholder={k}
            value={cfg[k]}
            onChange={e=>setCfg({...cfg,[k]:e.target.value})}
          />
        </div>
      ))}
      <button onClick={handle}>연결</button>
      <p style={{color:'red'}}>{msg}</p>
    </div>
  );
}
