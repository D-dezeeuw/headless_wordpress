import { defineStore } from 'pinia'


export const useGLStore = defineStore('gl', {
	state: () => ({
		message: 'Greener.land',
		posts: undefined,
		post: {},
		filters: {},
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
		setAllFilters(posts:[]) {
			let filters = {};
			posts.forEach(post => {
				filters = this.setPostFilters('filters-post-' + String(post.databaseId), post.categories.nodes, filters);
			});
			this.allFilters = filters;
		},

		setPostFilters(id:any, categories:[], ofilters:any) {
			const filters:any = ofilters || {};
			let path:any = filters;

			categories.forEach((category:any) => {
				path = filters;

				if (category?.ancestors?.nodes) {
					category.ancestors?.nodes.forEach( (ancestor:any) => {
						const anID = ancestor.name.replace(/\ /gm, '').toLowerCase();
							if (!path[anID]) {
								path[anID] = {
									xname: ancestor.name,
									xlink: ancestor.link
								}
							}
							path = path[anID];
					});

					const catID = category.name.replace(/\ /gm, '').toLowerCase();
					if (!path[catID]) {
						path[catID] = {
							name: category.name,
							link: category.link,
							description: category.description,
							amount: 1
						}
					} else {
						path[catID].amount += 1;
					}
				}

			});

			if (ofilters) {
				return filters;
			} else {
				this.filters[id] = filters;
			}
		},

		// GET
		getPostFilters(id:any) {
			return this.filters[id];
		},

		getAllFilters() {
			return this.allFilters;
		},

		getPost(id:string) {
			return this.post[id];
		},

		getPosts() {
			return this.posts;
		},

		getFilteredPosts(filters) {
			console.log('filtering posts on ', filters);
			let matches:any[] = [];

			// Go through all the posts
			this.posts.nodes.forEach( (item:any) => {
				if (item.categories) {
					let matchAmount:number = 0;
					// Go through the categories of the posts
					item.categories.nodes.forEach( (category:any) => {
						// Go through the filter Array to match
						filters.forEach( filter => {
							if (category.name === filter) {
								matchAmount += 1;
							}
						});
					});

					if (matchAmount === filters.length) {
						console.log(matchAmount, 'add filtered post: ', item.title);
						matches.push(item);
					}
				}
			});
			console.log('MATCHES', matches.length);
			matches.forEach( item => console.log('match', item.title));
			return matches;
		}
	}
});
