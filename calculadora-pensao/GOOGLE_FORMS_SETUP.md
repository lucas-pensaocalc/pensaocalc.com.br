# 📝 Configuração do Google Forms - Entry IDs

## 🎯 O Que Fazer

O código já está preparado para enviar dados ao Google Forms, mas você precisa **substituir os Entry IDs** pelos IDs reais do seu formulário.

---

## 📋 PASSO A PASSO PARA PEGAR OS ENTRY IDS

### **1. Preencha o Formulário de Teste**

1. Acesse seu formulário: https://docs.google.com/forms/d/e/1FAIpQLSfqRgW9kNgdYUxPHo4Czt8rjrHSkUfpLm7HXuEakZQ6vy9SZg/viewform

2. **ANTES de preencher**, abra o DevTools:
   - Pressione **F12** (Windows/Linux)
   - Ou **Cmd + Option + I** (Mac)

3. **Vá na aba "Network"** (Rede)

4. **Preencha o formulário** com dados de teste:
   - Nome Completo: Teste
   - Email: teste@teste.com
   - Valor Calculado: R$ 1.000
   - Medida Judicial: Ação de Alimentos
   - Situação Profissional do Pai: CLT
   - Número de Filhos: 1

5. **Clique em "Enviar"**

6. **No DevTools**, procure por uma requisição para `/formResponse`

7. **Clique nela** e vá em "Payload" ou "Carga útil"

8. **Você vai ver algo assim:**
   ```
   entry.123456789: Teste
   entry.987654321: teste@teste.com
   entry.456789123: R$ 1.000
   entry.789123456: Ação de Alimentos
   entry.321654987: CLT
   entry.147258369: 1
   ```

9. **Anote os números** de cada entry!

---

## 🔧 ONDE SUBSTITUIR OS IDS

Abra o arquivo: `client/src/pages/Calculo.tsx`

Procure por esta seção (linha ~272):

```typescript
const ENTRY_IDS = {
  nome: 'entry.XXXXXXX',           // Substitua pelo ID real
  email: 'entry.XXXXXXX',          // Substitua pelo ID real
  whatsapp: 'entry.XXXXXXX',       // Substitua pelo ID real (campo WhatsApp)
  valorCalculado: 'entry.XXXXXXX', // Substitua pelo ID real
  medidaJudicial: 'entry.XXXXXXX', // Substitua pelo ID real
  situacaoProfissional: 'entry.XXXXXXX', // Substitua pelo ID real
  numeroFilhos: 'entry.XXXXXXX',   // Substitua pelo ID real
};
```

**Substitua os `XXXXXXX` pelos números reais que você anotou!**

### **Exemplo:**

Se você descobriu que:
- Nome Completo = entry.123456789
- Email = entry.987654321
- WhatsApp = entry.456789123
- Valor Calculado = entry.789123456
- Medida Judicial = entry.321654987
- Situação Profissional = entry.147258369
- Número de Filhos = entry.258369147

Então ficaria assim:

```typescript
const ENTRY_IDS = {
  nome: 'entry.123456789',
  email: 'entry.987654321',
  whatsapp: 'entry.456789123',
  valorCalculado: 'entry.789123456',
  medidaJudicial: 'entry.321654987',
  situacaoProfissional: 'entry.147258369',
  numeroFilhos: 'entry.258369147',
};
```

---

## ✅ COMO TESTAR SE ESTÁ FUNCIONANDO

1. **Salve as alterações** no arquivo `Calculo.tsx`

2. **Aguarde o site recompilar** (alguns segundos)

3. **Acesse seu site**: pensaocalc.com.br

4. **Preencha a calculadora** com dados de teste

5. **Complete até o final**

6. **Abra a planilha do Google Sheets** vinculada ao formulário

7. **Verifique se apareceu uma nova linha** com os dados!

---

## 🐛 TROUBLESHOOTING

### **Problema: Dados não aparecem na planilha**

**Possíveis causas:**
1. ❌ Entry IDs incorretos → Verifique se copiou os números certos
2. ❌ URL do formulário errada → Confirme se é `/formResponse` e não `/viewform`
3. ❌ Campos do formulário não correspondem → Certifique-se que os nomes dos campos no Google Forms são exatamente esses

### **Problema: Erro no console do navegador**

**Solução:**
- Abra o DevTools (F12)
- Vá na aba "Console"
- Procure por erros relacionados ao Google Forms
- Me mande o erro que eu te ajudo!

---

## 📊 ESTRUTURA DA PLANILHA

Quando funcionar, cada lead vai aparecer assim na planilha:

| Carimbo de data/hora | Nome Completo | Email | WhatsApp | Valor Calculado | Medida Judicial | Situação Profissional | Número de Filhos |
|----------------------|---------------|-------|----------|-----------------|-----------------|----------------------|------------------|
| 19/11/2025 14:30:00 | Maria Silva | maria@email.com | (11) 99999-9999 | R$ 1.200,00 | Ação de Alimentos | CLT | 1 |

---

## 💡 DICA

Se tiver dificuldade para pegar os Entry IDs, você pode:

1. **Usar uma ferramenta online**: [Google Forms Entry ID Finder](https://www.google.com/search?q=google+forms+entry+id+finder)

2. **Ou me chamar** que eu te ajudo passo a passo!

---

## 🚀 PRÓXIMOS PASSOS

Depois de configurar os Entry IDs:

1. ✅ Teste a integração
2. ✅ Verifique se os dados aparecem na planilha
3. ✅ Publique a nova versão do site
4. ✅ Comece a capturar leads!

---

**Qualquer dúvida, me chama!** 😊
