/* ============================ VOZ ITALIANA ============================ */
// escolhe a melhor voz it-IT do aparelho para a pronúncia e a leitura em voz alta
let IT_VOICES=[],VOICES_SEEN=false;
function rankVoice(v){const n=v.name||"";let s=0;if(/^it[-_]IT/i.test(v.lang))s+=5;if(/natural|neural|premium|enhanced|siri/i.test(n))s+=4;if(/google/i.test(n))s+=3;if(/compact|eloquence|espeak/i.test(n))s-=4;return s}
function loadVoices(){if(!canSpeak)return;try{const all=speechSynthesis.getVoices();if(all.length)VOICES_SEEN=true;
 IT_VOICES=all.filter(x=>/^it/i.test(x.lang)).map((v,i)=>({v,r:rankVoice(v),i})).sort((a,b)=>b.r-a.r||a.i-b.i).map(x=>x.v)}catch(e){}
 try{audioVoicesChanged()}catch(e){}}
if(canSpeak){loadVoices();try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){}}
function bestVoice(){return IT_VOICES[0]||null}
