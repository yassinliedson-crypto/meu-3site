"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DayStatus = "available" | "booked" | "blocked" | "past";

interface Props {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export default function AvailabilityCalendar({ selectedDate, onSelect }: Props) {
  const [cursor, setCursor] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [bookingsRes, blockedRes] = await Promise.all([
          fetch("/api/bookings?public=true"),
          fetch("/api/blocked-dates"),
        ]);
        const bookings = await bookingsRes.json();
        const blocked = await blockedRes.json();

        setBookedDates(
          new Set(
            (bookings || [])
              .filter((b: any) => b.status === "APPROVED")
              .map((b: any) => new Date(b.date).toDateString())
          )
        );
        setBlockedDates(new Set((blocked || []).map((b: any) => new Date(b.date).toDateString())));
      } catch {
        // falha silenciosa - calendário continua usável
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [cursor]);

  function getStatus(date: Date): DayStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return "past";
    if (blockedDates.has(date.toDateString())) return "blocked";
    if (bookedDates.has(date.toDateString())) return "booked";
    return "available";
  }

  const statusStyles: Record<DayStatus, string> = {
    available: "bg-white hover:bg-gold-50 text-charcoal-900 cursor-pointer border border-gray-200",
    booked: "bg-red-50 text-red-400 cursor-not-allowed border border-red-100",
    blocked: "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200",
    past: "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100",
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-display text-lg">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </h3>
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Próximo mês"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-xs font-medium text-gray-400 py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date, i) => {
          if (!date) return <div key={i} />;
          const status = getStatus(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          return (
            <button
              key={i}
              disabled={status !== "available" || loading}
              onClick={() => onSelect(date)}
              className={`aspect-square text-sm rounded-sm transition-colors ${statusStyles[status]} ${
                isSelected ? "ring-2 ring-gold-500 bg-gold-100" : ""
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-white border border-gray-300 rounded-sm" /> Disponível</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-50 border border-red-200 rounded-sm" /> Reservado</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm" /> Bloqueado</div>
      </div>
    </div>
  );
}
