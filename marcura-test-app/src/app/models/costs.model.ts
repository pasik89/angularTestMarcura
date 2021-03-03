export interface CostsResponse {
  baseCurrency: BaseCurrency;
  costs: CostGroup[];
  daCurrency: DACurrency;
}

export interface BaseCurrency {
  currency: string;
  exchangeRate: number;
}

export interface DACurrency {
  currency: string;
}

export interface CostGroup {
  costItems: CostItem[];
  displayOrder: number;
  id: number;
  name: string;
}

export interface CostItem {
  annotation: {
    id: number;
    name: string;
  };
  comments: Comment[];
  costItemAlias: {
    accountingCode: string;
  };
  costs: Cost[];
  id: number;
  name: string;
}

export interface Cost {
  amount: number;
  daStage: string;
  persona: string;
  type: CostType;
}

export interface Comment {
  author: string;
  comment: string;
  daStage: string;
  date: string;
  id: number;
  persona: string;
  type: CommentType;
}

export enum CommentType {
  INTERNAL = 'Internal',
  EXTERNAL = 'External'
}

export enum CostType {
  QUOTED = 'Quoted',
  SCREENED = 'Screened'
}
