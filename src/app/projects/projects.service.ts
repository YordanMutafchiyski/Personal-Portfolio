import { inject, Injectable, signal } from '@angular/core';
import { Project } from './projects.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projects = signal<Project[]>([]);
  private httpClient = inject(HttpClient);
  loadedProjects = this.projects.asReadonly();

  fetchProjects() {
    return this.httpClient.get<Project[]>('http://localhost:3000/projects')
      .pipe(
        tap({
          next: (projects) => {
            //@ts-ignore
            let prjArr = projects.projects;
            this.projects.set(prjArr);
          },
        })
      );
  }
}
