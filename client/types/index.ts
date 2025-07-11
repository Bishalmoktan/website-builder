export interface Block {
  _id: string;
  type: string;
  content: any;
  style: any;
}

export interface Website {
  _id: string;
  title: string;
  isPublished: boolean;
  blocks: Block[];
  theme: Theme;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  websites: Website[];
}

export interface BlockType {
  _id: string;
  name: string;
  icon: any;
  defaultContent: any;
  defaultStyle: any;
  category: string;
}

export interface DragItem {
  id: string;
  type: string;
  blockType?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface CreateWebsiteParams {
  title: string;
  blocks: Block[];
  theme: Theme;
}

export interface UpdateWebsiteParams {
  _id: string;
  title?: string;
  isPublished?: boolean;
  blocks?: Block[];
  theme?: Theme;
}
