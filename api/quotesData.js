export const quotes = [
  // Linus Torvalds
  { quote: "Talk is cheap. Show me the code.", highlight: "Show me the code.", sub: "Delivering real solutions through clean, reliable and test-driven code.", author: "Linus Torvalds", role: "Linux & Git Creator", color: "#22d3ee" },
  { quote: "Given enough eyeballs, all bugs are shallow.", highlight: "all bugs are shallow.", sub: "Harnessing the power of open-source collaboration and code review.", author: "Linus Torvalds", role: "Linux & Git Creator", color: "#22d3ee" },
  { quote: "Bad programmers worry about code. Good programmers worry about data structures.", highlight: "data structures.", sub: "Architecting clean schemas and efficient relational models first.", author: "Linus Torvalds", role: "Linux & Git Creator", color: "#22d3ee" },

  // Martin Fowler
  { quote: "Any fool can write code that a computer can understand. Good programmers write code humans understand.", highlight: "code humans understand.", sub: "Prioritizing readability, domain clarity, and long-term team velocity.", author: "Martin Fowler", role: "Author & Chief Scientist", color: "#38bdf8" },
  { quote: "When you feel the need to write a comment, first try to refactor the code so any comment becomes superfluous.", highlight: "refactor the code", sub: "Creating self-documenting architectures with expressive naming.", author: "Martin Fowler", role: "Author & Chief Scientist", color: "#38bdf8" },
  { quote: "If you're not adding value to the code by refactoring, you're leaving behind technical debt.", highlight: "refactoring,", sub: "Continuously improving design hygiene with every commit.", author: "Martin Fowler", role: "Author & Chief Scientist", color: "#38bdf8" },

  // Robert C. Martin (Uncle Bob)
  { quote: "Clean code always looks like it was written by someone who cares.", highlight: "someone who cares.", sub: "Crafting maintainable, readable codebases with uncompromised standards.", author: "Robert C. Martin", role: "Uncle Bob", color: "#f472b6" },
  { quote: "Truth can only be found in one place: the code.", highlight: "the code.", sub: "Specs and docs drift, but production code is the ultimate ground truth.", author: "Robert C. Martin", role: "Uncle Bob", color: "#f472b6" },
  { quote: "You should name a variable using the same care with which you name a first-born child.", highlight: "same care", sub: "Clear naming reduces cognitive load across the entire codebase.", author: "Robert C. Martin", role: "Uncle Bob", color: "#f472b6" },
  { quote: "The ratio of time spent reading versus writing code is well over 10 to 1.", highlight: "10 to 1.", sub: "Optimize for the developer reading your code six months from now.", author: "Robert C. Martin", role: "Uncle Bob", color: "#f472b6" },

  // Kent Beck
  { quote: "Make it work, make it right, make it fast.", highlight: "make it fast.", sub: "Iterative development with a focus on correctness before premature optimization.", author: "Kent Beck", role: "Creator of XP & TDD", color: "#34d399" },
  { quote: "I'm not a great programmer; I'm just a good programmer with great habits.", highlight: "great habits.", sub: "Disciplined testing, continuous integration, and daily refactoring.", author: "Kent Beck", role: "Creator of XP & TDD", color: "#34d399" },
  { quote: "Optimism is an occupational hazard of programming: feedback is the treatment.", highlight: "feedback is the treatment.", sub: "Relying on unit tests, metrics, and real user observability.", author: "Kent Beck", role: "Creator of XP & TDD", color: "#34d399" },

  // Edsger W. Dijkstra
  { quote: "Simplicity is prerequisite for reliability.", highlight: "prerequisite for reliability.", sub: "Eliminating needless complexity to build robust, fault-tolerant systems.", author: "Edsger W. Dijkstra", role: "Computer Scientist", color: "#a855f7" },
  { quote: "If debugging is the process of removing bugs, then programming must be the process of putting them in.", highlight: "removing bugs,", sub: "Writing defensive code with static checks and end-to-end tests.", author: "Edsger W. Dijkstra", role: "Computer Scientist", color: "#a855f7" },

  // Donald Knuth
  { quote: "Premature optimization is the root of all evil in programming.", highlight: "Premature optimization", sub: "Focus on clean abstractions first, then profile before optimizing.", author: "Donald Knuth", role: "Author, Art of Programming", color: "#fb923c" },
  { quote: "Science is what we understand well enough to explain to a computer. Art is everything else.", highlight: "Art is everything else.", sub: "Blending technical precision with creative problem-solving.", author: "Donald Knuth", role: "Author, Art of Programming", color: "#fb923c" },

  // Alan Kay
  { quote: "Simple things should be simple, complex things should be possible.", highlight: "simple things should be simple,", sub: "Designing intuitive APIs and powerful developer experiences.", author: "Alan Kay", role: "Pioneer of OOP & GUI", color: "#22d3ee" },
  { quote: "The best way to predict the future is to invent it.", highlight: "invent it.", sub: "Building forward-thinking software that pushes boundaries.", author: "Alan Kay", role: "Pioneer of OOP & GUI", color: "#22d3ee" },

  // Brian Kernighan
  { quote: "Debugging is twice as hard as writing the code in the first place.", highlight: "twice as hard", sub: "If you write code as cleverly as possible, you are not smart enough to debug it.", author: "Brian Kernighan", role: "Co-creator of C & Unix", color: "#ec4899" },
  { quote: "Controlling complexity is the essence of computer programming.", highlight: "essence of computer programming.", sub: "Breaking massive problems into modular, composable functions.", author: "Brian Kernighan", role: "Co-creator of C & Unix", color: "#ec4899" },
  { quote: "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.", highlight: "careful thought,", sub: "Understanding execution flow methodically from input to output.", author: "Brian Kernighan", role: "Co-creator of C & Unix", color: "#ec4899" },

  // Grace Hopper
  { quote: "The most dangerous phrase in the language is, 'We've always done it this way.'", highlight: "done it this way.", sub: "Challenging legacy paradigms and adopting modern toolchains.", author: "Grace Hopper", role: "Computer Science Pioneer", color: "#a78bfa" },
  { quote: "One accurate measurement is worth a thousand expert opinions.", highlight: "accurate measurement", sub: "Driving architectural decisions with telemetry and real benchmarks.", author: "Grace Hopper", role: "Computer Science Pioneer", color: "#a78bfa" },

  // Cory House & Front-end Legends
  { quote: "Code is like humor. When you have to explain it, it's bad.", highlight: "When you have to explain it, it's bad.", sub: "Writing expressive, intuitive code and self-documenting architectures.", author: "Cory House", role: "React & JS Architect", color: "#38bdf8" },
  { quote: "Make your code so clean that a junior developer can understand it in five minutes.", highlight: "so clean", sub: "Democratizing codebase clarity across the entire engineering team.", author: "Dan Abramov", role: "Redux & React Core Contributor", color: "#22d3ee" },
  { quote: "The best error message is the one that never shows up.", highlight: "never shows up.", sub: "Building bulletproof input validations and delightful fallback UX.", author: "Thomas Fuchs", role: "Creator of Scriptaculous", color: "#34d399" },

  // Software Architecture & Engineering Principles
  { quote: "First, solve the problem. Then, write the code.", highlight: "solve the problem.", sub: "Architecting smart logic and scalable systems before typing the first line.", author: "John Johnson", role: "Software Architect", color: "#f472b6" },
  { quote: "Experience is the name everyone gives to their mistakes.", highlight: "gives to their mistakes.", sub: "Embracing bugs as growth opportunities and stepping stones to mastery.", author: "Oscar Wilde", role: "Philosopher & Writer", color: "#ec4899" },
  { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", highlight: "written for people to read,", sub: "Writing clean abstractions and self-documenting interfaces.", author: "Harold Abelson", role: "MIT Professor & Author", color: "#a855f7" },
  { quote: "It’s not a bug – it’s an undocumented feature.", highlight: "undocumented feature.", sub: "Turning edge-cases into reliable, well-tested specifications.", author: "Anonymous", role: "Hacker Lore", color: "#fb923c" },
  { quote: "There are only two hard things in Computer Science: cache invalidation and naming things.", highlight: "naming things.", sub: "Tackling state synchronicity and architectural semantics.", author: "Phil Karlton", role: "Netscape Architect", color: "#38bdf8" },
  { quote: "Walking on water and developing software from a specification are easy if both are frozen.", highlight: "if both are frozen.", sub: "Building agile, adaptable systems that thrive under changing requirements.", author: "Edward V. Berard", role: "Software Engineer", color: "#22d3ee" },
  { quote: "Software is eating the world, and code is the recipe.", highlight: "code is the recipe.", sub: "Powering industries with scalable modern web technologies.", author: "Marc Andreessen", role: "Co-founder Netscape & a16z", color: "#34d399" },
  { quote: "Good code is its own best documentation.", highlight: "best documentation.", sub: "Structure and clarity minimize the need for external maintenance guides.", author: "Steve McConnell", role: "Author of Code Complete", color: "#f472b6" },
  { quote: "A code is like a love letter you write to your future self.", highlight: "future self.", sub: "Ensuring clarity so future refactors are a joy, not a headache.", author: "Damian Conway", role: "Computer Scientist", color: "#ec4899" },
  { quote: "Deleted code is debugged code.", highlight: "Deleted code", sub: "Keeping repositories lean by aggressively pruning dead paths.", author: "Jeff Sickel", role: "Systems Engineer", color: "#a78bfa" },
  { quote: "Before software can be reusable it first has to be usable.", highlight: "first has to be usable.", sub: "Crafting pragmatic solutions before premature abstraction layers.", author: "Ralph Johnson", role: "Design Patterns (GoF) Author", color: "#fb923c" },
  { quote: "The function of good software is to make the complex appear simple.", highlight: "complex appear simple.", sub: "Hiding deep complexity behind sleek, effortless APIs.", author: "Grady Booch", role: "UML Co-developer", color: "#22d3ee" },
  { quote: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", highlight: "knows where you live.", sub: "Writing empathetic, clean, and defensively checked code.", author: "John Woods", role: "Classic Programmer Lore", color: "#f472b6" },
  { quote: "Testing can only prove the presence of bugs, not their absence.", highlight: "presence of bugs,", sub: "Combining automated testing with sound mathematical logic.", author: "Edsger W. Dijkstra", role: "Computer Scientist", color: "#a855f7" },
  { quote: "The key to performance is elegance, not battalions of special cases.", highlight: "elegance,", sub: "Writing clean, orthogonal algorithms that scale linearly.", author: "Jon Bentley", role: "Author of Programming Pearls", color: "#34d399" },
  { quote: "Without requirements or design, programming is the art of adding bugs to an empty text file.", highlight: "art of adding bugs", sub: "Clarifying requirements thoroughly before jumping into implementation.", author: "Louis Srygley", role: "Senior Developer", color: "#ec4899" },
  { quote: "Software undergoes beta testing shortly before it’s released. Beta is Latin for 'still doesn’t work.'", highlight: "still doesn’t work.", sub: "Iterating through continuous feedback loops and user validation.", author: "Anonymous", role: "Tech Humor", color: "#38bdf8" },
  { quote: "You can't have great software without a great team, and most teams behave like dysfunctional families.", highlight: "great software", sub: "Fostering empathetic engineering cultures and seamless async workflows.", author: "Jim McCarthy", role: "Microsoft Veteran", color: "#22d3ee" },
  { quote: "In programming, the hard part isn’t solving problems, but deciding what problems to solve.", highlight: "what problems to solve.", sub: "Focusing engineering energy on highest-leverage user outcomes.", author: "Paul Graham", role: "Y Combinator Founder", color: "#34d399" },
  { quote: "If you cannot explain it simply, you do not understand it well enough.", highlight: "explain it simply,", sub: "Distilling complex system designs into crystal-clear mental models.", author: "Albert Einstein", role: "Theoretical Physicist", color: "#fb923c" },
  { quote: "The computer was born to solve problems that did not exist before.", highlight: "solve problems", sub: "Harnessing automation to unlock new realms of possibility.", author: "Bill Gates", role: "Co-founder of Microsoft", color: "#a78bfa" },
  { quote: "Every great developer you know got there by solving problems they were unqualified to solve until they did it.", highlight: "unqualified to solve", sub: "Embracing challenges outside your comfort zone every single day.", author: "Patrick McKenzie", role: "Stripe Engineer & Author", color: "#f472b6" },
  { quote: "Ship early, ship often, and listen to your users.", highlight: "Ship early, ship often,", sub: "Fast iteration loops beat theoretical planning every time.", author: "Eric S. Raymond", role: "Author, Cathedral and Bazaar", color: "#22d3ee" }
];
