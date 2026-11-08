'use client';
import {useEffect,useState} from 'react';import Link from 'next/link';
type Credential={code:string;name:string;level:string;score:number;issuedAt:string};
type Passport={found:boolean;name:string;credentials:Credential[]};
export default function Passaporte(){
 const [data,setData]=useState<Passport|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(true);
 useEffect(()=>{const slug=new URLSearchParams(window.location.search).get('id')||'';if(!slug){setError('Informe um link de passaporte válido.');setLoading(false);return}
 (async()=>{const response=await fetch('https://vnktbikulnjazhfpmbdu.supabase.co/functions/v1/public-passport',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Falha na consulta.');setData(result)})().catch(e=>setError(e instanceof Error?e.message:'Não foi possível carregar o passaporte.')).finally(()=>setLoading(false))},[]);
 return <main className="wrap section"><span className="eyebrow">PORTFÓLIO DE COMPETÊNCIAS</span><h1 style={{fontSize:42}}>Passaporte profissional</h1>{loading&&<div className="panel">Buscando credenciais...</div>}{error&&<p className="error">{error}</p>}{data&&!data.found&&<div className="panel"><h2>Passaporte indisponível</h2><p>O perfil é privado, não existe ou deixou de ser publicado.</p></div>}
 {data?.found&&<><div className="panel" style={{maxWidth:800}}><span className="eyebrow">PERFIL PÚBLICO</span><h2>{data.name}</h2><p>{data.credentials.length} certificação(ões) válida(s) publicada(s), verificáveis na CertificaAI.</p><button className="btn alt" onClick={()=>navigator.clipboard.writeText(location.href)}>Copiar link do passaporte</button></div><div className="cards">{data.credentials.map(c=><article key={c.code} className="card"><span className="pill">{c.level}</span><h3>{c.name}</h3><p>Aproveitamento: <strong>{c.score}%</strong></p><p>Emitido em {new Date(c.issuedAt).toLocaleDateString('pt-BR')}</p><Link className="btn" href={'/verificar/?codigo='+encodeURIComponent(c.code)}>Conferir autenticidade →</Link></article>)}</div>{!data.credentials.length&&<p>Este perfil ainda não possui credenciais públicas válidas.</p>}</>}
 </main>;
}
