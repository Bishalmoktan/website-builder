export interface Block {
  id: string;
  type: string;
  content: any;
  style: any;
}

export interface Website {
  id: string;
  title: string;
  blocks: Block[];
  theme: Theme;
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
  id: string;
  email: string;
  name: string;
  websites: Website[];
}

export interface BlockType {
  id: string;
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
