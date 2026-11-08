-- Safe regression checks; do not change stored results.
DO $$
DECLARE v_function oid;
BEGIN
 SELECT p.oid INTO v_function FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
 WHERE n.nspname='public' AND p.proname='finalize_exam_atomic';
 IF v_function IS NULL THEN RAISE EXCEPTION 'Atomic grading function missing'; END IF;
 IF has_function_privilege('anon',v_function,'EXECUTE')
 OR has_function_privilege('authenticated',v_function,'EXECUTE') THEN
   RAISE EXCEPTION 'Public access to privileged grading function';
 END IF;
 IF NOT has_function_privilege('service_role',v_function,'EXECUTE') THEN
   RAISE EXCEPTION 'Service role cannot finalize an exam';
 END IF;
 IF EXISTS(SELECT 1 FROM public.results r JOIN public.credentials c ON c.result_id=r.id WHERE r.passed=false) THEN
   RAISE EXCEPTION 'Unapproved result has a credential';
 END IF;
END
$$;
-- Test the idempotent response using an already finished attempt only.
SELECT public.finalize_exam_atomic(a.id,a.user_id) AS idempotent_response
FROM public.exam_attempts a
WHERE a.status='finished'
AND EXISTS (SELECT 1 FROM public.results r WHERE r.attempt_id=a.id)
LIMIT 1;
