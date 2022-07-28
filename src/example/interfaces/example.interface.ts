export interface Example {
  id: string;
  title: string;
  keywords?: Array<string>;
  content: string;
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}
