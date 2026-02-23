import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const getPaginationWindow = (totalPages: number, currentPage: number, delta: number = 3) => {
  const left = currentPage - delta;
  const right = currentPage + delta;

  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i >= left && i <= right) {
      pages.push(i);
    }
  }

  return pages;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalElements: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
}) => {
  if (totalPages <= 1) return null;

  const pages = getPaginationWindow(totalPages, currentPage);

  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="flex items-center justify-center space-x-2 pt-6 pb-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
              w-10 h-10 rounded-lg text-sm font-bold transition-all
              ${
                currentPage === page
                  ? "bg-azul-600 text-white shadow-md shadow-azul-100"
                  : "text-slate-600 hover:bg-azul-50 hover:text-azul-600 border border-transparent"
              }
            `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <span className="text-[12px]">
        Página {currentPage} de {totalPages} totalizando {totalElements} registros.
      </span>
    </div>
  );
};

export default Pagination;
