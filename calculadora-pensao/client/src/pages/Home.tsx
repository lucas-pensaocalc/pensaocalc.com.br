import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO } from "@/const";
import { 
  CheckCircle2, Scale, AlertCircle, TrendingUp, 
  Shield, Clock, Target, Heart, DollarSign,
  FileText, Star, Lock, Users, ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleStartCalculation = () => {
    // Rastrear evento do Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    setLocation("/calculo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Sticky */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">Calculadora de Pensão</span>
          </div>
          <Button 
            onClick={handleStartCalculation} 
            size="lg" 
            className="text-base px-8 py-6 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 animate-pulse bg-primary hover:bg-primary/90"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Calcular Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
              <Scale className="mr-2 h-4 w-4" />
              Baseado nas Leis Brasileiras
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Descubra em 2 Minutos Quanto Você Tem Direito de Receber de{" "}
              <span className="text-primary">Pensão Alimentícia</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cálculo <strong>gratuito</strong> e personalizado. 
              Mais de <strong className="text-primary">1.000 mães</strong> já descobriram seus direitos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                onClick={handleStartCalculation}
                size="lg" 
                className="text-lg px-10 py-7 w-full sm:w-auto shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 animate-pulse bg-primary hover:bg-primary/90"
              >
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Calcular Meu Valor Agora
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span>100% Seguro e Confidencial</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span>Menos de 2 Minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>Totalmente Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Identificação e Dor */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Você se sente sobrecarregada e sozinha nessa luta?
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                A maioria das mães no Brasil não recebe o valor correto da pensão alimentícia. 
                Muitas nem sabem que têm direito a pedir revisão, cobrar atrasados, ou até mesmo 
                fixar a pensão pela primeira vez. Enquanto isso, o pai segue sua vida normalmente, 
                e você arca com todas as despesas sozinha.
              </p>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                Você já se pegou pensando: <strong>"Será que o valor que ele paga (ou deveria pagar) é justo?"</strong> 
                ou <strong>"Como faço para garantir que meu filho receba o que é de direito?"</strong>
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
              Você se identifica com alguma dessas situações?
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-base">Ele parou de pagar e você não sabe o que fazer</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-base">O valor é muito baixo e mal cobre as despesas</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-base">Você nunca pediu pensão e não sabe por onde começar</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleStartCalculation}
                size="lg" 
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 bg-primary hover:bg-primary/90"
              >
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Fazer Meu Cálculo Gratuito
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Agitação */}
      <section className="py-20 bg-gradient-to-br from-destructive/5 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Cada dia sem agir é um prejuízo para o futuro do seu filho
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              A falta de pensão ou o valor incorreto não afeta apenas o presente. Afeta a educação, 
              a saúde, o lazer e até a autoestima da criança. Enquanto você espera, os meses passam, 
              as dívidas acumulam, e fica cada vez mais difícil recuperar o que é de direito.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl font-bold text-primary mb-2">70%</div>
                <p className="text-muted-foreground">das mães brasileiras recebem menos do que deveriam</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl font-bold text-primary mb-2">1/3</div>
                <p className="text-muted-foreground">consegue cobrar pensões atrasadas</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl font-bold text-primary mb-2">R$ 8.400</div>
                <p className="text-muted-foreground">valor médio perdido por ano</p>
              </div>
            </div>

            <Button 
              onClick={handleStartCalculation}
              size="lg" 
              variant="destructive"
              className="text-lg px-8 py-6 shadow-lg"
            >
              Não Quero Perder Mais Tempo
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Solução */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <Target className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Tenha a Resposta que Você Precisa em Menos de 2 Minutos
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Nossa ferramenta foi criada especialmente para você que precisa de orientação rápida, 
                clara e confiável. Em apenas <strong>8 perguntas simples</strong>, você descobre:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Valor Aproximado</h3>
                      <p className="text-muted-foreground">O valor aproximado que seu filho tem direito por mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Medida Judicial</h3>
                      <p className="text-muted-foreground">Qual medida judicial é indicada para o seu caso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Próximos Passos</h3>
                      <p className="text-muted-foreground">Os próximos passos práticos para garantir esse direito</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Desconto em Folha</h3>
                      <p className="text-muted-foreground">Se você pode pedir desconto direto na folha de pagamento dele</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 mb-10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Diferencial da Nossa Calculadora</h3>
                    <p className="text-muted-foreground">
                      Nosso cálculo é baseado nas <strong>leis brasileiras</strong>, jurisprudência dos tribunais 
                      e no binômio <strong>necessidade-possibilidade</strong>. Não é um número aleatório - 
                      é uma estimativa real e fundamentada.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={handleStartCalculation}
                size="lg" 
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 bg-primary hover:bg-primary/90"
              >
                <ArrowRight className="mr-2 h-6 w-6" />
                Quero Descobrir Meu Valor Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Prova Social */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mb-6">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Junte-se a Milhares de Mães que Já Conhecem Seus Direitos
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "Eu não fazia ideia de que poderia pedir revisão! O cálculo mostrou que meu filho 
                    tem direito a quase o dobro do que recebe hoje. Já entrei com o pedido e estou confiante."
                  </p>
                  <p className="text-sm font-semibold text-foreground">— Ana P., São Paulo - SP</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "Ele nunca pagou pensão e eu achava que não tinha como cobrar. Descobri que posso 
                    pedir investigação de paternidade e fixar a pensão. Finalmente vou lutar pelos direitos do meu filho!"
                  </p>
                  <p className="text-sm font-semibold text-foreground">— Carla S., Rio de Janeiro - RJ</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "O cálculo foi rápido e me deu clareza sobre o valor justo. Com as informações em mãos, 
                    consegui fazer um acordo extrajudicial e evitei o desgaste de um processo."
                  </p>
                  <p className="text-sm font-semibold text-foreground">— Fernanda L., Belo Horizonte - MG</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleStartCalculation}
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg"
              >
                Eu Também Quero Saber Meus Direitos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Dúvidas Comuns
            </h2>

            <div className="space-y-6">
              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    É de graça mesmo?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Sim! O cálculo é 100% gratuito e você não precisa fornecer dados de cartão. Queremos que você conheça seus direitos sem barreiras.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    E se eu não souber a renda dele?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Sem problemas! Nossa calculadora permite que você marque "Desconheço" e faremos uma 
                    estimativa baseada no salário mínimo. Você ainda terá uma orientação valiosa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    O cálculo substitui um advogado?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Não. Este é um cálculo estimado para orientação. Apenas um juiz pode determinar o 
                    valor final. Mas você terá informações sólidas para buscar seus direitos com mais segurança.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Quanto tempo leva?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Menos de 2 minutos! São apenas 8 perguntas simples e objetivas.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button 
                onClick={handleStartCalculation}
                size="lg" 
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 bg-primary hover:bg-primary/90"
              >
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Começar Meu Cálculo Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final com Urgência */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Seu filho não pode esperar. O futuro dele depende da sua atitude hoje.
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              Você já chegou até aqui. Isso mostra que você se importa e quer o melhor para seu filho. 
              Não deixe para amanhã o que pode descobrir em 2 minutos. Faça o cálculo agora, gratuitamente, 
              e dê o primeiro passo para garantir os direitos do seu filho.
            </p>

            <Button 
              onClick={handleStartCalculation}
              size="lg" 
              className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 animate-pulse bg-primary hover:bg-primary/90 mb-8"
            >
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Calcular Agora - 100% Grátis
            </Button>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                <span>Seus dados estão seguros e protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                <span>Baseado nas leis brasileiras</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Mais de 1.000 mães já usaram</span>
              </div>
            </div>
          </div>
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
            
            <div className="max-w-2xl mx-auto pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                <strong>Aviso Legal:</strong> Esta ferramenta fornece uma estimativa baseada em parâmetros 
                gerais do Direito de Família brasileiro e não substitui a consulta com um advogado. Cada caso 
                é único e requer análise profissional.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
