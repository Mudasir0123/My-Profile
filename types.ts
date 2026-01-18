
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface CVData {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  objective: string;
  skills: string[];
  languages: string[];
  education: Education[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
