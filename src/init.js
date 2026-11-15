/* ============================ INÍCIO ============================ */
syncFavCards();syncErrCards();syncSentCards();renderDecks();renderBoxes();renderHome();updateFavCount();
try{const lt=localStorage.getItem(KEY+".let");if(lt&&LETI[lt])LT.cur=LETI[lt];const ns=localStorage.getItem(KEY+".ns");if(ns)setNS(ns)}catch(e){}
$$("#prefSeg [data-ps]").forEach(b=>b.onclick=()=>setPrefSeg(b.dataset.ps));
try{if(localStorage.getItem(KEY+".ps")==="duv")setPrefSeg("duv")}catch(e){}duvCount();
initCloud();
(function(){let start="inicio";const h=location.hash.slice(1);
 if(VALID.includes(h))start=h;else{try{const t=localStorage.getItem(KEY+".tab");if(VALID.includes(t))start=t}catch(e){}}
 showTab(start);
 if(start==="curso"){try{const tp=localStorage.getItem(KEY+".topic");if(tp&&TOPIC[tp])openTopic(tp,"voc")}catch(e){}}})();
