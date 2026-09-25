document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'explore') initExplore();
  if (page === 'planner') initPlanner();
  if (page === 'stays') initStays();
  if (page === 'food') initFood();
  if (page === 'events') initEvents();
  if (page === 'store') initStore();
  if (page === 'stories') initStories();
  if (page === 'contact') initContact();
});

function initExplore() {
  const grid=document.getElementById('stateGrid');
  const search=document.getElementById('stateSearch');
  if(!grid)return;
  const districtName=d=>typeof d==='string'?d:d.name;
  const render=query=>{
    const q=(query||'').toLowerCase();
    const states=SUTRA_DATA.states.filter(st=>`${st.name} ${st.districts.map(districtName).join(' ')} ${st.tagline} ${st.culture} ${st.dish}`.toLowerCase().includes(q));
    grid.innerHTML=states.map(st=>`<article class="state-card" onclick="openState('${st.name.replace(/'/g,"\\'")}')"><div class="state-image" style="background-image:url('${st.image||''}')"></div><div class="state-card-overlay"></div><div class="state-card-content"><div class="state-icon">${st.icon}</div><h3>${st.name}</h3><p>${st.tagline}</p><span class="district-count">${st.districts.length} featured districts →</span></div></article>`).join('')||`<div class="empty-state"><span>🧭</span><h2>No match yet.</h2><p>Try a state, district, food or culture keyword.</p></div>`;
  };
  render('');search?.addEventListener('input',e=>render(e.target.value));
}

function openState(name){
  const state=SUTRA_DATA.states.find(x=>x.name===name);if(!state)return;
  const modal=document.getElementById('stateModal');if(!modal){sessionStorage.setItem('selectedState',name);location.href=`map.html?state=${encodeURIComponent(name)}`;return;}
  document.getElementById('modalStateIcon').textContent=state.icon;document.getElementById('modalStateName').textContent=state.name;document.getElementById('modalStateTagline').textContent=state.tagline;document.getElementById('modalCulture').textContent=state.culture;document.getElementById('modalDish').textContent=state.dish;
  document.getElementById('modalDistricts').innerHTML=state.districts.map(d=>{const n=typeof d==='string'?d:d.name;return `<button type="button" onclick="openDistrict('${state.name.replace(/'/g,"\\'")}','${n.replace(/'/g,"\\'")}')">${n}</button>`}).join('');
  document.getElementById('modalMapLink').href=`map.html?state=${encodeURIComponent(state.name)}`;document.getElementById('modalPlannerLink').href=`planner.html?state=${encodeURIComponent(state.name)}`;modal.classList.add('open');
}
window.closeStateModal=()=>document.getElementById('stateModal')?.classList.remove('open');
window.openDistrict=function(stateName,districtName){
  const state=SUTRA_DATA.states.find(x=>x.name===stateName);const d=state?.districts?.find(x=>(typeof x==='string'?x:x.name)===districtName);if(!state||!d)return;
  const data=typeof d==='string'?{name:d,overview:`${d} is a featured discovery district in ${stateName}.`,heritage:`Explore local heritage, neighbourhood stories and cultural landmarks through the SUTRA-GEO map.`,food:state.dish,culture:state.culture,sourceName:state.sourceName||'Ministry of Tourism — India',sourceUrl:state.sourceUrl||'https://tourism.gov.in/'}:d;
  closeStateModal();
  document.getElementById('districtModalIcon').textContent=state.icon;document.getElementById('districtModalState').textContent=`${stateName.toUpperCase()} · DISTRICT DISCOVERY`;document.getElementById('districtModalName').textContent=data.name;document.getElementById('districtModalOverview').textContent=data.overview;document.getElementById('districtModalHeritage').textContent=data.heritage;document.getElementById('districtModalFood').textContent=data.food;document.getElementById('districtModalCulture').textContent=data.culture;document.getElementById('districtMapLink').href=`map.html?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(data.name)}`;document.getElementById('districtPlannerLink').href=`planner.html?state=${encodeURIComponent(stateName)}&district=${encodeURIComponent(data.name)}`;const src=document.getElementById('districtSourceLink');src.href=data.sourceUrl;src.textContent=`${data.sourceName} ↗`;document.getElementById('districtModal').classList.add('open');
};
window.closeDistrictModal=()=>document.getElementById('districtModal')?.classList.remove('open');

function fillStateSelect(id, all = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const options = SUTRA_DATA.states.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
  el.innerHTML = all ? `<option value="all">All regions</option>${options}` : options;
}

function initPlanner(){
 const state=document.getElementById('planState'),district=document.getElementById('planDistrict'),build=document.getElementById('buildTrip');if(!state||!district||!build)return;
 fillStateSelect('planState',false);
 const qs=new URLSearchParams(location.search),queryState=qs.get('state'),queryDistrict=qs.get('district');if(queryState&&SUTRA_DATA.states.some(s=>s.name===queryState))state.value=queryState;
 const districtName=d=>typeof d==='string'?d:d.name;
 const updateDistricts=()=>{const st=SUTRA_DATA.states.find(x=>x.name===state.value)||SUTRA_DATA.states[0];district.innerHTML=st.districts.map(d=>`<option value="${escapePlannerHtml(districtName(d))}">${escapePlannerHtml(districtName(d))}</option>`).join('');if(queryDistrict&&st.districts.some(d=>districtName(d)===queryDistrict)){district.value=queryDistrict}};
 updateDistricts();state.addEventListener('change',updateDistricts);
 const date=document.getElementById('planDate');if(date&&!date.value)date.value=new Date().toISOString().slice(0,10);
 build.addEventListener('click',()=>{
   const st=SUTRA_DATA.states.find(x=>x.name===state.value)||SUTRA_DATA.states[0],city=district.value,mood=document.getElementById('planMood')?.value||'Heritage & architecture',travellers=document.getElementById('planTravellers')?.value||'2',itinerary=document.getElementById('itinerary');
   const allNodes=(window.SUTRA_HERITAGE||[]).filter(n=>n.state===st.name),districtRecords=(window.SUTRA_DISTRICTS?.[st.name]||[]),selectedDistrict=districtRecords.find(d=>d.name===city);
   const dist=(a,b)=>{if(!a||!b)return 999999;const rad=Math.PI/180,R=6371,dl=(b.lat-a.lat)*rad,dg=(b.lng-a.lng)*rad;const h=Math.sin(dl/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
   const nearbyDistricts=selectedDistrict?[selectedDistrict,...districtRecords.filter(d=>d.name!==city).sort((a,b)=>dist(selectedDistrict,a)-dist(selectedDistrict,b)).slice(0,3)]:districtRecords.slice(0,4);
   const nodes=nearbyDistricts.map((d,i)=>{const found=allNodes.find(n=>n.district===d.name||n.city===d.name);return found||{id:`route-${st.name}-${d.name}`,name:`${d.name} Heritage District`,city:d.name,state:st.name,district:d.name,category:'District Discovery',emoji:st.icon||'📍',shortStory:d.overview||`Discover ${d.name} through local heritage, food and culture.`,image:d.image}}).sort((a,b)=>{if(a.city===city)return -1;if(b.city===city)return 1;const score=n=>{const c=(n.category||'').toLowerCase();if(mood.includes('Food'))return c.includes('food')?5:c.includes('living')||c.includes('craft')?4:c.includes('temple')?2:1;if(mood.includes('Festival'))return c.includes('living')||c.includes('culture')?5:c.includes('monument')||c.includes('temple')?3:1;if(mood.includes('Nature'))return c.includes('nature')||c.includes('landscape')?5:c.includes('living')?3:1;return c.includes('monument')||c.includes('fort')||c.includes('temple')||c.includes('palace')?5:c.includes('heritage')?4:2};return score(b)-score(a)});
   const food=(SUTRA_DATA.food||[]).find(x=>x.state===st.name&&x.city===city)|| (SUTRA_DATA.food||[]).find(x=>x.state===st.name);
   const event=(SUTRA_DATA.events||[]).find(x=>x.state===st.name&&x.city===city)|| (SUTRA_DATA.events||[]).find(x=>x.state===st.name);
   const route=[];if(nodes[0])route.push(['09:00',nodes[0],'Open the district story + location check']);if(nodes[1])route.push(['10:45',nodes[1],mood.includes('Food')?'Heritage context before the local food stop':'Story, architecture and local context']);
   if(food)route.push(['13:00',{name:food.name,category:'Food experience',emoji:'🍛',city:food.city,state:food.state,shortStory:food.story,website:food.website},'Taste the local tradition and open the official food page']);
   if(event&&mood.includes('Festival'))route.push(['15:30',{name:event.name,category:'Cultural event',emoji:'🎭',city:event.city,state:event.state,shortStory:event.desc,website:event.website},'Check the official event page for dates and entry']);
   if(nodes[2])route.push(['16:00',nodes[2],'Craft, maker or second heritage stop']);if(nodes[3])route.push(['18:00',nodes[3],'Evening story node + reflection']);
   if(!route.length)route.push(['09:30',{name:`${city} District Discovery`,category:'District Discovery',emoji:st.icon||'📍',city,state:st.name,shortStory:`A curated ${st.name} discovery route for ${mood.toLowerCase()}.`},'Start with the district story, then choose nearby food and culture.']);
   const stops=route.slice(0,6),dateText=date?.value?new Date(`${date.value}T00:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'';
   itinerary.innerHTML=`<div class="trip-head"><div><p class="eyebrow">YOUR ${st.name.toUpperCase()} ROUTE</p><h2>${escapePlannerHtml(city)} · ${escapePlannerHtml(mood)}</h2><p class="muted">${escapePlannerHtml(travellers)} traveller${Number(travellers)===1?'':'s'} · ${dateText}</p></div><span class="trip-compass">✦</span></div><div class="route-reasons"><span>◉ District matched</span><span>◷ Time balanced</span><span>✦ Mood: ${escapePlannerHtml(mood)}</span><span>🍛 Local food</span><span>🎭 Living culture</span></div><div class="route-summary"><b>${stops.length} meaningful stops</b><span>Built from the selected district, nearby heritage nodes, local food and optional events — not one fixed route.</span></div>${stops.map((p,i)=>`<article class="trip-stop"><div class="trip-time">${p[0]}</div><div class="trip-marker">${p[1].emoji||'📍'}</div><div class="trip-stop-copy"><small class="eyebrow">STOP ${String(i+1).padStart(2,'0')} · ${escapePlannerHtml(p[1].category||'DISCOVERY')}</small><h3>${escapePlannerHtml(p[1].name)}</h3><p>${escapePlannerHtml(p[1].shortStory||'Curated local discovery.')}</p><div class="trip-actions">${p[1].id?`<a class="text-link" href="ar.html?node=${encodeURIComponent(p[1].id)}">Open Micro-Quest →</a>`:''}${p[1].website?`<a class="text-link" target="_blank" rel="noreferrer" href="${p[1].website}">Official site ↗</a>`:''}<span>+${p[1].id?30:10} coins</span></div></div></article>`).join('')}<div class="route-explain"><b>Why this route?</b><p>SUTRA-GEO now matches the selected <strong>state + district + mood</strong>, then mixes nearby heritage nodes with a local food stop and, for festival mode, an event. Different districts produce different stops; when a district has fewer nodes, the planner expands to the state’s curated nearby layer.</p></div><div class="trip-footer"><span>🧭 ${st.name} · ${city}</span><button class="btn btn-primary" onclick="saveGeneratedTrip('${st.name.replace(/'/g,"\\'")}','${city.replace(/'/g,"\\'")}')">Save route +25 coins</button></div>`;
 });
}

function escapePlannerHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function saveGeneratedTrip(state, district) {
  const result=SutraScrapbook.save({title:`${district} Trip`,place:`${district} · ${state}`,type:'Trip plan',symbol:'🧭'});
  if(!result.added){toast('This trip is already in your scrapbook.');return;}
  SutraJourney.add(district,state,'Trip plan','trip-planned');
  const key='sutra_trip_reward_'+(SutraAuth.user().email||'guest').toLowerCase();
  const today=new Date().toISOString().slice(0,10);
  if(localStorage.getItem(key)!==today){localStorage.setItem(key,today);SutraWallet.add(25,'Trip itinerary created');toast('Trip saved to your scrapbook · +25 Sutra Coins ✦');}
  else toast('Trip saved to your scrapbook ✦');
}

function initStays() {
  fillStateSelect('stayState');
  const stateEl = document.getElementById('stayState');
  const typeEl = document.getElementById('stayType');
  const grid = document.getElementById('stayGrid');
  if (!stateEl || !typeEl || !grid) return;
  const render = () => {
    const state = stateEl.value;
    const type = typeEl.value;
    const items = SUTRA_DATA.stays.filter(x => (state === 'all' || x.state === state) && (type === 'all' || x.type === type));
    grid.innerHTML = items.map((x, i) => `<article class="stay-card"><div class="visual" style="background-image:url('${x.image}')"><span class="tag">${x.type}</span></div><div class="card-body"><h3>${x.name}</h3><p>${x.story}</p><div class="meta"><span>${x.city}, ${x.state}</span><b>${x.price}</b></div><div class="card-actions"><button class="small-btn" onclick="saveStay(${SUTRA_DATA.stays.indexOf(x)})">♡ Save</button><button class="small-btn primary" onclick="bookStay(${SUTRA_DATA.stays.indexOf(x)})">Book stay</button></div></div></article>`).join('');
  };
  render(); stateEl.addEventListener('change', render); typeEl.addEventListener('change', render);
}
function saveStay(index) {
  const x = SUTRA_DATA.stays[index];
  if (!x) return;
  const result = SutraScrapbook.save({ title: x.name, place: `${x.city} · ${x.state}`, type: 'Heritage stay', symbol: '🏨' });
  toast(result.added ? 'Saved to your scrapbook ✦' : 'Already saved in your scrapbook.');
}
function bookStay(index) {
  const x=SUTRA_DATA.stays[index]; if(!x)return;
  const finish=()=>{const result=SutraScrapbook.save({title:x.name,place:`${x.city} · ${x.state}`,type:'Heritage stay',symbol:'🏨'});toast(result.added?'Stay request confirmed · saved to scrapbook ✦':'Stay request confirmed · already in scrapbook.');SutraWallet.add(50,`Stay inquiry: ${x.name}`)};
  if(typeof openInquiryModal==='function')openInquiryModal('stay',x.name,`${x.city} · ${x.state}`,finish);else finish();
}

function initFood(){
 fillStateSelect('foodState');const stateEl=document.getElementById('foodState'),searchEl=document.getElementById('foodSearch'),grid=document.getElementById('foodGrid');if(!stateEl||!searchEl||!grid)return;
 const render=()=>{const state=stateEl.value,q=searchEl.value.toLowerCase();const items=SUTRA_DATA.food.filter(x=>(state==='all'||x.state===state)&&`${x.name} ${x.city} ${x.restaurant}`.toLowerCase().includes(q));grid.innerHTML=items.map(x=>`<article class="food-card"><div class="visual" style="background-image:url('${x.image}')"><span class="tag">${x.state}</span></div><div class="card-body"><h3>${escapePlannerHtml(x.name)}</h3><p>${escapePlannerHtml(x.story)}</p><div class="meta"><span>${escapePlannerHtml(x.restaurant)} · ${escapePlannerHtml(x.city)}</span><b>${escapePlannerHtml(x.price)}</b></div><div class="card-actions"><button class="small-btn" onclick="addFoodTrail(${SUTRA_DATA.food.indexOf(x)})">♡ Save</button>${x.website?`<a class="small-btn primary" href="${x.website}" target="_blank" rel="noreferrer">${escapePlannerHtml(x.websiteLabel||'Official website')} ↗</a>`:''}</div></div></article>`).join('')||'<div class="empty-state"><span>🍛</span><h3>No food match</h3><p>Try another state, dish or city.</p></div>'};
 render();stateEl.addEventListener('change',render);searchEl.addEventListener('input',render);
}
function addFoodTrail(index){const x=SUTRA_DATA.food[index];if(!x)return;const result=SutraScrapbook.save({title:x.name,place:`${x.city} · ${x.state}`,type:'Food trail',symbol:'🍛'});if(result.added){SutraWallet.add(10,`Food trail saved: ${x.name}`);toast('Added to your food scrapbook · +10 Sutra Coins ✦')}else toast('Already saved in your scrapbook.')}
function initEvents(){
 fillStateSelect('eventState');const stateEl=document.getElementById('eventState'),typeEl=document.getElementById('eventType'),grid=document.getElementById('eventGrid');if(!stateEl||!typeEl||!grid)return;
 const render=()=>{const state=stateEl.value,type=typeEl.value,items=SUTRA_DATA.events.filter(x=>(state==='all'||x.state===state)&&(type==='all'||x.type===type));grid.innerHTML=items.map(x=>`<article class="event-card"><div class="visual" style="background-image:url('${x.image}')"><span class="tag">${escapePlannerHtml(x.type)}</span></div><div class="card-body"><h3>${escapePlannerHtml(x.name)}</h3><p>${escapePlannerHtml(x.desc)}</p><div class="meta"><span>${escapePlannerHtml(x.date)} · ${escapePlannerHtml(x.city)}</span><b>${escapePlannerHtml(x.price||'See official site')}</b></div><div class="card-actions"><button class="small-btn" onclick="saveEvent(${SUTRA_DATA.events.indexOf(x)})">♡ Save</button>${x.website?`<a class="small-btn primary" href="${x.website}" target="_blank" rel="noreferrer">Open official event page ↗</a>`:''}</div></div></article>`).join('')||'<div class="empty-state"><span>🎭</span><h3>No events match</h3><p>Try another state or event type.</p></div>'};
 render();stateEl.addEventListener('change',render);typeEl.addEventListener('change',render);
}
function saveEvent(index){const x=SUTRA_DATA.events[index];if(!x)return;const result=SutraScrapbook.save({title:x.name,place:`${x.city} · ${x.state}`,type:'Event',symbol:'🎭'});if(result.added){SutraWallet.add(15,`Event saved: ${x.name}`);toast('Event saved · +15 Sutra Coins ✦')}else toast('Already saved in your scrapbook.');if(x.website)window.open(x.website,'_blank','noopener,noreferrer')}

function initStore() {
  const grid = document.getElementById('offerGrid');
  if (!grid) return;
  grid.innerHTML = SUTRA_DATA.offers.map(x => `<article class="offer-card"><span class="tag">${x.cost} COINS</span><h3>${x.title}</h3><p>Prototype partner reward. Redemption creates a voucher in your Passport.</p><button class="small-btn primary" onclick="redeemOffer(${x.cost},'${x.code}','${x.title.replace(/'/g, "\\'")}')">Redeem</button></article>`).join('');
  const history=JSON.parse(localStorage.getItem(SutraWallet.historyKey())||'[]');const el=document.getElementById('coinHistory');if(el)el.innerHTML=history.slice(0,12).map(x=>`<div class="coin-history-row"><span>${x.amount>0?'+':''}${x.amount}</span><b>${x.label}</b><small>${new Date(x.date).toLocaleDateString('en-IN')}</small></div>`).join('')||'<p class="muted">No coin activity yet.</p>';
}
function redeemOffer(cost, code, title) {
  if (!SutraWallet.spend(cost,`Reward redeemed: ${title}`)) return;
  const email=(SutraAuth.user().email||'guest').toLowerCase();const key='sutra_vouchers_'+email;const arr=JSON.parse(localStorage.getItem(key)||'[]');arr.unshift({code,title,city:JSON.parse(localStorage.getItem('sutra_current_context')||'null')?.city||'India',date:new Date().toISOString()});localStorage.setItem(key,JSON.stringify(arr));
  alert(`✓ Reward Redeemed\n\n${cost} Sutra Coins used.\nVoucher: ${code}\n\nAdded to your Passport.`);initStore();
}

function initStories() {
  const grid = document.getElementById('storyGrid');
  if (!grid) return;
  grid.innerHTML = SUTRA_DATA.stories.map(x => `<article class="story-card"><div class="story-symbol">${x.symbol}</div><p class="eyebrow">${x.place}</p><h2>${x.title}</h2><p>${x.text}</p><div class="quote">“${x.quote||'The best souvenirs are context, not objects.'}”</div><small class="tiny">Source: ${x.source||'Curated heritage content'}</small></article>`).join('');
}
function initContact() {
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => { e.preventDefault(); form.reset(); toast('Thank you — your story reached the SUTRA-GEO desk ✦'); });
}
