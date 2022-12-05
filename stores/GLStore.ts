import { defineStore } from 'pinia'


export const useGLStore = defineStore('gl', {
	state: () => ({
		message: 'Greener.land',
		posts: undefined,
		post: {},
		activePost: 0,
		labelResultsAmount: undefined
	} as any),
	actions: {
		// SET
		setPosts(value:any) {
			this.posts = value;
		},
		setPost(id:string, value:any) {
			this.post[id] = value
		},
		setActivePost(id:String) {
			this.activePost = id;
		},
		setLabelResultsAmount(posts:[]) {
			if (!posts) return false;
				const results = posts.length > 1 ? 'results' : 'result';
				this.labelResultsAmount = `Showing all ${posts.length} ${results}.`;
		},
		// GET
		getPost(id:string) {
			return this.post[id];
		},

		getPosts() {
			return this.posts;
		},

	}
});
