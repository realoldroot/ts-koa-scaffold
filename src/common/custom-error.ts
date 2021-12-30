export class CustomError extends Error {
  constructor(message: string) {
    super();
    new Error(message);
    this.errMsg = message;
  }

  errMsg: string;
}
