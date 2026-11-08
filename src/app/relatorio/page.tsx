'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {supabase} from '@/lib/supabase';
type Skill={name:string;questions:number;correct:number;percentage:number};
type Report={certification:string;level:string;score:number;passed:boolean;gradedAt:string;skills:Skill[];strengths:string[];improvements:string[];disclaimer:string};
export default function Relatorio(){
 const [report,setReport]=useState<Report|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{(async()=>{
 const id=new URLSearchParams(location.search).get('tentativa');
 if(!id){setError('Selecione uma avaliação concluída no histórico.');setLoading(false);return;}
 const {data:{session}}=await supabase.auth.getSession();
 if(!session){location.replace('/certificaai/login/');return;}
 const response=await fetch('https://vnktbikulnjazhfpmbdu.supabase.co/functions/v1/performance-report',{
 method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,'apikey':process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||''},
 body:JSON.stringify({attemptId:id})});
 const body=await response.json();
 if(!response.ok)throw new Error(body.error||'Não foi possível carregar seu desempenho.');
 setReport(body);
 })().catch(e=>setError(e instanceof Error?e.message:'Erro desconhecido')).finally(()=>setLoading(false))},[]);
 return <main className="wrap section"><div className="report-head"><span className="eyebrow">ANÁLISE DE DESEMPENHO</span><Link className="text-link" href="/historico">← Voltar ao histórico</Link></div>
 {loading&&<div className="panel">Analisando seu desempenho...</div>}{error&&<p role="alert" className="error">{error}</p>}
 {report&&<><section className="report-hero"><div><span className="eyebrow">RELATÓRIO DE AVALIAÇÃO</span><h1>{report.certification}</h1><p>Nível {report.level} · Concluído em {new Date(report.gradedAt).toLocaleDateString('pt-BR')}</p><span className={'result-label '+(report.passed?'passed':'not-passed')}>{report.passed?'Aprovado':'Abaixo da nota mínima'}</span></div><div className="score-circle"><strong>{Math.round(report.score)}%</strong><span>aproveitamento</span></div></section>
 <section className="section"><div className="section-heading"><div><span className="eyebrow">SEUS RESULTADOS</span><h2>Desempenho por competência</h2><p>Entenda onde você demonstrou maior domínio e quais conteúdos merecem atenção.</p></div></div>
 <div className="skill-grid">{report.skills.map(s=><article className="skill-card" key={s.name}><div className="skill-top"><h3>{s.name}</h3><strong>{s.percentage}%</strong></div><div className="skill-track"><div className="skill-fill" style={{width:s.percentage+'%',background:s.percentage>=70?'#129477':'#e8a048'}}/></div><p>{s.correct} de {s.questions} respostas corretas</p></article>)}</div>
 <div className="insight-grid"><article className="insight-card"><span className="eyebrow">PONTOS FORTES</span><h3>Onde você se destacou</h3>{report.strengths.length?report.strengths.map(s=><p key={s}>✓ {s}</p>):<p>Nenhuma competência superou 70% nesta tentativa.</p>}</article><article className="insight-card warm"><span className="eyebrow">PRÓXIMOS PASSOS</span><h3>Conteúdos para revisar</h3>{report.improvements.length?report.improvements.map(s=><p key={s}>↗ Revise {s.toLowerCase()}</p>):<p>Ótimo desempenho nas competências avaliadas. Continue praticando!</p>}</article></div>
 <p className="notice">{report.disclaimer}</p><div className="action-row"><Link className="btn" href="/catalogo">Explorar outras certificações →</Link><Link className="btn alt" href="/certificados">Meus certificados</Link></div></section></>}
 </main>
}