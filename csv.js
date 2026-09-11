export function parseCSV(text) {
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c==='"' && quoted && n==='"'){ field+='"'; i++; }
    else if(c==='"') quoted=!quoted;
    else if(c===',' && !quoted){ row.push(field); field=''; }
    else if((c==='\n'||c==='\r') && !quoted){ if(c==='\r'&&n==='\n')i++; row.push(field); if(row.some(v=>v!==''))rows.push(row); row=[];field=''; }
    else field+=c;
  }
  row.push(field); if(row.some(v=>v!==''))rows.push(row);
  const [headers,...data]=rows;
  return data.map(values=>Object.fromEntries(headers.map((h,i)=>[h.trim(),(values[i]||'').trim()])));
}

export function validateRows(rows, required) {
  const errors=[];
  rows.forEach((row,i)=>required.forEach(key=>{ if(!row[key]) errors.push(`Row ${i+2}: missing ${key}`); }));
  return errors;
}
