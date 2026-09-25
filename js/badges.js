(function(){
  const badges=[
    {id:'heritage-explorer',name:'Heritage Explorer',desc:'Explore 5 heritage nodes',icon:'🧭',check:s=>s.nodes>=5},
    {id:'coin-collector',name:'Coin Collector',desc:'Earn 500 Sutra Coins',icon:'🪙',check:s=>s.coins>=500},
    {id:'story-keeper',name:'Story Keeper',desc:'Contribute 3 community stories',icon:'📖',check:s=>s.stories>=3},
    {id:'city-wanderer',name:'City Wanderer',desc:'Explore 3 cities',icon:'🏛️',check:s=>s.cities>=3},
    {id:'quest-master',name:'Quest Master',desc:'Complete 10 heritage quests',icon:'🏆',check:s=>s.quests>=10},
    {id:'living-heritage',name:'Living Heritage',desc:'Complete 3 local experiences',icon:'🎨',check:s=>s.experiences>=3}
  ];
  function state(){
    const user=(window.SutraAuth&&SutraAuth.user())||{}; const email=(user.email||'guest').toLowerCase();
    const journey=(window.SutraJourney&&SutraJourney.forUser)?SutraJourney.forUser():[];
    const nodes=new Set(journey.filter(x=>x.type==='heritage-node'||x.type==='visit'||x.type==='quest-completed').map(x=>x.node).filter(Boolean)).size;
    const quests=journey.filter(x=>x.type==='quest-completed').length;
    const cities=new Set(journey.map(x=>x.city).filter(Boolean)).size;
    let coins=window.SutraWallet?SutraWallet.get():Number(localStorage.getItem('sutra_coins_'+btoa(unescape(encodeURIComponent(email))).replace(/[^a-z0-9]/gi,'').slice(0,80))||0);
    let stories=0, experiences=0;
    try{stories=JSON.parse(localStorage.getItem('sutra_community_nodes')||'[]').filter(x=>(x.email||'').toLowerCase()===email).length}catch(e){}
    try{experiences=JSON.parse(localStorage.getItem('sutra_experiences')||'[]').filter(x=>(x.email||'').toLowerCase()===email).length}catch(e){}
    return {nodes,quests,cities,coins,stories,experiences};
  }
  function render(){
    const grid=document.getElementById('badgesGrid'); if(!grid)return;
    const s=state(); const earned=badges.filter(b=>b.check(s));
    const count=document.getElementById('badgesGridCount'); if(count)count.textContent=`${earned.length} / ${badges.length} badges`;
    grid.innerHTML=badges.map(b=>{const ok=b.check(s);return `<article class="badge-card ${ok?'earned':'locked'}"><div class="badge-icon">${b.icon}</div><div><b>${b.name}</b><p>${b.desc}</p><small>${ok?'✓ Earned':'Locked'}</small></div></article>`}).join('');
  }
  window.SUTRA_BADGES=badges;window.SutraBadges={badges,state,render};
  document.addEventListener('DOMContentLoaded',()=>{if(document.body.dataset.page==='passport')render();});
})();
