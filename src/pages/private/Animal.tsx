import { animalPhotoMapped } from "@/api/planvet/mapped";
import { UseAnimalService } from "@/hooks/planvet/UseAnimal";
import { AnimalCreateModal } from "@/components/modal/AnimalCreateModal";
import { Main } from "@/components/template/main";
import { Loader2, PawPrint, Plus, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Animals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setIsCreateModalOpen(true);
      navigate("/animals", { replace: true });
    }
  }, []);

  const { data: animals = [], isLoading } = UseAnimalService.useGetAll();

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return animals.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.breed?.name?.toLowerCase().includes(q) ||
        a.specie?.name?.toLowerCase().includes(q)
    );
  }, [animals, searchTerm]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <Main title="Meus Pets" description="Todos os animais vinculados à sua conta.">
      <AnimalCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(id) => navigate(`/animals/${id}?contract=true&planId=47`, { state: { fromLabel: "Voltar para Meus Pets" } })}
      />

      {/* Header actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 mr-4">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Buscar por nome, raça ou espécie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-azul-600 hover:bg-azul-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Novo Animal
        </button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <PawPrint size={48} strokeWidth={1.2} />
          <p className="font-semibold">Nenhum animal encontrado.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((animal) => {
          const sexLabel =
            animal.sex === "macho" ? "Macho" : animal.sex === "femea" ? "Fêmea" : "—";
          const birthYear = animal.brithDay
            ? new Date().getFullYear() - new Date(animal.brithDay).getFullYear()
            : null;

          return (
            <div
              key={animal.id}
              onClick={() => navigate(`/animals/${animal.id}`, { state: { fromLabel: 'Voltar para Meus Pets' } })}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 cursor-pointer"
            >
              {/* Photo */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={animalPhotoMapped(animal.photo)}
                  alt={animal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* species badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest shadow-sm">
                  {animal.specie?.name ?? "—"}
                </div>
                {/* sex badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest shadow-sm">
                  {sexLabel}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-extrabold text-slate-800 text-lg leading-tight truncate">
                  {animal.name}
                </h3>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-0.5">
                  {animal.breed?.name ?? "—"}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  {birthYear !== null ? (
                    <span>{birthYear} {birthYear === 1 ? "ano" : "anos"}</span>
                  ) : (
                    <span>—</span>
                  )}
                  <span className="flex items-center gap-1 text-emerald-500 group-hover:text-emerald-600 transition-colors font-bold">
                    Ver detalhes
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 4l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Main>
  );
};

export default Animals;
