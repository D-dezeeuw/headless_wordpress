<template>
  <div>
    <strong>Home</strong> | <nuxt-link to="/post">about</nuxt-link> - <nuxt-link to="/">home</nuxt-link><br />
    <hr />

    <div v-for="(post, index) in data?.posts?.nodes" :key="index">
      <nuxt-link :to="'posts/' + post.databaseId">
        <div v-html="post.databaseId + ' - ' + post.title"></div>
      </nuxt-link>
    </div>

  </div>
</template>
<script lang="ts" setup>

const query = gql`
    query GetAllPosts($id: String) {
      posts(where: {categoryName: $id}) {
					nodes {
						databaseId
						title
					}
				}
    }
    `

  const variables = {id: "All"}
  const { data} = await useAsyncQuery(query, variables);

</script>
