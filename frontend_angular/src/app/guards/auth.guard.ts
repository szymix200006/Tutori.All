import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../services/token-service.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenServiceService);
  const router = inject(Router);
  const toasterService = inject(ToastrService);

  if(tokenService.isTokenNotValid()) {
    router.navigateByUrl('');
    toasterService.info('You need to be logged in to use this function!')
    return false;
  }
  return true;
};
