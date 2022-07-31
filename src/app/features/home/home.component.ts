import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/core/models/tag';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allTags: Tag[] | null = null;

  constructor(private tag: TagService) {}

  ngOnInit(): void {
    this.tag.getAllTags().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }
}
