import { EventEmitter } from "@angular/core";

export class NotificationService{
    // notifier = new EventEmitter<string>();

    notifier = new EventEmitter<any>();

    notify(message: string){
        this.notifier.emit(message);
    }

}