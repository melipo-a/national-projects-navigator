const spheres = [
  { id:'family', title:'Семья и демография', image:'images/family.svg', problem:'Поддержка семей, детей и демографической устойчивости.', action:'Социальные меры, семейная инфраструктура, доступность услуг.', result:'Человек быстрее понимает, какие меры связаны с семьёй и качеством жизни.' },
  { id:'health', title:'Здоровье', image:'images/health.svg', problem:'Доступность и качество медицинской помощи.', action:'Модернизация, профилактика, цифровые сервисы, кадровая поддержка.', result:'Проще оценивать, какие изменения происходят в системе здравоохранения.' },
  { id:'education', title:'Образование и молодёжь', image:'images/education.svg', problem:'Возможности для обучения, самореализации и профессионального роста.', action:'Обновление образовательной среды, поддержка молодых людей и кадров.', result:'Образование видно как путь от личного развития к развитию страны.' },
  { id:'city', title:'Инфраструктура и городская среда', image:'images/city.svg', problem:'Комфорт городов, дорог, жилья и общественных пространств.', action:'Благоустройство, транспорт, социальные объекты и инфраструктура для жизни.', result:'Это те изменения, которые человек чаще всего видит вокруг себя.' },
  { id:'economy', title:'Экономика, технологии и занятость', image:'images/economy.svg', problem:'Рабочие места, предпринимательство, технологии и производительность.', action:'Поддержка бизнеса, цифровизация, кадры и технологические проекты.', result:'Появляется связь между экономикой страны и возможностями человека.' },
  { id:'ecology', title:'Экология и качество жизни', image:'images/ecology.svg', problem:'Экологическая безопасность и ответственное отношение к среде.', action:'Экологические программы, мониторинг, благоустройство и снижение нагрузки.', result:'Качество среды становится частью оценки развития страны.' }
];
const recognition = [
  ['Демография',77], ['Здравоохранение',74], ['МСП',73], ['Образование',72], ['Безопасные дороги',70]
];
const quizQuestions = [
  { q:'Что для вас сейчас важнее всего?', a:[['Поддержка семьи и детей','family'],['Доступная медицина','health'],['Образование и развитие','education'],['Комфортная городская среда','city']] },
  { q:'Какие изменения вы быстрее всего замечаете в повседневной жизни?', a:[['Новые общественные пространства и дороги','city'],['Медицинские услуги и профилактику','health'],['Образовательные возможности','education'],['Экологию и чистоту среды','ecology']] },
  { q:'Какая тема кажется вам наиболее перспективной для развития страны?', a:[['Технологии и экономика','economy'],['Кадры и молодёжь','education'],['Здоровье людей','health'],['Экологическая устойчивость','ecology']] },
  { q:'Где вам важнее видеть понятные государственные меры?', a:[['В поддержке семей','family'],['В развитии работы и бизнеса','economy'],['В городской инфраструктуре','city'],['В защите окружающей среды','ecology']] },
  { q:'Какой результат вы считаете самым значимым?', a:[['Больше возможностей для детей и родителей','family'],['Качественная медицинская помощь','health'],['Хорошее образование и профессия','education'],['Комфортная, безопасная и современная среда','city']] }
];
let quizIndex = 0;
let scores = {family:0,health:0,education:0,city:0,economy:0,ecology:0};
function renderSpheres(){
  const grid=document.getElementById('sphereGrid');
  if(!grid) return;
  grid.innerHTML=spheres.map(s=>`<article class="sphere-card reveal" id="sphere-${s.id}"><div class="sphere-img"><img src="${s.image}" alt="${s.title}" loading="lazy" onerror="this.style.display='none'"></div><div class="sphere-body"><h3>${s.title}</h3><p>${s.problem}</p><div class="sphere-meta"><div><b>Меры:</b> ${s.action}</div><div><b>Практический смысл:</b> ${s.result}</div></div></div></article>`).join('');
}
function renderChart(){
  const chart=document.getElementById('recognitionChart');
  if(!chart) return;
  chart.innerHTML=recognition.map(([name,value])=>`<div class="bar-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${value}%"></div></div><b>${value}%</b></div>`).join('');
}
function renderQuiz(){
  const q=document.getElementById('quizQuestion'); const opts=document.getElementById('quizOptions'); const step=document.getElementById('quizStep'); const result=document.getElementById('quizResult');
  if(!q||!opts||!step||!result) return;
  result.classList.add('hidden'); opts.classList.remove('hidden');
  step.textContent=quizIndex+1; q.textContent=quizQuestions[quizIndex].q;
  opts.innerHTML=quizQuestions[quizIndex].a.map(([text,key])=>`<button class="option-btn" type="button" data-key="${key}">${text}</button>`).join('');
  opts.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>answerQuiz(btn.dataset.key)));
}
function answerQuiz(key){
  scores[key]++;
  quizIndex++;
  if(quizIndex>=quizQuestions.length){showQuizResult();}else{renderQuiz();}
}
function showQuizResult(){
  const opts=document.getElementById('quizOptions'); const q=document.getElementById('quizQuestion'); const result=document.getElementById('quizResult'); const step=document.getElementById('quizStep');
  const best=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const sphere=spheres.find(s=>s.id===best);
  step.textContent=5; q.textContent='Ваш результат'; opts.classList.add('hidden'); result.classList.remove('hidden');
  result.innerHTML=`<h4>${sphere.title}</h4><p>${sphere.result}</p><a class="btn btn-secondary" href="#sphere-${sphere.id}">Перейти к сфере</a>`;
}
function restartQuiz(){quizIndex=0;scores={family:0,health:0,education:0,city:0,economy:0,ecology:0};renderQuiz();}
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
  }));
}
function initMenu(){
  const toggle=document.querySelector('.menu-toggle'); const nav=document.querySelector('.main-nav');
  if(!toggle||!nav) return;
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
}
function initReveal(){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
renderSpheres();renderChart();renderQuiz();initTabs();initMenu();initReveal();
document.getElementById('restartQuiz')?.addEventListener('click',restartQuiz);
