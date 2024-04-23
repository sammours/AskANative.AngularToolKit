export class ErrorModelResponse {
   public status: string | number | undefined;
   public title: string | undefined;
   public detail: string | undefined;
}

export class ErrorModel {
   public message: string | undefined;
   public response: string | undefined;
   public status: number | undefined;
}
