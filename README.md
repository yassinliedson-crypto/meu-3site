# Salão de Eventos Viana — Sistema de Reservas

Aplicação web completa para o Salão de Eventos Viana: apresentação institucional, calendário de disponibilidade, sistema de reservas online, painel do cliente e painel administrativo.

## Tecnologias

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — identidade visual em dourado, preto, branco e cinza
- **Prisma ORM** + **PostgreSQL** (compatível com Supabase, Neon ou qualquer Postgres)
- **NextAuth.js (Auth.js)** — autenticação por credenciais (email/senha)
- **Recharts** — gráficos no painel administrativo
- Totalmente responsivo (desktop, tablet, smartphone)

## Funcionalidades

- Página inicial com hero, descrição, comodidades e galeria
- Galeria profissional de imagens (placeholders facilmente substituíveis)
- Calendário de disponibilidade público (datas livres, ocupadas e bloqueadas)
- Sistema de reservas: registo, login, escolha de data/hora, tipo de evento, nº de convidados, observações
- Validação de conflitos — impede reservas duplicadas na mesma data/horário
- Painel do Cliente: histórico de reservas, cancelamento, edição de perfil e senha
- Painel Administrativo: aprovar/rejeitar reservas, bloquear/desbloquear datas, gerir clientes, editar informações do salão, estatísticas, faturamento e exportação CSV
- Página de contacto com formulário, mapa, WhatsApp, redes sociais e horário
- SEO completo (metadata, Open Graph, sitemap-ready)

## Estrutura do Projeto

```
salao-viana/
├── prisma/
│   ├── schema.prisma       # Modelos: User, Booking, BlockedDate, SalonInfo, ContactMessage
│   └── seed.ts             # Cria utilizador admin inicial + dados do salão
├── src/
│   ├── app/                # Rotas (App Router)
│   │   ├── api/             # Rotas de API (auth, reservas, datas bloqueadas, contacto...)
│   │   ├── admin/            # Painel administrativo
│   │   ├── painel/           # Painel do cliente
│   │   ├── reservar/         # Formulário de reserva
│   │   ├── disponibilidade/  # Calendário público
│   │   ├── galeria/          # Galeria de imagens
│   │   ├── contacto/         # Página de contacto
│   │   ├── login/ registar/  # Autenticação
│   │   └── page.tsx          # Página inicial
│   ├── components/          # Navbar, Footer, Calendário, Formulários
│   ├── lib/                 # prisma, auth, utils, dados estáticos
│   └── types/                # Tipos do NextAuth
├── .env.example
└── package.json
```

## Instalação Local

### 1. Pré-requisitos
- Node.js 18+
- Uma base de dados PostgreSQL (local, [Supabase](https://supabase.com) ou [Neon](https://neon.tech))

### 2. Clonar e instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie `.env.example` para `.env` e preencha os valores:
```bash
cp .env.example .env
```

Gere um `NEXTAUTH_SECRET` seguro:
```bash
openssl rand -base64 32
```

### 4. Configurar a base de dados
```bash
npx prisma db push
npm run db:seed
```
Isto cria a tabela e um utilizador **administrador** com os dados definidos em `ADMIN_EMAIL` / `ADMIN_PASSWORD` no `.env`.

### 5. Executar em desenvolvimento
```bash
npm run dev
```
Aceda a `http://localhost:3000`.

## Implantação na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New Project** e importe o repositório.
3. Em **Environment Variables**, adicione todas as variáveis do `.env.example` (use a connection string do Supabase/Neon para `DATABASE_URL` e gere um `NEXTAUTH_SECRET`). Defina `NEXTAUTH_URL` como o domínio final (ex.: `https://salaoviana.vercel.app`).
4. A Vercel detecta automaticamente o Next.js. O comando de build (`prisma generate && next build`) já está configurado no `package.json`.
5. Após o primeiro deploy, execute o seed da base de dados localmente apontando para a `DATABASE_URL` de produção:
   ```bash
   npx prisma db push
   npm run db:seed
   ```
6. Aceda ao site, vá a `/login` e entre com a conta de administrador para configurar o painel.

## Conta de Administrador

Após o seed, use as credenciais definidas em `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) para aceder a `/admin`. **Altere a senha imediatamente após o primeiro login** através do painel ou diretamente na base de dados.

## Substituir as Imagens

As imagens da galeria e da página inicial usam placeholders do Unsplash. Para usar fotos reais do salão, substitua os URLs em `src/lib/data.ts` (array `galleryImages`) e em `src/app/page.tsx` (imagem do hero).

## Segurança

- Senhas com hash bcrypt
- Rotas administrativas protegidas por sessão + verificação de papel (`role`)
- Validação de formulários com Zod no servidor
- Verificação de conflito de datas/horários antes de confirmar reservas

## Licença

Projeto desenvolvido sob medida para o Salão de Eventos Viana.
