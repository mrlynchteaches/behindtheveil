const TTL_MS = 60 * 60 * 1000;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), n => ALPHABET[n % ALPHABET.length]).join('');
const token = () => crypto.randomUUID().replaceAll('-', '');
const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json','cache-control':'no-store'}});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/rooms' && request.method === 'POST') {
      const roomCode=code(), id=env.ROOMS.idFromName(roomCode), room=env.ROOMS.get(id);
      return room.fetch(new Request(new URL('/create',url),{method:'POST',body:JSON.stringify({roomCode,hostKey:token(),seed:code()}),headers:{'content-type':'application/json'}}));
    }
    const match=url.pathname.match(/^\/api\/rooms\/([A-Z2-9]{6})(\/.*)?$/);
    if(match){const id=env.ROOMS.idFromName(match[1]), room=env.ROOMS.get(id);url.pathname=match[2]||'/';return room.fetch(new Request(url,request));}
    return env.ASSETS.fetch(request);
  }
};

export class SimulationRoom {
  constructor(state){this.state=state;this.sessions=new Map();}
  async fetch(request){
    const url=new URL(request.url);
    if(request.headers.get('Upgrade')==='websocket')return this.connect(request);
    if(url.pathname==='/create'&&request.method==='POST'){
      const input=await request.json();
      const room={...input,createdAt:Date.now(),expiresAt:Date.now()+TTL_MS,phase:'lobby',locked:false,participants:[],groups:[],stateVersion:1};
      await this.state.storage.put('room',room);await this.state.storage.setAlarm(room.expiresAt);
      return json({roomCode:room.roomCode,hostKey:room.hostKey,seed:room.seed,expiresAt:room.expiresAt});
    }
    const room=await this.state.storage.get('room');
    if(!room||Date.now()>room.expiresAt)return json({error:'Room not found or expired'},404);
    if(url.pathname==='/join'&&request.method==='POST'){
      if(room.locked)return json({error:'This room is locked'},423);
      if(room.participants.length>=25)return json({error:'This room is full'},409);
      const reconnectToken=token(), label=this.label(room.participants.length);
      const participant={id:crypto.randomUUID(),label,reconnectToken,groupId:null,connected:false,complete:false};
      room.participants.push(participant);room.stateVersion++;await this.state.storage.put('room',room);this.broadcast(room);
      return json({participantId:participant.id,label,reconnectToken,room:this.publicRoom(room)});
    }
    if(url.pathname==='/host'&&request.method==='PATCH'){
      const input=await request.json();if(input.hostKey!==room.hostKey)return json({error:'Invalid host key'},403);
      const allowed=['phase','locked','groups','groupState','timerEndsAt','sessionMetadata'];for(const key of allowed)if(key in input)room[key]=input[key];
      room.stateVersion++;await this.state.storage.put('room',room);this.broadcast(room);return json(this.publicRoom(room));
    }
    if(url.pathname==='/erase'&&request.method==='DELETE'){
      const hostKey=request.headers.get('x-host-key');if(hostKey!==room.hostKey)return json({error:'Invalid host key'},403);
      await this.state.storage.deleteAll();this.broadcast({deleted:true});return json({deleted:true});
    }
    return json(this.publicRoom(room));
  }
  async connect(request){
    const room=await this.state.storage.get('room');if(!room)return new Response('Expired',{status:404});
    const pair=new WebSocketPair(),[client,server]=Object.values(pair);server.accept();this.sessions.set(server,true);server.send(JSON.stringify({type:'state',room:this.publicRoom(room)}));server.addEventListener('close',()=>this.sessions.delete(server));return new Response(null,{status:101,webSocket:client});
  }
  publicRoom(room){const {hostKey,...safe}=room;safe.participants=room.participants.map(({reconnectToken,...p})=>p);return safe;}
  broadcast(room){const data=JSON.stringify({type:'state',room:this.publicRoom(room)});for(const ws of this.sessions.keys())try{ws.send(data)}catch{this.sessions.delete(ws)}}
  label(index){const colors=['Plum','Sage','Cedar','Indigo','Fern'];const animals=['Heron','Fox','Owl','Turtle','Wren'];return `${colors[index%5]} ${animals[Math.floor(index/5)%5]} ${index+1}`;}
  async alarm(){await this.state.storage.deleteAll();for(const ws of this.sessions.keys())try{ws.close(1000,'Room expired')}catch{}}
}
