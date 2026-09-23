/** Practical prompts and hypothetical examples, not measured project outcomes. */
export const frameworks = [
  {
    id: 'constraints', situation: 'Everything feels urgent', name: 'Find the constraint',
    principle: 'Improve the step that limits the whole system.',
    insight: 'A faster team can still make the operation slower if it feeds work into an overloaded handover.',
    model: 'Theory of constraints',
    questions: ['Where does unfinished work keep accumulating?', 'What is waiting: people, information, equipment or approval?', 'Would improving this step increase completed work for the whole operation?'],
    experiment: 'For one shift, record arrival, start and finish times at the suspected bottleneck. Try one change there before adding capacity elsewhere.',
    example: 'A hypothetical warehouse speeds up picking, but dispatch queues grow. Measuring the handover may reveal that missing paperwork, rather than picking capacity, limits completed deliveries.',
    limit: 'The bottleneck can move. Recheck after the change and watch safety, quality and downstream queues.',
    related: '/maxwell-excel', relatedLabel: 'Inspect the container operations case',
  },
  {
    id: 'inversion', situation: 'A plan looks too convincing', name: 'Work backward from failure',
    principle: 'Ask what would make the plan fail before asking how to scale it.',
    insight: 'The most useful feature may be the failure you make impossible.',
    model: 'Inversion + pre-mortem',
    questions: ['Imagine this failed in three months. What happened?', 'Which single assumption carries the most risk?', 'What early signal would make you stop or change course?'],
    experiment: 'Choose one likely failure. Write a visible stop condition, give someone ownership and test recovery before widening the rollout.',
    example: 'A hypothetical sensor app displays an old reading as healthy. A freshness label and a clear offline state may matter more than another chart.',
    limit: 'A pre-mortem surfaces possibilities; it does not estimate their probability or replace field testing.',
    related: '/velyqua', relatedLabel: 'Explore the water-intelligence prototype',
  },
  {
    id: 'information', situation: 'You need more evidence', name: 'Buy information before commitment',
    principle: 'Run the smallest test that could change the decision.',
    insight: 'More data is useful only when a possible result would change what you do.',
    model: 'Value of information',
    questions: ['What exactly would you decide today?', 'Which uncertainty could reverse that decision?', 'What is the cheapest credible way to reduce that uncertainty?'],
    experiment: 'Write the decision, the uncertain assumption and the result that would change your mind. Compare two options in a bounded trial.',
    example: 'Before automating a recurring report, a hypothetical team delivers it manually to three users and checks which decisions it actually changes.',
    limit: 'Small trials can miss rare failures and selection bias. Use the result only within the conditions tested.',
    related: '/portal', relatedLabel: 'Explore ideas and experiments in The Portal',
  },
  {
    id: 'optionality', situation: 'The decision is expensive to undo', name: 'Keep the next move open',
    principle: 'Separate reversible experiments from difficult-to-reverse commitments.',
    insight: 'The right first move can be the one that preserves choices rather than maximises immediate output.',
    model: 'Reversibility + optionality',
    questions: ['What becomes hard to undo after this decision?', 'Can we limit the change to one team, site or workflow?', 'What must stay portable if the experiment fails?'],
    experiment: 'Set a time limit, a rollback path and a success threshold before starting. Keep original records and test that they can be recovered.',
    example: 'A hypothetical team pilots an assistant on draft recommendations before allowing changes to operational records.',
    limit: 'Reversibility has a cost. A small experiment still needs clear ownership and boundaries.',
    related: '/jarvis', relatedLabel: 'Follow a JARVIS decision walkthrough',
  },
  {
    id: 'signals', situation: 'The dashboard says green', name: 'Look for the missing signal',
    principle: 'Pair outcome measures with signs of emerging risk.',
    insight: 'Averages can hide the exception that matters most. Ask what the dashboard makes invisible.',
    model: 'Leading indicators + second-order effects',
    questions: ['Which average could hide a harmful outlier?', 'What changes before the outcome becomes visible?', 'Could this target reward behaviour that damages the wider system?'],
    experiment: 'Inspect exceptions alongside the headline measure. Track a balancing measure, such as rework alongside speed, before changing incentives.',
    example: 'A hypothetical operation meets its average dispatch target while a small group of delayed jobs keeps getting older. Queue age exposes what the average hides.',
    limit: 'An early signal is a hypothesis until tested. Correlation alone does not establish cause.',
    related: '/evidence?grade=synth', relatedLabel: 'Read the synthetic risk-analysis example',
  },
];

export function resolveFramework(id) {
  return frameworks.find((item) => item.id === id) || frameworks[0];
}

export function buildDecisionBrief(framework, answers) {
  return `${framework.name}\n\n${framework.questions.map((question, index) => `${question}\n${answers[index]?.trim() || '(To explore)'}`).join('\n\n')}\n\nPossible first experiment:\n${framework.experiment}`;
}
