namespace TODO {
  interface TodoUs {
    _id?: number;
    name: string;
  }

  type GetRes = TodoUs[];
  type GetReq = void;

  type PostRes = TodoUs[];
  type PostReq = TodoUs;
}
