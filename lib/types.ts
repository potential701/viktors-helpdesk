export type User = {
  id: number;
  username: string;
  access_level: string;

  issues_created: Issue[];
  issues_assigned: Issue[];
  comments: Comment[];
}

export type Category = {
  id: number;
  name: string;
  description: string;

  issues: Issue[];
}

export type Comment = {
  id: number;
  content: string;
  created_at: Date;
  issue_id: number;
  user_id: number;

  issue: Issue;
  user: User;
}

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  assigned_to_id: number;
  category_id: number;

  category: Category;
  comments: Comment[];
  created_by: User;
  assigned_to: User;
}
