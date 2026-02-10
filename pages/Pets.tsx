
import React, { useState, useMemo, useRef } from 'react';
import { usePets, useAddPet, useDeletePet } from '../hooks/usePets';
import { Plus, Search, Loader2, Camera, RefreshCw, X } from 'lucide-react';
import { Pet, PetSpecies } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import PetCard from '../components/PetCard';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 3;

const Pets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [newPet, setNewPet] = useState<Partial<Pet>>({
    species: PetSpecies.DOG,
  });

  const { data: pets = [], isLoading } = usePets();
  const addMutation = useAddPet();
  const deleteMutation = useDeletePet();

  const filteredPets = useMemo(() => {
    return pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pets, searchTerm]);

  const totalPages = Math.ceil(filteredPets.length / ITEMS_PER_PAGE);
  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startCamera = async () => {
    setIsCameraActive(true);
    setCapturedPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar câmera:", err);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const photoData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedPhoto(photoData);
        stopCamera();
      }
    }
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    const petToAdd: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPet.name || 'Pet Sem Nome',
      species: newPet.species as PetSpecies,
      breed: newPet.breed || 'SRD',
      age: Number(newPet.age) || 1,
      weight: Number(newPet.weight) || 0,
      photo: capturedPhoto || 'https://picsum.photos/seed/' + Math.random() + '/400/400',
      planId: 'plan-custom'
    };
    
    addMutation.mutate(petToAdd, {
      onSuccess: () => {
        setShowAddModal(false);
        setNewPet({ species: PetSpecies.DOG });
        setCapturedPhoto(null);
      }
    });
  };

  const handleDeletePet = (id: string) => {
    if (confirm('Deseja realmente remover este pet?')) {
      deleteMutation.mutate(id);
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

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
          <Loader2 className="animate-spin text-emerald-600" size={48} />
          <p className="font-bold">Buscando seus pets no servidor...</p>
        </div>
      ) : (
        <>
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
        </>
      )}

      <Modal 
        isOpen={showAddModal} 
        onClose={() => {
          setShowAddModal(false);
          stopCamera();
        }} 
        title="Cadastrar Novo Pet"
      >
        <form onSubmit={handleAddPet} className="space-y-4">
          {/* Foto do Pet Section */}
          <div className="flex flex-col items-center space-y-3 mb-6">
            <div className="relative w-32 h-32 rounded-3xl bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center">
              {capturedPhoto ? (
                <img src={capturedPhoto} className="w-full h-full object-cover" alt="Captured" />
              ) : isCameraActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
              ) : (
                <Camera className="text-slate-300" size={40} />
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="flex gap-2">
              {!isCameraActive && !capturedPhoto ? (
                <Button type="button" variant="secondary" size="sm" onClick={startCamera} icon={<Camera size={16} />}>
                  Tirar Foto
                </Button>
              ) : isCameraActive ? (
                <Button type="button" variant="primary" size="sm" onClick={takePhoto}>
                  Capturar
                </Button>
              ) : (
                <Button type="button" variant="outline" size="sm" onClick={startCamera} icon={<RefreshCw size={16} />}>
                  Refazer
                </Button>
              )}
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
            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              isLoading={addMutation.isPending}
            >
              Confirmar Cadastro
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Pets;
