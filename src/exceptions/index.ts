import { StatusCodes as SC } from 'http-status-codes';

export interface CustomError {
  message: string;
  status: number;
}

export class NotFoundException extends Error {
  public message: string;
  public status: number = SC.NOT_FOUND;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class BadRequestException extends Error {
  public message: string;
  public status: number = SC.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class InternalServerErrorException extends Error {
  public message: string;
  public status: number = SC.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
