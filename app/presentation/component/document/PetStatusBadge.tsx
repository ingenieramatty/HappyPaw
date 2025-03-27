interface PetStatusBadgeProps {
    petName: string;
    status: string;
  }
  
  export const PetStatusBadge = ({ petName, status }: PetStatusBadgeProps) => {
    return (
      <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-800">{petName}</p>
          <div className="flex items-center gap-1 text-sm">
            <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600">{status === 'active' ? 'Activo' : 'Inactivo'}</span>
          </div>
        </div>
      </div>
    );
  };