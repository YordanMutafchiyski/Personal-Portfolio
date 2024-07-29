import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProjectsService } from './projects.service';
import { HttpClient } from '@angular/common/http';
import { Project } from './projects.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectsService);
  projects = signal<Project[]>([]);
  filteredProjects: Project[] = [];
  error = signal('');
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.projectService.fetchProjects().subscribe({
      next: (projects) =>{
        console.log(this.projects())
        //@ts-ignore
        this.projects.set(projects.projects)
        this.filteredProjects = filterAndSortProjects(this.projects());
      
        console.log(this.projects())
      },
      error: (error) => {
        this.error.set(error.message);
      },
      complete: () => {},
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
  onSubmit(){
    
  }
}

function parseDuration(duration: string): { startDate: Date; endDate: Date } {
  const [startStr, endStr] = duration.split(' - ');
  const startDate = new Date(startStr + ' 1'); // Add ' 1' to get the first day of the month
  const endDate = endStr ? new Date(endStr + ' 1') : new Date(); // Use current date if endDate is not provided
  return { startDate, endDate };
}

function filterAndSortProjects(projects: Project[]): Project[] {
  return projects
    .map((project) => {
      const { startDate, endDate } = parseDuration(project.duration);
      return { ...project, startDate, endDate };
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}
