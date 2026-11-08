# Relatórios por competência e atualização visual

## O que foi implementado
- Estrutura de 45 competências distribuídas nas 15 certificações.
- Associação das 180 questões existentes às competências temáticas.
- Edge Function `performance-report`: recebe o ID de uma tentativa concluída, verifica o JWT com Supabase Auth e comprova que a tentativa pertence ao usuário autenticado.
- O relatório retorna nota, aprovação, desempenho percentual por competência, quantidades de acertos, pontos fortes e assuntos a revisar.
- Interfaces em `/relatorio/?tentativa=<uuid>`, histórico e página de resultado.
- Landing page reformulada, cartões de categorias, destaque de certificados, responsividade, novas cores e painel com boas hierarquias tipográficas.

## Limitações
- Esta é uma **classificação temática inicial** feita com base nos enunciados; precisa de validação pedagógica por especialista antes de alegar competência comprovada com rigor estatístico.
- O banco ainda é piloto: 12 questões por certificação, com 10 selecionadas para cada prova.
- A seleção aleatória não força distribuição equilibrada por competência; a distribuição no relatório reflete apenas as questões efetivamente sorteadas.
- Nenhum gabarito é enviado ao navegador, nem sequer após o resultado. O cálculo de acertos é feito em Edge Function com consulta no servidor.
- Não há promessas de reconhecimento pelo MEC. O projeto emite certificações privadas de conhecimento.

## Rotas
- `/`: nova página inicial.
- `/catalogo/`: avaliações.
- `/dashboard/`: painel.
- `/historico/`: resultados anteriores.
- `/relatorio/?tentativa=<uuid>`: análise detalhada de uma tentativa já encerrada.

## Antes do lançamento
Executar testes integrados autenticados e confirmar que o GitHub Actions publica o último commit; revisar pedagogicamente o banco e aumentar a diversidade de questões. Habilitar proteção de senhas vazadas no Supabase Auth quando disponível.
