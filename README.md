# CertificaAI — SaaS de certificação de conhecimentos

Frontend estático com Next.js no GitHub Pages e backend no Supabase (Auth + PostgreSQL + Edge Functions).

## Ambiente de validação
- 15 provas disponíveis nas cinco áreas: Excel, Inteligência Artificial, Marketing Digital, Informática e Finanças.
- 150 questões objetivas iniciais, 10 em cada prova, duração típica de 20 minutos (Excel Básico: 15 min), aprovação com 70%.
- Até três tentativas por usuário em cada prova.
- Cronômetro, marcação de revisão, histórico e salvamento de respostas.
- Correção no Supabase Edge Function `exam-engine`, sem exposição do gabarito na interface.
- Emissão de credenciais aprovadas, QR Code, consulta pública por código e impressão/salvar como PDF pelo navegador.
- Privacidade do nome na consulta pública configurável em Minha conta.
- Administração de parâmetros, publicação e cadastro de questões, restrita a administrador autorizado.

## Segurança e limitações importantes
Este é um **piloto de validação**. As questões ainda precisam de auditoria pedagógica profissional e de uma expansão do banco para ter variedade real a cada tentativa. Não equivale a diploma oficial ou reconhecimento MEC. Não há pagamento nesta versão.

A geração de PDF utiliza a função de impressão do navegador e não um serviço de assinatura digital ou PDF assinado no backend. A integridade e a autenticidade do registro são verificadas online pelo código; isto não constitui assinatura eletrônica qualificada. Não há antifraude avançada/proctoring, bloqueio de abas, nem correção discursiva. Há três tentativas por avaliação.

O banco e as funções do Supabase são a fonte de verdade; nunca colocar `service_role` no browser. As tabelas `questions` e `question_options` são inacessíveis aos participantes pela API. A área administrativa confere permissão no servidor.

## Execução
```bash
npm install
npm run build
```
O GitHub Actions publica a pasta `out/` automaticamente em push no branch `main`.

## Infraestrutura
- [Site](https://chagasguilherme7-alt.github.io/certificaai/)
- [GitHub](https://github.com/chagasguilherme7-alt/certificaai)
- [Supabase](https://supabase.com/dashboard/project/vnktbikulnjazhfpmbdu)
- Funções Edge: `exam-engine`, `verify-credential`.

### Próximas fases
- Ampliar questões e competências com revisão independente, banco parametrizado e tentativas aleatórias equilibradas.
- Integridade transacional de conclusão de prova, retries, limites e auditoria antifraude.
- Feedback por competência, perfis profissionais compartilháveis, gestão de revogação e certificados gerados em PDF no backend.
- Testes automatizados de isolamento, correção, emissão e UX.
