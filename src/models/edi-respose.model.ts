import { DateTime } from "luxon";

export class EdiResponse {
    status: number = 200;
    errors: any[] | undefined;
    result: any | undefined;
    timestamp: string = DateTime.now().toString();
  }