import type { Project, ProjectImage } from "@/types/content";

type Shot = { alt: string; kind: ProjectImage["kind"] };

function shots(slug: string, items: Shot[]): ProjectImage[] {
  return items.map((item, index) => ({
    src: `/projects/${slug}/${index + 1}.webp`,
    alt: item.alt,
    kind: item.kind,
  }));
}

export const projects: Project[] = [
  {
    slug: "arc-interiors",
    title: "ARC Interiors & Cabinetry",
    clientName: "ARC Interiors & Cabinetry",
    industry: "Interiors",
    solution: "Corporate Website",
    summary:
      "A composed website for a Philippine interiors studio, presenting modular cabinetry, renovation work, and a clear path to request a quote.",
    overview:
      "ARC Interiors crafts house renovation, condo renovation, and modular cabinets. The website gives that work a quiet, architectural presentation: a full-bleed opening, straightforward navigation, and a direct route from browsing spaces to asking for a consultation.",
    requirements: [
      "Present renovation and cabinetry work with the same care as the finished rooms.",
      "Give homeowners a simple way to explore the studio and request a quote.",
      "Keep the site readable on phones, where many first visits happen.",
    ],
    features: [
      "Homepage built around a large interior photograph and a precise headline.",
      "Navigation for Home, About, Spaces, Projects, and Contact.",
      "Calls to action for exploring the work and requesting a consultation.",
      "A quote path labeled for visitors who are ready to talk.",
    ],
    deliverables: [
      "Marketing website",
      "Project and spaces presentation",
      "Consultation and quote entry points",
    ],
    images: shots("arc-interiors", [
      {
        alt: "Homepage of the ARC Interiors & Cabinetry website, with a modular cabinet interior and the headline Spaces Designed With Purpose.",
        kind: "homepage",
      },
      { alt: "Additional screen from the ARC Interiors & Cabinetry website.", kind: "interface" },
      { alt: "Additional screen from the ARC Interiors & Cabinetry website.", kind: "interface" },
      { alt: "Additional screen from the ARC Interiors & Cabinetry website.", kind: "interface" },
      { alt: "Additional screen from the ARC Interiors & Cabinetry website.", kind: "interface" },
    ]),
    websiteUrl: "https://www.arcinteriors-cabinetry.com/",
    featured: true,
    homepageOrder: 1,
    presentation: "browser",
    published: true,
  },
  {
    slug: "illuminate",
    title: "Illuminate Medical Aesthetics",
    clientName: "Illuminate",
    industry: "Healthcare & Clinics",
    solution: "Business System",
    summary:
      "A clinic website and operations interface for booking visits, presenting treatments, and signing staff in to appointments, sales, and client care.",
    overview:
      "Illuminate is an aesthetic clinic product with two sides of the same practice. Patients can reserve a private session from a calendar. The team has a sign-in for managing appointments, sales, and client care, alongside a treatment lookbook that explains services in plain language.",
    requirements: [
      "Let clients choose a date and time without a confusing booking flow.",
      "Give the clinic a staff entrance for day-to-day appointment and client work.",
      "Present treatments clearly enough that a visitor understands the menu before they reserve.",
    ],
    features: [
      "Public booking screen with a monthly calendar and available hours.",
      "Navigation for reserve, services, feedback, login, and registration.",
      "Staff sign-in for appointments, sales, and client care, including email and social sign-in options shown on the screen.",
      "Treatment lookbook covering facial care, gluta drips, anti-aging, laser, and scar treatments.",
    ],
    deliverables: [
      "Clinic website",
      "Appointment booking interface",
      "Staff sign-in",
      "Service lookbook",
    ],
    images: shots("illuminate", [
      {
        alt: "Illuminate booking page with an October calendar and a list of available visit hours.",
        kind: "homepage",
      },
      {
        alt: "Illuminate staff sign-in screen for managing appointments, sales, and client care.",
        kind: "interface",
      },
      {
        alt: "Illuminate treatment lookbook showing facial care, gluta drips, anti-aging, laser, and scar treatments.",
        kind: "interface",
      },
      { alt: "Additional screen from the Illuminate clinic system.", kind: "interface" },
    ]),
    websiteUrl: "https://illuminate-6ooz.vercel.app/",
    featured: true,
    homepageOrder: 2,
    presentation: "browser",
    published: true,
  },
  {
    slug: "njmrf-pharmacy",
    title: "NJMRF Pharmacy",
    clientName: "NJMRF Messiah Sanare Pharmacy",
    industry: "Healthcare & Clinics",
    solution: "E-Commerce",
    summary:
      "An online counter for a licensed neighborhood pharmacy, with a product catalog, cart, and a checkout path built around QR payment and delivery.",
    overview:
      "NJMRF Messiah Sanare Pharmacy needed a website that still felt like the botica people already trust. The storefront explains how to browse what is in stock, pay by QR, and receive an order by pickup or J&T Express. Staff review orders before packing.",
    requirements: [
      "Let patients see products and place an order without standing at the counter.",
      "Make payment and delivery steps explicit before checkout.",
      "Keep a sign-in path and a cart available from the main navigation.",
    ],
    features: [
      "Homepage introducing the pharmacy and the online ordering path.",
      "Shop organized by need, with featured products on the shelf.",
      "Cart, shop, and sign-in in the header.",
      "On-page explanation of QR payment, pharmacist review, pickup, and J&T delivery.",
    ],
    deliverables: [
      "Pharmacy e-commerce website",
      "Product browsing",
      "Cart and order path",
      "Payment and delivery instructions",
    ],
    images: shots("njmrf-pharmacy", [
      {
        alt: "NJMRF Pharmacy homepage inviting patients to order medicines online.",
        kind: "homepage",
      },
      {
        alt: "NJMRF Pharmacy shop section with featured medicines and a short explanation of how orders are reviewed and delivered.",
        kind: "interface",
      },
      { alt: "Additional screen from the NJMRF Pharmacy website.", kind: "interface" },
      { alt: "Additional screen from the NJMRF Pharmacy website.", kind: "interface" },
      { alt: "Additional screen from the NJMRF Pharmacy website.", kind: "interface" },
    ]),
    websiteUrl: "https://www.njmrf-pharmacy.com/",
    featured: true,
    homepageOrder: 3,
    presentation: "browser",
    published: true,
  },
  {
    slug: "avea-solutions",
    title: "AVEA Solutions",
    clientName: "AVEA Solutions",
    industry: "Professional Services",
    solution: "Corporate Website",
    summary:
      "A professional services website for a Philippine staffing firm that places dedicated remote teams with law firms and professional practices.",
    overview:
      "AVEA Solutions uses the site to explain a specific offer: managed remote staffing, not freelance placement. The page leads with the problem it removes — hiring overhead — then points visitors to a consultation, the staffing model, engagements, and answers to common questions.",
    requirements: [
      "Explain the staffing model in a single reading, without a generic agency homepage.",
      "Separate the story for prospective clients from supporting pages such as FAQ and contact.",
      "Make the consultation request obvious.",
    ],
    features: [
      "Split homepage with the AVEA identity and a consultation call to action.",
      "Navigation for About, How we staff, Engagements, Why Avea, FAQ, and Contact.",
      "A partnership note describing dedicated teams rather than freelance placement.",
    ],
    deliverables: ["Company website", "Service explanation", "Consultation inquiry path"],
    images: shots("avea-solutions", [
      {
        alt: "AVEA Solutions homepage with the headline Your Team, Without the HR Hassle.",
        kind: "homepage",
      },
      { alt: "Additional screen from the AVEA Solutions website.", kind: "interface" },
      { alt: "Additional screen from the AVEA Solutions website.", kind: "interface" },
      { alt: "Additional screen from the AVEA Solutions website.", kind: "interface" },
      { alt: "Additional screen from the AVEA Solutions website.", kind: "interface" },
    ]),
    websiteUrl: "https://www.avea.solutions/",
    featured: true,
    homepageOrder: 4,
    presentation: "browser",
    published: true,
  },
  {
    slug: "hm-dormitory",
    title: "HM Dormitory",
    clientName: "HM Dormitory",
    industry: "Travel & Hospitality",
    solution: "Booking Platform",
    summary:
      "A dormitory website with room information, house rules, and a live availability view of beds across floors.",
    overview:
      "HM Dormitory publishes the practical details a resident needs before inquiring: rooms, amenities, rates, house rules, and a registration form. A separate availability view reports open bed spaces, occupancy, and a floor-by-floor breakdown.",
    requirements: [
      "Show the property and explain how to check availability.",
      "Publish rates, amenities, FAQ, and house rules in one place.",
      "Give staff and visitors a current view of open beds by floor.",
    ],
    features: [
      "Homepage with property photography, availability count, and links to rooms and registration.",
      "Navigation for Rooms, Amenities, Rates, FAQ, House Rules, and Contact.",
      "Availability dashboard with open bed spaces, room counts, and occupancy by floor.",
    ],
    deliverables: [
      "Dormitory information website",
      "Availability dashboard",
      "Registration entry point",
    ],
    images: shots("hm-dormitory", [
      {
        alt: "HM Dormitory homepage with the building exterior and a control to check availability.",
        kind: "homepage",
      },
      {
        alt: "HM Dormitory room availability dashboard showing open bed spaces by floor.",
        kind: "dashboard",
      },
      { alt: "Additional screen from the HM Dormitory website.", kind: "interface" },
      { alt: "Additional screen from the HM Dormitory website.", kind: "interface" },
      { alt: "Additional screen from the HM Dormitory website.", kind: "interface" },
    ]),
    websiteUrl: "https://hmdormitory.com",
    featured: true,
    homepageOrder: 5,
    presentation: "browser",
    published: true,
  },
  {
    slug: "cv-travel",
    title: "CV Travel & Tours",
    clientName: "CV Travel & Tours",
    industry: "Travel & Hospitality",
    solution: "Corporate Website",
    summary:
      "A travel agency website for browsing resorts, reading services, and sending a trip inquiry.",
    overview:
      "CV Travel & Tours leads with destination photography and a short path to plan a trip. Visitors can move through the resort gallery, services, reviews, and contact without losing the inquiry actions.",
    requirements: [
      "Present destinations in a way that feels considered, not like a brochure dump.",
      "Offer both a direct inquiry and a way to explore resorts.",
      "Keep contact details available while someone is still browsing.",
    ],
    features: [
      "Full-width destination homepage with inquire and explore actions.",
      "Navigation for About, Resort Gallery, Services, Reviews, and Contact.",
      "A plan-a-trip action in the header.",
    ],
    deliverables: ["Travel agency website", "Resort presentation", "Trip inquiry path"],
    images: shots("cv-travel", [
      {
        alt: "CV Travel & Tours homepage featuring a resort pool and a plan-a-trip action.",
        kind: "homepage",
      },
      { alt: "Additional screen from the CV Travel & Tours website.", kind: "interface" },
      { alt: "Additional screen from the CV Travel & Tours website.", kind: "interface" },
      { alt: "Additional screen from the CV Travel & Tours website.", kind: "interface" },
      { alt: "Additional screen from the CV Travel & Tours website.", kind: "interface" },
    ]),
    websiteUrl: "https://cvtravelandtours.asia",
    featured: true,
    homepageOrder: 6,
    presentation: "browser",
    published: true,
  },
  {
    slug: "pinoy-online-venture",
    title: "Pinoy Online Venture",
    clientName: "Pinoy Online Venture",
    industry: "Community",
    solution: "Community Platform",
    summary:
      "A mobile-first community site for a Filipino digital entrepreneurship group, with sections for members, founders, events, and news.",
    overview:
      "Pinoy Online Venture introduces a community built around digital skills and entrepreneurship. The interface is designed as a phone experience: a compact header, a bottom navigation bar, and pages for community, founders, events, news, partnership, and login.",
    requirements: [
      "Explain the community clearly on a small screen.",
      "Give members obvious places to find events, news, and partnership information.",
      "Include a login path without crowding the public introduction.",
    ],
    features: [
      "Mobile homepage with a short introduction and community call to action.",
      "Community page stating the group's mission and vision.",
      "Bottom navigation for Home, Community, Founders, Events, News, Partnership, and Login.",
    ],
    deliverables: ["Mobile community website", "Public information pages", "Member login entry"],
    images: shots("pinoy-online-venture", [
      {
        alt: "Mobile homepage of Pinoy Online Venture with bottom navigation for community sections.",
        kind: "mobile",
      },
      {
        alt: "Pinoy Online Venture community page describing the group's mission and vision.",
        kind: "mobile",
      },
      { alt: "Additional mobile screen from Pinoy Online Venture.", kind: "mobile" },
      { alt: "Additional mobile screen from Pinoy Online Venture.", kind: "mobile" },
      { alt: "Additional mobile screen from Pinoy Online Venture.", kind: "mobile" },
    ]),
    websiteUrl: "https://pinoyonlineventures.com",
    featured: false,
    homepageOrder: null,
    presentation: "phone",
    published: true,
  },
  {
    slug: "msmalabanan",
    title: "MSMalabanan Services",
    clientName: "MSMalabanan Barado Expert",
    industry: "Home Services",
    solution: "Corporate Website",
    summary:
      "A service website for septic, declogging, and plumbing work, written for homeowners who need a quote or a call.",
    overview:
      "MSMalabanan Barado Expert uses the site to answer a practical question: who to call for septic siphoning, declogging, and plumbing. The homepage states the services in plain language, then offers a quotation form and a click-to-call action.",
    requirements: [
      "Make the service list understandable at a glance.",
      "Offer both a quote request and an immediate call.",
      "Cover the supporting pages people check before they hire: why us, how it works, and FAQ.",
    ],
    features: [
      "Service homepage for septic, declogging, and plumbing.",
      "Navigation for Services, Why Us, How It Works, FAQ, and Contact.",
      "Quotation and call actions in the header and the hero.",
    ],
    deliverables: ["Service business website", "Quote request", "FAQ and process pages"],
    images: shots("msmalabanan", [
      {
        alt: "MSMalabanan services homepage for septic tank, declogging, and plumbing work.",
        kind: "homepage",
      },
      { alt: "Additional screen from the MSMalabanan website.", kind: "interface" },
      { alt: "Additional screen from the MSMalabanan website.", kind: "interface" },
      { alt: "Additional screen from the MSMalabanan website.", kind: "interface" },
      { alt: "Additional screen from the MSMalabanan website.", kind: "interface" },
    ]),
    websiteUrl: "https://msmalabanan.com",
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "kocoon-wellness",
    title: "Kocoon Wellness Spa",
    clientName: "Kocoon Wellness Spa",
    industry: "Wellness",
    solution: "Corporate Website",
    summary:
      "A spa website for Kocoon's Baguio and Manila locations, with services, team, gallery, and appointment requests.",
    overview:
      "Kocoon Wellness Spa needed a site that could introduce the brand and still help someone book. The homepage pairs a short description of the Baguio and Manila locations with appointment and service actions, and the navigation continues into the team and gallery.",
    requirements: [
      "Introduce the spa without burying the appointment request.",
      "Give each location a way to be contacted.",
      "Leave room for services, team, and gallery.",
    ],
    features: [
      "Dark, image-led homepage with appointment and services actions.",
      "Navigation for About, Services, Our Team, Gallery, and Contact.",
      "Location references for Baguio and Manila on the opening screen.",
    ],
    deliverables: ["Spa website", "Service introduction", "Appointment inquiry"],
    images: shots("kocoon-wellness", [
      {
        alt: "Kocoon Wellness Spa homepage with appointment and services actions.",
        kind: "homepage",
      },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
      { alt: "Additional screen from the Kocoon Wellness Spa website.", kind: "interface" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "nrs-technologies",
    title: "NRS Technologies",
    clientName: "NRS Technologies",
    industry: "Technology",
    solution: "Corporate Website",
    summary:
      "A corporate website for a technology and business-solutions company, organized around services, the firm, and a direct contact path.",
    overview:
      "NRS Technologies presents itself as a partner for operations, technology, and strategy. The site opens with that claim, then routes visitors into services, an about page, a short case for the company, and contact.",
    requirements: [
      "Establish the company in one screen.",
      "Organize services so a visitor can go deeper without a long homepage.",
      "Keep a visible contact action.",
    ],
    features: [
      "Corporate homepage with service and contact actions.",
      "Navigation for Home, Services, About Us, Why NRS, and Contact.",
      "A services menu from the header.",
    ],
    deliverables: ["Corporate website", "Services navigation", "Contact path"],
    images: shots("nrs-technologies", [
      {
        alt: "NRS Technologies homepage with the headline Powering Your Next Move.",
        kind: "homepage",
      },
      { alt: "Additional screen from the NRS Technologies website.", kind: "interface" },
      { alt: "Additional screen from the NRS Technologies website.", kind: "interface" },
      { alt: "Additional screen from the NRS Technologies website.", kind: "interface" },
      { alt: "Additional screen from the NRS Technologies website.", kind: "interface" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "novaterra",
    title: "Novaterra",
    clientName: "Novaterra Circular Economy Inc.",
    industry: "Environment",
    solution: "Corporate Website",
    summary:
      "A company website explaining Novaterra's circular-economy work, from waste streams through processing and product recovery.",
    overview:
      "Novaterra Circular Economy Inc. needed a site that could explain a technical process to partners who are not engineers. The homepage introduces the company, then uses a diagram to show how material moves from a waste stream through assessment, processing, and recovery.",
    requirements: [
      "Explain the company and its process without assuming specialist knowledge.",
      "Support longer pages for technology, sustainability, and news.",
      "Offer a partner conversation, not only a generic contact link.",
    ],
    features: [
      "Homepage with a process diagram and two primary actions.",
      "Navigation for About, Technology, Sustainability, News & Updates, and Contact.",
      "Topic labels for environmental sustainability, circular economy, resource recovery, and pyrolysis technology.",
    ],
    deliverables: ["Corporate website", "Process explanation", "Partner inquiry path"],
    images: shots("novaterra", [
      {
        alt: "Novaterra homepage explaining a circular-economy process from waste stream to recovered value.",
        kind: "homepage",
      },
      { alt: "Additional screen from the Novaterra website.", kind: "interface" },
      { alt: "Additional screen from the Novaterra website.", kind: "interface" },
      { alt: "Additional screen from the Novaterra website.", kind: "interface" },
      { alt: "Additional screen from the Novaterra website.", kind: "interface" },
      { alt: "Additional screen from the Novaterra website.", kind: "interface" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "corenelius",
    title: "Corenelius Technologies & Construction",
    clientName: "Corenelius Technologies & Construction Inc.",
    industry: "Construction",
    solution: "Corporate Website",
    summary:
      "A corporate website for an infrastructure and construction firm, covering the company, its work, partners, and proposal requests.",
    overview:
      "Corenelius Technologies & Construction Inc. uses the site to introduce sewage treatment, infrastructure, and integrated construction work. The homepage pairs a direct description with project photography and a request for proposals.",
    requirements: [
      "Present the firm and its field of work on the first screen.",
      "Provide pages for company, services, projects, and partners.",
      "Make it easy to request a proposal.",
    ],
    features: [
      "Homepage with project photography and proposal and technology actions.",
      "Navigation for Company, Services, Projects, Partners, and Contact.",
      "A short facts row beneath the introduction.",
    ],
    deliverables: ["Corporate website", "Project introduction", "Proposal request"],
    images: shots("corenelius", [
      {
        alt: "Corenelius Technologies & Construction homepage with infrastructure photography and a proposal request.",
        kind: "homepage",
      },
      { alt: "Additional screen from the Corenelius website.", kind: "interface" },
      { alt: "Additional screen from the Corenelius website.", kind: "interface" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "r-and-e-travel",
    title: "R and E Travel and Tour",
    clientName: "R and E Travel and Tour",
    industry: "Travel & Hospitality",
    solution: "Corporate Website",
    summary:
      "A tour-operator website for destinations and packages, with a trip-planning inquiry for travelers.",
    overview:
      "R and E Travel and Tour, based in San Juan, Batangas, uses the site to introduce destinations and tour packages. The homepage points visitors toward packaged trips or a custom plan, with FAQ and contact pages for the questions that follow.",
    requirements: [
      "Lead with destinations rather than a long company history.",
      "Separate tour packages from a custom trip request.",
      "Answer common questions before someone has to call.",
    ],
    features: [
      "Destination homepage with package and trip-planning actions.",
      "Navigation for Destinations, Tour Packages, About, FAQs, and Contact.",
      "A header action to plan a trip.",
    ],
    deliverables: ["Travel website", "Package presentation", "Trip inquiry"],
    images: shots("r-and-e-travel", [
      {
        alt: "R and E Travel and Tour homepage with a coastal destination and tour-package actions.",
        kind: "homepage",
      },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
      { alt: "Additional screen from the R and E Travel and Tour website.", kind: "interface" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "browser",
    published: true,
  },
  {
    slug: "wulu-scanner",
    title: "WULU Scanner",
    clientName: "WULU Scanner",
    industry: "Financial Software",
    solution: "Custom Application",
    summary:
      "A custom workstation for reviewing market scans, watchlists, and signal status in one dark operations interface.",
    overview:
      "WULU Scanner is a custom web application organized like a trading desk. The interface brings overview, scanner, watchlist, signals, charts, alerts, and a trade journal into a single workspace. The screens shown here are for review and status. They state that automatic trading stays off and that market data in view may be unverified.",
    requirements: [
      "Put scanning, signals, and account status in one workspace.",
      "Make the current recommendation and its caveats readable at a glance.",
      "Keep secondary tools — journal, alerts, charts, settings — available without leaving the app.",
    ],
    features: [
      "Overview with session status, feed state, selected symbol, and recent scans.",
      "Scanner view with a symbol brief, watchlist, and a visible recommendation.",
      "Navigation for opportunities, live monitor, signals, charts, positions, orders, alerts, journal, backtesting, and settings.",
    ],
    deliverables: [
      "Custom web application",
      "Scanner and overview workspaces",
      "Watchlist and signal review screens",
    ],
    images: shots("wulu-scanner", [
      {
        alt: "WULU Scanner overview workspace with session status and a recent scans table.",
        kind: "dashboard",
      },
      {
        alt: "WULU Scanner symbol view with a watchlist and a signal recommendation panel.",
        kind: "dashboard",
      },
      { alt: "Additional WULU Scanner workspace.", kind: "dashboard" },
      { alt: "Additional WULU Scanner workspace.", kind: "dashboard" },
      { alt: "Additional WULU Scanner workspace.", kind: "dashboard" },
      { alt: "Additional WULU Scanner workspace.", kind: "dashboard" },
    ]),
    websiteUrl: null,
    featured: false,
    homepageOrder: null,
    presentation: "dashboard",
    published: true,
  },
];

export const industries = [...new Set(projects.map((project) => project.industry))];
export const solutionTypes = [...new Set(projects.map((project) => project.solution))];

export function getLocalProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}
