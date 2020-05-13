import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService,
        private injetor: Injector,
        private zone: NgZone) {
        super()
    }

    handlerError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            this.zone.run(()=>{
                switch (errorResponse.status) {
                    case 401:
                        this.injetor.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado')
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detallhes')
                        break;
                }
            })            
        }
    }
}