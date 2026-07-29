class ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
  success: boolean;

  constructor(status: number, message: string = "Success", data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status < 400;
  }
}

export { ApiResponse };
