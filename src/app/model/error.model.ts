export class Error {

  public severity?: string = '';
  public summary?: string = '';
  public detail: string = '';

  hasLink?: boolean = false;
  detailBeforeLink?: string= '';
  detailAfterLink?: string = '';
  linkText?: string = '';
}
