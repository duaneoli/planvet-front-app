
import { LogOut, Menu, Settings, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenSidebar: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Visão Geral';
    if (path.includes('/social')) return 'Perfil Social Pet';
    if (path.startsWith('/pets')) return 'Meus Animais';
    if (path === '/contracts') return 'Contratos de Plano';
    if (path === '/billing') return 'Financeiro';
    if (path === '/profile') return 'Perfil';
    return 'PetLife';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={onOpenSidebar}
          className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg mr-2"
        >
          <Menu size={24} />
        </button>
        <div className="text-slate-800 font-semibold text-lg hidden sm:block">
          {getPageTitle()}
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <div className="hidden sm:block text-right pr-2 border-r border-slate-200">
            <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'Usuário'}</p>
            <p className="text-[10px] text-emerald-600 font-medium leading-tight">Plano Ativo</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white ring-1 ring-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
            {user ? getInitials(user.name) : '??'}
          </div>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-4 py-3 border-b border-slate-50 mb-1">
              <p className="text-sm font-bold text-slate-800">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
              <User size={16} />
              <span>Meu Perfil</span>
            </Link>
            <Link to="/billing" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
              <Settings size={16} />
              <span>Configurações</span>
            </Link>
            <div className="border-t border-slate-50 mt-1 pt-1">
              <button onClick={onLogout} className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
