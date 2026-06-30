"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Nome completo</label>
          <input className="input-field" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-xs mt-1">Nome é obrigatório</p>}
        </div>
        <div>
          <label className="label-field">Email</label>
          <input type="email" className="input-field" {...register("email", { required: true })} />
          {errors.email && <p className="text-red-500 text-xs mt-1">Email é obrigatório</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Telefone</label>
          <input className="input-field" {...register("phone")} />
        </div>
        <div>
          <label className="label-field">Assunto</label>
          <input className="input-field" {...register("subject")} />
        </div>
      </div>
      <div>
        <label className="label-field">Mensagem</label>
        <textarea rows={5} className="input-field" {...register("message", { required: true })} />
        {errors.message && <p className="text-red-500 text-xs mt-1">Mensagem é obrigatória</p>}
      </div>

      <button disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? "A enviar..." : "Enviar mensagem"}
      </button>

      {status === "success" && <p className="text-green-600 text-sm">Mensagem enviada com sucesso! Entraremos em contacto em breve.</p>}
      {status === "error" && <p className="text-red-500 text-sm">Ocorreu um erro ao enviar. Tente novamente.</p>}
    </form>
  );
}
