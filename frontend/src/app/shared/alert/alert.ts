import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertService } from '../../services/alert-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  constructor(private alertService: AlertService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
      this.message = alert.message;
      this.type = alert.type;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
        this.cd.detectChanges();
      }, 3000);
      this.cd.detectChanges();
    });
  }

  message: string = "";
  type: string = "info";
  visible: Boolean = false;
}
