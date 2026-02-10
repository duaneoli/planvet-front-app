
import React, { useState, useEffect } from 'react';
import { MOCK_PETS } from '../constants';
import { Sparkles, MessageCircle, Heart, Share2, Award, Camera, ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generatePetBio, generatePetPortrait } from '../geminiService';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pet } from '../types';

const PetSocial: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [traits, setTraits] = useState('');
  const [generatingBio, setGeneratingBio] = useState(false);
  const [generatingPortrait, setGeneratingPortrait] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, content: "Acabei de ganhar um petisco novo da PetLife! Miau!", likes: 12, date: "Hoje" },
    { id: 2, content: "Dia de consulta! Fui muito corajosa.", likes: 45, date: "Ontem" }
  ]);

  useEffect(() => {
    const pet = MOCK_PETS.find(p => p.id === id);
    if (pet) {
      setSelectedPet(pet);
    } else {
      navigate('/pets');
    }
  }, [id, navigate]);

  const handleGenerateBio = async () => {
    if (!traits || !selectedPet) return;
    setGeneratingBio(true);
    try {
      const bio = await generatePetBio(selectedPet.name, selectedPet.species, selectedPet.breed, traits);
      setSelectedPet({ ...selectedPet, bio });
    } finally {
      setGeneratingBio(false);
    }
  };

  const handleGeneratePortrait = async () => {
    if (!selectedPet) return;
    setGeneratingPortrait(true);
    try {
      const styles = ["Cyberpunk", "Oil Painting", "Pixar Animation", "Royal Victorian", "Watercolor"];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const portrait = await generatePetPortrait(selectedPet.name, selectedPet.species, selectedPet.breed, randomStyle);
      if (portrait) {
        setSelectedPet({ ...selectedPet, photo: portrait });
      }
    } finally {
      setGeneratingPortrait(false);
    }
  };

  if (!selectedPet) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center space-x-4 mb-2">
        <Link to="/pets" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Perfil Social: {selectedPet.name}</h2>
          <p className="text-sm text-slate-500">Compartilhe os momentos do seu amigo.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Card */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="h-32 bg-emerald-600 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg relative group">
                  <img src={selectedPet.photo} alt={selectedPet.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={handleGeneratePortrait}
                    disabled={generatingPortrait}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100"
                  >
                    {generatingPortrait ? (
                      <Loader2 className="animate-spin text-white" size={24} />
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-white" size={20} />
                        <span className="text-[8px] text-white font-bold uppercase mt-1">AI Avatar</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pt-16 pb-8 px-6 text-center">
              <h3 className="text-2xl font-bold text-slate-800">{selectedPet.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{selectedPet.breed} • {selectedPet.age} {selectedPet.age === 1 ? 'ano' : 'anos'}</p>
              
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm italic mb-6 min-h-[60px] flex items-center justify-center">
                "{selectedPet.bio || 'Adicione uma bio para que todos conheçam minha personalidade!'}"
              </div>

              <div className="flex justify-around border-t border-slate-100 pt-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">128</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Seguidores</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">54</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">12</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Badges</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={18} />
              Bio Inteligente (AI)
            </h4>
            <p className="text-xs text-slate-500">Descreva as manias de {selectedPet.name} e deixe a IA criar uma bio incrível!</p>
            <textarea 
              value={traits}
              onChange={e => setTraits(e.target.value)}
              placeholder="Ex: Gosta de dormir na rede, odeia banho, ama maçã..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm h-24 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button 
              onClick={handleGenerateBio}
              disabled={generatingBio || !traits}
              className="w-full bg-slate-800 text-white py-2 rounded-xl text-sm font-semibold hover:bg-slate-900 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {generatingBio ? 'Criando...' : 'Gerar Bio com IA'}
            </button>
          </div>
        </div>

        {/* Feed Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <img src={selectedPet.photo} className="w-10 h-10 rounded-full object-cover" />
            <input 
              type="text" 
              placeholder={`O que ${selectedPet.name} está fazendo agora?`} 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button className="bg-emerald-100 text-emerald-600 p-2 rounded-full hover:bg-emerald-200">
              <Camera size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={selectedPet.photo} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{selectedPet.name}</p>
                      <p className="text-[10px] text-slate-400">{post.date}</p>
                    </div>
                  </div>
                  <Share2 className="text-slate-300 hover:text-emerald-600 cursor-pointer" size={18} />
                </div>
                <p className="text-slate-700 mb-6">{post.content}</p>
                <div className="flex items-center gap-6 text-slate-500 text-sm pt-4 border-t border-slate-50">
                  <button className="flex items-center gap-1 hover:text-rose-500">
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-600">
                    <MessageCircle size={18} />
                    <span>Comentar</span>
                  </button>
                  <button className="flex items-center gap-1 ml-auto">
                    <Award className="text-amber-500" size={18} />
                    <span className="text-[10px] font-bold uppercase">Pet do Mês</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSocial;
