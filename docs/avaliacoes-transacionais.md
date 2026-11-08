# Correção e emissão atômicas — CertificaAI

A finalização foi migrada para a função PostgreSQL `public.finalize_exam_atomic`. Ela mantém todo o processo no mesmo commit (bloqueio da tentativa, leitura das respostas, cálculo da nota, registro do resultado, criação da credencial e auditoria). Em caso de erro, as alterações são revertidas.

## Autorizações
- `exam-engine` valida a sessão via `auth.getUser(jwt)` e utiliza o UUID validado.
- A RPC só está disponível para `service_role` — nunca para `anon` ou `authenticated`.
- O frontend não envia nota, status de aprovação ou código de certificado.
- Repetir `finish` de uma tentativa já concluída devolve o resultado existente (idempotência).
- Ao abrir uma avaliação, o servidor conclui eventuais tentativas expiradas antes de permitir nova tentativa.

## Limitações e próximas melhorias
- O gabarito não é enviado ao navegador antes da correção.
- A transação impede resultados parciais, mas o salvamento das respostas ainda precisa ser serializado com a finalização para eliminar corridas em requisições simultâneas.
- As configurações atuais têm 10 questões por certificação e 3 tentativas, adequadas somente a testes piloto.
- Corrigir notas de questões discursivas, análise por competência e emissão assinada de PDF ainda não estão concluídos.
- Executar testes reais com usuários e relatório do GitHub Actions antes do lançamento público.

## Testes
`supabase/tests/transactional-finalization.sql` contém verificações seguras de privilégios, dados e idempotência.
