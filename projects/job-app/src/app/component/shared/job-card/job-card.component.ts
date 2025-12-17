import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardModule } from "@angular/material/card";
import { JobOpenings, JobsService } from '../../../service/jobs.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardModule, MatButtonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  @Input()
  jobCardInput!: JobOpenings;
  jobService = inject(JobsService);
  routes = inject(Router);
  deleteJob(){
    this.jobService.deleteJob(this.jobCardInput);
  }
  editJob(jobId?: number) {
    const navigationExtras: NavigationExtras = {
      queryParams:{
        jobId
      }
    }
    this.routes.navigate(["/edit-job"], navigationExtras)
  }
}
