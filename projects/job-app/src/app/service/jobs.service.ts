import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../ecom/src/environments/environment';

export interface JobOpenings {
  id?: number;
  title?: string;
  experience?: string;
  company?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiUrl = environment.apiURl;
  jobOpeningList: WritableSignal<JobOpenings[]> = signal<JobOpenings[]>([]);
  private httpClient = inject(HttpClient);
  constructor() { }

  getJobList(){
    this.httpClient.get<JobOpenings[]>(`${this.apiUrl}/jobs`).subscribe(response => {
      this.jobOpeningList.set(response);
    })
  }
  getJobPostForSearch(searchedValue: string) {
    this.httpClient.get<JobOpenings[]>(`${this.apiUrl}/jobPost/search?keyword=${searchedValue}`).subscribe(response => {
      this.jobOpeningList.set(response);
    })
  }

  deleteJob(jobCardInput: JobOpenings){
    this.httpClient.delete(`${this.apiUrl}/jobPost`, {body: jobCardInput}).subscribe(res => {
      console.log("deleted successfully");
      this.getJobList();
    });
  }
  getJobDetails(jobId: number) {
    return this.jobOpeningList().find(job => job.id === jobId);
  }

  updateJob(jobPost: JobOpenings) {
    this.httpClient.put(`${this.apiUrl}/jobPost`, jobPost ).subscribe(res => {
      console.log("updated Job successfully");
      this.getJobList();
    })

  }
}
