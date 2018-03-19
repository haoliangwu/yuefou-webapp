export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface Activity {
  id: string;
  title: string;
  desc: string;
  startedAt: string;
  creator: {
    id: string
    name: string
  };
}
