/**
 * The Study Corner catalogue: four programmes × three levels × subjects.
 *
 * Source of truth is the IITM BS academics pages:
 *   ds → https://study.iitm.ac.in/ds/academics.html
 *   es → https://study.iitm.ac.in/es/academics.html
 *   ae → https://study.iitm.ac.in/ae/academics.html
 *   mg → https://study.iitm.ac.in/mg/academics.html
 *
 * This file is the *structure* (who exists, where they live). The actual
 * lecture/notes/PYQ links live next door in `resources.js` and are matched by
 * subject code, so adding a link never means touching this file.
 *
 * Shape:
 *   SUBJECTS[branch][level] = {
 *     core:      [ { code, name, description? } ],
 *     electives: [ { label, note?, subjects: [ … ] } ],   // degree level only
 *   }
 *
 * `code` is the official IITM course code where the programme publishes one.
 * A few elective lists (Aeronautics baskets, Management electives) are printed
 * without codes; those entries carry `name` only and the UI falls back to it.
 */

export const BRANCHES = [
  {
    key: 'ds',
    short: 'DS',
    name: 'Data Science',
    tagline: 'Programming, statistics and machine learning',
  },
  {
    key: 'es',
    short: 'ES',
    name: 'Electronic Systems',
    tagline: 'Circuits, embedded systems and signal processing',
  },
  {
    key: 'ae',
    short: 'AE',
    name: 'Aeronautics & Space Technology',
    tagline: 'Aerospace mechanics, aerodynamics and propulsion',
  },
  {
    key: 'mg',
    short: 'MG',
    name: 'Management & Data Science',
    tagline: 'Business analytics, economics and management',
  },
];

export const LEVELS = [
  { key: 'foundation', title: 'Foundation' },
  { key: 'diploma', title: 'Diploma' },
  { key: 'degree', title: 'Degree' },
];

const DS_FOUNDATION = [
  {
    code: 'BSMA1001',
    name: 'Mathematics for Data Science I',
    description: 'Calculus, linear algebra, probability',
  },
  {
    code: 'BSMA1002',
    name: 'Statistics for Data Science I',
    description: 'Descriptive statistics and distributions',
  },
  {
    code: 'BSCS1001',
    name: 'Computational Thinking',
    description: 'Algorithms and problem-solving',
  },
  { code: 'BSHS1001', name: 'English I', description: 'Grammar and reading comprehension' },
  {
    code: 'BSMA1003',
    name: 'Mathematics for Data Science II',
    description: 'Advanced calculus and linear algebra',
  },
  {
    code: 'BSMA1004',
    name: 'Statistics for Data Science II',
    description: 'Hypothesis testing and regression',
  },
  {
    code: 'BSCS1002',
    name: 'Programming in Python',
    description: 'Python basics, OOP and data structures',
  },
  {
    code: 'BSHS1002',
    name: 'English II',
    description: 'Advanced writing and technical communication',
  },
];

const DS_DIPLOMA = [
  {
    code: 'BSCS2001',
    name: 'Database Management Systems',
    description: 'ER model, SQL, normalization',
  },
  {
    code: 'BSCS2002',
    name: 'Programming, Data Structures and Algorithms using Python',
    description: 'Data structures and algorithms',
  },
  {
    code: 'BSCS2003',
    name: 'Modern Application Development I',
    description: 'HTML, JS, Flask, REST APIs',
  },
  {
    code: 'BSCS2003P',
    name: 'Modern Application Development I — Project',
    description: 'Project course',
  },
  {
    code: 'BSCS2005',
    name: 'Programming Concepts using Java',
    description: 'OOP, exceptions, collections',
  },
  {
    code: 'BSCS2006',
    name: 'Modern Application Development II',
    description: 'Vue / React, advanced APIs',
  },
  {
    code: 'BSCS2006P',
    name: 'Modern Application Development II — Project',
    description: 'Project course',
  },
  { code: 'BSSE2001', name: 'System Commands', description: 'Linux and shell scripting' },
  {
    code: 'BSCS2004',
    name: 'Machine Learning Foundations',
    description: 'Supervised and unsupervised learning',
  },
  {
    code: 'BSMS2001',
    name: 'Business Data Management',
    description: 'Business data and visualization',
  },
  {
    code: 'BSCS2007',
    name: 'Machine Learning Techniques',
    description: 'Advanced ML, intro to neural nets',
  },
  { code: 'BSCS2008', name: 'Machine Learning Practice', description: 'End-to-end ML pipelines' },
  { code: 'BSCS2008P', name: 'Machine Learning Practice — Project', description: 'Project course' },
  { code: 'BSSE2002', name: 'Tools in Data Science', description: 'Pandas, NumPy, Matplotlib' },
  { code: 'BSMS2002', name: 'Business Analytics', description: 'Business analytics track course' },
  { code: 'BSMS2001P', name: 'Business Data Management — Project', description: 'Project course' },
  {
    code: 'BSDA2001',
    name: 'Introduction to Deep Learning and Generative AI',
    description: 'Deep learning and generative AI',
  },
  {
    code: 'BSDA2001P',
    name: 'Deep Learning and Generative AI — Project',
    description: 'Project course',
  },
];

const DS_DEGREE_CORE = [
  { code: 'BSCS3001', name: 'Software Engineering', description: 'SDLC and design patterns' },
  { code: 'BSCS3002', name: 'Software Testing', description: 'Unit and automation testing' },
  {
    code: 'BSCS3003',
    name: 'AI: Search Methods for Problem Solving',
    description: 'BFS, DFS and heuristic search',
  },
  { code: 'BSCS3004', name: 'Deep Learning', description: 'CNN, RNN and transformers' },
  {
    code: 'BSGN3001',
    name: 'Strategies for Professional Growth',
    description: 'Mandatory professional skills course',
  },
];

const DS_DEGREE_ELECTIVES = [
  { code: 'BSBT4001', name: 'Algorithmic Thinking in Bioinformatics' },
  { code: 'BSBT4002', name: 'Big Data and Biological Networks' },
  { code: 'BSCS4001', name: 'Data Visualization Design' },
  { code: 'BSEE4001', name: 'Speech Technology' },
  { code: 'BSMS4002', name: 'Design Thinking for Data-Driven App Development' },
  { code: 'BSMS4001', name: 'Industry 4.0' },
  { code: 'BSMS3002', name: 'Market Research' },
  { code: 'BSCS4003', name: 'Privacy & Security in Online Social Media' },
  { code: 'BSDA5001', name: 'Introduction to Big Data' },
  { code: 'BSMS4003', name: 'Financial Forensics' },
  { code: 'BSMA3012', name: 'Linear Statistical Models' },
  { code: 'BSCS4021', name: 'Advanced Algorithms' },
  { code: 'BSMA3014', name: 'Statistical Computing' },
  { code: 'BSCS3031', name: 'Computer Systems Design' },
  { code: 'BSCS3005', name: 'Programming in C' },
  { code: 'BSMA2001', name: 'Mathematical Thinking' },
  { code: 'BSDA5004', name: 'Large Language Models' },
  { code: 'BSDA5005', name: 'Introduction to Natural Language Processing (i-NLP)' },
  { code: 'BSDA5006', name: 'Deep Learning for Computer Vision' },
  { code: 'BSMS3033', name: 'Managerial Economics' },
  { code: 'BSMS4023', name: 'Game Theory and Strategy' },
  { code: 'BSMS3034', name: 'Corporate Finance' },
  { code: 'BSDA5013', name: 'Deep Learning Practice' },
  { code: 'BSCS4022', name: 'Operating Systems' },
  { code: 'BSDA5002', name: 'Mathematical Foundations of Generative AI' },
  { code: 'BSDA5003', name: 'Algorithms for Data Science (ADS)' },
  { code: 'BSDA5014', name: 'Machine Learning Operations (MLOps)' },
  { code: 'BSDA4001', name: 'Data Science and AI Lab' },
  { code: 'BSCS4010', name: 'App Dev Lab' },
  { code: 'BSCS4024', name: 'Computer Networks' },
  { code: 'BSCS3021', name: 'Theory of Computation' },
  { code: 'BSDA5007', name: 'Reinforcement Learning' },
  { code: 'BSCS4032', name: 'Compiler Design' },
  { code: 'BSMA3001', name: 'Discrete Mathematics' },
  { code: 'BSDA6004', name: 'Sequential Decision Making' },
  { code: 'BSMA3015', name: 'Linear Models with Applications' },
];

const ES_FOUNDATION = [
  { code: 'HS1101', name: 'English I', description: 'Grammar and reading comprehension' },
  {
    code: 'MA1101',
    name: 'Math for Electronics I',
    description: 'Calculus and linear algebra for electronics',
  },
  {
    code: 'HS1102',
    name: 'English II',
    description: 'Advanced writing and technical communication',
  },
  {
    code: 'EE1101',
    name: 'Electronic Systems Thinking and Circuits',
    description: 'Circuit thinking and analysis',
  },
  {
    code: 'EE1901',
    name: 'Electronic Systems Thinking and Circuits Lab',
    description: 'Laboratory course',
  },
  {
    code: 'CS1101',
    name: 'Introduction to C Programming',
    description: 'Programming fundamentals in C',
  },
  { code: 'CS1901', name: 'C Programming Laboratory', description: 'Laboratory course' },
  {
    code: 'CS1102',
    name: 'Introduction to Linux and Programming',
    description: 'Linux fundamentals and scripting',
  },
  { code: 'CS1902', name: 'Linux Systems Laboratory', description: 'Laboratory course' },
  { code: 'EE1102', name: 'Digital Systems', description: 'Boolean logic and digital design' },
  {
    code: 'EE1103',
    name: 'Electrical and Electronic Circuits',
    description: 'Analog circuits and networks',
  },
  { code: 'EE1902', name: 'Electronics Laboratory', description: 'Laboratory course' },
  { code: 'CS2101', name: 'Embedded C Programming', description: 'C for embedded targets' },
  { code: 'CS2901', name: 'Embedded C Programming Laboratory', description: 'Laboratory course' },
];

const ES_DIPLOMA = [
  { code: 'EE2101', name: 'Signals and Systems', description: 'Continuous and discrete signals' },
  {
    code: 'EE2102',
    name: 'Analog Electronic Systems',
    description: 'Amplifiers and analog design',
  },
  { code: 'EE2901', name: 'Analog Electronics Laboratory', description: 'Laboratory course' },
  { code: 'CS1002', name: 'Python Programming', description: 'Python fundamentals' },
  {
    code: 'EE2103',
    name: 'Digital System Design',
    description: 'Sequential and combinational design',
  },
  { code: 'EE2902', name: 'Digital System Design Laboratory', description: 'Laboratory course' },
  { code: 'EE3101', name: 'Digital Signal Processing', description: 'Filters and transforms' },
  { code: 'EE3103', name: 'Sensors and Applications', description: 'Sensor types and interfacing' },
  { code: 'EE3901', name: 'Sensors Laboratory', description: 'Laboratory course' },
  {
    code: 'EE4108',
    name: 'Electronic Testing and Measurement',
    description: 'Instrumentation and test',
  },
  {
    code: 'EE2106',
    name: 'Computer Organisation',
    description: 'Processor and memory architecture',
  },
  { code: 'EE3999', name: 'Electronics System Project', description: 'Project course' },
  { code: 'EE4999', name: 'Signals and Systems Project', description: 'Project course' },
];

const ES_DEGREE_CORE = [
  {
    code: 'MA2101',
    name: 'Math for Electronics II',
    description: 'Advanced mathematics for electronics',
  },
  {
    code: 'EE4101',
    name: 'Embedded Linux and FPGAs',
    description: 'Embedded platforms and FPGA design',
  },
  { code: 'EE4901', name: 'Embedded Linux and FPGAs Lab', description: 'Laboratory course' },
  {
    code: 'EE3104',
    name: 'Electromagnetic Fields and Transmission Lines',
    description: 'EM theory and transmission lines',
  },
  { code: 'EE4102', name: 'Electronic Product Design', description: 'End-to-end product design' },
  {
    code: 'GN3001',
    name: 'Strategies for Professional Growth',
    description: 'Mandatory professional skills course',
  },
  { code: 'EE3102', name: 'Control Engineering', description: 'Feedback and control systems' },
];

const ES_DEPT_ELECTIVES = [
  { code: 'MA3101', name: 'Probability and Statistics' },
  { code: 'EE4103', name: 'Communication Systems' },
  { code: 'EE5101', name: 'Internet of Things (IoT)' },
  { code: 'EE3106', name: 'Semiconductor Devices and VLSI Technology' },
  { code: 'EE3107', name: 'Analog Circuits' },
  { code: 'EE5102', name: 'Digital IC Design' },
  { code: 'EE5103', name: 'Power Management for Electronic Systems' },
  { code: 'EE5104', name: 'Biomedical Electronic Systems' },
];

const ES_OPEN_ELECTIVES = [
  { code: 'CS4022', name: 'Operating Systems' },
  { code: 'CS2001', name: 'Database Management Systems (DBMS)' },
  { code: 'CS2002', name: 'Programming Data Structures and Algorithms using Python' },
  { code: 'CS2003', name: 'Modern Application Development I' },
  { code: 'CS2004', name: 'Machine Learning Foundation' },
  { code: 'CS2005', name: 'Programming Concepts using Java' },
  { code: 'CS2006', name: 'Modern Application Development II' },
  { code: 'CS2007', name: 'Machine Learning Techniques' },
  { code: 'CS2008', name: 'Machine Learning Practice' },
  { code: 'CS3004', name: 'Deep Learning' },
  { code: 'CS5003', name: 'Deep Learning for Computer Vision' },
  { code: 'EE4001', name: 'Speech Technology' },
  { code: 'DA5013', name: 'Deep Learning Practice' },
  { code: 'MS4001', name: 'Industry 4.0' },
  { code: 'MS4002', name: 'Design Thinking for Data-Driven App Development' },
  { code: 'MS4003', name: 'Financial Forensics' },
  { code: 'MS3002', name: 'Market Research' },
  { code: 'MS4023', name: 'Game Theory and Strategy' },
  { code: 'MS3033', name: 'Managerial Economics' },
  { code: 'MS3034', name: 'Corporate Finance' },
  { code: 'EE4902', name: 'Apprenticeship in Electronics Systems 1' },
  { code: 'EE4903', name: 'Apprenticeship in Electronics Systems 2' },
];

const AE_FOUNDATION = [
  { code: 'BSHS1101', name: 'English I', description: 'Grammar and reading comprehension' },
  { code: 'BSMA1101', name: 'Math for Electronics I', description: 'Calculus and linear algebra' },
  {
    code: 'BSCS1101',
    name: 'Introduction to C Programming',
    description: 'Programming fundamentals in C',
  },
  {
    code: 'BSEE1101',
    name: 'Electronic Systems Thinking and Circuits',
    description: 'Circuit thinking and analysis',
  },
  {
    code: 'BSHS1102',
    name: 'English II',
    description: 'Advanced writing and technical communication',
  },
  {
    code: 'BSMA2101',
    name: 'Math for Electronics II',
    description: 'Advanced mathematics for engineering',
  },
  {
    code: 'BSAS1000',
    name: 'Introduction to Aerospace Systems',
    description: 'Survey of aerospace systems',
  },
  { code: 'BSAS1001', name: 'Engineering Mechanics', description: 'Statics and dynamics' },
];

const AE_DIPLOMA = [
  {
    code: 'BSAS2000',
    name: 'Thermodynamics for Aerospace Engineers',
    description: 'Thermodynamic cycles and propulsion basics',
  },
  { code: 'BSAS2001', name: 'Fluid Mechanics', description: 'Fluid statics and dynamics' },
  {
    code: 'BSAS2002',
    name: 'Basic Strength of Materials',
    description: 'Stress, strain and failure',
  },
  {
    code: 'BSMA2102',
    name: 'Math for Aeronautical Engineering',
    description: 'Applied mathematics for aeronautics',
  },
  { code: 'BSEE2101', name: 'Signals and Systems', description: 'Continuous and discrete signals' },
  {
    code: 'BSAS2003',
    name: 'Materials & Manufacture for Aeronautical Engineers',
    description: 'Aerospace materials and processes',
  },
  {
    code: 'BSAS2011',
    name: 'Solid Modeling of Aircraft & Spacecraft Systems',
    description: 'CAD modelling course',
  },
  {
    code: 'BSCS2004',
    name: 'Machine Learning Foundations',
    description: 'Supervised and unsupervised learning',
  },
  { code: 'BSAS3001', name: 'Aerodynamics', description: 'Lift, drag and flow over bodies' },
  { code: 'BSAS3002', name: 'Gas Dynamics', description: 'Compressible flow' },
  { code: 'BSAS3003', name: 'Flight Dynamics I', description: 'Aircraft motion and stability' },
  { code: 'BSAS3011', name: 'Aerodynamics Lab', description: 'Laboratory course' },
  {
    code: 'BSAS3012',
    name: 'Flight Dynamics and Simulation Lab',
    description: 'Laboratory course',
  },
  {
    code: 'BSAS3004',
    name: 'Applied Computational Fluid Dynamics (CFD)',
    description: 'CFD methods and tools',
  },
  { code: 'BSAS3005', name: 'Finite Element Analysis (FEA)', description: 'FEA methods and tools' },
  {
    code: 'BSAS3013',
    name: 'Project 1: Aerodynamic Design of Aircraft and Spacecraft using CFD',
    description: 'Project course',
  },
  {
    code: 'BSAS3014',
    name: 'Project 2: Design of Aircraft and Spacecraft Structures using FEA',
    description: 'Project course',
  },
];

const AE_DEGREE_CORE = [
  {
    code: 'BSAS4001',
    name: 'Advanced Structural Mechanics',
    description: 'Advanced structural analysis',
  },
  { code: 'BSAS4002', name: 'Aircraft and Spacecraft Dynamics', description: 'Vehicle dynamics' },
  {
    code: 'BSAS4003',
    name: 'Gas Turbine Propulsion',
    description: 'Jet engine cycles and performance',
  },
  {
    code: 'BSAS4004',
    name: 'Vibrations and Aero-Elasticity',
    description: 'Vibration and aeroelastic effects',
  },
  {
    code: 'BSAS4005',
    name: 'Rocket Propulsion for Space Applications',
    description: 'Rocket propulsion fundamentals',
  },
  { code: 'BSAS4006', name: 'Aircraft Structures', description: 'Aircraft structural design' },
  { code: 'BSAS4011', name: 'Structures Lab', description: 'Laboratory course' },
  {
    code: 'BSAS4007',
    name: 'Aerospace Systems Control and Estimation',
    description: 'Control and state estimation',
  },
  {
    code: 'BSMS3033',
    name: 'Managerial Economics',
    description: 'Economics for engineering decisions',
  },
  {
    code: 'BSAS4012',
    name: 'Design Project: Design of MAVs and UAVs',
    description: 'Project course',
  },
];

const MG_FOUNDATION = [
  {
    code: 'BSMA1001',
    name: 'Mathematics for Data Science I',
    description: 'Calculus, linear algebra, probability',
  },
  {
    code: 'BSMA1002',
    name: 'Statistics for Data Science I',
    description: 'Descriptive statistics and distributions',
  },
  {
    code: 'BSCS1001',
    name: 'Computational Thinking',
    description: 'Algorithms and problem-solving',
  },
  { code: 'BSHS1001', name: 'English I', description: 'Grammar and reading comprehension' },
  { code: 'BSMS1201', name: 'Principles of Economics', description: 'Micro and macro foundations' },
  {
    code: 'BSMS1202',
    name: 'Financial Accounting',
    description: 'Accounting statements and records',
  },
  {
    code: 'BSMS1203',
    name: 'Business Statistics',
    description: 'Statistics for business decisions',
  },
  {
    code: 'BSMS1204',
    name: 'Management Thought and Practice',
    description: 'Management theory and practice',
  },
];

const MG_DIPLOMA = [
  {
    code: 'BSMS2201',
    name: 'Python for Data Analytics',
    description: 'Python for analytics workflows',
  },
  { code: 'BSMS2202', name: 'Data Management', description: 'Databases and data handling' },
  {
    code: 'BSMS2203',
    name: 'Analysis of Economic Data',
    description: 'Working with economic data',
  },
  { code: 'BSMS3201', name: 'Marketing Analytics', description: 'Marketing data analysis' },
  { code: 'BSMS3202', name: 'HR Analytics', description: 'People analytics' },
  { code: 'BSMS3203', name: 'Financial Analytics', description: 'Financial data analysis' },
  { code: 'BSMS2204', name: 'Operations Management', description: 'Operations and processes' },
  { code: 'BSMS3204', name: 'Supply Chain Analytics', description: 'Supply chain analysis' },
  { code: 'BSMS3901', name: 'Business Management Project', description: 'Project course' },
  { code: 'BSMS3902', name: 'Business Analytics Project', description: 'Project course' },
  { code: 'BSMS2205', name: 'Corporate Finance', description: 'Corporate finance foundations' },
  { code: 'BSMS2206', name: 'Organizational Behaviour', description: 'Behaviour in organisations' },
  {
    code: 'BSMS3205',
    name: 'Money, Banking and Financial Markets',
    description: 'Financial system and markets',
  },
  {
    code: 'BSMS2207',
    name: 'Marketing Management',
    description: 'Marketing strategy and practice',
  },
  { code: 'BSMS2208', name: 'Macroeconomics', description: 'Macroeconomic theory and policy' },
  { code: 'BSMS3206', name: 'Managerial Economics', description: 'Economics for managers' },
];

const MG_DEGREE_CORE = [
  {
    code: 'BSGN3001',
    name: 'Strategies for Professional Growth',
    description: 'Mandatory professional skills course',
  },
  { code: 'BSMS3207', name: 'GenAI for Business', description: 'Generative AI in business' },
  { code: 'BSMS3208', name: 'Digital Business', description: 'Digital business models' },
  {
    code: 'BSMS3209',
    name: 'Logistics and Supply Chain Management',
    description: 'Logistics and supply chains',
  },
  { code: 'BSMS4201', name: 'Applied Time Series Analysis', description: 'Time series methods' },
  { code: 'BSMS4202', name: 'Market Intelligence', description: 'Market data and insight' },
];

// Management electives are published as names only — no course codes in the
// academics table. `code` is omitted and the UI keys on the name.
const MG_DEGREE_ELECTIVES = [
  { name: 'Introduction to Game Theory' },
  { name: 'Public Finance' },
  { name: 'Economics of AI' },
  { name: 'Industrial Organisation' },
  { name: 'Research Design for Social Data Science' },
  { name: 'Project Finance' },
  { name: 'Corporate Valuation' },
  { name: 'Financial Forensics' },
  { name: 'ALM and Risk' },
  { name: 'Capital Markets and Derivatives' },
  { name: 'Digital Marketing' },
  { name: 'Brand Management' },
  { name: 'Consumer Behavior' },
  { name: 'Design Thinking' },
  { name: 'Computational Optimization' },
  { name: 'Business Research Methods' },
  { name: 'Sustainable Business Models' },
  { name: 'Digital Business Strategy and Models' },
  { name: 'Family Business' },
  { name: 'Social Media Computing' },
  { name: 'Performance Management' },
  { name: 'Responsible AI' },
];

export const SUBJECTS = {
  ds: {
    foundation: { core: DS_FOUNDATION },
    diploma: { core: DS_DIPLOMA },
    degree: {
      core: DS_DEGREE_CORE,
      electives: [{ label: 'Electives', subjects: DS_DEGREE_ELECTIVES }],
    },
  },
  es: {
    foundation: { core: ES_FOUNDATION },
    diploma: { core: ES_DIPLOMA },
    degree: {
      core: ES_DEGREE_CORE,
      electives: [
        { label: 'Department Electives', subjects: ES_DEPT_ELECTIVES },
        {
          label: 'Open Electives',
          note: 'Open electives drawn from across the programmes; offerings vary by term.',
          subjects: ES_OPEN_ELECTIVES,
        },
      ],
    },
  },
  ae: {
    foundation: { core: AE_FOUNDATION },
    diploma: { core: AE_DIPLOMA },
    degree: {
      core: AE_DEGREE_CORE,
      // The Aeronautics academics table lists elective *baskets*, not the
      // individual courses, so these carry a note and no selectable subjects.
      electives: [
        {
          label: 'Department Electives',
          note: 'Choose 9 credits from the department elective basket; offerings vary by term.',
        },
        {
          label: 'Management / Humanities',
          note: 'At least 3 credits must come from the Management or Humanities basket.',
        },
        {
          label: 'Open Electives',
          note: '9 credits from open electives; NPTEL credits may be transferred.',
        },
      ],
    },
  },
  mg: {
    foundation: { core: MG_FOUNDATION },
    diploma: { core: MG_DIPLOMA },
    degree: {
      core: MG_DEGREE_CORE,
      electives: [{ label: 'Electives', subjects: MG_DEGREE_ELECTIVES }],
    },
  },
};

/** The `{ core, electives }` bundle for a branch and level, or empty. */
export function subjectsFor(branchKey, levelKey) {
  return SUBJECTS[branchKey]?.[levelKey] || { core: [], electives: [] };
}

/** Every selectable subject for a branch and level, core and electives flat. */
export function allSubjectsFor(branchKey, levelKey) {
  const { core, electives = [] } = subjectsFor(branchKey, levelKey);
  return [...core, ...electives.flatMap((group) => group.subjects || [])];
}

/** Total selectable subjects in a branch, across all three levels. */
export function branchSubjectCount(branchKey) {
  return LEVELS.reduce((sum, level) => sum + allSubjectsFor(branchKey, level.key).length, 0);
}

/** A stable key for a subject that may not have an official code. */
export function subjectKey(subject) {
  return subject.code || subject.name;
}
