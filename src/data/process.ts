export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    summary: "Understand the business, requirements, and objectives.",
    detail:
      "We learn how the work happens today: who the customer is, which steps are painful, and what a useful first release would change. You leave this stage with a shared description of the problem, not a pile of feature ideas.",
  },
  {
    number: "02",
    title: "Planning",
    summary: "Define features, priorities, structure, and milestones.",
    detail:
      "We turn the discovery notes into a sequence. Features are ordered, open questions are listed, and milestones are dated against the people who have to review them. Scope that is not in this release is written down so it is not forgotten or silently added.",
  },
  {
    number: "03",
    title: "Design",
    summary: "Build user journeys, wireframes, and polished interfaces.",
    detail:
      "We design the path someone actually takes, including empty states and the screen after they succeed. You review interfaces with real labels and content, then we lock the decisions that development will follow.",
  },
  {
    number: "04",
    title: "Development",
    summary: "Implement the application using suitable technologies.",
    detail:
      "We build the agreed release with the stack that fits the product. You see working software at the milestones we set, and changes are handled as decisions rather than as endless side requests.",
  },
  {
    number: "05",
    title: "Testing",
    summary: "Check workflows, usability, responsiveness, and security.",
    detail:
      "We walk the main paths on the devices the audience uses, check forms and permissions, and fix what fails before launch. You get a chance to try the same paths with the people who will live in the product.",
  },
  {
    number: "06",
    title: "Launch & Support",
    summary: "Deploy and provide agreed post-launch support.",
    detail:
      "We deploy, watch the first real use, and stay available for the support window written into the agreement. Further work is planned as a next release, not as an open-ended promise.",
  },
] as const;
