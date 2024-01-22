export class HttpResponseService {
  responseHttp(data: any, message?: string): any {
    if (message) {
      data.message = message;
    }
    return data;
  }
}
