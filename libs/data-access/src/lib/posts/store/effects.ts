import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs';
import { postsActions } from './actions';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);

  getPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postsGet),
      switchMap(() => this.postService.fetchPosts()),
      map((res) => postsActions.postsLoaded({ posts: res }))
    );
  });

  createPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postCreate),
      switchMap(({ post }) => this.postService.createPost(post)),
      map(() => postsActions.postsGet())
    );
  });

  renPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postRen),
      switchMap(({ postId, title, content }) =>
        this.postService.renPost(postId, title, content)
      ),
      map(() => postsActions.postsGet())
    );
  });

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.commentCreate),
      switchMap(({ comment }) => this.postService.createComment(comment)),
      map(() => postsActions.postsGet())
    );
  });

  deleteComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.commentDelete),
      switchMap(({ commentId }) => this.postService.deleteComment(commentId)),
      map(() => postsActions.postsGet())
    );
  });

  renComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.commentRen),
      switchMap(({ commentId, text }) =>
        this.postService.renComment(commentId, text)
      ),
      map(() => postsActions.postsGet())
    );
  });

  deletePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postDelete),
      switchMap(({ postId }) => this.postService.deletePost(postId)),
      map(() => postsActions.postsGet())
    );
  });
}
