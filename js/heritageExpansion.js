// District discovery layer: one clickable discovery node for every featured district.
function appendDistrictDiscoveryNodes(){
 const existing=new Set((window.SUTRA_HERITAGE||[]).map(n=>n.state+'|'+n.district));
 let next=1000;
 (window.SUTRA_EXTRA_STATES||[]).forEach(s=>s.districts.forEach(d=>{
   if(existing.has(s.name+'|'+d.name)) return;
   const id='district-'+(next++);
   const node={id,name:d.name+' Heritage District',city:d.name,state:s.name,district:d.name,lat:d.lat,lng:d.lng,category:'District Discovery',emoji:s.icon,radius:100,story:d.overview+' '+d.heritage,shortStory:d.overview,image:d.image,verification:'Curated SUTRA-GEO district layer',sources:[{name:d.sourceName,url:d.sourceUrl}],quest:{type:'District Quiz',question:'Which state is '+d.name+' in?',options:[s.name,'Kerala','Rajasthan','Odisha'],answer:0,reward:30},artisan:{name:s.name+' Living Heritage Network',craft:s.culture,experience:'District discovery and local culture',years:'Community layer',verified:true}};
   window.SUTRA_HERITAGE.push(node);existing.add(s.name+'|'+d.name);
 }));window.SUTRA_GEOFENCE_NODES=window.SUTRA_HERITAGE;
}
appendDistrictDiscoveryNodes();