import { HttpInterceptorFn } from '@angular/common/http';
import { TokenServiceService } from '../services/token-service.service';
import { inject } from '@angular/core';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenServiceService);
  const authToken = token.token;
  if(authToken) {
    const authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`)
    })
    return next(authReq);
  }
  

  return next(req);
};
