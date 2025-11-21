# Project TODO

## Fase 1: Configuração Inicial
- [x] Configurar paleta de cores no index.css (Azul Petróleo #0D7377, Turquesa #14FFEC)
- [x] Configurar tipografia (Montserrat para títulos, Open Sans para corpo)
- [x] Adicionar logo do escritório
- [x] Criar componentes base reutilizáveis

## Fase 2: Landing Page
- [x] Hero Section com CTA principal
- [x] Seção de Problema (conexão emocional)
- [x] Seção de Agitação (consequências)
- [x] Seção de Solução (apresentação da ferramenta)
- [x] Seção de Prova Social (depoimentos)
- [x] Seção de Oferta (ebook + consultoria)
- [x] FAQ (remoção de objeções)
- [x] CTA Final
- [x] Footer profissional

## Fase 3: Formulário Interativo
- [x] Estrutura multi-etapas com barra de progresso
- [x] Pergunta 1: Situação atual da pensão
- [x] Pergunta 2: Situação profissional do pai
- [x] Pergunta 3: Estimativa de renda (condicional)
- [x] Pergunta 4: Número de filhos
- [x] Pergunta 5: Despesas da criança
- [x] Pergunta 6: Custo de vida mensal
- [x] Pergunta 7: Cadastro para resultado (lead capture)
- [x] Lógica de cálculo baseada nas regras brasileiras
- [x] Validação de campos
- [x] Animações de transição entre etapas

## Fase 4: Página de Resultado
- [x] Exibição do valor calculado com destaque
- [x] Explicação do cálculo
- [x] Botão para compra do ebook (R$ 47,90)
- [x] Oferta de consultoria grátis ao comprar
- [x] Próximos passos recomendados
- [x] Aviso legal

## Melhorias e Ajustes
- [ ] Responsividade mobile
- [ ] Otimização de performance
- [ ] Testes de conversão
- [ ] Ajustes de copy conforme feedback


## Ajustes Solicitados
- [x] Alterar oferta: Ebook custa R$ 47,90 (não é gratuito)
- [x] Consultoria de 15 min é presente ao comprar o ebook
- [x] Atualizar seção de oferta na landing page
- [x] Atualizar página de resultado com botão de compra do ebook
- [x] Adicionar preço e call-to-action de venda


## Correções Urgentes
- [x] Corrigir lógica de navegação do formulário (bug no passo 3)
- [x] Garantir que todos os 7 passos sejam exibidos sequencialmente
- [x] Remover lógica condicional que pula etapas
- [x] Testar fluxo completo do formulário
- [x] Validar que cadastro sempre aparece antes do resultado


## Ajustes no Formulário (Solicitação do Cliente)
- [x] Analisar quiz original para capturar sequência exata de perguntas
- [x] Ajustar formulário para seguir mesma linha de perguntas do site original
- [x] Adicionar opção "Desconheço" na pergunta de renda
- [x] Implementar lógica: se "Desconheço", calcular baseado no salário mínimo atual (R$ 1.518,00)
- [x] Manter perguntas sobre gastos da criança (credibilidade)
- [x] Testar fluxo completo com nova estrutura


## Correções Críticas Solicitadas
- [x] Corrigir texto da pergunta 1: adicionar "ou cobrar" → "fixar, revisar ou cobrar a pensão"
- [x] Adicionar pergunta crucial: "O pai está cumprindo corretamente com o pagamento da pensão?"
- [x] Implementar fluxo condicional: Se JÁ TEM PENSÃO → pular pergunta de registro da criança
- [x] Analisar profundamente o site original para capturar fluxo correto
- [x] Adicionar medida judicial cabível no resultado (Ação de Alimentos, Revisional, Execução, etc.)
- [x] Inserir gatilhos mentais com imagens entre as perguntas para engajamento
- [x] Ler arquivos com sugestões de gatilhos mentais
- [x] Implementar lógica para determinar tipo de ação judicial baseado nas respostas
- [x] Testar fluxo completo com todas as condições e gatilhos


## Melhorias Finais Solicitadas
- [x] Adicionar frase "Com esse cálculo rápido, você vai descobrir:" nos gatilhos mentais
- [x] Remover texto "usaremos o salário mínimo como base" do checkbox Desconheço
- [x] Trocar imagem do gatilho mental pela imagem de família com balança
- [x] Adicionar ícones interativos: Check verde ✓ para "Sim" e X vermelho ✗ para "Não"
- [x] Adicionar nova pergunta condicional: "O valor da pensão está baixo?" (quando NÃO cumpre pagamento)
- [x] Opções: "Não, o valor é justo" OU "Sim, o valor da pensão é muito baixo"
- [x] Ajustar conclusão: Se valor NÃO baixo → Execução (só cobrança)
- [x] Ajustar conclusão: Se valor SIM baixo → Execução + Revisional (cobrança + aumento)
- [x] Testar novo fluxo completo


## Otimizações de Conversão (Solicitação do Cliente)
- [x] Corrigir ícones na pergunta "O valor da pensão está baixo?": Sim = Check verde (em cima), Não = X vermelho (embaixo)
- [x] Reescrever landing page com copy persuasiva que quebra objeções e gera concordância
- [x] Adicionar elementos gráficos na landing page (ícones, badges, depoimentos visuais)
- [x] Botão "Calcular Agora" em todas as seções da landing page (sticky ou repetido)
- [x] Ajustar preço do ebook: R$ 47,00 (não R$ 47,90)
- [x] Atualizar nome do ebook: "O passo a passo para receber a pensão do seu filho todos os meses"
- [x] Reforçar venda no resultado: enfatizar valor simbólico + bônus videochamada como grande valor
- [x] Adicionar ícone de presente 🎁 no bônus da videochamada
- [x] Posicionar botão de checkout logo no topo da página de resultado
- [x] Revisar textos para conformidade com regras da OAB (sem promessas de resultado)
- [x] Testar fluxo completo de conversão


## Correções Finais
- [x] Remover "ou fazer cadastro prévio" do FAQ da landing page
- [x] Remover item 3 "Tente acordo amigável primeiro" da seção Próximos Passos


## Correções de UX e Conformidade OAB
- [x] Reduzir tamanho do botão final "Calcular Valor da Pensão Agora - 100% Grátis" para mobile
- [x] Corrigir primeira pergunta: permitir clicar em todo o card, não só na bolinha
- [x] Adicionar frase referencial antes dos 3 itens de identificação
- [x] Remover "consultoria gratuita" e termos proibidos pela OAB
- [x] Substituir texto do bônus por "orientação técnica de até 15 minutos"
- [x] Remover "para cobrir custos de produção"
- [x] Remover preço riscado da consultoria (R$ 150,00)
- [x] Adicionar timer/urgência: "Vagas limitadas para orientação técnica"


## Correção de Conteúdo do Ebook
- [x] Remover item "Modelos de documentos e orientações práticas" da lista de benefícios do ebook


## Melhorias nos Botões de CTA
- [x] Padronizar tamanho de todos os botões "Calcular Agora" na landing page
- [x] Adicionar efeitos visuais (sombra, hover, scale)
- [x] Implementar animação pulse nos botões principais
- [x] Garantir contraste adequado e aparência "clicável"
- [x] Adicionar ícones nos botões para reforçar ação


## Correções de Responsividade e Estatísticas
- [x] Reduzir tamanho do botão "Sim, Quero Garantir Meu Acesso Agora" para mobile
- [x] Reduzir tamanho do botão "Vagas Limitadas para Orientação Técnica" para mobile
- [x] Atualizar "+ 500 mães" para "+ 15.000 mães" no footer da página de resultado


## Ajuste de Estatísticas
- [x] Alterar "15.000 mães" para "1.000 mães" na landing page (Home.tsx)
- [x] Alterar "15.000 mães" para "1.000 mães" na página de resultado (Resultado.tsx)


## Simplificação de Copy
- [x] Simplificar frase do hero: remover "baseado nas leis brasileiras" e deixar apenas "Cálculo gratuito e personalizado"
