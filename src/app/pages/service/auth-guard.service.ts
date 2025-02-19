import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AppserviceService } from './appservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private appserviceService: AppserviceService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.appserviceService.flagPage) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
