-- CertificaAI: atomic exam completion. Applied to Supabase on 2026-11-08.
-- Only service_role may execute this RPC. Never call it from frontend.
CREATE OR REPLACE FUNCTION public.finalize_exam_atomic(p_attempt_id uuid, p_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=''
AS $$
DECLARE
 v_attempt public.exam_attempts%rowtype;
 v_cert public.certifications%rowtype;
 v_result public.results%rowtype;
 v_credential public.credentials%rowtype;
 v_count integer;
 v_question_count integer;
 v_weight numeric;
 v_earned numeric;
 v_score numeric;
 v_passed boolean;
 v_code text;
BEGIN
 IF p_user_id IS NULL OR p_attempt_id IS NULL THEN RAISE EXCEPTION 'Invalid request'; END IF;
 SELECT * INTO v_attempt FROM public.exam_attempts
 WHERE id=p_attempt_id AND user_id=p_user_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Tentativa não encontrada'; END IF;
 SELECT * INTO v_result FROM public.results WHERE attempt_id=p_attempt_id;
 IF FOUND THEN
   SELECT * INTO v_credential FROM public.credentials WHERE result_id=v_result.id;
   RETURN jsonb_build_object('score',v_result.score,'passed',v_result.passed,'code',v_credential.code,'alreadyFinalized',true);
 END IF;
 IF v_attempt.status<>'started' THEN RAISE EXCEPTION 'Tentativa encerrada sem resultado'; END IF;
 SELECT c.* INTO v_cert FROM public.certifications c
 JOIN public.exams e ON e.certification_id=c.id WHERE e.id=v_attempt.exam_id;
 IF NOT FOUND THEN RAISE EXCEPTION 'Certificação inexistente'; END IF;
 v_count:=cardinality(v_attempt.question_ids);
 IF v_count IS NULL OR v_count=0 OR v_count<>v_cert.question_count THEN
   RAISE EXCEPTION 'Quantidade inválida de questões na tentativa';
 END IF;
 SELECT count(*),coalesce(sum(q.points),0),
 coalesce(sum(CASE WHEN EXISTS(
   SELECT 1 FROM public.exam_answers a JOIN public.question_options o
    ON o.id=a.selected_option_id AND o.question_id=q.id AND o.is_correct=true
   WHERE a.attempt_id=p_attempt_id AND a.question_id=q.id
 ) THEN q.points ELSE 0 END),0)
 INTO v_question_count,v_weight,v_earned
 FROM public.questions q
 WHERE q.id=ANY(v_attempt.question_ids) AND q.certification_id=v_cert.id
   AND q.kind IN ('multiple_choice','true_false','scenario','interpretation');
 IF v_question_count<>v_count OR v_weight<=0 THEN RAISE EXCEPTION 'Questões incompatíveis com a correção objetiva'; END IF;
 v_score:=round(v_earned*100/v_weight,2);
 v_passed:=v_score>=v_cert.passing_percentage;
 UPDATE public.exam_attempts SET status='finished',submitted_at=now() WHERE id=p_attempt_id;
 INSERT INTO public.results(attempt_id,user_id,score,passed)
 VALUES(p_attempt_id,p_user_id,v_score,v_passed) RETURNING * INTO v_result;
 IF v_passed THEN
   v_code:='CERT-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,16));
   INSERT INTO public.credentials(result_id,user_id,code,public_visible)
   VALUES(v_result.id,p_user_id,v_code,true) RETURNING * INTO v_credential;
 END IF;
 INSERT INTO public.audit_logs(actor_id,action,metadata)
 VALUES(p_user_id,'exam_completed',jsonb_build_object('attempt_id',p_attempt_id,'result_id',v_result.id,'passed',v_passed));
 RETURN jsonb_build_object('score',v_score,'passed',v_passed,'code',v_credential.code,'alreadyFinalized',false);
END;
$$;
REVOKE ALL ON FUNCTION public.finalize_exam_atomic(uuid,uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_exam_atomic(uuid,uuid) TO service_role;
