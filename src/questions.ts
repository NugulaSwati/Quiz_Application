export type Question = {
  question: string
  options: string[]
  answer: string
}

export const staticQuestions: Question[] = [
  {
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 'O(log n)',
  },
  {
    question: 'Which protocol is used for sending emails?',
    options: ['HTTP', 'SMTP', 'FTP', 'SNMP'],
    answer: 'SMTP',
  },
  {
    question: 'What does CPU stand for?',
    options: [
      'Central Processing Unit',
      'Computer Personal Unit',
      'Central Performance Unit',
      'Control Processing Unit',
    ],
    answer: 'Central Processing Unit',
  },
  {
    question: 'What is the unit of electrical resistance?',
    options: ['Ohm', 'Volt', 'Watt', 'Ampere'],
    answer: 'Ohm',
  },
  {
    question: 'In networking, what does IP stand for?',
    options: [
      'Internet Provider',
      'Internet Protocol',
      'Internal Process',
      'Information Packet',
    ],
    answer: 'Internet Protocol',
  },
  {
    question: 'Which sorting algorithm is the fastest on average?',
    options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
    answer: 'Quick Sort',
  },
  {
    question: 'What is the main function of the OS?',
    options: [
      'Manage hardware resources',
      'Edit documents',
      'Compile code',
      'Design websites',
    ],
    answer: 'Manage hardware resources',
  },
  {
    question: 'Which of these is a NoSQL database?',
    options: ['MySQL', 'PostgreSQL', 'MongoDB', 'OracleDB'],
    answer: 'MongoDB',
  },
  {
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'Hyperlink Text Markup Language',
      'Hyper Tool Multi Language',
      'Hyper Text Management Language',
    ],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'Which one is NOT a programming paradigm?',
    options: ['Object-Oriented', 'Functional', 'Procedural', 'Mechanical'],
    answer: 'Mechanical',
  },
]
