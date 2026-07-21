
export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  description: string;
  city: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  number: string;
  title: string;
  description: string;
  position: 'top' | 'bottom';
  popupContent?: {
    title: string;
    description: string;
    icon?: string;
    metric?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bgColor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  title: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconType: 'search' | 'cloud' | 'learning';
  color: string;
}

export interface FeaturePoint {
  id: string;
  title: string;
  description: string;
}
