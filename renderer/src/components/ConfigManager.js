import React, { useState } from 'react';
import presets from '../presets.json';

export default function ConfigManager({ dbConfig }) {
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('');

  const loadItems = () => setItems(presets[category] || []);

  const handleSave = async (idx) => {
    const it = items[idx];
    const res = await window.api.saveConfig({
      dbConfig,
      paramType: it.param_type,
      paramTypeValue: it.param_type_value,
      paramName: it.param_name,
      paramValue: it.param_name_value,
      paramComment: it.param_comment
    });
    setMsg(res.success ? '저장 성공' : `저장 실패: ${res.message}`);
  };

  return (
    <div>
      <h3>설정 관리</h3>
      <select onChange={e=>{ setCategory(e.target.value); loadItems(); }}>
        <option value="">-- 분류 선택 --</option>
        {Object.keys(presets).map(cat=> <option key={cat}>{cat}</option>)}
      </select>
      {items.map((it, i) => (
        <div key={i} style={{border:'1px solid #ccc', padding:'8px', margin:'4px'}}>
          <label>{it.param_name}</label>
          <input
            value={it.param_name_value}
            onChange={e=>{ const c=[...items]; c[i].param_name_value=e.target.value; setItems(c); }}
          />
          <input
            value={it.param_comment}
            onChange={e=>{ const c=[...items]; c[i].param_comment=e.target.value; setItems(c); }}
          />
          <button onClick={()=>handleSave(i)}>저장</button>
        </div>
      ))}
      <p>{msg}</p>
    </div>
  );
}
