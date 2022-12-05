<template>
  <AppHeader page="home" />
  <div id="layout-overview"
    class="flex flex-row"
  >
    <aside id="filters-interventions"
      class="basis-1/6 bg-white"
    >
      <p class="p-2 text-lg">Filters:</p>
    </aside>

    <main id="landscape-interventions"
      class="basis-5/6"
    >
      <div id="intervention-container"
        class="bg-white"
      >

        <h2 v-text="glStore.labelResultsAmount"></h2>

        <div :id="('intervention-' + index)"
          v-for="(post, index) in glStore?.posts?.nodes" :key="index"
        >
          <nuxt-link :to="'posts/' + post.databaseId">
            <div v-html="post.databaseId + ' - ' + post.title"></div>
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
  import {useGLStore } from '~/stores/GLStore';
  const glStore = useGLStore();
  let labelResultAmount:String;

  if (glStore.posts === undefined) {
    const query = gql`query GetAllPosts($id: String) {
      posts(where: {categoryName: $id}) {
        nodes {
          databaseId
          title
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          categories {
            nodes {
              name
              id
              description
            }
          }
        }
      }
    }`

    const variables = {id: "Interventions"}
    const { data } = await useAsyncQuery(query, variables);
    if (data?.value?.posts) {
      console.log(data.value.posts);
      glStore.setPosts(data.value.posts);
      glStore.setLabelResultsAmount(data.value.posts.nodes)
    }

  }
  console.log('root state:', glStore.getPosts());
</script>
