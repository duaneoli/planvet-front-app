
import React, { useState, useMemo } from 'react';
import { MOCK_PETS } from '../constants';
import { Plus, Search, Camera } from 'lucide-react';
import { Pet, PetSpecies } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import PetCard from '../components/PetCard';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 3;

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPet, setNewPet] = useState<Partial<Pet>>({
    species: PetSpecies.DOG,
  });

  const filteredPets = useMemo(() => {
    const filtered = pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  }, [pets, searchTerm]);

  // Reset page when filtering
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPets.length / ITEMS_PER_PAGE);
  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    const petToAdd: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPet.name || 'Pet Sem Nome',
      species: newPet.species as PetSpecies,
      breed: newPet.breed || 'SRD',
      age: Number(newPet.age) || 1,
      weight: Number(newPet.weight) || 0,
      photo: 'https://picsum.photos/seed/' + Math.random() + '/400/400',
      planId: 'plan-custom'
    };
    setPets([...pets, petToAdd]);
    setShowAddModal(false);
    setNewPet({ species: PetSpecies.DOG });
  };

  const handleDeletePet = (id: string) => {
    if (confirm('Deseja realmente remover este pet?')) {
      setPets(pets.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Meus Pets</h2>
          <p className="text-slate-500 text-sm">Gerencie o cadastro de todos os seus animais.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus size={20} />}>
          Novo Pet
        </Button>
      </div>

      <Input 
        icon={<Search size={20} />} 
        placeholder="Buscar pet por nome ou raça..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPets.map(pet => (
          <PetCard key={pet.id} pet={pet} onDelete={handleDeletePet} />
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400">Nenhum pet encontrado.</p>
        </div>
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Cadastrar Novo Pet"
      >
        <form onSubmit={handleAddPet} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
                <Camera size={32} />
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full shadow-lg">
                <Plus size={14} />
              </div>
            </div>
          </div>

          <Input 
            required
            label="Nome do Pet"
            placeholder="Ex: Rex"
            value={newPet.name || ''}
            onChange={e => setNewPet({...newPet, name: e.target.value})}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Espécie</label>
              <select 
                value={newPet.species}
                onChange={e => setNewPet({...newPet, species: e.target.value as PetSpecies})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-700"
              >
                {Object.values(PetSpecies).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Input 
              label="Raça"
              placeholder="Ex: Golden"
              value={newPet.breed || ''}
              onChange={e => setNewPet({...newPet, breed: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Idade (anos)"
              type="number"
              placeholder="0"
              value={newPet.age || ''}
              onChange={e => setNewPet({...newPet, age: Number(e.target.value)})}
            />
            <Input 
              label="Peso (kg)"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={newPet.weight || ''}
              onChange={e => setNewPet({...newPet, weight: Number(e.target.value)})}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              Cadastrar Pet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Pets;
