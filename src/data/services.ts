import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    navLabel: "Website Development",
    summary:
      "Business websites with a clear structure, careful writing, and the technical basics that help people find and trust you.",
    description:
      "A website is often the first working product a business has. We design and build sites that explain what you do, make the next step obvious, and stay straightforward to update after launch.",
    problem:
      "Many businesses are asked to choose between a template that almost fits and a rebuild that takes too long. The useful middle is a site structured around your actual services, written in your language, and built so it can grow into a store, a portal, or a campaign page later.",
    offerings: [
      "Business landing pages for a single offer or launch",
      "Corporate websites with room for services, proof, and contact",
      "Responsive layouts for phones, tablets, and wide screens",
      "SEO foundations: titles, descriptions, headings, and indexable pages",
      "Content structures that a team can keep current",
    ],
    benefits: [
      "Visitors understand the offer without a sales call.",
      "The same pages work as a reference for proposals and ads.",
      "The build leaves a sensible place for later features instead of a dead end.",
    ],
    approach: [
      {
        title: "Map the pages to the business",
        detail:
          "We start from the questions customers already ask, then decide which pages those questions need.",
      },
      {
        title: "Design the reading order",
        detail:
          "Hierarchy, photography, and calls to action are placed for a first visit, not for a sitemap diagram.",
      },
      {
        title: "Build and hand over cleanly",
        detail:
          "We implement the site, check it on real devices, and leave you with a launch checklist.",
      },
    ],
    faqs: [
      {
        question: "Can you work with copy and photos we already have?",
        answer:
          "Yes. If the material is thin, we will say so and help you decide what still needs to be written or photographed before design starts.",
      },
      {
        question: "Will the site be editable after launch?",
        answer:
          "When a content management setup is part of the scope, your team can update the pages we agreed on. We will name exactly which parts are editable before build.",
      },
      {
        question: "Do you include search setup?",
        answer:
          "Every website engagement includes the technical foundations: unique titles, descriptions, headings, alt text, and a sitemap. Ongoing search campaigns are a separate conversation.",
      },
    ],
    relatedProjects: ["arc-interiors", "avea-solutions", "novaterra", "nrs-technologies"],
    icon: "globe",
    displayOrder: 1,
    published: true,
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    navLabel: "E-Commerce",
    summary:
      "Online stores with catalogs, carts, and order flows that match how your team actually takes payment and ships.",
    description:
      "Selling online is a set of operations, not a theme. We build catalogs and checkout paths around the payment methods, stock rules, and fulfillment steps your business already uses.",
    problem:
      "A store that looks finished can still fail at the counter: unclear stock, a payment step customers do not trust, or orders that staff cannot reconcile. The build has to include those moments, not only the product grid.",
    offerings: [
      "Product catalogs organized the way customers shop",
      "Cart and checkout flows with explicit next steps",
      "Inventory presentation so people can see what is available",
      "Customer accounts where the business needs them",
      "Order views for the team packing or confirming purchases",
      "Payment-ready structure for the providers you choose to connect",
    ],
    benefits: [
      "Customers know whether an item can be ordered before they commit.",
      "Staff are not retyping every order from a chat screenshot.",
      "New products and categories have a place to go after launch.",
    ],
    approach: [
      {
        title: "Follow an order from shelf to door",
        detail:
          "We write down how a real purchase is paid, checked, and handed off before drawing the interface.",
      },
      {
        title: "Design the catalog around decisions",
        detail:
          "Categories, variants, and stock messages are chosen for the questions buyers actually ask.",
      },
      {
        title: "Connect payment when you are ready",
        detail:
          "We prepare the order flow for the payment method in scope and test it with your team before launch.",
      },
    ],
    faqs: [
      {
        question: "Which payment methods can you support?",
        answer:
          "That depends on the provider you want to use and what the engagement includes. We will name the integration in the proposal rather than imply every method is included.",
      },
      {
        question: "Can the store start small?",
        answer:
          "Yes. A focused catalog with a clear order path is often a better first release than a store with features nobody operates yet.",
      },
      {
        question: "Do you migrate an existing product list?",
        answer:
          "We can import an existing list when it is provided in a usable format. Cleanup of incomplete product data is scoped separately so the timeline stays honest.",
      },
    ],
    relatedProjects: ["njmrf-pharmacy"],
    icon: "bag",
    displayOrder: 2,
    published: true,
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    navLabel: "Web Applications",
    summary:
      "Internal tools, customer portals, and admin workspaces for work that a brochure site cannot carry.",
    description:
      "When the job is a daily workflow — reviewing records, approving requests, or giving customers a private view of their account — we design a web application around those tasks.",
    problem:
      "Spreadsheets and inboxes bend until a step gets missed. A custom application is justified when the same people repeat the same decisions and need one place to see status, role, and history.",
    offerings: [
      "Internal systems for teams that share a process",
      "Customer portals with only the information that customer should see",
      "Admin dashboards for the work of running the product",
      "Multi-role access so staff and customers are not in the same view",
      "Workflow states that match how a request actually moves",
    ],
    benefits: [
      "People spend less time asking where a request stands.",
      "Permissions follow the job, not a shared password.",
      "The interface can grow by module instead of being replaced.",
    ],
    approach: [
      {
        title: "Sit with the workflow",
        detail:
          "We list the roles, the records, and the decisions before choosing screens.",
      },
      {
        title: "Prototype the busy path",
        detail:
          "The first design is the screen people will use every day, not the settings page.",
      },
      {
        title: "Release in slices",
        detail:
          "We ship a usable path, then add the adjacent tools once that path is trusted.",
      },
    ],
    faqs: [
      {
        question: "How do you decide the first version?",
        answer:
          "We look for the smallest set of screens that lets the team retire the current workaround. Everything else is queued, not stuffed into version one.",
      },
      {
        question: "Can different roles see different data?",
        answer:
          "Yes, when role-based access is part of the scope. We document who can view, create, and change each kind of record.",
      },
      {
        question: "Will this replace software we already pay for?",
        answer:
          "Only where a custom build is the simpler option. If an existing tool already fits, we would rather integrate with it.",
      },
    ],
    relatedProjects: ["wulu-scanner", "illuminate", "hm-dormitory"],
    icon: "panels",
    displayOrder: 3,
    published: true,
  },
  {
    slug: "business-management-systems",
    title: "Business Management Systems",
    navLabel: "Business Systems",
    summary:
      "Operating systems for inventory, appointments, sales, and the records a business runs on every day.",
    description:
      "We build management systems around a specific operation: a clinic's day, a dormitory's beds, a counter's sales, or a team's attendance. The point is a record everyone can trust.",
    problem:
      "Generic software often asks a business to change how it works. A management system should start from the records you already keep and remove the double entry, not add a second process beside the first.",
    offerings: [
      "Point-of-sale flows where a counter is part of the operation",
      "Inventory that matches how stock actually moves",
      "Appointment and booking tools for services with a calendar",
      "Clinic workflows for visits, services, and client records",
      "CRM-style records when relationships need a history",
      "Sales and reporting views for the numbers you already collect",
      "Attendance and payroll-related workflows when they are contracted",
    ],
    benefits: [
      "The day's work has a status, not a pile of messages.",
      "Reporting starts from the same records the team updates.",
      "New staff can follow the system instead of oral tradition.",
    ],
    approach: [
      {
        title: "Name the record of truth",
        detail:
          "We agree which system owns stock, bookings, or client history so two tools do not disagree.",
      },
      {
        title: "Design for the busiest hour",
        detail:
          "Screens are judged by how they behave when the counter, clinic, or front desk is busy.",
      },
      {
        title: "Train the handover",
        detail:
          "Launch includes the people who will use it, not only a link sent to the owner.",
      },
    ],
    faqs: [
      {
        question: "Do you build industry-specific systems?",
        answer:
          "We have delivered clinic, dormitory, pharmacy, and operations interfaces. Each engagement is scoped to that business. We do not resell one system as if it fit every industry.",
      },
      {
        question: "Can payroll be included?",
        answer:
          "Payroll-related workflows can be part of a contract when the rules and approvals are defined. We will not imply a full payroll product is included by default.",
      },
      {
        question: "What happens to our existing spreadsheets?",
        answer:
          "We use them as the source for the first import when they are complete enough. Gaps are listed before go-live so the new system does not start with silent missing data.",
      },
    ],
    relatedProjects: ["illuminate", "hm-dormitory", "njmrf-pharmacy"],
    icon: "building",
    displayOrder: 4,
    published: true,
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    navLabel: "Mobile Applications",
    summary:
      "Phone-first products and installable experiences for customers who will never sit down at a desktop.",
    description:
      "Some products are used in a queue, on a commute, or between tasks. We design those experiences for a phone first, then connect them to the same data your team already manages.",
    problem:
      "A desktop site squeezed onto a phone is not a mobile product. Navigation, forms, and the one action that matters have to be redesigned for a thumb and a short visit.",
    offerings: [
      "Cross-platform mobile applications when a store install is required",
      "Installable mobile web experiences when that is the better first release",
      "Interfaces designed around a small number of daily tasks",
      "API connections to the system that holds the real data",
      "Customer-facing flows such as membership, booking, or community updates",
    ],
    benefits: [
      "The primary task is reachable without hunting through a desktop menu.",
      "The phone app and the back office do not keep separate versions of the truth.",
      "You can start with a focused release and add sections later.",
    ],
    approach: [
      {
        title: "Choose the real device",
        detail:
          "We design against the phone your customers use, including one-handed reach and slow connections.",
      },
      {
        title: "Cut the navigation",
        detail:
          "A mobile product gets a short list of destinations. Everything else waits.",
      },
      {
        title: "Connect it to the system",
        detail:
          "Accounts, bookings, or content come from an API so the team is not updating two places.",
      },
    ],
    faqs: [
      {
        question: "Do you publish to the App Store and Google Play?",
        answer:
          "When a native or cross-platform release is in scope, store submission is planned with you. Account ownership stays with your business.",
      },
      {
        question: "Is a mobile website enough?",
        answer:
          "Often, yes. If the product is mostly reading, booking, or light interaction, a well-built mobile website can ship sooner. We will recommend an installable app only when it earns its cost.",
      },
      {
        question: "Can it share data with a website we already have?",
        answer:
          "Yes, if that site exposes a stable API or we build one. We confirm that during discovery rather than assuming the current site can be extended.",
      },
    ],
    relatedProjects: ["pinoy-online-venture", "illuminate"],
    icon: "phone",
    displayOrder: 5,
    published: true,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    navLabel: "UI/UX Design",
    summary:
      "Interfaces, flows, and design systems that make a product understandable before a line of production code is written.",
    description:
      "Design at Apex is not a coat of paint at the end. We shape the path through a product — what someone sees first, what they decide, and what the interface should quietly refuse to do.",
    problem:
      "Teams lose weeks building screens that answer the wrong question. A design phase that includes the real content, the empty states, and the awkward steps saves that time in development.",
    offerings: [
      "Interface design for marketing sites and applications",
      "Responsive design across phone, tablet, and desktop",
      "User flows for the tasks that matter, including failure and empty states",
      "Prototypes you can click through with stakeholders",
      "Design systems so later screens match the first ones",
    ],
    benefits: [
      "Stakeholders react to a flow, not a verbal description.",
      "Development starts from decisions that have already been argued through.",
      "Later features inherit type, color, and component rules.",
    ],
    approach: [
      {
        title: "Write the journey",
        detail:
          "We sketch the steps in words before we open a layout, including what happens when data is missing.",
      },
      {
        title: "Design with real content",
        detail:
          "Headlines, labels, and sample records come from the business so the layout is not a fantasy.",
      },
      {
        title: "Leave a system, not a pile of screens",
        detail:
          "Repeated components are named so the next page does not invent a new button.",
      },
    ],
    faqs: [
      {
        question: "Can you design without building?",
        answer:
          "Yes. A design engagement can end in a prototype and a specification another team implements. We will say what is included in the handoff.",
      },
      {
        question: "Do you user-test?",
        answer:
          "We review flows with the people who will use them when you can make those people available. Formal research studies are scoped on their own.",
      },
      {
        question: "Will the design match our existing brand?",
        answer:
          "If you have a logo, colors, and rules, we work inside them. If the identity is only a logo, we will extend it carefully and show you the decisions.",
      },
    ],
    relatedProjects: ["arc-interiors", "avea-solutions", "kocoon-wellness", "cv-travel"],
    icon: "pen",
    displayOrder: 6,
    published: true,
  },
  {
    slug: "automation-and-integrations",
    title: "Integrations and Automation",
    navLabel: "Automation",
    summary:
      "Connections between the tools you already run, so a status change in one place can update the next.",
    description:
      "Automation is useful when a person is copying the same fact from one system to another. We connect those systems and notify the right people when something needs a human decision.",
    problem:
      "A new app does not help if orders, bookings, or leads still have to be pasted somewhere else. The valuable work is the handover: what triggers it, what data moves, and what should stay manual.",
    offerings: [
      "API integrations with the systems named in the scope",
      "Workflow automation for repeated, well-defined steps",
      "Notifications when a person needs to act",
      "Connections to third-party tools you already pay for",
      "Process automation that leaves an audit of what changed",
    ],
    benefits: [
      "Fewer copies of the same customer record.",
      "The team is interrupted for exceptions, not for every routine step.",
      "When an integration fails, there is a visible status instead of a silent gap.",
    ],
    approach: [
      {
        title: "Trace one record",
        detail:
          "We follow a single lead, order, or booking across every tool it touches today.",
      },
      {
        title: "Decide what stays manual",
        detail:
          "Approval, payment exceptions, and judgment calls remain with a person. The busywork does not.",
      },
      {
        title: "Build the unhappy path",
        detail:
          "Timeouts, duplicates, and partial failures are part of the design, not a surprise after launch.",
      },
    ],
    faqs: [
      {
        question: "Can you connect any software?",
        answer:
          "Only if that software offers an API, a file export, or another supported method. We confirm access during discovery.",
      },
      {
        question: "Will automation run without supervision?",
        answer:
          "Routine steps can. We keep a person in the loop wherever a mistake would be expensive, and we do not describe that as fully unattended.",
      },
      {
        question: "What do you need from our other vendors?",
        answer:
          "API credentials, documentation, and sometimes a sandbox. If a vendor is slow to provide those, the timeline moves with them.",
      },
    ],
    relatedProjects: ["illuminate", "njmrf-pharmacy", "wulu-scanner"],
    icon: "workflow",
    displayOrder: 7,
    published: true,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Solutions",
    navLabel: "Digital Marketing",
    summary:
      "The technical side of marketing: pages that convert, tracking that is agreed in advance, and tools that follow up.",
    description:
      "We help businesses turn a website into a working marketing system. That means clearer offers, forms that reach a person, and automation around the campaigns you choose to run.",
    problem:
      "Traffic does not help if the page cannot explain the offer or if every inquiry lands in a personal inbox and stays there. Marketing technology should make the response reliable.",
    offerings: [
      "Conversion improvements on existing pages and forms",
      "A practical plan for the digital presence you already have",
      "Marketing automation for follow-up that you define",
      "Campaign landing pages and the tracking points agreed in scope",
    ],
    benefits: [
      "The page and the offer say the same thing.",
      "Inquiries have an owner and a status.",
      "You can see which pages are doing the work without a wall of vanity numbers.",
    ],
    approach: [
      {
        title: "Read the current path",
        detail:
          "We look at the page, the form, and what happens to a message after it is sent.",
      },
      {
        title: "Change the friction first",
        detail:
          "Unclear offers and broken follow-up are fixed before anyone talks about more traffic.",
      },
      {
        title: "Measure what you will act on",
        detail:
          "We set up only the measurements someone on your team will actually review.",
      },
    ],
    faqs: [
      {
        question: "Do you run ads?",
        answer:
          "Campaign management can be part of an engagement when it is written into the scope. This page describes the technology and page work. It is not a promise of ad spend or results.",
      },
      {
        question: "Can you guarantee leads?",
        answer:
          "No. We can improve the page, the form, and the follow-up. Lead volume depends on the offer, the market, and the budget you put behind distribution.",
      },
      {
        question: "Will you replace our current tools?",
        answer:
          "Not by default. We prefer to connect the email, CRM, or form tool you already use when it is capable enough.",
      },
    ],
    relatedProjects: ["msmalabanan", "cv-travel", "avea-solutions"],
    icon: "megaphone",
    displayOrder: 8,
    published: true,
  },
];

export function getLocalService(slug: string) {
  return services.find((service) => service.slug === slug);
}
