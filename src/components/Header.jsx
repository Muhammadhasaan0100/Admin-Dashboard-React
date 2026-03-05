
function Header({title,subtitle}) {
   return (
      <div
         className="mb-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
      shadow-[0_15px_50px_rgba(0,0,0,0.5)]
      [transform:perspective(1200px)_rotateX(4deg)]"
      >
         <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {title}
         </h1>

         <p className="text-white/60">{subtitle}</p>
      </div>
   )
}
export default Header;