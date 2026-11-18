/* Local interface translations. Design-library editorial text and user-created content remain in their source language. */
(() => {
  'use strict';
  const dictionaries = {
    en: {skip:'Skip to content',inspiration:'Inspiration',space:'My Space',studio:'Prompt Studio',tools:'Free Tools',about:'About',create:'Create a prompt',choose:'Choose language',hero:'Make room for',explore:'Explore inspiration',quiz:'Find my style',daily:'Daily design inspiration',search:'Search design ideas',toolSearch:'Find a tool…'},
    ur: {skip:'مواد پر جائیں',inspiration:'آرائش کے خیالات',space:'میری جگہ',studio:'پرامپٹ اسٹوڈیو',tools:'مفت ٹولز',about:'تعارف',create:'پرامپٹ بنائیں',choose:'زبان منتخب کریں',hero:'اپنے گھر کو خوبصورت بنائیں',explore:'خیالات دیکھیں',quiz:'اپنا انداز جانیں',daily:'روزانہ ڈیزائن کی ترغیب',search:'ڈیزائن تلاش کریں',toolSearch:'ٹول تلاش کریں…'},
    ar: {skip:'انتقل إلى المحتوى',inspiration:'أفكار التصميم',space:'مساحتي',studio:'استوديو الأوامر',tools:'أدوات مجانية',about:'حول الموقع',create:'أنشئ وصفاً',choose:'اختر اللغة',hero:'اصنع مساحة لحياة جميلة',explore:'استكشف الأفكار',quiz:'اكتشف أسلوبك',daily:'إلهام التصميم اليومي',search:'ابحث عن أفكار التصميم',toolSearch:'ابحث عن أداة…'},
    hi: {skip:'मुख्य सामग्री पर जाएँ',inspiration:'डिज़ाइन प्रेरणा',space:'मेरी जगह',studio:'प्रॉम्प्ट स्टूडियो',tools:'मुफ़्त टूल',about:'परिचय',create:'प्रॉम्प्ट बनाएँ',choose:'भाषा चुनें',hero:'खूबसूरत जीवन के लिए जगह बनाएँ',explore:'प्रेरणा देखें',quiz:'अपनी शैली जानें',daily:'आज की डिज़ाइन प्रेरणा',search:'डिज़ाइन विचार खोजें',toolSearch:'टूल खोजें…'},
    es: {skip:'Saltar al contenido',inspiration:'Inspiración',space:'Mi espacio',studio:'Estudio de prompts',tools:'Herramientas gratis',about:'Acerca de',create:'Crear un prompt',choose:'Elegir idioma',hero:'Haz espacio para',explore:'Explorar ideas',quiz:'Descubre mi estilo',daily:'Inspiración diaria',search:'Buscar ideas de diseño',toolSearch:'Buscar herramienta…'},
    fr: {skip:'Aller au contenu',inspiration:'Inspiration',space:'Mon espace',studio:'Atelier de prompts',tools:'Outils gratuits',about:'À propos',create:'Créer un prompt',choose:'Choisir la langue',hero:'Faites place à',explore:'Explorer les idées',quiz:'Trouver mon style',daily:'Inspiration du jour',search:'Rechercher des idées déco',toolSearch:'Rechercher un outil…'},
    de: {skip:'Zum Inhalt',inspiration:'Inspiration',space:'Mein Bereich',studio:'Prompt-Studio',tools:'Kostenlose Tools',about:'Über uns',create:'Prompt erstellen',choose:'Sprache wählen',hero:'Raum für schönes Wohnen',explore:'Ideen entdecken',quiz:'Meinen Stil finden',daily:'Tägliche Design-Inspiration',search:'Designideen suchen',toolSearch:'Tool suchen…'},
    pt: {skip:'Ir para o conteúdo',inspiration:'Inspiração',space:'Meu espaço',studio:'Estúdio de prompts',tools:'Ferramentas grátis',about:'Sobre',create:'Criar prompt',choose:'Escolher idioma',hero:'Abra espaço para',explore:'Explorar ideias',quiz:'Descobrir meu estilo',daily:'Inspiração diária',search:'Buscar ideias de decoração',toolSearch:'Buscar ferramenta…'},
    tr: {skip:'İçeriğe geç',inspiration:'İlham',space:'Alanım',studio:'Komut Stüdyosu',tools:'Ücretsiz araçlar',about:'Hakkında',create:'Komut oluştur',choose:'Dil seçin',hero:'Güzel yaşam için yer açın',explore:'Fikirleri keşfet',quiz:'Tarzımı bul',daily:'Günün tasarım ilhamı',search:'Tasarım fikirlerini ara',toolSearch:'Araç ara…'},
    id: {skip:'Lewati ke konten',inspiration:'Inspirasi',space:'Ruang Saya',studio:'Studio Prompt',tools:'Alat Gratis',about:'Tentang',create:'Buat prompt',choose:'Pilih bahasa',hero:'Ciptakan ruang untuk',explore:'Jelajahi inspirasi',quiz:'Temukan gaya saya',daily:'Inspirasi desain harian',search:'Cari ide desain',toolSearch:'Cari alat…'}
  };
  const names = Object.keys(dictionaries);
  const select = document.getElementById('languageSelect');
  if (!select) return;
  const safeGet = () => { try { return localStorage.getItem('hdi.language.v1'); } catch { return null; } };
  const safeSet = value => { try { localStorage.setItem('hdi.language.v1', value); } catch { /* Language still works for this page view. */ } };
  const original = new Map();
  const targets = [
    ['.skip-link','skip'],['#mainNav a[href="#inspiration"]','inspiration'],['#mainNav a[href="#your-space"]','space'],['#mainNav a[href="#prompt-studio"]','studio'],['#mainNav a[href="#tools"]','tools'],['#mainNav a[href="#about"]','about'],['#mainNav .nav-cta','create'],['.hero-actions a[href="#inspiration"]','explore'],['#toolSearch','toolSearch']
  ];
  targets.forEach(([selector,key]) => { const el=document.querySelector(selector); if(el) original.set(el,{key,text:el.textContent,placeholder:el.getAttribute('placeholder')}); });
  function apply(language) {
    const lang=dictionaries[language]?language:'en';
    const rtl=lang==='ur'||lang==='ar';
    document.documentElement.lang=lang;
    document.documentElement.dir=rtl?'rtl':'ltr';
    select.value=lang;
    const d=dictionaries[lang];
    original.forEach((meta,el)=>{
      if(el instanceof HTMLInputElement) el.placeholder=d[meta.key]||meta.placeholder;
      else if(meta.key==='create') { el.textContent=d.create+' '; const arrow=document.createElement('span');arrow.textContent='↗';el.append(arrow); }
      else el.textContent=d[meta.key]||meta.text;
    });
    select.setAttribute('aria-label',d.choose);
    document.querySelector('.skip-link')?.setAttribute('aria-label',d.skip);
    try { document.dispatchEvent(new CustomEvent('hdi:languagechange',{detail:{language:lang,direction:rtl?'rtl':'ltr'}})); } catch { /* Optional enhancement event. */ }
  }
  select.addEventListener('change',()=>{safeSet(select.value);apply(select.value);});
  const saved = safeGet();
  const browserLanguage = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'])
    .map(value => String(value).toLowerCase().split('-')[0])
    .find(value => names.includes(value));
  apply(names.includes(saved) ? saved : (browserLanguage || 'en'));
})();
