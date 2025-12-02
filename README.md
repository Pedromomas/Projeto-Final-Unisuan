🏋️‍♂️ VIVAFIT - Seu Parceiro de Saúde Inteligente

Um aplicativo mobile completo desenvolvido com Ionic e Angular para transformar a sua jornada fitness com base no seu biotipo corporal.



📋 Sobre o Projeto

O VIVAFIT não é apenas mais um app de treino. Ele utiliza um algoritmo inteligente para calcular o seu biotipo (Ectomorfo, Mesomorfo ou Endomorfo) e personalizar toda a sua experiência:

Treinos Adaptados: Séries, repetições e focos diferentes para cada tipo de corpo.

Dieta Inteligente: Cardápios dinâmicos que calculam calorias e macros automaticamente.

Evolução Gamificada: Acompanhe seu peso e veja seu "nível" mudar conforme você evolui.

Área Administrativa: Painel completo para personal trainers gerenciarem alunos.

🚀 Funcionalidades Principais

👤 Para o Aluno

[x] Login & Cadastro Seguro (Autenticação Firebase)

[x] Cálculo Automático de Biotipo (IMC Inteligente)

[x] Home Dinâmica com Calendário e Treinos do Dia

[x] Vídeos de Execução para cada exercício

[x] Dieta Flexível com montagem de prato e "Dia do Lixo" interativo

[x] Gráficos de Evolução de peso e medidas

🛡️ Para o Administrador

[x] Painel de Gestão de todos os alunos

[x] Edição de Perfis (Promover a Admin, Excluir, Editar Dados)

[x] Busca Rápida de usuários

🛠️ Tecnologias Utilizadas

Este projeto foi construído com as melhores tecnologias do mercado mobile híbrido:

Ionic Framework (v7) - Interface e Componentes

Angular (v17) - Lógica e Estrutura (Standalone Components)

Firebase - Backend Serverless (Auth & Firestore Database)

Capacitor - Acesso nativo (Câmera, Filesystem)

TypeScript & SCSS

📦 Como Rodar o Projeto (Passo a Passo)

Se você acabou de clonar este repositório, siga estes passos para ver o app funcionando na sua máquina:

1. Pré-requisitos

Certifique-se de ter instalado:

Node.js (LTS)

Ionic CLI: npm install -g @ionic/cli

2. Instalar Dependências

Abra o terminal na pasta do projeto e rode o comando mágico que baixa todas as bibliotecas necessárias (a pasta node_modules):

npm install


3. Configurar o Firebase

O projeto precisa das chaves de acesso ao Firebase para funcionar (Login/Banco de Dados).

Crie um projeto no Firebase Console.

Ative o Authentication (Email/Senha) e o Firestore Database.

Copie suas credenciais web.

Vá no arquivo src/environments/environment.ts e cole suas chaves:

export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "...",
    appId: "..."
  }
};


4. Rodar no Navegador

Para testar e desenvolver, use o comando:

ionic serve


O app abrirá automaticamente em http://localhost:8100.

📱 Gerar APK (Android)

Para criar o arquivo de instalação para celulares Android:

Construir o projeto:

ionic build


Sincronizar com o Android:

npx cap sync


Abrir no Android Studio:

npx cap open android


Dentro do Android Studio, vá em Build > Build Bundle(s) / APK(s) > Build APK(s).

🤝 Contribuidores

Projeto desenvolvido com carinho e muita cafeína por:

[Pedro Fernandes Bahia Rocha] - Desenvolvedor Fullstack Mobile



Grupo do Projeto (Pedro ,taiane,Carol)

<p align="center">
Feito com 💚 por VIVAFIT Team
</p>