import {supabase} from './supabase';
export async function examAction<T>(payload:Record<string,unknown>):Promise<T>{
 const {data:{session}}=await supabase.auth.getSession();if(!session)throw new Error('Faça login para realizar a prova.');
 const response=await fetch('https://vnktbikulnjazhfpmbdu.supabase.co/functions/v1/exam-engine',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,'apikey':process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||''},body:JSON.stringify(payload)});
 const result=await response.json();if(!response.ok||result.error)throw new Error(result.error||'Erro ao acessar a avaliação.');return result as T;
}
export type ExamData={attemptId:string;expiresAt:string;certification:{name:string;question_count:number;passing_percentage:number;duration_minutes:number};questions:{id:string;prompt:string;options:{id:string;label:string}[]}[];answers:{question_id:string;selected_option_id:string}[]};
