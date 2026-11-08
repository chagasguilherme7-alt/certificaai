-- Consistency checks for CertificaAI data. Run using a trusted SQL editor.
do $$
declare v int;
begin
 select count(*) into v from public.questions where competency_id is null;
 if v>0 then raise exception '% questions are missing competencies',v; end if;
 select count(*) into v from (
 select q.id from public.questions q left join public.question_options o on o.question_id=q.id
 group by q.id having count(o.id) <> 4 or count(o.id) filter(where o.is_correct) <> 1
 ) invalid;
 if v>0 then raise exception '% questions have invalid options',v; end if;
 select count(*) into v from public.competencies;
 if v<45 then raise exception 'Expected at least 45 competencies; got %',v; end if;
end;
$$;
