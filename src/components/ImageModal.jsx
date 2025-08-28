const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-screen">
        <span 
          className="absolute -top-4 -right-4 text-white text-4xl font-bold cursor-pointer hover:opacity-70 z-10"
          onClick={onClose}
        >
          &times;
        </span>
        <img 
          src={imageSrc} 
          alt="Modal view" 
          className="max-w-full max-h-[80vh] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal;
