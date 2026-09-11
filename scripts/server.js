import http from 'node:http';import{readFile,stat}from'node:fs/promises';import{extname,join,normalize}from'node:path';
const root=process.cwd(),types={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
http.createServer(async(req,res)=>{try{const path=normalize(join(root,req.url==='/'?'index.html':req.url));if(!path.startsWith(root))throw Error();await stat(path);res.setHeader('content-type',types[extname(path)]||'application/octet-stream');res.end(await readFile(path))}catch{res.statusCode=404;res.end('Not found')}}).listen(4173,()=>console.log('http://localhost:4173'));
