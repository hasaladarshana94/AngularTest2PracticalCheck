import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //set token to all http reuests
    const modifyRequest = req.clone({
      params : req.params.append('token', 'bu4f8kn48v6uehqi3cqg')
    })
    return next.handle(modifyRequest);
  }
}
