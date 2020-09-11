import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {NotificationService} from '../service/notification.service';
import {NotificationType} from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']).then();
      this.notificationService.notify(NotificationType.ERROR, `you need to log in to this page`.toUpperCase());
      return false;
    }
  }
}
