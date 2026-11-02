/* ============================ INÍCIO ============================ */
syncFavCards();syncErrCards();renderDecks();renderBoxes();renderHome();updateFavCount();
try{const ns=localStorage.getItem(KEY+".ns");if(["read","cal","favs"].includes(ns))setNS(ns)}catch(e){}
initCloud();
(function(){let start="inicio";const h=location.hash.slice(1);
 if(VALID.includes(h))start=h;else{try{const t=localStorage.getItem(KEY+".tab");if(VALID.includes(t))start=t}catch(e){}}
 showTab(start);
 if(start==="curso"){try{const tp=localStorage.getItem(KEY+".topic");if(tp&&TOPIC[tp])openTopic(tp,"voc")}catch(e){}}})();
