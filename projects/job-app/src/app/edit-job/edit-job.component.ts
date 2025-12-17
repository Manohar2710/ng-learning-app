import { Component, computed, inject, OnInit } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { JobOpenings, JobsService } from "../service/jobs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-edit-job",
  standalone: true,
  imports: [MatButton, FormsModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: "./edit-job.component.html",
  styleUrl: "./edit-job.component.scss",
})
export class EditJobComponent implements OnInit {
  jobDetais!: JobOpenings;

  activatedRoutes = inject(ActivatedRoute);
  jobService = inject(JobsService);
  routes = inject(Router);

  ngOnInit(): void {
    this.initJobDetails();
  }
  initJobDetails() {
    this.activatedRoutes.queryParams.subscribe((params) => {
      const jobId = params["jobId"];
      if (jobId) {
        this.jobDetais = this.jobService.getJobDetails(JSON.parse(jobId)) ?? {};
      }
    });
  }
  goBack() {
    this.routes.navigate(["/"]);
  }
  saveJob() {
    this.jobService.updateJob(this.jobDetais);
    this.routes.navigate(["/"]);
  }
}
