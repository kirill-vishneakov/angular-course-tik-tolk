import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentCreateDto, PostCreateDto, Comment, Post } from '..';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  url = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.url}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.#http
      .get<Post[]>(`${this.url}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<Comment>(`${this.url}comment/`, payload);
  }

  getCommentsByPostId(postId: number) {
    return this.#http.get<Post>(`${this.url}post/${postId}`).pipe(
      map((res) => {
        return res.comments;
      })
    );
  }
}
