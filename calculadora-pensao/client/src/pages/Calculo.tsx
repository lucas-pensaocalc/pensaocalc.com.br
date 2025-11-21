import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Scale, Lightbulb, Check, X, CheckCircle2 } from "lucide-react";

interface FormData {
  // Pergunta 1
  temPensao: string;
  
  // Pergunta 2 (condicional)
  cumprePagamento: string; // Só aparece se temPensao === "sim"
  paiRegistrou: string; // Só aparece se temPensao === "nao"
  
  // Pergunta 2.5 (condicional - só se cumprePagamento === "nao-paga")
  valorPensaoBaixo: string; // "sim" ou "nao"
  
  // Pergunta 3
  situacaoProfissional: string;
  
  // Pergunta 4
  renda: number;
  rendaDesconhecida: boolean;
  
  // Pergunta 5
  numeroFilhos: number;
  
  // Pergunta 6
  despesas: string[];
  
  // Pergunta 7
  custoMensal: number;
  
  // Pergunta 8 - Cadastro
  nome: string;
  email: string;
  whatsapp: string;
  aceitaTermos: boolean;
}

// Componente de Gatilho Mental
function GatilhoMental({ 
  titulo, 
  descricao, 
  itens, 
  imagem, 
  onContinuar 
}: { 
  titulo: string; 
  descricao?: string; 
  itens: string[]; 
  imagem: string; 
  onContinuar: () => void;
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-montserrat font-bold text-gray-900 mb-2">
            {titulo}
          </h3>
          {descricao && (
            <p className="text-gray-700 mb-4">{descricao}</p>
          )}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <img 
          src={imagem} 
          alt="Gatilho mental" 
          className="w-full h-64 object-cover"
        />
      </div>

      {itens.length > 0 && (
        <div className="space-y-3">
          <p className="font-semibold text-gray-900">Com esse cálculo rápido, você vai descobrir:</p>
          <div className="space-y-2">
            {itens.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold">✅</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-600 italic">
        ⏰ Em menos de 2 minutos, você entende o que muita gente leva anos para descobrir.
      </p>

      <Button onClick={onContinuar} className="w-full">
        Continuar
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

export default function Calculo() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [showGatilho, setShowGatilho] = useState(false);
  const [gatilhoType, setGatilhoType] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    temPensao: "",
    cumprePagamento: "",
    paiRegistrou: "",
    valorPensaoBaixo: "",
    situacaoProfissional: "",
    renda: 0,
    rendaDesconhecida: false,
    numeroFilhos: 1,
    despesas: [],
    custoMensal: 0,
    nome: "",
    email: "",
    whatsapp: "",
    aceitaTermos: false,
  });

  const [emailError, setEmailError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar WhatsApp (11 dígitos)
  const validateWhatsApp = (whatsapp: string): boolean => {
    const numbersOnly = whatsapp.replace(/\D/g, '');
    return numbersOnly.length === 11;
  };

  // Função para formatar WhatsApp
  const formatWhatsApp = (value: string): string => {
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length <= 2) {
      return numbersOnly;
    } else if (numbersOnly.length <= 7) {
      return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`;
    } else {
      return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7, 11)}`;
    }
  };

  // Handler para mudança de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    if (value && !validateEmail(value)) {
      setEmailError("Por favor, insira um e-mail válido");
    } else {
      setEmailError("");
    }
  };

  // Handler para mudança de WhatsApp
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatWhatsApp(value);
    setFormData({ ...formData, whatsapp: formatted });
    
    if (value && !validateWhatsApp(formatted)) {
      setWhatsappError("WhatsApp deve ter 11 dígitos (DDD + número)");
    } else {
      setWhatsappError("");
    }
  };

  // Determinar total de passos baseado no fluxo
  const getTotalSteps = () => {
    // Perguntas base: 1 (tem pensão) + 1 (condicional) + 1 (trabalho) + 1 (renda) + 1 (filhos) + 1 (despesas) + 1 (custo) + 1 (cadastro) = 8
    return 8;
  };

  const totalSteps = getTotalSteps();

  const handleNext = () => {
    // Verificar se precisa mostrar gatilho mental
    const gatilho = checkGatilhoMental();
    if (gatilho) {
      setGatilhoType(gatilho);
      setShowGatilho(true);
      return;
    }

    if (step < totalSteps) {
      const nextStep = getNextStep();
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleGatilhoContinuar = () => {
    setShowGatilho(false);
    if (step < totalSteps) {
      const nextStep = getNextStep();
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const checkGatilhoMental = (): string | null => {
    // Gatilho 1: Após responder cumprimento (valor baixo)
    if (step === 2 && formData.temPensao === "sim" && formData.cumprePagamento === "valor-baixo") {
      return "valor-baixo";
    }

    // Gatilho 2: Após responder cumprimento (não paga)
    if (step === 2 && formData.temPensao === "sim" && formData.cumprePagamento === "nao-paga") {
      return "nao-paga";
    }

    // Gatilho 3: Após responder trabalho registrado
    if (step === 3 && formData.situacaoProfissional === "clt") {
      return "trabalha-registrado";
    }

    // Gatilho 4: Após responder trabalho não registrado/desempregado/desconheço
    if (step === 3 && ["autonomo", "desempregado", "desconheco"].includes(formData.situacaoProfissional)) {
      return "nao-registrado";
    }

    // Gatilho 5: Após responder que pai não registrou
    if (step === 2 && formData.temPensao === "nao" && formData.paiRegistrou === "nao") {
      return "nao-registrou";
    }

    return null;
  };

  const getNextStep = (): number => {
    // Lógica de navegação condicional
    if (step === 1) {
      return 2; // Sempre vai para pergunta 2 (mas o conteúdo muda)
    }
    if (step === 2) {
      return 3; // Pergunta sobre trabalho
    }
    return step + 1;
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Função para enviar dados ao Google Forms
  const enviarParaGoogleForms = async (dados: any) => {
    try {
      // Configurar os entry IDs do Google Forms
      // IMPORTANTE: Substitua pelos IDs reais do seu formulário!
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfqRgW9kNgdYUxPHo4Czt8rjrHSkUfpLm7HXuEakZQ6vy9SZg/formResponse';
      
      const ENTRY_IDS = {
        nome: 'entry.322816722',
        email: 'entry.1563821748',
        whatsapp: 'entry.668132009',
        valorCalculado: 'entry.1884028005',
        medidaJudicial: 'entry.1518811586',
        situacaoProfissional: 'entry.652870165',
        numeroFilhos: 'entry.1284997534',
      };

      // Criar FormData
      const formData = new FormData();
      formData.append(ENTRY_IDS.nome, dados.nome);
      formData.append(ENTRY_IDS.email, dados.email);
      formData.append(ENTRY_IDS.whatsapp, dados.whatsapp);
      formData.append(ENTRY_IDS.valorCalculado, `R$ ${dados.valorCalculado.toFixed(2)}`);
      formData.append(ENTRY_IDS.medidaJudicial, dados.medidaJudicial);
      formData.append(ENTRY_IDS.situacaoProfissional, dados.situacaoProfissional);
      formData.append(ENTRY_IDS.numeroFilhos, dados.numeroFilhos.toString());

      // Enviar para Google Forms (modo no-cors para evitar erro de CORS)
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      console.log('Dados enviados para Google Forms com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar para Google Forms:', error);
      // Não bloquear o fluxo se houver erro
    }
  };

  const handleSubmit = () => {
    // Mostrar loading
    setIsCalculating(true);
    
    // Simular processamento (2 segundos)
    setTimeout(async () => {
      const resultado = calcularPensao();
      const conclusao = determinarConclusao();
      
      const dadosCompletos = {
        ...formData,
        valorCalculado: resultado.valor,
        valorMinimo: resultado.valorMinimo,
        valorMaximo: resultado.valorMaximo,
        explicacao: resultado.explicacao,
        conclusao: conclusao.texto,
        medidaJudicial: conclusao.medida,
        complemento: conclusao.complemento,
      };
      
      // Salvar no localStorage
      localStorage.setItem("calculoPensao", JSON.stringify(dadosCompletos));
      
      // Enviar para Google Forms
      await enviarParaGoogleForms(dadosCompletos);
      
      setLocation("/resultado");
    }, 2500);
  };

  const calcularPensao = () => {
    const rendaBase = formData.rendaDesconhecida ? 1518 : formData.renda;
    
    let percentualMin = 0.20;
    let percentualMax = 0.30;
    
    if (formData.numeroFilhos === 2) {
      percentualMin = 0.30;
      percentualMax = 0.40;
    } else if (formData.numeroFilhos >= 3) {
      percentualMin = 0.40;
      percentualMax = 0.50;
    }
    
    let valorMin = rendaBase * percentualMin;
    let valorMax = rendaBase * percentualMax;
    
    // Ajuste baseado em despesas
    if (formData.despesas.length >= 4) {
      valorMin = valorMin * 1.1;
      valorMax = valorMax * 1.15;
    }
    
    // Considerar custo mensal informado
    if (formData.custoMensal > 0) {
      if (formData.custoMensal > valorMax) {
        valorMax = Math.min(formData.custoMensal, rendaBase * 0.50);
      }
      if (formData.custoMensal < valorMin) {
        valorMin = Math.max(formData.custoMensal * 0.8, rendaBase * percentualMin);
      }
    }
    
    const valorMinimo = Math.round(valorMin);
    const valorMaximo = Math.round(valorMax);
    const valor = Math.round((valorMin + valorMax) / 2);
    
    const explicacao = `O cálculo foi baseado no **binômio necessidade-possibilidade**, princípio fundamental do direito de família brasileiro. Consideramos ${formData.rendaDesconhecida ? "o salário mínimo (R$ 1.518,00)" : `a renda informada de R$ ${rendaBase.toLocaleString("pt-BR")}`}, o número de filhos (${formData.numeroFilhos}), as despesas da criança e os percentuais praticados pelos tribunais brasileiros.`;
    
    return { valor, valorMinimo, valorMaximo, explicacao };
  };

  const determinarConclusao = () => {
    const resultado = calcularPensao();
    const trabalhaRegistrado = formData.situacaoProfissional === "clt";
    
    // Conclusão 01 - Fixação com trabalho registrado
    if (formData.temPensao === "nao" && formData.paiRegistrou === "sim" && trabalhaRegistrado) {
      return {
        medida: "Ação de Alimentos",
        texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}.`,
        complemento: "Como ele trabalha registrado, é possível pedir ao juiz uma liminar para que logo no início do processo haja o desconto direto na folha, e o valor caia diretamente na sua conta."
      };
    }

    // Conclusão 02 - Fixação sem trabalho registrado
    if (formData.temPensao === "nao" && formData.paiRegistrou === "sim" && !trabalhaRegistrado) {
      return {
        medida: "Ação de Alimentos",
        texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}.`,
        complemento: "Fique tranquila, mesmo que ele não trabalhe registrado, é possível descobrir a renda dele e a obrigação de pagar a pensão alimentícia segue a mesma!"
      };
    }

    // Conclusão 03 - Revisão de pensão (paga mas valor baixo)
    if (formData.temPensao === "sim" && formData.cumprePagamento === "valor-baixo") {
      const complemento = trabalhaRegistrado 
        ? "Como ele trabalha registrado, é possível pedir liminar para que logo no início do processo haja o desconto direto na folha de pagamento, e o valor caia diretamente na sua conta."
        : "Fique tranquila, mesmo que ele não trabalhe registrado, é possível descobrir a verdadeira renda dele através de requerimentos judiciais.";
      
      return {
        medida: "Ação Revisional de Alimentos",
        texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}. Portanto, caso o valor que receba hoje seja inferior a quantia acima, você pode ter direito a uma revisão para aumento do valor da pensão.`,
        complemento
      };
    }

    // Conclusão 04 - Só Cobrança (não paga mas valor justo)
    if (formData.temPensao === "sim" && formData.cumprePagamento === "nao-paga" && formData.valorPensaoBaixo === "nao") {
      const complemento = trabalhaRegistrado 
        ? "Como ele trabalha registrado, é possível pedir liminar para que logo no início do processo haja o desconto direto na folha de pagamento, e o valor caia diretamente na sua conta."
        : "Fique tranquila, mesmo que ele não trabalhe registrado, é possível descobrir a verdadeira renda dele através de requerimentos judiciais.";
      
      return {
        medida: "Ação de Execução de Alimentos",
        texto: `📊 Como você já tem pensão determinada pelo juiz e ele não está pagando corretamente, é possível cobrar todos os valores atrasados, sob pena de prisão civil e penhora de bens. O valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}.`,
        complemento
      };
    }

    // Conclusão 05 - Revisão + Cobrança (não paga e valor baixo)
    if (formData.temPensao === "sim" && formData.cumprePagamento === "nao-paga" && formData.valorPensaoBaixo === "sim") {
      const complemento = trabalhaRegistrado 
        ? "Como ele trabalha registrado, é possível pedir liminar para que logo no início do processo haja o desconto direto na folha de pagamento, e o valor caia diretamente na sua conta."
        : "Fique tranquila, mesmo que ele não trabalhe registrado, é possível descobrir a verdadeira renda dele através de requerimentos judiciais.";
      
      return {
        medida: "Ação de Execução de Alimentos + Revisional",
        texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}. Portanto, caso o valor que receba hoje seja inferior a quantia acima, você pode ter direito a uma revisão para aumento do valor da pensão. Além disso, como você já tem pensão determinada pelo juiz e ele não está pagando corretamente, é possível cobrar todos os valores atrasados, sob pena de prisão civil e penhora de bens.`,
        complemento
      };
    }

    // Conclusão 06 - Investigação de paternidade + Fixação
    if (formData.temPensao === "nao" && formData.paiRegistrou === "nao") {
      const complemento = trabalhaRegistrado 
        ? "Como ele trabalha registrado, é possível pedir para que haja o desconto da pensão direto na folha de pagamento do pai, e o valor caia diretamente na sua conta."
        : "Fique tranquila, mesmo que ele não trabalhe registrado, é possível descobrir a renda dele e a obrigação de pagar a pensão alimentícia segue a mesma!";
      
      return {
        medida: "Ação de Investigação de Paternidade c/c Alimentos",
        texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}. Considerando que a paternidade não foi reconhecida, será necessário pedir o reconhecimento judicial da paternidade para que a pensão seja estabelecida pelo juiz.`,
        complemento
      };
    }

    // Fallback
    return {
      medida: "Ação de Alimentos",
      texto: `📊 Com base nas suas respostas, o valor estimado da pensão pode variar entre R$ ${resultado.valorMinimo.toLocaleString("pt-BR")} e R$ ${resultado.valorMaximo.toLocaleString("pt-BR")}.`,
      complemento: ""
    };
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.temPensao !== "";
      case 2:
        if (formData.temPensao === "sim") {
          return formData.cumprePagamento !== "";
        } else {
          return formData.paiRegistrou !== "";
        }
      case 3:
        return formData.situacaoProfissional !== "";
      case 4:
        return formData.rendaDesconhecida || formData.renda > 0;
      case 5:
        return formData.numeroFilhos > 0;
      case 6:
        return formData.despesas.length > 0;
      case 7:
        return formData.custoMensal > 0;
      case 8:
        return formData.nome && 
               formData.email && validateEmail(formData.email) && 
               formData.whatsapp && validateWhatsApp(formData.whatsapp) && 
               formData.aceitaTermos;
      default:
        return false;
    }
  };

  const progress = (step / totalSteps) * 100;

  // Renderizar tela de loading durante cálculo
  if (isCalculating) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 to-accent/10">
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <span className="font-montserrat font-bold text-xl text-foreground">Calculadora de Pensão</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Scale className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground">Calculando seu resultado...</h2>
            
            <p className="text-muted-foreground">
              Estamos analisando suas informações com base nas leis brasileiras e na jurisprudência dos tribunais.
            </p>

            <div className="space-y-2">
              <Progress value={33} className="h-2" />
              <p className="text-sm text-muted-foreground">Processando dados...</p>
            </div>

            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Analisando renda e despesas
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Aplicando binômio necessidade-possibilidade
              </p>
              <p className="flex items-center justify-center gap-2 animate-pulse">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Determinando medida judicial cabível
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Renderizar gatilho mental se necessário
  if (showGatilho) {
    let gatilhoContent = {
      titulo: "",
      descricao: "",
      itens: [] as string[],
      imagem: ""
    };

    switch (gatilhoType) {
      case "valor-baixo":
        gatilhoContent = {
          titulo: "Você sabia que a maioria das mães no Brasil não recebem o valor correto da pensão?",
          descricao: "Além disso, muitas nem sabem que podem pedir revisão para aumentar o valor!",
          itens: [
            "O valor aproximado que seu filho tem direito por mês",
            "Se é possível pedir revisão (aumento) da pensão",
            "E o que fazer se ele parou de pagar ou nunca ajudou"
          ],
          imagem: "/familia-balanca.jpg"
        };
        break;
      case "nao-paga":
        gatilhoContent = {
          titulo: "Você sabia que a maioria das mães no Brasil não recebem corretamente a pensão?",
          descricao: "Além disso, muitas nem sabem que podem pedir a prisão, penhora de bens e desconto da pensão direto da folha de pagamento (caso trabalhe registrado).",
          itens: [
            "O valor aproximado que seu filho tem direito por mês",
            "Se é possível cobrar a pensão com pedido de prisão e penhora de bens",
            "Se é possível exigir o desconto da pensão direto em folha de pagamento"
          ],
          imagem: "/gatilho-2.jpg"
        };
        break;
      case "trabalha-registrado":
        gatilhoContent = {
          titulo: "ÓTIMO! Você sabia que se o pai trabalha de carteira assinada você tem direito de receber a pensão do seu filho descontado direto da folha de pagamento na sua conta?",
          descricao: "A maioria das mães não sabem disso e esperam a boa vontade do pai de pagar ou não a pensão.",
          itens: [
            "O valor aproximado que seu filho tem direito por mês",
            "Se é possível exigir o desconto da pensão direto em folha de pagamento",
            "E o que fazer se ele parou de pagar ou nunca ajudou"
          ],
          imagem: "/gatilho-3.jpg"
        };
        break;
      case "nao-registrado":
        gatilhoContent = {
          titulo: "Fique tranquila, mesmo o pai desempregado ou não trabalhando registrado é possível descobrir a verdadeira fonte de renda dele e a obrigação de pagar a pensão alimentícia segue a mesma!",
          descricao: "",
          itens: [],
          imagem: "/gatilho-4.jpg"
        };
        break;
      case "nao-registrou":
        gatilhoContent = {
          titulo: "Mesmo sem o nome do pai na certidão, a lei está do seu lado.",
          descricao: "Mesmo que o pai nunca tenha reconhecido o filho oficialmente, você pode pedir a investigação de paternidade junto com a pensão. E o melhor: o exame de DNA é gratuito em muitos casos. Por isso é tão importante continuar o cálculo — ele vai te mostrar o caminho certo para o seu caso.",
          itens: [],
          imagem: "/gatilho-2.jpg"
        };
        break;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Scale className="w-6 h-6" />
              <span className="font-montserrat font-bold text-xl">Calculadora de Pensão</span>
            </button>
          </div>
        </header>

        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Passo {step} de {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <GatilhoMental
              titulo={gatilhoContent.titulo}
              descricao={gatilhoContent.descricao}
              itens={gatilhoContent.itens}
              imagem={gatilhoContent.imagem}
              onContinuar={handleGatilhoContinuar}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Scale className="w-6 h-6" />
            <span className="font-montserrat font-bold text-xl">Calculadora de Pensão</span>
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Passo {step} de {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Você já tem pensão determinada pelo juiz?
                </h2>
                <p className="text-gray-600">
                  Essa informação nos ajuda a entender se você precisa fixar, revisar ou cobrar a pensão.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, temPensao: "sim" })}
                  className={`w-full flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer ${
                    formData.temPensao === "sim" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.temPensao === "sim" ? "border-primary" : "border-gray-300"
                  }`}>
                    {formData.temPensao === "sim" && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Sim</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, temPensao: "nao" })}
                  className={`w-full flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer ${
                    formData.temPensao === "nao" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.temPensao === "nao" ? "border-primary" : "border-gray-300"
                  }`}>
                    {formData.temPensao === "nao" && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-medium">Não</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && formData.temPensao === "sim" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  O pai está cumprindo corretamente com o pagamento da pensão?
                </h2>
                <p className="text-gray-600">
                  Essa informação é crucial para determinar se você precisa apenas revisar o valor ou também cobrar os atrasados.
                </p>
              </div>

              <RadioGroup
                value={formData.cumprePagamento}
                onValueChange={(value) => setFormData({ ...formData, cumprePagamento: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="valor-baixo" id="cumpre-baixo" />
                  <Label htmlFor="cumpre-baixo" className="flex-1 cursor-pointer">
                    Sim, mas o valor está muito baixo
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="nao-paga" id="cumpre-nao" />
                  <Label htmlFor="cumpre-nao" className="flex-1 cursor-pointer">
                    Não, ele parou de pagar ou não paga direito
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && formData.temPensao === "sim" && formData.cumprePagamento === "nao-paga" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  O valor da pensão está baixo?
                </h2>
                <p className="text-gray-600">
                  Essa informação é importante para determinar se você precisa apenas cobrar os atrasados ou também pedir revisão para aumentar o valor.
                </p>
              </div>

              <RadioGroup
                value={formData.valorPensaoBaixo}
                onValueChange={(value) => setFormData({ ...formData, valorPensaoBaixo: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="sim" id="valor-baixo-sim" />
                  <Label htmlFor="valor-baixo-sim" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Sim, o valor da pensão é muito baixo
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="nao" id="valor-justo" />
                  <Label htmlFor="valor-justo" className="flex-1 cursor-pointer flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    Não, o valor é justo
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && formData.temPensao === "nao" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  O pai registrou a criança?
                </h2>
                <p className="text-gray-600">
                  Mesmo sem registro, é possível pedir pensão através de investigação de paternidade.
                </p>
              </div>

              <RadioGroup
                value={formData.paiRegistrou}
                onValueChange={(value) => setFormData({ ...formData, paiRegistrou: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="sim" id="registro-sim" />
                  <Label htmlFor="registro-sim" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="nao" id="registro-nao" />
                  <Label htmlFor="registro-nao" className="flex-1 cursor-pointer flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    Não
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  O pai trabalha registrado?
                </h2>
                <p className="text-gray-600">
                  Essa informação ajuda a determinar a capacidade de pagamento.
                </p>
              </div>

              <RadioGroup
                value={formData.situacaoProfissional}
                onValueChange={(value) => setFormData({ ...formData, situacaoProfissional: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="clt" id="prof-clt" />
                  <Label htmlFor="prof-clt" className="flex-1 cursor-pointer">
                    Sim, com carteira assinada
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="autonomo" id="prof-autonomo" />
                  <Label htmlFor="prof-autonomo" className="flex-1 cursor-pointer">
                    Não, trabalha autônomo
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="desempregado" id="prof-desempregado" />
                  <Label htmlFor="prof-desempregado" className="flex-1 cursor-pointer">
                    Não, está desempregado
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="desconheco" id="prof-desconheco" />
                  <Label htmlFor="prof-desconheco" className="flex-1 cursor-pointer">
                    Desconheço
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Qual a renda mensal aproximada que ele recebe?
                </h2>
                <p className="text-gray-600">
                  Se não souber o valor exato, faça uma estimativa. Esta informação é crucial para a precisão do cálculo.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="renda" className="text-base font-medium">
                    Renda mensal (R$)
                  </Label>
                  <Input
                    id="renda"
                    type="number"
                    placeholder="Ex: 3000"
                    value={formData.renda || ""}
                    onChange={(e) => setFormData({ ...formData, renda: Number(e.target.value), rendaDesconhecida: false })}
                    disabled={formData.rendaDesconhecida}
                    className="mt-2 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Dica: Considere salário, comissões, bônus e outras fontes de renda.
                  </p>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="desconheco-renda"
                    checked={formData.rendaDesconhecida}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, rendaDesconhecida: checked as boolean, renda: 0 })
                    }
                  />
                  <Label htmlFor="desconheco-renda" className="cursor-pointer">
                    Desconheço a renda dele
                  </Label>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Quantos filhos dependem dessa pensão?
                </h2>
                <p className="text-gray-600">
                  O número de filhos influencia diretamente no percentual da pensão.
                </p>
              </div>

              <RadioGroup
                value={formData.numeroFilhos.toString()}
                onValueChange={(value) => setFormData({ ...formData, numeroFilhos: Number(value) })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="1" id="filhos-1" />
                  <Label htmlFor="filhos-1" className="flex-1 cursor-pointer">
                    1
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="2" id="filhos-2" />
                  <Label htmlFor="filhos-2" className="flex-1 cursor-pointer">
                    2
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="3" id="filhos-3" />
                  <Label htmlFor="filhos-3" className="flex-1 cursor-pointer">
                    3 ou mais
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Quais são as principais despesas da criança?
                </h2>
                <p className="text-gray-600">
                  Selecione todas as despesas que você tem. Isso ajuda a validar o cálculo.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "escola", label: "Escola / Mensalidade" },
                  { id: "saude", label: "Plano de Saúde" },
                  { id: "atividades", label: "Atividades Extracurriculares (esportes, cursos)" },
                  { id: "moradia", label: "Moradia (Aluguel, condomínio)" },
                  { id: "especiais", label: "Necessidades Especiais (medicamentos, terapia)" },
                  { id: "outros", label: "Outros (transporte, lazer, etc.)" },
                ].map((despesa) => (
                  <div
                    key={despesa.id}
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                  >
                    <Checkbox
                      id={despesa.id}
                      checked={formData.despesas.includes(despesa.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, despesas: [...formData.despesas, despesa.id] });
                        } else {
                          setFormData({
                            ...formData,
                            despesas: formData.despesas.filter((d) => d !== despesa.id),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={despesa.id} className="flex-1 cursor-pointer">
                      {despesa.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Somando tudo, quanto você gasta por mês com a criança?
                </h2>
                <p className="text-gray-600">
                  Faça uma estimativa considerando alimentação, roupas, educação, saúde e lazer.
                </p>
              </div>

              <div>
                <Label htmlFor="custo" className="text-base font-medium">
                  Custo mensal (R$)
                </Label>
                <Input
                  id="custo"
                  type="number"
                  placeholder="Ex: 1500"
                  value={formData.custoMensal || ""}
                  onChange={(e) => setFormData({ ...formData, custoMensal: Number(e.target.value) })}
                  className="mt-2 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Dica: Some todas as despesas mensais fixas e variáveis.
                </p>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-2">
                  Estamos quase lá!
                </h2>
                <p className="text-gray-600">
                  Seu cálculo personalizado está sendo preparado. Para receber o resultado detalhado e a oferta especial do ebook, informe seus dados.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome completo *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Melhor e-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`mt-2 ${emailError ? 'border-red-500' : ''}`}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp com DDD *</Label>
                  <Input
                    id="whatsapp"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handleWhatsAppChange}
                    maxLength={15}
                    className={`mt-2 ${whatsappError ? 'border-red-500' : ''}`}
                  />
                  {whatsappError && (
                    <p className="text-sm text-red-500 mt-1">{whatsappError}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="termos"
                    checked={formData.aceitaTermos}
                    onCheckedChange={(checked) => setFormData({ ...formData, aceitaTermos: checked as boolean })}
                  />
                  <Label htmlFor="termos" className="text-sm leading-relaxed cursor-pointer">
                    Eu concordo em receber comunicações e aceito a Política de Privacidade. Seus dados estão seguros e não serão compartilhados.
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="ml-auto flex items-center gap-2"
            >
              {step === totalSteps ? "Ver Meu Resultado" : "Próximo"}
              {step < totalSteps && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
