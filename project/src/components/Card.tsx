interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // gradient or solid color
}

export default function Card({ title, value, icon, color }: CardProps) {
  return (
    <div
      className="
        rounded-2xl 
        p-6 
        shadow-sm 
        bg-gradient-to-br from-white/80 to-white/40 
        backdrop-blur-xl 
        border border-white/30
        transition-all 
        duration-300 
        hover:shadow-xl 
        hover:scale-[1.03] 
        hover:-translate-y-1
      "
    >
      <div className="flex items-center justify-between">
        
        {/* TEXT */}
        <div>
          <p className="text-gray-600 text-sm font-medium tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </p>
        </div>

        {/* ICON */}
        {icon && (
          <div
            className={`
              ${color || "bg-gradient-to-br from-blue-500 to-blue-600"} 
              p-4 
              rounded-2xl 
              text-white 
              shadow-md 
              flex 
              items-center 
              justify-center
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
