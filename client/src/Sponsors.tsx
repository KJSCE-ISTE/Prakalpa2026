import React from "react";
import IsteLogo from "./assets/ISTE_logo.png"; // Placeholder image
import VybexLogo from "./assets/sponsor_images/vybex_clothing.png";
import Web3Logo from "./assets/sponsor_images/web3_aligarh_community.png";
import XTCYlogo from "./assets/sponsor_images/XTCY_energy_drink.jpg";
import HODlogo from "./assets/sponsor_images/house_of_delicious_food_partner.jpg";
import Cloud9 from "./assets/sponsor_images/cloud9_beverage_partner.jpg";
import Ohig from "./assets/sponsor_images/Ohig_snack_partner.png";
import gic from "./assets/sponsor_images/give_my_certificate_certificate_partner.png";
import xyz from "./assets/sponsor_images/xyz_domain_partner.png";
import riidl from "./assets/sponsor_images/riidl_title_partner.png";
import raps from "./assets/sponsor_images/raps_gaming_partner.png";

const SPONSORS = [
  { id: 9,  name: "Riidl",              logo: riidl,    title: "Title Partner"       },
  { id: 1,  name: "Vybex Clothing",     logo: VybexLogo, title: "Merch Partner"      },
  { id: 2,  name: "Web3 Aligarh",       logo: Web3Logo,  title: "Community Partner"  },
  { id: 3,  name: "XTCY",              logo: XTCYlogo,  title: "Energy Drink Partner"},
  { id: 4,  name: "House of Delicious", logo: HODlogo,   title: "Food Partner", circular: true },
  { id: 5,  name: "Cloud9",            logo: Cloud9,    title: "Beverage Partner"    },
  { id: 6,  name: "OH!G",             logo: Ohig,      title: "Snack Partner"       },
  { id: 7,  name: "Give My Certificate",logo: gic,      title: "Certificate Partner" },
  { id: 8,  name: ".XYZ",             logo: xyz,       title: "Domain Partner"      },
  { id: 10, name: "RAPS",             logo: raps,      title: "Gaming Partner"      },
];

export default function Sponsors() {
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

        {/* Title Sponsor — full-width hero card */}
        <div className="flex justify-center mb-16 w-full">
          <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 w-full max-w-[400px]">
            <div className="w-48 h-48 relative flex items-center justify-center">
              <img
                src={SPONSORS[0].logo}
                alt={SPONSORS[0].name}
                className="w-full h-full object-contain saturate-50 opacity-100 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-bold text-lg tracking-wide">
                {SPONSORS[0].name}
              </span>
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: '#ec4899',
                  borderColor: 'rgba(236,72,153,0.4)',
                  background: 'rgba(236,72,153,0.08)',
                }}
              >
                {SPONSORS[0].title}
              </span>
            </div>
          </div>
        </div>

        {/* Sponsor Grid */}
        <div className="flex flex-wrap justify-center gap-20 w-full">
          {SPONSORS.slice(1).map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 flex-1 min-w-[200px] max-w-[300px]"
            >
              <div className={`w-32 h-32 relative flex items-center justify-center ${sponsor.circular ? "rounded-full overflow-hidden" : ""}`}>
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className={`w-full h-full ${sponsor.circular ? "object-cover" : "object-contain"} saturate-50 opacity-80 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110`}
                />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-white font-semibold text-sm tracking-wide">
                  {sponsor.name}
                </span>
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    color: '#ec4899',
                    borderColor: 'rgba(236,72,153,0.35)',
                    background: 'rgba(236,72,153,0.07)',
                  }}
                >
                  {sponsor.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}