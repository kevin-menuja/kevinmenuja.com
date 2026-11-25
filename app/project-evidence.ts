type Screenshot={src:string;alt:string;note:string;width:number;height:number};
export const primaryDimensions:Record<string,[number,number]>={
  "rice-and-kottu-hut-pos": [
    1440,
    1000
  ],
  "serviceops-group-project": [
    1280,
    889
  ],
  "startek-print-hub-pos": [
    1440,
    811
  ],
  "nwsdb-smart-water-billing-system": [
    1000,
    586
  ],
  "printxpress": [
    450,
    919
  ],
  "swiftdrive-rentals": [
    1440,
    960
  ]
};
export const additionalScreenshots:Record<string,Screenshot[]>={
  "rice-and-kottu-hut-pos": [
    {
      "src": "/images/gallery/rice-mobile.webp",
      "alt": "Real mobile POS billing interface showing demo menu items",
      "note": "Mobile billing \u00b7 synthetic demonstration data",
      "width": 369,
      "height": 800
    }
  ],
  "serviceops-group-project": [
    {
      "src": "/images/gallery/serviceops-inventory.webp",
      "alt": "Actual ServiceOps inventory overview with demonstration stock data",
      "note": "Inventory overview \u00b7 existing application preview",
      "width": 800,
      "height": 555
    },
    {
      "src": "/images/gallery/serviceops-history.webp",
      "alt": "Actual ServiceOps customer service history with demonstration records",
      "note": "Service history \u00b7 existing demonstration preview",
      "width": 800,
      "height": 555
    }
  ],
  "nwsdb-smart-water-billing-system": [
    {
      "src": "/images/gallery/nwsdb-staff.webp",
      "alt": "NWSDB staff operations portal with identifiable records redacted",
      "note": "Staff operations \u00b7 redacted academic report screenshot",
      "width": 800,
      "height": 429
    }
  ],
  "printxpress": [
    {
      "src": "/images/gallery/printxpress-catalogue.webp",
      "alt": "PrintXpress Android business card product catalogue",
      "note": "Product catalogue \u00b7 original academic application screenshot",
      "width": 390,
      "height": 800
    },
    {
      "src": "/images/gallery/printxpress-search.webp",
      "alt": "PrintXpress Android banner product search results",
      "note": "Product search \u00b7 original academic application screenshot",
      "width": 388,
      "height": 800
    }
  ]
};
type Node={title:string;tech:string;detail:string};
export const projectArchitecture:Record<string,Node[]>={
 "rice-and-kottu-hut-pos":[{title:"Restaurant UI",tech:"Next.js / React",detail:"Role-aware point-of-sale screens and back-office workflows."},{title:"Application services",tech:"TypeScript",detail:"Server-side business operations, order and payment validation."},{title:"Persistence",tech:"Prisma / PostgreSQL",detail:"Relational models and transactional persistence."}],
 "serviceops-group-project":[{title:"Role-based client",tech:"Next.js / React",detail:"Interfaces for service requests, dispatch, inventory and operational roles."},{title:"Service API",tech:"ASP.NET Core",detail:"Backend endpoints for application workflows and business logic."},{title:"Persistence",tech:"PostgreSQL / EF Core",detail:"Relational data storage accessed through Entity Framework Core."}],
 "startek-print-hub-pos":[{title:"Print operations UI",tech:"Next.js",detail:"POS billing, print jobs and operational reporting interfaces."},{title:"Business operations",tech:"TypeScript",detail:"Server-side order, invoice and financial workflow logic."},{title:"Persistence",tech:"Prisma / PostgreSQL",detail:"Relational persistence for operational records."}],
 "nwsdb-smart-water-billing-system":[{title:"Web client",tech:"ASP.NET Core MVC",detail:"Educational utility operations interfaces."},{title:"Service API",tech:"ASP.NET Core",detail:"API endpoints and application/domain logic for customers, meter readings and billing."},{title:"Infrastructure",tech:"EF Core / SQL",detail:"Relational persistence via the infrastructure layer."}],
 "printxpress":[{title:"Native interface",tech:"Android / XML",detail:"Mobile product discovery and ordering screens."},{title:"Application logic",tech:"Java",detail:"Local application workflows and input handling."},{title:"Local persistence",tech:"Room / SQLite",detail:"On-device relational storage for demonstration data."}],
 "swiftdrive-rentals":[{title:"Web interface",tech:"PHP / Bootstrap",detail:"Vehicle discovery, availability and staff management screens."},{title:"Server logic",tech:"PHP / PDO",detail:"Reservation pricing, availability and role-aware workflows."},{title:"Persistence",tech:"MySQL",detail:"Relational storage for fleet, reservation and synthetic demo records."}]
};
