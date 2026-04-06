import React from "react";
import VybexLogo from "./assets/sponsor_images/vybex_clothing.png";
import Web3Logo from "./assets/sponsor_images/web3_aligarh_community.png";
import Cloud9Logo from "./assets/sponsor_images/cloud9_beverage_partner.jpg";
import HouseOfDeliciousLogo from "./assets/sponsor_images/house_of_delicious_food_partner.jpg";
import XTCY_energy_drinkLogo from "./assets/sponsor_images/XTCY_energy_drink.jpg";

const SPONSORS = [
  { id: 1, name: "vybex_clothing", logo: VybexLogo, round: false },
  { id: 2, name: "web3_aligarh_community", logo: Web3Logo, round: false },
  { id: 3, name: "cloud9_beverage_partner", logo: Cloud9Logo, round: false },
  { id: 4, name: "house_of_delicious_food_partner", logo: HouseOfDeliciousLogo, round: true },
  { id: 5, name: "XTCY_energy_drink", logo: XTCY_energy_drinkLogo, round: false },
];

const SponsorCard = ({ sponsor }: { sponsor: typeof SPONSORS[0] }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-white/2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 w-[250px]">
    <div
      className={`w-32 h-32 relative flex items-center justify-center ${
        sponsor.round ? "rounded-full overflow-hidden bg-zinc-900" : ""
      }`}
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className={`w-full h-full transition-all duration-300 transform group-hover:scale-110 grayscale group-hover:grayscale-0 ${
          sponsor.round ? "object-cover" : "object-contain"
        }`}
      />
    </div>
  </div>
);

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

        {/* Top row — 3 sponsors */}
        <div className="flex justify-center gap-20 w-full mb-12">
          {topRow.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>

        {/* Bottom row — 2 sponsors centered */}
        <div className="flex justify-center gap-20 w-full">
          {bottomRow.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}