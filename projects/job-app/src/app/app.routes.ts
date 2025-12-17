import { Routes } from '@angular/router';
import { JobOpeningsComponent } from './component/job-openings/job-openings.component';
import { EditJobComponent } from './edit-job/edit-job.component';

export const routes: Routes = [
    {
        path: '', component: JobOpeningsComponent
    },
    {
        path: 'edit-job', component: EditJobComponent
    }
];
