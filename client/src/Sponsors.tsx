import React from "react";
import IsteLogo from "./assets/ISTE_logo.png"; // Placeholder image
import VybexLogo from "./assets/sponsor_images/vybex_clothing.png";
import Web3Logo from "./assets/sponsor_images/web3_aligarh_community.png";
import XTCYlogo from "./assets/sponsor_images/XTCY_energy_drink.jpg";
import HODlogo from "./assets/sponsor_images/house_of_delicious_food_partner.jpg";
import Cloud9 from "./assets/sponsor_images/cloud9_beverage_partner.jpg";
import OHig from "./assets/sponsor_images/Ohig_snack_partner.png";
import gic from "./assets/sponsor_images/give_my_certificate_certificate_partner.png";
import xyz from "./assets/sponsor_images/xyz_domain_partner.png";
import riidl from "./assets/sponsor_images/riidl_title_partner.png";
import raps from "./assets/sponsor_images/raps_gaming_partner.png";
// Placeholder data for sponsors
const SPONSORS = [
  { id: 9, name: "riidl_title_partner", logo: riidl },
  { id: 1, name: "vybex_clothing", logo: VybexLogo },
  { id: 2, name: "web3_aligarh_community", logo: Web3Logo },
  { id: 3, name: "XTCY_energy_drink", logo: XTCYlogo },
  { id: 4, name: "house_of_delicious_food_partner", logo: HODlogo },
  { id: 5, name: "cloud9_beverage_partner", logo: Cloud9 },
  { id: 6, name: "Ohig_snack_partner", logo: OHig },
  { id: 7, name: "give_my_certificate_certificate_partner", logo: gic },
  { id: 8, name: "xyz_domain_partner", logo: xyz },
  { id: 10, name: "raps_gaming_partner", logo: raps },
];

export default function Sponsors() {
  const topRow = SPONSORS.slice(0, 3);
  const bottomRow = SPONSORS.slice(3);

  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-950 to-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-16">
          <h2
            className="text-white text-5xl md:text-7xl font-black tracking-wider transform -skew-x-12 text-center"
            style={{
              fontFamily: 'pricedown, sans-serif',
              textShadow: `
                4px 4px 0px #ec4899,
                -1px -1px 0px rgba(0,0,0,0.5),
                5px 5px 15px rgba(0,0,0,0.8)
              `
            }}
          >
            SPONSORS
          </h2>
        </div>

        {/* Top Sponsor */}
        <div className="flex justify-center mb-16 w-full">
          <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/2 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 w-full max-w-[400px]">
            <div className="w-48 h-48 relative flex items-center justify-center">
              <img
                src={SPONSORS[0].logo}
                alt={SPONSORS[0].name}
                className="w-full h-full object-contain saturate-50 opacity-100 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Sponsor Grid */}
        <div className="flex flex-wrap justify-center gap-20 w-full">
          {SPONSORS.slice(1).map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 flex-1 min-w-[200px] max-w-[300px]"
            >
              <div className="w-32 h-32 relative flex items-center justify-center">
                {/* Image Container */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain saturate-50 opacity-80 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}