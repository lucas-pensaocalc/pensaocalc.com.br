import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO } from "@/const";
import { 
  CheckCircle2, FileText, Calendar, ArrowRight, Sparkles, 
  Info, Gift, Video, Download, Shield, Star, Lock, Clock, AlertCircle 
} from "lucide-react";
import { useLocation } from "wouter";

type CalculoData = {
  nome: string;
  email: string;
  whatsapp: string;
  valorCalculado: number;
  valorMinimo: number;
  valorMaximo: number;
  explicacao: string;
  conclusao: string;
  medidaJudicial: string;
  complemento: string;
};

export default function Resultado() {
  const [, setLocation] = useLocation();
  const [dados, setDados] = useState<CalculoData | null>(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("calculoPensao");
    if (dadosSalvos) {
      const data = JSON.parse(dadosSalvos);
      setDados(data);
      
      // Rastrear visualização do resultado no Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'ViewContent', {
          content_name: 'Resultado Cálculo Pensão',
          content_category: 'Calculadora',
          value: data.valorCalculado,
          currency: 'BRL'
        });
      }
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  if (!dados) {
    return null;
  }

  const primeiroNome = dados.nome.split(" ")[0];

  const handleComprarEbook = () => {
    // Rastrear intenção de compra no Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'Guia Definitivo da Pensão Alimentícia',
        content_type: 'product',
        value: 47.00,
        currency: 'BRL'
      });
    }
    
    // Aqui você integraria com sistema de pagamento (Kiwify, Hotmart, etc)
    alert("Integração com sistema de pagamento será implementada aqui!");
  };

  const scrollToOferta = () => {
    const ofertaSection = document.getElementById("oferta-ebook");
    if (ofertaSection) {
      ofertaSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={APP_LOGO} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground hidden sm:inline">Calculadora de Pensão</span>
          </button>
          
          <Button 
            onClick={scrollToOferta}
            size="lg" 
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <Gift className="mr-2 h-5 w-5" />
            Ver Oferta Especial
          </Button>
        </div>
      </header>

      {/* Resultado Principal */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container max-w-5xl">
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img src="/gatilho-3.jpg" alt="Comemoração" className="w-32 h-32 object-cover rounded-full shadow-2xl border-4 border-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Parabéns, {primeiroNome}!
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Seu cálculo foi concluído com sucesso. Agora você sabe seus direitos!
            </p>

            <Badge variant="default" className="px-6 py-3 text-base">
              <FileText className="mr-2 h-5 w-5" />
              Medida Judicial Indicada: {dados.medidaJudicial}
            </Badge>
          </div>

          <Card className="border-2 border-primary/30 shadow-2xl mb-8">
            <CardContent className="pt-8 pb-8 space-y-6">
              <div className="text-center space-y-4">
                <p className="text-xl font-semibold text-muted-foreground">
                  💰 Valor Estimado da Pensão
                </p>
                
                <div className="py-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <div className="text-5xl md:text-6xl font-extrabold text-primary">
                    R$ {dados.valorMinimo?.toLocaleString('pt-BR')} - R$ {dados.valorMaximo?.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-lg text-muted-foreground mt-3">por mês</p>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Info className="h-6 w-6 text-primary" />
                  Seu Resultado Personalizado
                </h3>
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    📊 {dados.conclusao}
                  </p>
                  
                  {dados.complemento && (
                    <p className="leading-relaxed mt-4">
                      {dados.complemento}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-bold text-xl">Como chegamos nesse valor?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dados.explicacao}
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Este é um valor estimado para orientação. Apenas um juiz pode 
                    determinar o valor final em um processo judicial. Use esta informação como ponto de partida 
                    para buscar seus direitos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA para Oferta */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 shadow-lg">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                ✅ Agora que você sabe o valor, que tal garantir que isso se torne realidade?
              </p>
              <p className="text-muted-foreground mb-4">
                Descubra o passo a passo completo para receber a pensão do seu filho
              </p>
              <Button 
                onClick={scrollToOferta}
                size="lg" 
                className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 animate-pulse"
              >
                <ArrowRight className="mr-2 h-6 w-6" />
                Ver Oferta Especial Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Oferta do Ebook */}
      <section id="oferta-ebook" className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="px-4 py-2 text-sm md:text-base mb-4 bg-red-600 animate-pulse">
              <Clock className="mr-2 h-4 w-4" />
              Vagas Limitadas para Orientação Técnica
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              🎁 Oferta Especial Para Você, {primeiroNome}!
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Agora que você sabe o valor, descubra <strong>como garantir esse direito</strong> e 
              dar os próximos passos com segurança total.
            </p>
          </div>

          {/* Timer de Urgência */}
          <Card className="border-2 border-red-500 shadow-2xl mb-8 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <AlertCircle className="h-8 w-8 text-red-600 animate-pulse" />
                  <h3 className="text-2xl font-bold text-red-900">
                    ⚠️ Atenção: Agenda com Vagas Limitadas
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Nossa equipe só consegue atender um número limitado de mães por semana. 
                  <strong className="text-red-700"> Garanta sua vaga hoje!</strong>
                </p>
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-red-600">12</p>
                    <p className="text-sm text-muted-foreground">Vagas restantes hoje</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-primary">24h</p>
                    <p className="text-sm text-muted-foreground">Para garantir o bônus</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Card do Ebook */}
            <Card className="border-2 border-primary/30 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="default" className="text-sm">
                  <Download className="mr-1 h-3 w-3" />
                  Acesso Imediato
                </Badge>
              </div>
              
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-center">
                  Ebook Digital
                </h3>
                
                <p className="text-center text-lg font-semibold text-primary">
                  "O passo a passo para receber a pensão do seu filho todos os meses"
                </p>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Todos os seus direitos explicados em linguagem simples</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Passo a passo para entrar com pedido de pensão</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Como pedir revisão para aumentar o valor</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">O que fazer se o pai não pagar (execução e prisão)</p>
                  </div>

                </div>

                <div className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground line-through">De R$ 97,00</p>
                  <p className="text-4xl font-extrabold text-primary">R$ 47</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Investimento único</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card do Bônus */}
            <Card className="border-2 border-green-500 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-center py-2 font-bold">
                <Gift className="inline-block mr-2 h-5 w-5" />
                BÔNUS EXCLUSIVO
              </div>
              
              <CardContent className="pt-16 space-y-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Video className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-center text-green-900">
                  Sessão de Orientação Técnica de 15 Minutos
                </h3>
                
                <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                  <p className="text-center text-lg font-semibold text-green-900 mb-2">
                    🎁 Este é o VERDADEIRO VALOR da oferta!
                  </p>
                  <p className="text-center text-sm text-muted-foreground">
                    Além do e-book completo, você terá acesso a uma <strong>sessão rápida de orientação técnica 
                    de até 15 minutos com a minha equipe</strong>, para entender como aplicar o passo a passo 
                    do material, com explicações práticas para você se sentir segura no caminho.
                  </p>
                </div>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />
                    <p className="text-sm font-medium">Tire suas dúvidas sobre os passos do material</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />
                    <p className="text-sm font-medium">Entenda o funcionamento dos procedimentos</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />
                    <p className="text-sm font-medium">Orientação prática com a equipe especializada</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />
                    <p className="text-sm font-medium">Agendamento flexível por videochamada</p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <Badge variant="default" className="text-lg px-4 py-2 bg-green-600">
                    <Gift className="mr-2 h-5 w-5" />
                    INCLUSO ao adquirir o ebook
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-3">
                    * Vagas limitadas • Feito especialmente para ajudar as mães
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo da Oferta */}
          <Card className="border-4 border-primary shadow-2xl mb-8">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">Investimento Total de Hoje:</h3>
                
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl text-muted-foreground line-through">R$ 247,00</span>
                  <span className="text-6xl font-extrabold text-primary">R$ 47</span>
                </div>
                
                <p className="text-xl text-muted-foreground">
                  <strong>Ebook + Orientação Técnica</strong> • Acesso imediato • Vagas limitadas
                </p>

                <Button 
                  onClick={handleComprarEbook}
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-10 py-6 md:py-7 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 w-full md:w-auto animate-pulse"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                  Sim, Quero Garantir Meu Acesso Agora
                </Button>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-4">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-green-600" />
                    <span>Acesso imediato ao ebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Garantia de 7 dias</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prova Social - Números */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">+1.000</p>
              <p className="text-sm text-muted-foreground">Mães já usaram a calculadora</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">R$ 8.400</p>
              <p className="text-sm text-muted-foreground">Valor médio que mães perdem por ano sem agir</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">12</p>
              <p className="text-sm text-muted-foreground">Vagas restantes para orientação técnica hoje</p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Passos */}
      <section className="py-16 bg-gradient-to-br from-accent/20 to-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Seus Próximos Passos</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Documente tudo</h3>
                    <p className="text-sm text-muted-foreground">
                      Reúna comprovantes de despesas da criança, comprovantes de renda do pai (se tiver), 
                      e registros de comunicação sobre a pensão.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Busque orientação jurídica</h3>
                    <p className="text-sm text-muted-foreground">
                      Consulte um advogado especializado em Direito de Família para analisar seu caso 
                      específico e orientar sobre o melhor caminho.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Não deixe para depois</h3>
                    <p className="text-sm text-muted-foreground">
                      Quanto mais tempo você espera, mais difícil fica garantir seus direitos. 
                      Aja agora enquanto sua motivação está alta!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aviso Legal */}
      <section className="py-12 bg-gray-100">
        <div className="container max-w-4xl">
          <Card className="bg-yellow-50 border-2 border-yellow-300">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-600" />
                Aviso Legal
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Este cálculo é uma estimativa baseada em parâmetros gerais do Direito de Família brasileiro 
                e não substitui a análise de um advogado. Cada caso é único e pode haver variações significativas 
                dependendo das circunstâncias específicas, jurisprudência local e decisão judicial. Recomendamos 
                fortemente que você busque orientação jurídica profissional para seu caso específico. Este site 
                não presta serviços jurídicos e não estabelece relação advogado-cliente.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-300">
        <div className="container">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-white">Calculadora de Pensão Alimentícia</span>
            </div>
            
            <p className="text-sm">© 2025 | Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
