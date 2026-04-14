import { useState, useEffect, useCallback, useRef } from "react";

const ADMIN_PASS = "imperio2026";

const SECTIONS = [
  {
    id: "essencia", icon: "\u2726", title: "Ess\u00eancia", subtitle: "& Posicionamento",
    desc: "Como o Lar Sama deve ser percebido por quem visita o site.",
    questions: [
      { id: "q1", label: "Quando algu\u00e9m entra no site, qual a PRIMEIRA sensa\u00e7\u00e3o que deveria ter?", type: "long", hint: "Ex: confian\u00e7a, acolhimento, admira\u00e7\u00e3o, vontade de ajudar\u2026" },
      { id: "q2", label: "Descreva o Lar Sama em UMA frase para algu\u00e9m que nunca ouviu falar.", type: "long", hint: "Essa frase ser\u00e1 base para o slogan do site." },
      { id: "q3", label: "O que diferencia o Lar Sama de outras institui\u00e7\u00f5es sociais?", type: "long", hint: "Pense: hist\u00f3ria de 45+ anos, rede CDU, projetos \u00fanicos\u2026" },
      { id: "q4", label: "Qual a a\u00e7\u00e3o PRINCIPAL que o visitante deve tomar?", type: "radio",
        options: ["Fazer uma doa\u00e7\u00e3o", "Tornar-se s\u00f3cio contribuinte", "Conhecer os projetos", "Entrar em contato / voluntariar-se", "Outro"] },
      { id: "q4b", label: "Se \u2018Outro\u2019, qual seria?", type: "short" },
      { id: "q5", label: "P\u00fablicos mais importantes para o site:", type: "check",
        options: ["Doadores (pessoa f\u00edsica)", "Empresas parceiras (B2B)", "Comunidade local (Cotia / S\u00e3o Roque)", "Rede CDU (33 Casas da Uni\u00e3o)", "Volunt\u00e1rios", "S\u00f3cios atuais", "\u00d3rg\u00e3os p\u00fablicos / editais"] },
    ],
  },
  {
    id: "tom", icon: "\u25c8", title: "Tom de Voz", subtitle: "& Linguagem",
    desc: "Como o Lar Sama deve \u2018falar\u2019 em cada p\u00e1gina do site.",
    questions: [
      { id: "q6", label: "Qual tom de comunica\u00e7\u00e3o combina mais com o Lar Sama?", type: "radio",
        options: ["Acolhedor e fraterno", "Institucional e s\u00e9rio", "Moderno e jovem", "Inspirador e esperan\u00e7oso", "Profissional e confi\u00e1vel"] },
      { id: "q7", label: "5 palavras que DEVEM aparecer no site:", type: "long", hint: "Ex: fraternidade, educa\u00e7\u00e3o, paz, comunidade, transforma\u00e7\u00e3o\u2026" },
      { id: "q8", label: "5 palavras que N\u00c3O DEVEM aparecer:", type: "long", hint: "Ex: caridade, coitados, pena, esmola\u2026" },
      { id: "q9", label: "A miss\u00e3o atual ainda reflete o Lar Sama de hoje?", type: "radio",
        hint: '"Ser uma organiza\u00e7\u00e3o sustent\u00e1vel, promotora de a\u00e7\u00f5es\u2026 visando um mundo Fraterno, \u00c9tico e de Paz."',
        options: ["Sim, est\u00e1 perfeita", "Precisa de pequenos ajustes", "Precisa ser reescrita"] },
      { id: "q9b", label: "Se precisa de ajustes, o que mudaria na miss\u00e3o?", type: "long" },
    ],
  },
  {
    id: "dobras", icon: "\u25c7", title: "Conte\u00fado", subtitle: "por Se\u00e7\u00e3o do Site",
    desc: "Para cada \u2018dobra\u2019 da p\u00e1gina, o Imp\u00e9rio apresentar\u00e1 3 op\u00e7\u00f5es visuais.",
    questions: [
      { id: "q10", label: "HERO \u2014 O que o visitante deve ver primeiro ao entrar no site?", type: "long", hint: "Imagem marcante, v\u00eddeo, frase de impacto, bot\u00e3o de doa\u00e7\u00e3o\u2026" },
      { id: "q11", label: "QUEM SOMOS \u2014 Quais pontos da hist\u00f3ria merecem destaque?", type: "long", hint: "Funda\u00e7\u00e3o, marcos, v\u00ednculo CDU, Sama\u00fama\u2026" },
      { id: "q12", label: "PROJETOS \u2014 Quais devem ter destaque?", type: "check",
        options: ["Luz do Saber (alfabetiza\u00e7\u00e3o)", "Comunica\u00e7\u00e3o N\u00e3o-Violenta", "Doa\u00e7\u00e3o de Sangue", "Campanha de Tampinhas", "Cestas B\u00e1sicas"] },
      { id: "q12b", label: "Descreva brevemente cada projeto que deseja destacar:", type: "long" },
      { id: "q13", label: "IMPACTO \u2014 Confirme ou corrija os n\u00fameros:", type: "long", hint: "45+ anos \u00b7 1.200 crian\u00e7as \u00b7 350 s\u00f3cios \u00b7 33 CDUs \u2014 est\u00e3o corretos?" },
      { id: "q14", label: "COMO AJUDAR \u2014 Formas de contribui\u00e7\u00e3o:", type: "check",
        options: ["Doa\u00e7\u00e3o online", "Tornar-se s\u00f3cio", "Voluntariado", "Campanha ouro/prata/bronze", "Doa\u00e7\u00e3o de itens"] },
      { id: "q15", label: "CONTATO \u2014 Canais desejados no site:", type: "check",
        options: ["Formul\u00e1rio no site", "WhatsApp (com rob\u00f4)", "E-mail", "Telefone fixo"] },
      { id: "q15b", label: "Qual n\u00famero / e-mail oficial deve aparecer?", type: "short" },
    ],
  },
  {
    id: "pilares", icon: "\u25b3", title: "Pilares", subtitle: "de Comunica\u00e7\u00e3o",
    desc: "Os temas centrais definidos na reuni\u00e3o de onboard.",
    questions: [
      { id: "q16", label: "EDUCA\u00c7\u00c3O \u2014 Descreva os projetos educacionais:", type: "long", hint: "Luz do Saber atendeu 1.200 crian\u00e7as em S\u00e3o Roque." },
      { id: "q17", label: "HIST\u00d3RIA \u2014 Conte a trajet\u00f3ria do Lar Sama em 3 a 5 frases:", type: "long", hint: "Funda\u00e7\u00e3o, marcos, evolu\u00e7\u00e3o. Dom\u00ednio tem 20+ anos." },
      { id: "q18", label: "REDE CDU \u2014 O que \u00e9 e qual a rela\u00e7\u00e3o com o Lar Sama?", type: "long", hint: "33 Casas da Uni\u00e3o no Brasil." },
      { id: "q19", label: "SAMA\u00daMA \u2014 Como explicar a rela\u00e7\u00e3o entre as duas?", type: "long", hint: "Marco enfatizou: uma \u00fanica unidade assistencial." },
    ],
  },
  {
    id: "visual", icon: "\u25cb", title: "Visual", subtitle: "& Refer\u00eancias",
    desc: "O novo site ser\u00e1 o cart\u00e3o de visita da identidade reconfigurada.",
    questions: [
      { id: "q20", label: "Cores da marca (hex se souber):", type: "short", hint: "Alinhar com Instagram @casadauniaolarsama" },
      { id: "q21", label: "Sites de refer\u00eancia \u2014 cole URLs que voc\u00ea admira:", type: "long" },
      { id: "q22", label: "Do site atual, o que MANTER?", type: "long", hint: "Logo, v\u00eddeos, checkout de doa\u00e7\u00e3o\u2026" },
      { id: "q23", label: "Do site atual, o que REMOVER?", type: "long", hint: "Anima\u00e7\u00f5es pesadas, \u2018nova diretoria\u2019, posts desatualizados\u2026" },
      { id: "q24", label: "Situa\u00e7\u00e3o do acervo de fotos e v\u00eddeos:", type: "radio",
        options: ["Bom acervo dispon\u00edvel", "Temos algumas, precisamos de mais", "Precisamos produzir do zero", "Temos v\u00eddeos no YouTube"] },
      { id: "q25", label: "H\u00e1 depoimentos de beneficiados, s\u00f3cios ou parceiros?", type: "long" },
    ],
  },
  {
    id: "funcionalidades", icon: "\u25ce", title: "Funcionalidades", subtitle: "& SEO",
    desc: "Recursos t\u00e9cnicos e estrat\u00e9gia digital do novo site.",
    questions: [
      { id: "q26", label: "Funcionalidades desejadas:", type: "check",
        options: ["Doa\u00e7\u00e3o online", "Blog com admin", "Newsletter", "Galeria fotos/v\u00eddeos", "Formul\u00e1rio de contato", "WhatsApp rob\u00f4", "Login para s\u00f3cios", "Calend\u00e1rio de eventos", "Instagram/YouTube embed", "AdSense", "Selo de transpar\u00eancia"] },
      { id: "q27", label: "Como quer ser encontrado no Google?", type: "long", hint: "Ex: ONG Cotia, doa\u00e7\u00e3o Lar Sama, projeto educacional S\u00e3o Roque\u2026" },
      { id: "q28", label: "Quem gerencia o dom\u00ednio e a hospedagem?", type: "short" },
      { id: "q29", label: "Links das redes sociais ativas:", type: "long", hint: "Instagram, YouTube, Facebook\u2026" },
      { id: "q30", label: "Observa\u00e7\u00f5es, pedidos ou preocupa\u00e7\u00f5es adicionais:", type: "long" },
    ],
  },
];

const ALL_Q = SECTIONS.flatMap(s => s.questions);

/* ---- localStorage helpers (replaces window.storage) ---- */
const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* quota exceeded */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* noop */ }
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #FAF7F2;
    --warm: #F3EDE3;
    --sand: #E8DFD0;
    --forest: #1A3A5C;
    --forest-light: #2B5F8A;
    --gold: #B8860B;
    --gold-light: #D4A843;
    --gold-pale: rgba(184,134,11,0.08);
    --ink: #2C2C2C;
    --muted: #8B7E74;
    --light-muted: #B5A99A;
    --white: #FFFFFF;
    --danger: #C0392B;
    --success: #27AE60;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Outfit', system-ui, sans-serif;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .scale-in { animation: scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

  .grain {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .field-input {
    width: 100%; padding: 14px 18px; background: var(--white); border: 1.5px solid var(--sand);
    border-radius: 10px; color: var(--ink); font-size: 15px; font-family: var(--sans); font-weight: 400;
    outline: none; transition: all 0.3s ease;
  }
  .field-input:focus { border-color: var(--forest); box-shadow: 0 0 0 3px rgba(26,58,92,0.08); }
  .field-input::placeholder { color: var(--light-muted); }

  textarea.field-input { resize: vertical; min-height: 90px; line-height: 1.6; }

  .radio-opt {
    display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px;
    cursor: pointer; transition: all 0.25s ease; border: 1.5px solid transparent; background: var(--white);
  }
  .radio-opt:hover { background: var(--gold-pale); }
  .radio-opt.active { border-color: var(--forest); background: rgba(26,58,92,0.04); }

  .check-tag {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 24px;
    font-size: 14px; font-family: var(--sans); font-weight: 500; cursor: pointer; transition: all 0.25s ease;
    border: 1.5px solid var(--sand); background: var(--white); color: var(--ink);
  }
  .check-tag:hover { border-color: var(--forest-light); }
  .check-tag.active { border-color: var(--forest); background: var(--forest); color: var(--white); }

  .btn {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border: none;
    border-radius: 10px; font-size: 15px; font-family: var(--sans); font-weight: 600;
    cursor: pointer; transition: all 0.3s ease;
  }
  .btn-primary { background: var(--forest); color: var(--white); }
  .btn-primary:hover { background: var(--forest-light); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,58,92,0.25); }
  .btn-ghost { background: transparent; color: var(--forest); border: 1.5px solid var(--sand); }
  .btn-ghost:hover { border-color: var(--forest); background: rgba(26,58,92,0.03); }
  .btn:disabled { opacity: 0.35; cursor: default; transform: none !important; box-shadow: none !important; }

  .progress-segment {
    height: 3px; border-radius: 2px; transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); flex: 1;
  }

  .admin-card {
    background: var(--white); border-radius: 14px; border: 1px solid var(--sand);
    overflow: hidden; transition: all 0.3s ease;
  }
  .admin-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
`;

/* ============ MAIN ============ */
export default function App() {
  const [view, setView] = useState("welcome");
  const [adminAuth, setAdminAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  const tryAdmin = () => {
    if (pw === ADMIN_PASS) { setAdminAuth(true); setView("admin"); setPwErr(false); }
    else setPwErr(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "var(--sans)", color: "var(--ink)" }}>
      <style>{css}</style>
      <div className="grain" />

      {view === "welcome" && <WelcomeView onStart={() => setView("identify")} onAdmin={() => setView("login")} />}
      {view === "identify" && <IdentifyView nome={nome} setNome={setNome} cargo={cargo} setCargo={setCargo} onNext={() => setView("form")} onBack={() => setView("welcome")} />}
      {view === "form" && <FormView nome={nome} cargo={cargo} onDone={() => setView("thanks")} onBack={() => setView("identify")} />}
      {view === "thanks" && <ThanksView nome={nome} onBack={() => { setView("welcome"); setNome(""); setCargo(""); }} />}
      {view === "login" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
          <div className="scale-in" style={{ background: "var(--white)", borderRadius: 20, padding: "48px 40px", maxWidth: 400, width: "100%", textAlign: "center", border: "1px solid var(--sand)", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: "var(--gold-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>{"\ud83d\udd12"}</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700, color: "var(--forest)", margin: "0 0 6px" }}>{"Área Administrativa"}</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>{"Acesse as respostas do formulário."}</p>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(false); }}
              onKeyDown={e => e.key === "Enter" && tryAdmin()}
              placeholder="Senha de acesso" className="field-input" style={{ marginBottom: pwErr ? 4 : 16, textAlign: "center", fontSize: 16, letterSpacing: 2 }} />
            {pwErr && <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 12 }}>Senha incorreta. Tente novamente.</p>}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setView("welcome"); setPw(""); setPwErr(false); }}>Voltar</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={tryAdmin}>Entrar</button>
            </div>
          </div>
        </div>
      )}
      {view === "admin" && adminAuth && <AdminView onBack={() => { setView("welcome"); setAdminAuth(false); setPw(""); }} />}
    </div>
  );
}

/* ============ WELCOME ============ */
function WelcomeView({ onStart, onAdmin }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", border: "1px solid var(--sand)", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: -40, left: -60, width: 200, height: 200, borderRadius: "50%", border: "1px solid var(--sand)", opacity: 0.4 }} />

      <div className="fade-up" style={{ maxWidth: 520, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", background: "var(--gold-pale)", borderRadius: 24, marginBottom: 28 }}>
          <span style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{"Parceria Imp\u00e9rio \u00d7 Larsama"}</span>
        </div>

        <h1 style={{ fontFamily: "var(--serif)", fontSize: 48, fontWeight: 700, color: "var(--forest)", lineHeight: 1.15, marginBottom: 12 }}>
          {"Constru\u00e7\u00e3o do"}<br/>{"Novo Site"}
        </h1>

        <p style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: "var(--gold)", marginBottom: 24 }}>
          {"Casa da Uni\u00e3o Lar Sama"}
        </p>

        <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginBottom: 40, maxWidth: 440, margin: "0 auto 40px" }}>
          {"Suas respostas v\u00e3o guiar a copy, o layout e toda a linha de comunica\u00e7\u00e3o do novo site institucional. Leve o tempo que precisar."}
        </p>

        <button className="btn btn-primary" onClick={onStart} style={{ padding: "16px 48px", fontSize: 16, borderRadius: 12 }}>
          {"Come\u00e7ar \u2192"}
        </button>

        <p style={{ marginTop: 40, fontSize: 13, color: "var(--light-muted)" }}>
          {"30 perguntas \u00b7 ~15 minutos \u00b7 respostas salvas automaticamente"}
        </p>
      </div>

      <button onClick={onAdmin} style={{ position: "absolute", bottom: 24, right: 24, background: "none", border: "none", color: "var(--light-muted)", fontSize: 12, cursor: "pointer", fontFamily: "var(--sans)", padding: "8px 12px", borderRadius: 6, transition: "all .2s" }}>
        {"\u00c1rea Admin \u2197"}
      </button>
    </div>
  );
}

/* ============ IDENTIFY ============ */
function IdentifyView({ nome, setNome, cargo, setCargo, onNext, onBack }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div className="fade-up" style={{ maxWidth: 480, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", width: 48, height: 48, borderRadius: 24, background: "var(--forest)", color: "var(--white)", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: "var(--serif)", fontWeight: 700, marginBottom: 16 }}>1</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, color: "var(--forest)", marginBottom: 8 }}>{"Identifica\u00e7\u00e3o"}</h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>{"Precisamos saber quem est\u00e1 respondendo."}</p>
        </div>

        <div style={{ background: "var(--white)", borderRadius: 16, padding: "32px 28px", border: "1px solid var(--sand)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forest)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>Nome Completo *</label>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Flavia Ferreira de Oliveira" className="field-input" style={{ marginBottom: 24 }} />

          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forest)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>{"Cargo / Fun\u00e7\u00e3o na Institui\u00e7\u00e3o"}</label>
          <input value={cargo} onChange={e => setCargo(e.target.value)} placeholder={"Ex: Vice-presidente, Diretor de Comunica\u00e7\u00e3o\u2026"} className="field-input" />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button className="btn btn-ghost" onClick={onBack} style={{ flex: 1 }}>{"← Voltar"}</button>
          <button className="btn btn-primary" onClick={onNext} disabled={!nome.trim()} style={{ flex: 2 }}>{"Iniciar Formul\u00e1rio →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ============ FORM ============ */
function FormView({ nome, cargo, onDone, onBack }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [anim, setAnim] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const topRef = useRef(null);

  const sec = SECTIONS[step];
  const update = (id, val) => setData(d => ({ ...d, [id]: val }));
  const toggleCheck = (id, opt) => {
    const curr = data[id] || [];
    update(id, curr.includes(opt) ? curr.filter(o => o !== opt) : [...curr, opt]);
  };

  const goStep = (n) => {
    setAnim(false);
    setTimeout(() => { setStep(n); setAnim(true); topRef.current?.scrollIntoView({ behavior: "smooth" }); }, 50);
  };

  const filledTotal = ALL_Q.filter(q => { const v = data[q.id]; return Array.isArray(v) ? v.length > 0 : v && v.trim?.(); }).length;
  const pct = Math.round((filledTotal / ALL_Q.length) * 100);

  const submit = () => {
    setSubmitting(true);
    const entry = { nomeCompleto: nome.trim(), cargo: cargo.trim(), respostas: data, dataEnvio: new Date().toISOString() };
    const id = "resp_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    try {
      storage.set(id, JSON.stringify(entry));
      let keys = [];
      try { const idx = storage.get("resp_index"); if (idx) keys = JSON.parse(idx); } catch { /* noop */ }
      keys.push(id);
      storage.set("resp_index", JSON.stringify(keys));
    } catch (e) { console.error(e); }
    setSubmitting(false);
    onDone();
  };

  if (showConfirm) {
    const filledCount = ALL_Q.filter(q => { const v = data[q.id]; return Array.isArray(v) ? v.length > 0 : v && v.trim?.(); }).length;
    const emptyCount = ALL_Q.length - filledCount;
    return (
      <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
        <div ref={topRef} />
        <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,247,242,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--sand)" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, color: "var(--forest)" }}>{"Confirma\u00e7\u00e3o de Envio"}</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{filledCount}/{ALL_Q.length} respondidas</span>
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
          <div className="fade-up" style={{ padding: "40px 0 28px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: "var(--gold-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>{"\ud83d\udccb"}</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, color: "var(--forest)", marginBottom: 8 }}>Revise suas respostas</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, maxWidth: 440, margin: "0 auto" }}>
              Confira tudo antes de enviar. {"Voc\u00ea"} respondeu <strong style={{ color: "var(--forest)" }}>{filledCount}</strong> de {ALL_Q.length} perguntas
              {emptyCount > 0 && <> — <span style={{ color: "var(--gold)" }}>{emptyCount} sem resposta</span></>}.
            </p>
          </div>

          <div className="fade-up" style={{ background: "var(--forest)", borderRadius: 14, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700, color: "var(--white)", flexShrink: 0 }}>
              {nome.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ color: "var(--white)", fontSize: 16, fontWeight: 600 }}>{nome}</div>
              {cargo && <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 2 }}>{cargo}</div>}
            </div>
          </div>

          {SECTIONS.map((sec, si) => {
            const secAnswered = sec.questions.filter(q => { const v = data[q.id]; return Array.isArray(v) ? v.length > 0 : v && v.trim?.(); });
            const secEmpty = sec.questions.length - secAnswered.length;
            return (
              <div key={sec.id} className="fade-up" style={{ animationDelay: `${si * 60}ms`, background: "var(--white)", borderRadius: 14, border: "1px solid var(--sand)", marginBottom: 16, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--sand)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 700, color: "var(--forest)" }}>{sec.icon} {sec.title}</span>
                    <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)", fontSize: 15 }}>{sec.subtitle}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: secEmpty === 0 ? "var(--success)" : "var(--gold)", fontWeight: 600 }}>{secAnswered.length}/{sec.questions.length}</span>
                    <button onClick={() => { setShowConfirm(false); goStep(si); }} style={{ background: "none", border: "1px solid var(--sand)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: "var(--forest)", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, transition: "all .2s" }}>Editar</button>
                  </div>
                </div>
                <div style={{ padding: "14px 24px" }}>
                  {sec.questions.map(q => {
                    const v = data[q.id];
                    const display = Array.isArray(v) ? v.join(", ") : v;
                    return (
                      <div key={q.id} style={{ marginBottom: 10, paddingLeft: 14, borderLeft: display ? "2.5px solid var(--forest)" : "2.5px solid var(--sand)" }}>
                        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2, fontWeight: 600, lineHeight: 1.4 }}>{q.label}</p>
                        {display
                          ? <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink)" }}>{display}</p>
                          : <p style={{ fontSize: 13, color: "var(--light-muted)", fontStyle: "italic" }}>{"— n\u00e3o respondida"}</p>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ background: "var(--white)", borderRadius: 14, border: "2px solid var(--forest)", padding: "32px 24px", marginTop: 28, textAlign: "center", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: "rgba(26,58,92,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22 }}>{"\u2713"}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, color: "var(--forest)", marginBottom: 8 }}>Tudo certo para enviar?</h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
              {"Ao confirmar, suas respostas ser\u00e3o registradas para an\u00e1lise de Angelo Venturi."}
              {emptyCount > 0 && <><br/><span style={{ color: "var(--gold)", fontSize: 13 }}>({emptyCount} pergunta{emptyCount !== 1 ? "s" : ""} sem resposta — sem problema se {"n\u00e3o"} se aplica{emptyCount !== 1 ? "m" : ""})</span></>}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>{"← Voltar e Editar"}</button>
              <button className="btn btn-primary" onClick={submit} disabled={submitting} style={{ padding: "14px 40px", background: submitting ? "var(--muted)" : "var(--forest)" }}>
                {submitting ? "Enviando\u2026" : "\u2713 Confirmar e Enviar"}
              </button>
            </div>
          </div>
          <div style={{ height: 40 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <div ref={topRef} />
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,247,242,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--sand)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <span style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, color: "var(--forest)" }}>Lar Sama</span>
              <span style={{ color: "var(--light-muted)", fontSize: 13, marginLeft: 8 }}>{"\u00b7"} {nome}</span>
            </div>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{pct}%</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {SECTIONS.map((s, i) => {
              const sQ = s.questions;
              const sFilled = sQ.filter(q => { const v = data[q.id]; return Array.isArray(v) ? v.length > 0 : v && v.trim?.(); }).length;
              const sPct = sQ.length > 0 ? sFilled / sQ.length : 0;
              return (
                <div key={s.id} className="progress-segment" onClick={() => goStep(i)} style={{
                  cursor: "pointer",
                  background: i === step
                    ? `linear-gradient(90deg, var(--forest) ${sPct * 100}%, var(--sand) ${sPct * 100}%)`
                    : sPct === 1 ? "var(--success)" : sPct > 0 ? "var(--gold-light)" : "var(--sand)",
                  opacity: i === step ? 1 : 0.6,
                  height: i === step ? 5 : 3,
                }} />
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
        <div className={anim ? "fade-up" : ""} style={{ opacity: anim ? 1 : 0 }}>
          <div style={{ padding: "40px 0 28px", borderBottom: "1px solid var(--sand)", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase" }}>{"Se\u00e7\u00e3o"} {step + 1} de {SECTIONS.length}</span>
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "var(--forest)", lineHeight: 1.2 }}>
              {sec.title} <span style={{ fontWeight: 400, fontStyle: "italic", color: "var(--gold)" }}>{sec.subtitle}</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>{sec.desc}</p>
          </div>

          {sec.questions.map((q, qi) => (
            <div key={q.id} style={{ marginBottom: 24, animationDelay: `${qi * 60}ms` }} className="fade-up">
              <div style={{ background: "var(--white)", borderRadius: 14, padding: "24px 26px", border: "1px solid var(--sand)", boxShadow: "0 2px 12px rgba(0,0,0,0.02)" }}>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 4, lineHeight: 1.5 }}>{q.label}</label>
                {q.hint && <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 14px", fontStyle: "italic", lineHeight: 1.4 }}>{"\ud83d\udca1"} {q.hint}</p>}

                {(q.type === "short") && (
                  <input value={data[q.id] || ""} onChange={e => update(q.id, e.target.value)} placeholder={"Sua resposta\u2026"} className="field-input" />
                )}
                {q.type === "long" && (
                  <textarea value={data[q.id] || ""} onChange={e => update(q.id, e.target.value)} placeholder={"Sua resposta\u2026"} className="field-input" rows={3} />
                )}
                {q.type === "radio" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                    {q.options.map(o => (
                      <div key={o} className={`radio-opt ${data[q.id] === o ? "active" : ""}`} onClick={() => update(q.id, o)}>
                        <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${data[q.id] === o ? "var(--forest)" : "var(--sand)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
                          {data[q.id] === o && <div style={{ width: 10, height: 10, borderRadius: 5, background: "var(--forest)" }} />}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 400 }}>{o}</span>
                      </div>
                    ))}
                  </div>
                )}
                {q.type === "check" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {q.options.map(o => {
                      const on = (data[q.id] || []).includes(o);
                      return <button key={o} className={`check-tag ${on ? "active" : ""}`} onClick={() => toggleCheck(q.id, o)}>{on ? "\u2713 " : ""}{o}</button>;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--sand)" }}>
            <button className="btn btn-ghost" onClick={() => step === 0 ? onBack() : goStep(step - 1)}>
              {"← "}{step === 0 ? "Identifica\u00e7\u00e3o" : "Anterior"}
            </button>
            {step < SECTIONS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => goStep(step + 1)}>{"Pr\u00f3ximo →"}</button>
            ) : (
              <button className="btn btn-primary" onClick={() => { setShowConfirm(true); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                {"Revisar e Enviar →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ THANKS ============ */
function ThanksView({ nome, onBack }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <div className="scale-in" style={{ maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: "rgba(39,174,96,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>{"\u2713"}</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "var(--forest)", marginBottom: 8 }}>Obrigado, {nome.split(" ")[0]}!</h2>
        <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginBottom: 36 }}>
          {"Suas respostas foram registradas com sucesso. Angelo Venturi vai analis\u00e1-las e apresentar as op\u00e7\u00f5es de copy e layout para cada se\u00e7\u00e3o do site."}
        </p>
        <div style={{ background: "var(--white)", borderRadius: 12, padding: "20px 24px", border: "1px solid var(--sand)", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "var(--muted)", fontStyle: "italic" }}>
            {"\"O novo site ser\u00e1 o cart\u00e3o de visita que conclui a reconfigura\u00e7\u00e3o da identidade visual.\""}
          </p>
          <p style={{ fontSize: 12, color: "var(--light-muted)", marginTop: 8 }}>{"— Reuni\u00e3o de Onboard, 09/04/2026"}</p>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>{"← Preencher como outra pessoa"}</button>
      </div>
    </div>
  );
}

/* ============ ADMIN ============ */
function AdminView({ onBack }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const resps = [];
    try {
      const idx = storage.get("resp_index");
      if (idx) {
        const keys = JSON.parse(idx);
        for (const k of keys) {
          try { const r = storage.get(k); if (r) resps.push({ key: k, ...JSON.parse(r) }); } catch { /* noop */ }
        }
      }
    } catch { /* noop */ }
    setResponses(resps);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const deleteResp = (key) => {
    storage.remove(key);
    try {
      const idx = storage.get("resp_index");
      if (idx) {
        const keys = JSON.parse(idx).filter(k => k !== key);
        storage.set("resp_index", JSON.stringify(keys));
      }
    } catch { /* noop */ }
    load();
  };

  const exportCSV = () => {
    const qIds = ALL_Q.map(q => q.id);
    const qLabels = ALL_Q.map(q => q.label.replace(/,/g, ";"));
    const header = ["Nome Completo", "Cargo", "Data de Envio", ...qLabels];
    const rows = responses.map(r => {
      const d = r.respostas || {};
      return [r.nomeCompleto || r.nome, r.cargo, new Date(r.dataEnvio).toLocaleString("pt-BR"),
        ...qIds.map(id => { const v = d[id]; return Array.isArray(v) ? v.join("; ") : v || ""; })];
    });
    const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `respostas_larsama_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--warm)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "var(--forest)", borderRadius: 20, marginBottom: 12 }}>
              <span style={{ color: "var(--white)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{"\ud83d\udd12 ADMIN"}</span>
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, color: "var(--forest)" }}>{"Respostas do Formul\u00e1rio"}</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{responses.length} resposta{responses.length !== 1 ? "s" : ""} recebida{responses.length !== 1 ? "s" : ""}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={load} style={{ padding: "10px 18px", fontSize: 13 }}>{"↻ Atualizar"}</button>
            <button className="btn btn-primary" onClick={exportCSV} disabled={!responses.length} style={{ padding: "10px 18px", fontSize: 13 }}>{"⬇ Exportar CSV"}</button>
            <button className="btn btn-ghost" onClick={onBack} style={{ padding: "10px 18px", fontSize: 13 }}>Sair</button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div style={{ width: 40, height: 40, border: "3px solid var(--sand)", borderTopColor: "var(--forest)", borderRadius: "50%", animation: "pulse 1s infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "var(--muted)" }}>{"Carregando respostas\u2026"}</p>
          </div>
        ) : responses.length === 0 ? (
          <div className="admin-card fade-up" style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>{"\ud83d\udced"}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--forest)", marginBottom: 8 }}>Nenhuma resposta ainda</h3>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>{"Compartilhe o link do formul\u00e1rio com a equipe do Lar Sama."}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {responses.map((r, i) => {
              const isOpen = expanded === i;
              const answered = Object.keys(r.respostas || {}).filter(k => { const v = r.respostas[k]; return Array.isArray(v) ? v.length : v?.trim?.(); }).length;
              return (
                <div key={r.key} className="admin-card fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div onClick={() => setExpanded(isOpen ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 22, background: "var(--forest)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
                        {(r.nomeCompleto || r.nome || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{r.nomeCompleto || r.nome}</div>
                        <div style={{ color: "var(--muted)", fontSize: 13 }}>
                          {r.cargo && <>{r.cargo} · </>}{new Date(r.dataEnvio).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: answered === ALL_Q.length ? "var(--success)" : "var(--gold)" }}>{answered}/{ALL_Q.length}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>respostas</div>
                      </div>
                      <span style={{ color: "var(--muted)", fontSize: 14, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .3s", display: "inline-block" }}>{"\u25bc"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="fade-in" style={{ padding: "0 24px 24px", borderTop: "1px solid var(--sand)" }}>
                      {SECTIONS.map(sec => {
                        const hasAny = sec.questions.some(q => { const v = r.respostas?.[q.id]; return Array.isArray(v) ? v.length : v?.trim?.(); });
                        if (!hasAny) return null;
                        return (
                          <div key={sec.id} style={{ marginTop: 20 }}>
                            <h4 style={{ fontFamily: "var(--serif)", color: "var(--forest)", fontSize: 16, marginBottom: 10, fontWeight: 700 }}>{sec.icon} {sec.title} {sec.subtitle}</h4>
                            {sec.questions.map(q => {
                              const v = r.respostas?.[q.id];
                              const display = Array.isArray(v) ? v.join(", ") : v;
                              if (!display) return null;
                              return (
                                <div key={q.id} style={{ marginBottom: 12, paddingLeft: 16, borderLeft: "2px solid var(--sand)" }}>
                                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2, fontWeight: 600 }}>{q.label}</p>
                                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>{display}</p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                      <div style={{ marginTop: 20, textAlign: "right" }}>
                        <button onClick={e => { e.stopPropagation(); if (window.confirm("Excluir esta resposta permanentemente?")) deleteResp(r.key); }}
                          style={{ background: "none", border: "1px solid var(--danger)", color: "var(--danger)", padding: "8px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 500, transition: "all .2s" }}>
                          Excluir resposta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
