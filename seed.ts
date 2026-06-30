import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@salaoviana.co.mz";
  const adminPassword = process.env.ADMIN_PASSWORD || "MudarEstaSenha123!";
  const adminName = process.env.ADMIN_NAME || "Administrador Viana";

  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminName,
      email: adminEmail,
      password: hashed,
      role: "ADMIN",
    },
  });

  await prisma.salonInfo.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "Salão de Eventos Viana",
      description:
        "O local ideal para quem procura elegância, conforto e organização impecável em cada detalhe. Um salão de eventos moderno e versátil, projetado para acolher ocasiões especiais com elegância e funcionalidade. Com capacidade para até 500 convidados, o espaço é ideal para casamentos, eventos corporativos, conferências e celebrações privadas. Conta com climatização integral, iluminação ajustável, acessibilidade, estacionamento e infraestrutura que permite múltiplas configurações, garantindo conforto e eficiência em cada evento. Mais do que um espaço, o salão oferece a base perfeita para experiências bem organizadas, memoráveis e à altura da importância de cada celebração.",
      capacity: 500,
      basePrice: 25000,
      address: "Av. Principal, Xai-Xai, Moçambique",
      phone: "+258 84 000 0000",
      whatsapp: "258840000000",
      email: "contacto@salaoviana.co.mz",
      openingHours: "Segunda a Sábado: 08h00 - 18h00",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
    },
  });

  console.log("Seed concluído. Admin:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
