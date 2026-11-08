import Link from 'next/link';
const categories=[
 {number:'01',icon:'▦',label:'PRODUTIVIDADE',name:'Excel',description:'Fórmulas, dashboards e análise de dados.',tone:'blue'},
 {number:'02',icon:'✳',label:'INOVAÇÃO',name:'Inteligência Artificial',description:'Fundamentos, modelos e soluções com IA.',tone:'violet'},
 {number:'03',icon:'↗',label:'CRESCIMENTO',name:'Marketing Digital',description:'Conteúdo, campanhas e performance.',tone:'orange'},
 {number:'04',icon:'⌘',label:'TECNOLOGIA',name:'Informática',description:'Sistemas, redes e segurança digital.',tone:'cyan'},
 {number:'05',icon:'◈',label:'GESTÃO',name:'Finanças',description:'Planejamento, indicadores e investimentos.',tone:'green'}
];
export default function Home(){return <main>
<div className="landing-hero"><div className="wrap landing-grid"><div className="landing-copy">
 <span className="launch-label"><span className="pulse-dot"/> PLATAFORMA DE AVALIAÇÃO DE COMPETÊNCIAS</span>
 <h1>Seu potencial tem valor.<br/><em>Comprove o que você sabe.</em></h1>
 <p>Uma forma moderna de demonstrar suas habilidades. Avaliações online, resultados detalhados e certificados digitais com verificação de autenticidade.</p>
 <div className="action-row"><Link className="btn btn-large" href="/catalogo">Explorar certificações <span>↗</span></Link><Link className="btn btn-large btn-glass" href="/cadastro">Começar gratuitamente</Link></div>
 <div className="hero-trust"><span>✓ Avaliações objetivas</span><span>✓ Resultado instantâneo</span><span>✓ Certificado verificável</span></div>
 </div>
 <div className="landing-visual"><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
 <div className="preview-card"><div className="preview-head"><span className="preview-mark">C<span>AI</span></span><span className="preview-verified">✦ CERTIFICAÇÃO DIGITAL</span></div>
 <div className="preview-body"><span className="preview-overline">COMPROVAÇÃO DE COMPETÊNCIAS</span><div className="preview-medal">✧</div><h2>Seu conhecimento,<br/>seu diferencial.</h2><p>Aprenda. Demonstre. Conquiste.</p><div className="preview-ruler"/><div className="preview-foot"><span>CertificaAI<br/><small>Credenciais digitais</small></span><span className="preview-qr">▦</span></div></div></div>
 <div className="floating-proof">✓ <span><b>Validação pública</b><small>Credenciais verificáveis online</small></span></div>
 </div>
 </div></div>
 <div className="wrap landing-stats"><div><strong>05</strong><span>Áreas de conhecimento</span></div><div><strong>15</strong><span>Avaliações disponíveis</span></div><div><strong>03</strong><span>Níveis de desenvolvimento</span></div><div><strong>100%</strong><span>Digital e gratuito no piloto</span></div></div>
 <section className="wrap section"><div className="section-heading"><div><span className="eyebrow">CATÁLOGO DE CERTIFICAÇÕES</span><h2>Escolha seu próximo desafio.</h2><p>Explore habilidades valorizadas e encontre a avaliação ideal para sua jornada.</p></div><Link className="text-link" href="/catalogo">Todas as avaliações ↗</Link></div><div className="premium-category-grid">{categories.map(c=><Link href="/catalogo" className={'premium-category tone-'+c.tone} key={c.name}><div className="category-header"><span className="category-icon">{c.icon}</span><small>{c.number} / {c.label}</small></div><h3>{c.name}</h3><p>{c.description}</p><span className="category-arrow">Explorar área <b>↗</b></span></Link>)}</div></section>
 <section className="experience-section"><div className="wrap section"><div className="centered-title"><span className="eyebrow">A EXPERIÊNCIA CERTIFICAAI</span><h2>Uma jornada simples. Um resultado que importa.</h2><p>Você se concentra no conhecimento. Nós organizamos a experiência.</p></div><div className="premium-steps"><article><span>01</span><div className="step-symbol">⌕</div><h3>Descubra sua área</h3><p>Explore certificações, temas avaliados e critérios antes de começar.</p></article><article><span>02</span><div className="step-symbol">◷</div><h3>Coloque-se à prova</h3><p>Responda à avaliação com tempo definido e progresso salvo.</p></article><article><span>03</span><div className="step-symbol">✦</div><h3>Conquiste e compartilhe</h3><p>Veja seus pontos fortes e, ao ser aprovado, emita sua credencial verificável.</p></article></div></div></section>
 <section className="wrap section"><div className="premium-cta"><div><span className="eyebrow">UM PASSO À FRENTE</span><h2>O próximo certificado pode ser seu.</h2><p>Comece gratuitamente e construa seu passaporte de competências.</p></div><Link href="/cadastro" className="btn btn-large">Criar minha conta ↗</Link></div><p style={{textAlign:'center',fontSize:12,marginTop:18}}>Plataforma privada de avaliação de conhecimentos em fase piloto. Certificados não equivalem a diplomas reconhecidos pelo MEC.</p></section>
</main>}