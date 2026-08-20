# IRControl

Sistema web para controle, organização e conferência de informações utilizadas na declaração de Imposto de Renda.

## 📋 Visão geral

O IRControl centraliza informações relevantes para o acompanhamento do Imposto de Renda em uma interface simples e organizada.

### Funcionalidades

- Dashboard para acompanhamento das informações;
- Cadastro e gerenciamento de dependentes;
- Cadastro de despesas médicas;
- Controle de holerites;
- Controle de informe de rendimentos;
- Auditoria e conferência dos dados;
- Login e autenticação;
- Primeiro acesso e criação de senha;
- Recuperação de senha por código;
- Execução completa através de Docker Compose.

## 🏗️ Arquitetura

O backend utiliza uma organização baseada em Clean Architecture:

```text
IRControl
│
├── IRControl.API
├── IRControl.Application
├── IRControl.Domain
├── IRControl.Infrastructure
└── IRControl.React
```

### Backend

- ASP.NET Core
- C#
- Entity Framework Core
- SQL Server
- JWT
- MediatR / CQRS
- AutoMapper
- FluentValidation

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Axios
- React Hook Form

### Infraestrutura

- Docker
- Docker Compose
- SQL Server 2022
- Nginx

## 🔐 Autenticação

O sistema utiliza autenticação baseada em JWT.

Fluxo de primeiro acesso:

```text
Login
  ↓
Primeiro acesso
  ↓
Criação da senha
  ↓
Autenticação
  ↓
Dashboard
```

Fluxo de recuperação:

```text
Solicitar recuperação
  ↓
Código de recuperação
  ↓
Validação
  ↓
Nova senha
  ↓
Login
```

## 📊 Módulos

### Dashboard

Visão consolidada das informações cadastradas.

### Dependentes

Permite listar, cadastrar, editar e excluir dependentes e associar despesas médicas.

### Despesas médicas

Controle de data, médico/clínica, CPF/CNPJ, especialidade, valor, reembolso e observações.

### Holerites

Controle das informações mensais de remuneração e descontos.

### Informe de Rendimentos

Armazena os principais valores utilizados na conferência das informações do ano-base.

### Auditoria

Possui regras de conferência para holerites, informes, dependentes, despesas médicas, salário, INSS e IRRF.

## 🐳 Docker

O projeto possui um `docker-compose.yml` para executar o ambiente completo.

### Containers

```text
IRControl
│
├── ircontrol-web
├── ircontrol-api
└── ircontrol-sql
```

### Portas

| Serviço | Porta local |
|---|---:|
| IRControl Web | 3001 |
| IRControl API | 5014 |
| IRControl SQL Server | 1434 |

Acesso ao sistema:

```text
http://localhost:3001
```

API:

```text
http://localhost:5014
```

SQL Server:

```text
localhost,1434
```

### Executando com Docker

```powershell
docker compose build
docker compose up -d
```

Verificar containers:

```powershell
docker ps
```

Logs da API:

```powershell
docker logs ircontrol-api
```

Parar o ambiente:

```powershell
docker compose stop
```

## 💾 Banco de dados

O IRControl utiliza SQL Server 2022.

No ambiente Docker, o banco possui armazenamento persistente configurado no `docker-compose.yml` e é independente de outros projetos executados na mesma máquina.

## 👤 Usuário inicial

O ambiente de desenvolvimento possui um usuário administrativo criado pelo SeedData:

```text
Login: admin
Senha: admin123
```

> Em ambientes públicos ou de produção, a senha inicial deve ser alterada.

## 🧪 Desenvolvimento local

### Backend

Restaurar dependências:

```powershell
dotnet restore
```

Compilar:

```powershell
dotnet build
```

Executar:

```powershell
dotnet run --project IRControl.API
```

### Frontend

Instalar dependências:

```powershell
npm install
```

Executar:

```powershell
npm run dev
```

Gerar build:

```powershell
npm run build
```

## 📦 Estrutura

```text
IRControl/
│
├── IRControl.API/
├── IRControl.Application/
├── IRControl.Domain/
├── IRControl.Infrastructure/
│   └── Migrations/
├── IRControl.React/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔎 Auditoria

As regras de auditoria incluem validações para:

```text
Holerites
├── Holerite completo
├── Holerite duplicado
├── Valor negativo
├── Salário zerado
└── Mês inválido

Informes
├── Informe existente
└── Informe duplicado

Conferência
├── Salário
├── INSS
└── IRRF

Despesas médicas
├── CPF ausente
├── Reembolso maior que despesa
└── Dependente ausente

Dependentes
├── CPF
└── Dependente duplicado
```

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | ASP.NET Core |
| Linguagem | C# |
| Arquitetura | Clean Architecture |
| ORM | Entity Framework Core |
| Banco | SQL Server 2022 |
| Autenticação | JWT |
| CQRS | MediatR |
| Mapeamento | AutoMapper |
| Validação | FluentValidation |
| Frontend | React + TypeScript |
| Build | Vite |
| UI | Material UI |
| Formulários | React Hook Form |
| HTTP | Axios |
| Containers | Docker |
| Web Server | Nginx |

## 🔒 Segurança antes da publicação

Antes de publicar o projeto em um repositório público ou ambiente de produção:

- Remover senhas fixas do `docker-compose.yml`;
- Utilizar variáveis de ambiente para credenciais;
- Utilizar uma chave JWT segura;
- Não versionar arquivos contendo segredos;
- Alterar o usuário/senha inicial;
- Configurar HTTPS;
- Configurar CORS para os domínios reais.

## 📌 Status do projeto

**IRControl — projeto funcional concluído.**

- [x] Backend
- [x] Frontend
- [x] Dashboard
- [x] Dependentes
- [x] Despesas médicas
- [x] Holerites
- [x] Informe de rendimentos
- [x] Auditoria
- [x] Login
- [x] Primeiro acesso
- [x] Criação de senha
- [x] Recuperação de senha
- [x] Docker
- [x] SQL Server em container
- [x] Nginx
- [x] Docker Compose

## 📄 Licença

Projeto desenvolvido para fins de estudo, demonstração técnica e portfólio profissional.

## 👨‍💻 Sobre o projeto

O IRControl foi desenvolvido como uma aplicação corporativa completa, demonstrando separação de responsabilidades, arquitetura organizada, API REST, frontend moderno, autenticação, persistência em SQL Server e execução containerizada.
