-- Competency structure for all CertificaAI certifications.
-- Apply on a database with initial categories, certifications and question bank already created.
insert into public.competencies(certification_id,name)
select c.id, v.name from public.certifications c
join public.categories cat on cat.id=c.category_id
join (values
 ('excel','Fórmulas e funções'),('excel','Organização e tratamento de dados'),('excel','Análise e visualização'),
 ('inteligencia-artificial','Fundamentos e modelos'),('inteligencia-artificial','Aplicações e automação'),('inteligencia-artificial','Ética, segurança e avaliação'),
 ('marketing-digital','Fundamentos e conteúdo'),('marketing-digital','Campanhas e conversão'),('marketing-digital','Métricas e otimização'),
 ('informatica','Sistemas e produtividade'),('informatica','Redes e infraestrutura'),('informatica','Segurança digital'),
 ('financas','Planejamento e orçamento'),('financas','Matemática e indicadores'),('financas','Investimentos e análise')
) v(category_slug,name) on v.category_slug=cat.slug
where not exists(select 1 from public.competencies k where k.certification_id=c.id and k.name=v.name);
-- Existing pilot question assignments were reviewed at the database level through a heuristic classification.
-- The production migration must receive a reviewed explicit question-to-competency map.
create index if not exists idx_questions_competency on public.questions(competency_id);
