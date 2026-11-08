# CertificaAI · MVP piloto

Plataforma de certificação com hospedagem estática em GitHub Pages e backend Supabase.

## Funcionalidades disponíveis
- Cadastro e login Supabase Auth.
- Catálogo com 15 certificações; **somente Excel Básico** habilitado como piloto.
- Prova de 10 questões, 15 minutos, nota mínima de 70%; uma tentativa por usuário.
- Respostas corretas protegidas em tabelas RLS; correção executada por Supabase Edge Function.
- Emissão automática de credencial no banco para aprovados.
- Visualização da credencial, QR Code, impressão/salvar como PDF pelo navegador e verificação pública por código.

## Importante
Este piloto usa questões introdutórias preparadas para testes; antes de oferecer certificação profissional em escala, recomenda-se revisão pedagógica independente, testes de segurança e antifraude. A emissão do arquivo PDF ocorre no navegador via impressão, não em serviço de PDF do backend. Revogação está prevista no modelo de dados, mas ainda não tem interface administrativa. Provas discursivas, análise por competências, passaporte público e 14 certificações permanecem em desenvolvimento. Sem pagamentos.

## Infraestrutura
GitHub Pages: https://chagasguilherme7-alt.github.io/certificaai/
Supabase: https://supabase.com/dashboard/project/vnktbikulnjazhfpmbdu
Edge Functions: exam-engine, verify-credential.

## Desenvolvimento
`npm install`, `npm run dev`. O workflow do GitHub Actions executa build e faz deploy da pasta `out`.

Nunca exponha a chave service_role no frontend.
