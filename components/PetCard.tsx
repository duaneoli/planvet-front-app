
import React from 'react';
import { Share2, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pet } from '../types';
import Badge from './Badge';
import Button from './Button';

interface PetCardProps {
  pet: Pet;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete, showActions = true }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="h-48 relative overflow-hidden">
        <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <h3 className="text-xl font-bold">{pet.name}</h3>
            <p className="text-xs opacity-90">{pet.species} • {pet.breed}</p>
          </div>
        </div>
        
        {showActions && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link to={`/pets/${pet.id}/social`} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-emerald-500 transition-colors">
              <Share2 size={16} />
            </Link>
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40">
              <Edit3 size={16} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-2 rounded-lg text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Idade</p>
            <p className="font-semibold text-slate-700">{pet.age} {pet.age === 1 ? 'ano' : 'anos'}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Peso</p>
            <p className="font-semibold text-slate-700">{pet.weight} kg</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <Badge variant="success" pulse>Plano Ativo</Badge>
          {onDelete && (
            <button onClick={() => onDelete(pet.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link to={`/pets/${pet.id}/social`} className="w-full">
          <Button variant="secondary" size="sm" className="w-full" icon={<Share2 size={16} />}>
            Ver Perfil Social
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
