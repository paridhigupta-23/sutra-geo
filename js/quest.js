const QUESTIONS=[
['Which city is home to the Charminar?',['Hyderabad','Jaipur','Pune','Lucknow'],0],
['Golconda Fort is associated with which region?',['Deccan','Konkan','Malwa','Braj'],0],
['Ramappa Temple is linked to which dynasty?',['Kakatiya','Chola','Mughal','Ahom'],0],
['Amber Fort is near which city?',['Jaipur','Jodhpur','Udaipur','Bikaner'],0],
['Hawa Mahal is known for its many what?',['Jharokhas','Stupas','Stepwells','Gopurams'],0],
['Jantar Mantar in Jaipur is associated with what?',['Astronomy','Shipbuilding','Textiles','Music'],0],
['Jaisalmer Fort rises from which desert region?',['Thar','Deccan','Konkan','Malwa'],0],
['Hampi is strongly associated with which empire?',['Vijayanagara','Maurya','Mughal','Gupta'],0],
['Mysuru is closely associated with which palace?',['Mysore Palace','City Palace Udaipur','Umaid Bhawan','Falaknuma'],0],
['Which dance tradition is strongly associated with Kerala?',['Kathakali','Garba','Bihu','Lavani'],0],
['Sadya is a traditional feast associated with which state?',['Kerala','Gujarat','Punjab','Assam'],0],
['Phulkari is strongly associated with which state?',['Punjab','Goa','Kerala','Odisha'],0],
['Misal Pav is strongly associated with which state?',['Maharashtra','Bihar','Assam','Haryana'],0],
['Rani-ki-Vav is a famous what?',['Stepwell','Fort','Palace','Observatory'],0],
['Dholavira belongs to which ancient civilisation?',['Harappan','Roman','Mughal','Chola'],0],
['Pattachitra is strongly associated with which state?',['Odisha','Tamil Nadu','Punjab','Goa'],0],
['Which city is closely associated with the Jagannath Temple?',['Puri','Kochi','Mysuru','Patna'],0],
['Which river is central to Varanasi’s heritage landscape?',['Ganga','Narmada','Godavari','Kaveri'],0],
['The Taj Mahal is in which city?',['Agra','Lucknow','Prayagraj','Kanpur'],0],
['Banarasi weaving is strongly associated with which city?',['Varanasi','Jaipur','Pune','Surat'],0],
['Bharatanatyam is strongly associated with which state?',['Tamil Nadu','Assam','Punjab','Himachal Pradesh'],0],
['Thanjavur is famous for which heritage layer?',['Temple and classical arts','Desert forts','Tea gardens','River ghats'],0],
['Bisi Bele Bath is associated with which state?',['Karnataka','Rajasthan','Bihar','Goa'],0],
['Muga silk is especially associated with which state?',['Assam','Gujarat','Kerala','Maharashtra'],0],
['Majuli is an island associated with which state?',['Assam','Sikkim','Manipur','Nagaland'],0],
['Dhokla is a food tradition strongly associated with which state?',['Gujarat','Odisha','Bihar','Punjab'],0],
['Bandhani is a textile tradition associated with which state?',['Gujarat','Kerala','Tamil Nadu','Haryana'],0],
['Goan fish curry reflects which broad landscape?',['Coastal Goa','Thar desert','Himalayas','Deccan plateau'],0],
['Litti Chokha is strongly associated with which state?',['Bihar','Goa','Kerala','Punjab'],0],
['Poha is especially associated with breakfast culture in which city?',['Indore','Kochi','Amritsar','Tawang'],0],
['Kullu shawls are associated with which state?',['Himachal Pradesh','Mizoram','Gujarat','Odisha'],0],
['Kafuli is a food tradition associated with which region?',['Uttarakhand','Rajasthan','West Bengal','Goa'],0],
['Hornbill Festival is associated with which state?',['Nagaland','Tripura','Kerala','Maharashtra'],0],
['Jadoh is associated with which state?',['Meghalaya','Punjab','Tamil Nadu','Gujarat'],0],
['Cheraw is a traditional dance associated with which state?',['Mizoram','Bihar','Rajasthan','Karnataka'],0],
['Sangai Festival is associated with which state?',['Manipur','Assam','Goa','Haryana'],0],
['Tawang is a major mountain destination in which state?',['Arunachal Pradesh','Sikkim','Uttarakhand','Himachal Pradesh'],0],
['Which state is known for Madhubani painting?',['Bihar','Odisha','Gujarat','Kerala'],0],
['Bastar is strongly associated with which state?',['Chhattisgarh','Jharkhand','Haryana','Punjab'],0],
['Kuchipudi is a classical dance tradition associated with which state?',['Andhra Pradesh','Maharashtra','Assam','Goa'],0],
['Which city is a major heritage gateway in Goa?',['Panaji','Patiala','Patna','Pelling'],0],
['Gangaur is a major festival of which state?',['Rajasthan','Kerala','Assam','Punjab'],0],
['Bathukamma is strongly associated with which state?',['Telangana','Tamil Nadu','Odisha','Bihar'],0],
['Which city is known for the Mysore Palace?',['Mysuru','Madurai','Mumbai','Bhubaneswar'],0],
['Which state is known for Durga Puja’s major city celebrations?',['West Bengal','Haryana','Goa','Mizoram'],0],
['Which city is a major craft and textile centre in Gujarat?',['Kutch','Kochi','Kullu','Kohima'],0],
['Which city is known for the Golden Temple?',['Amritsar','Agra','Ajmer','Ahmedabad'],0],
['Which state is associated with Lavani performance traditions?',['Maharashtra','Assam','Sikkim','Bihar'],0],
['Which city is known for the City Palace overlooking Lake Pichola?',['Udaipur','Jaipur','Jodhpur','Bikaner'],0],
['Which state is associated with Sohrai and Khovar art traditions?',['Jharkhand','Punjab','Kerala','Gujarat'],0],
['Which state is known for Lepcha craft and Himalayan monasteries?',['Sikkim','Goa','Haryana','Bihar'],0],
['Which city is known for the Victoria Memorial?',['Kolkata','Chennai','Pune','Jaipur'],0],
['Which state is associated with Garba?',['Gujarat','Kerala','Odisha','Himachal Pradesh'],0],
['Which state is known for Chamba embroidery?',['Himachal Pradesh','Telangana','Bihar','Tamil Nadu'],0],
['Which state is associated with bamboo craft and Kokborok traditions?',['Tripura','Punjab','Rajasthan','Maharashtra'],0],
['Which city is known for its royal heritage in Madhya Pradesh?',['Gwalior','Kochi','Amritsar','Kohima'],0]
].map(([q,opts,a],idx)=>{const shift=idx%opts.length;const rotated=opts.slice(shift).concat(opts.slice(0,shift));return {q,opts:rotated,a:(a-shift+opts.length)%opts.length}});
let qi=Number(sessionStorage.getItem('sutra_quest_index')||0),mode=sessionStorage.getItem('sutra_quest_mode')||'daily',answered=false,arenaIndex=0,arenaScore=0,arenaCorrect=0;
function todayKey(){return new Date().toISOString().slice(0,10)}
function questUserKey(){return (SutraAuth.user().email||'guest').toLowerCase()}
function escapeQuestHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function leaderboardKey(){return 'sutra_arena_scores'}
function loadScores(){try{const saved=JSON.parse(localStorage.getItem(leaderboardKey())||'null');if(Array.isArray(saved)&&saved.length)return saved;const demo=[{name:'Heritage Hopper',email:'demo1',score:92},{name:'Deccan Walker',email:'demo2',score:86},{name:'Craft Keeper',email:'demo3',score:78},{name:'Temple Trail',email:'demo4',score:71},{name:'Story Seeker',email:'demo5',score:64}];localStorage.setItem(leaderboardKey(),JSON.stringify(demo));return demo}catch{return[]}}
function saveArenaScore(score){const arr=loadScores().filter(x=>x.email!==questUserKey());arr.push({name:SutraAuth.user().name||'Explorer',email:questUserKey(),score,date:new Date().toISOString()});arr.sort((a,b)=>b.score-a.score);localStorage.setItem(leaderboardKey(),JSON.stringify(arr.slice(0,20)));renderArenaBoard()}
function renderArenaBoard(){const el=document.getElementById('arenaBoard');if(!el)return;const rows=loadScores().slice(0,8);el.innerHTML=rows.length?rows.map((x,i)=>`<div class="leaderboard-row"><span>#${i+1}</span><b>${escapeQuestHtml(x.name)}</b><span>${x.score} pts</span></div>`).join(''):'<p class="muted">Play Arena to create the local prototype leaderboard.</p>'}
function setMode(next){mode=next;sessionStorage.setItem('sutra_quest_mode',mode);arenaIndex=0;arenaScore=0;arenaCorrect=0;renderQuestion()}
function renderQuestion(){
 const daily=mode==='daily',q=QUESTIONS[daily?qi%QUESTIONS.length:arenaIndex%QUESTIONS.length],number=document.getElementById('quizNumber'),question=document.getElementById('quizQuestion'),options=document.getElementById('quizOptions'),result=document.getElementById('quizResult'),next=document.getElementById('nextQuestion');if(!q||!options)return;
 answered=false;number.textContent=daily?`DAILY · QUESTION ${String((qi%QUESTIONS.length)+1).padStart(2,'0')}`:`ARENA · ROUND ${arenaIndex+1}/10`;question.textContent=q.q;result.textContent='';next.style.display='none';
 const claimed=daily&&localStorage.getItem('sutra_daily_quiz_answered_'+questUserKey())===todayKey();options.innerHTML=q.opts.map((x,i)=>`<button class="quiz-option ${claimed?'disabled':''}" ${claimed?'disabled':''} onclick="answerQuestion(${i})">${String.fromCharCode(65+i)}. ${x}</button>`).join('');
 if(claimed)result.textContent='Daily reward claimed. Switch to Arena or return tomorrow.';
 const score=document.getElementById('arenaScore');if(score)score.textContent=daily?'25 coins daily reward':`${arenaScore} pts · ${arenaCorrect} correct`;
 const dailyStatus=document.getElementById('dailyStatus');if(dailyStatus)dailyStatus.textContent=claimed?'Daily reward claimed today.':'Daily reward available.';
 renderArenaBoard();
}
function answerQuestion(index){if(answered)return;const daily=mode==='daily',q=QUESTIONS[daily?qi%QUESTIONS.length:arenaIndex%QUESTIONS.length];answered=true;const buttons=[...document.querySelectorAll('.quiz-options button')];buttons.forEach((b,n)=>{if(n===q.a)b.classList.add('correct');if(n===index&&n!==q.a)b.classList.add('wrong')});if(index===q.a){if(daily){const today=todayKey();if(localStorage.getItem('sutra_daily_quiz_answered_'+questUserKey())!==today){localStorage.setItem('sutra_daily_quiz_answered_'+questUserKey(),today);SutraWallet.add(25,'Daily Sutra quiz');document.getElementById('quizResult').textContent='Correct! +25 Sutra Coins ✦'}else document.getElementById('quizResult').textContent='Correct! Daily reward already claimed today.'}else{arenaCorrect++;arenaScore+=10;document.getElementById('quizResult').textContent='Correct! +10 Arena points ✦'}}else{document.getElementById('quizResult').textContent=`Not quite. The answer is ${q.opts[q.a]}.`;if(!daily)arenaScore=Math.max(0,arenaScore-2)}
 if(!daily&&arenaIndex===9){const bonus=arenaCorrect*3;SutraWallet.add(10+bonus,`Arena finish · ${arenaCorrect}/10 correct`);saveArenaScore(arenaScore);document.getElementById('quizResult').textContent=`Arena complete: ${arenaCorrect}/10 correct · ${arenaScore} points · +${10+bonus} Sutra Coins ✦`;document.getElementById('nextQuestion').textContent='Play Arena again';document.getElementById('nextQuestion').onclick=()=>setMode('arena')}else document.getElementById('nextQuestion').style.display='inline-flex';
}
function nextQuestQuestion(){if(mode==='daily'){qi=(qi+1)%QUESTIONS.length;sessionStorage.setItem('sutra_quest_index',qi)}else{arenaIndex=(arenaIndex+1)%10}renderQuestion()}
window.answerQuestion=answerQuestion;window.nextQuestQuestion=nextQuestQuestion;window.setQuestMode=setMode;
document.addEventListener('DOMContentLoaded',()=>{if(document.body.dataset.page==='quest'){document.getElementById('dailyModeBtn')?.addEventListener('click',()=>setMode('daily'));document.getElementById('arenaModeBtn')?.addEventListener('click',()=>setMode('arena'));renderQuestion()}});
