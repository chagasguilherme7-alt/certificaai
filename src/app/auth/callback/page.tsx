'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {supabase} from '@/lib/supabase';
export default function Callback(){const [message,setMessage]=useState('Confirmando autenticação...');useEffect(()=>{(async()=>{const url=new URL(window.location.href);const code=url.searchParams.get('code');if(code){const {error}=await supabase.auth.exchangeCodeForSession(code);setMessage(error?'Não foi possível confirmar o acesso.':'Conta confirmada. Já pode entrar.')}else{const {data}=await supabase.auth.getSession();setMessage(data.session?'Conta confirmada. Já pode entrar.':'Confira o link de confirmação ou tente entrar novamente.')}})()},[]);return <main className="wrap section"><h1 style={{fontSize:36}}>Confirmação de conta</h1><p>{message}</p><Link href="/login" className="btn">Ir para login</Link></main>}
