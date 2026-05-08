"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";

interface LeadFormProps {
  propertyId: string;
  propertyTitle: string;
  sellerPhone?: string | null;
  source?: string;
}

export default function LeadForm({ propertyId, propertyTitle, sellerPhone, source = "website" }: LeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, propertyId, source }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong"); return; }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-1">Enquiry Sent!</h3>
        <p className="text-slate-500 text-sm">The seller will contact you within 24 hours.</p>
        {sellerPhone && (
          <a
            href={`tel:${sellerPhone}`}
            className="mt-4 inline-flex items-center gap-2 btn-primary text-sm"
          >
            <Phone className="w-4 h-4" /> Call Seller Now
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="card p-5">
      <h3 className="font-bold text-slate-800 mb-1">Contact Seller</h3>
      <p className="text-xs text-slate-500 mb-4">Get more details about this property</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            required
            placeholder="Your Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-base w-full"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            required
            type="tel"
            placeholder="Mobile Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-base w-full pl-10"
            maxLength={15}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-base w-full pl-10"
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <textarea
            rows={3}
            placeholder={`I'm interested in "${propertyTitle.slice(0, 40)}...". Please share more details.`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-base w-full pl-10 resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      {/* WhatsApp CTA */}
      {sellerPhone && (
        <a
          href={`https://wa.me/91${sellerPhone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(`Hi, I'm interested in "${propertyTitle}". Please share more details.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-emerald-500 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Seller
        </a>
      )}

      <p className="text-[11px] text-slate-400 text-center mt-3">
        By submitting, you agree to be contacted by the seller. We don't share your data with third parties.
      </p>
    </div>
  );
}
