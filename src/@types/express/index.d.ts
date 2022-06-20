declare namespace Express {
  export interface Request {
    bill: {
      digitable_line: string;
      type: string;
    }
  }
}
