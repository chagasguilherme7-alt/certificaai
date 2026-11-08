'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {supabase} from '@/lib/supabase';
type Cert={id:string;name:string;level:string;description:string};
export default function Catalogo(){const [items,setItems]=useState<Cert[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{supabase.from('certifications').select('id,name,level,description').eq('is_active',true).order('name').then(({data,error})=>{if(error)setError('Falha ao carregar o catálogo.');else setItems(data||[]);setLoading(false)})},[]);return <main className="wrap section"><span className="tag">CATÁLOGO</span><h1 style={{fontSize:42}}>Explore certificações</h1><p>15 opções iniciais. As avaliações serão disponibilizadas após revisão do banco de questões.</p>{loading&&<p>Carregando...</p>}{error&&<p className="error">{error}</p>}<div className="cards">{items.map(x=><article className="card" key={x.id}><span className="tag">{x.level}</span><h3>{x.name}</h3><p>{x.description}</p><Link href="/cadastro" style={{color:'#2563eb',fontWeight:700}}>Criar conta →</Link></article>)}</div></main>}
