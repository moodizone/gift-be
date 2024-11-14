class APIError extends Error {
  originalErrorObject?: unknown;
  message: string;
  statusCode: number;

  constructor(msg: string, sc: number, error?: unknown) {
    super(msg);
    this.originalErrorObject = error;
    this.name = "APIError";
    this.message = msg;
    this.statusCode = sc;
  }
}
