import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentCreateDto, PostCreateDto, Comment, Post } from '../index';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  url = 'https://icherniakov.ru/yt-course/';

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.url}post/`, payload);
  }

  renPost(postId: number, title: string, content: string) {
    return this.#http.patch<Post>(`${this.url}post/${postId}`, {
      title,
      content,
    });
  }

  fetchPosts() {
    return this.#http.get<Post[]>(`${this.url}post/`);
  }

  deletePost(postId: number) {
    return this.#http.delete<Comment>(`${this.url}post/${postId}`);
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<Comment>(`${this.url}comment/`, payload);
  }

  renComment(commentId: number, text: string) {
    return this.#http.patch<Comment>(`${this.url}comment/${commentId}`, {
      text,
    });
  }

  deleteComment(commentId: number) {
    return this.#http.delete<Comment>(`${this.url}comment/${commentId}`);
  }

  getCommentsByPostId(postId: number) {
    return this.#http.get<Post>(`${this.url}post/${postId}`).pipe(
      map((res) => {
        return res.comments;
      })
    );
  }
}
