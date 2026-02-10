import { Fingerprint, Loader2, Mail, MapPin, Phone, Save, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UserProfile } from "../types";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSaving(true);
    // Simula salvamento
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateUser(profile);
    setIsSaving(false);
    alert("Perfil atualizado com sucesso!");
  };

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dados do Perfil</h2>
          <p className="text-slate-500 text-sm">
            Mantenha seus dados sempre atualizados para comunicações importantes.
          </p>
        </div>
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-700 border-2 border-white shadow-md">
          {profile.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <User size={12} /> Nome Completo
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile!, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <Mail size={12} /> E-mail
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile!, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <Phone size={12} /> Celular
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile!, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <Fingerprint size={12} /> CPF
              </label>
              <input
                disabled
                type="text"
                value={profile.cpf}
                className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg outline-none cursor-not-allowed opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
              <MapPin size={12} /> Endereço Residencial
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile!, address: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50 transition-all"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
        <h4 className="font-bold text-rose-800 mb-2">Zona de Perigo</h4>
        <p className="text-sm text-rose-700 mb-4">
          Ao desativar sua conta, todos os planos serão suspensos e os dados dos pets arquivados
          conforme LGPD.
        </p>
        <button className="text-rose-600 font-bold text-sm hover:underline">
          Desativar minha conta PetLife
        </button>
      </div>
    </div>
  );
};

export default Profile;
