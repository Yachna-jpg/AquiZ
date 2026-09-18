import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <h2 className="text-[17px] font-semibold tracking-wide text-white mb-2">
              OILTRACE
            </h2>
            <p className="text-[11px] font-medium tracking-widest text-muted-text uppercase">
              Maritime Intelligence Platform
            </p>
          </div>
          
          <div>
            <ul className="space-y-4">
              {['Intelligence', 'How It Works', 'Technology', 'About'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[14px] text-muted-text hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <ul className="space-y-4">
              {['Satellite', 'AIS', 'Oceanographic'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[14px] text-muted-text hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-navy-border/50">
          <p className="text-[12px] text-muted-text">
            © 2026 OILTRACE
          </p>
          <p className="text-[12px] text-muted-text">
            Research & Investigation Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
