import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NotificationType} from '../../enum/notification-type.enum';
import {HeaderType} from '../../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  public subscriptions: Subscription[] = [];
  constructor(private route: Router,
              private notifier: NotificationService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.route.navigateByUrl('/user/management').then();
    } else {
      this.route.navigateByUrl('/login').then();
    }
  }

  public onLogin(user: User): void {
    console.log(user);
    this.showLoading = true;
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          console.log(response.body);
          this.authService.addUserToLocalCache(response.body);
          this.route.navigateByUrl('/user/management').then();
        }, ( errorResponse: HttpErrorResponse) => {
          this.notificationSendError(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private notificationSendError(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notifier.notify(notificationType, message);
    } else {
      this.notifier.notify(notificationType, 'AN ERROR OCCURRED. PLEASE TRY  AGAIN!');
    }
  }
}
