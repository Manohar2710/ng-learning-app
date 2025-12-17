import { Component, effect, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatCardModule,
} from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { HttpClient } from "@angular/common/http";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { response } from "express";
import { JobOpenings, JobsService } from "../../service/jobs.service";


@Component({
  selector: "app-job-openings",
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    JobCardComponent,
    MatFormField,
    MatLabel,
    MatInput,
    ɵInternalFormsSharedModule,
    FormsModule
    
],
  templateUrl: "./job-openings.component.html",
  styleUrl: "./job-openings.component.scss",
})
export class JobOpeningsComponent implements OnInit{
  jobOpeningList: JobOpenings[] = [];
  searchedValue = '';
  httpClient = inject(HttpClient);
  jobService = inject(JobsService);
  ngOnInit(): void {
    this.jobService.getJobList();
  };
  constructor() {
    effect(() =>{
      const jobOpeningList = this.jobService.jobOpeningList();
      console.log("test",jobOpeningList)
      this.jobOpeningList = jobOpeningList;
    })
  }

  getJobPostForBySearch() {
    this.jobService.getJobPostForSearch(this.searchedValue);
  }

}

