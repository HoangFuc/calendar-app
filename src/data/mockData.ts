export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location: string;
  duration: string;
  time: string;
  period: string;
  date: string;
  category: string;
  color: string;
  notes?: string;
  reminder: boolean;
  reminderTime?: string | null;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const EVENTS: CalendarEvent[] = [

  {
    id: '1',
    title: 'Product Strategy Sync',
    location: 'Design Studio',
    duration: '45 min',
    time: '09:30',
    period: 'AM',
    date: '2024-09-13',
    category: 'work',
    color: '#4A3AFF',
    notes: 'Review Q4 targets and finalize the marketing budget for the upcoming seasonal campaign. Bring the physical prototypes for the team to see.',
    reminder: true,
    reminderTime: '15 minutes before',
  },
  {
    id: '2',
    title: 'Morning Sync',
    description: 'Daily standup with the design and engineering team.',
    location: 'Design Team',
    duration: '30 min',
    time: '10:30',
    period: 'AM',
    date: '2024-09-13',
    category: 'work',
    color: '#4A3AFF',
    notes: 'Daily standup with the design and engineering team.',
    reminder: true,
    reminderTime: '15 minutes before',
  },
  {
    id: '3',
    title: 'Deep Work Session',
    description: 'Focused coding for the new UI kit.',
    location: 'Remote',
    duration: '2 hrs',
    time: '09:00',
    period: 'AM',
    date: '2024-09-13',
    category: 'personal',
    color: '#2ECB71',
    notes: 'Focused coding for the new UI kit.',
    reminder: false,
    reminderTime: null,
  },
  {
    id: '4',
    title: 'Redesign Strategy Session',
    description: 'Review the initial wireframes for the new dashboard.',
    location: 'Conference Room A',
    duration: '1 hr',
    time: '10:30',
    period: 'AM',
    date: '2024-10-24',
    category: 'personal',
    color: '#9B59B6',
    notes: 'Review the initial wireframes for the new dashboard. We need to prioritize the hierarchy of the information architecture.',
    reminder: true,
    reminderTime: '30 minutes before',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Strategy Workshop',
    description: 'Team strategy workshop for Q4 planning.',
    location: 'Main Office',
    duration: '2 hrs',
    time: '02:00',
    period: 'PM',
    date: '2023-11-24',
    category: 'work',
    color: '#FF8C42',
    notes: 'Review Q4 targets and finalize the marketing budget for the upcoming seasonal campaign. Bring the physical prototypes for the team to see.',
    reminder: true,
    reminderTime: '15 minutes before',
  },
];

export const CATEGORIES = [
  { id: 'work', name: 'Work', color: '#4A3AFF' },
  { id: 'personal', name: 'Personal', color: '#9B59B6' },
  { id: 'health', name: 'Health', color: '#2ECB71' },
  { id: 'social', name: 'Social', color: '#FF8C42' },
  { id: 'urgent', name: 'Urgent', color: '#FF6B8A' },
  { id: 'other', name: 'Other', color: '#42C6FF' },
];

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  color: string;
}

export const NOTES: Note[] = [
  {
    id: '1',
    title: 'Project Ideas',
    content: '1. New UI Kit for the mobile app\n2. Integration with Slack\n3. Dark mode support',
    date: '2024-09-12',
    category: 'Work',
    color: '#4A3AFF',
  },
  {
    id: '2',
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Fruits, Vegetables, Chicken, Pasta',
    date: '2024-09-11',
    category: 'Personal',
    color: '#9B59B6',
  },
  {
    id: '3',
    title: 'Meeting Notes - Strategy',
    content: 'The team discussed the Q4 goals and decided to focus on user acquisition.',
    date: '2024-09-10',
    category: 'Work',
    color: '#2ECB71',
  },
  {
    id: '4',
    title: 'Books to Read',
    content: '1. Atomic Habits\n2. The Alchemist\n3. Deep Work',
    date: '2024-09-08',
    category: 'Personal',
    color: '#FF8C42',
  },
];

export const STATS = {
  pendingTasks: 3,
  recentNotes: 12,
};

