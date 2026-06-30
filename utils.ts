import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const eventTypeLabels: Record<string, string> = {
  CASAMENTO: "Casamento",
  ANIVERSARIO: "Aniversário",
  CONFERENCIA: "Conferência",
  WORKSHOP: "Workshop",
  EVENTO_CORPORATIVO: "Evento Corporativo",
  FORMATURA: "Formatura",
  FESTA_PRIVADA: "Festa Privada",
  OUTRO: "Outro",
};

export const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
  CANCELLED: "Cancelada",
};

export const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-200 text-gray-700",
};

export function formatMZN(value: number) {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
