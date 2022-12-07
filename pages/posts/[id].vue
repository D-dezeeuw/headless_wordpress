<template>
  <AppHeader />

  <main id="landscape-interventions" class="max-w-5xl mx-auto">
    <div id="intervention-container" class="bg-white mx-4 sm:mx-0 p-8 rounded-lg">
      <!-- breadcrumb -->
      <div class="flex flex-row flex-wrap justify-between mb-8 relative">
        <div id="breadcrumbs">
          <nuxt-link to="/">Home</nuxt-link> / <span class="leading-tight opacity-50 text-green-700" v-text="activePost?.title"></span>
        </div>
        <div id="featured-image relative">
        <div class="absolute top-0 right-0 text-right">
          <!-- Intervention and Requirements (categories) -->
          <img :src="activePost?.featuredImage?.node?.mediaItemUrl" alt="" aria-hidden class="rounded-md inline-block mb-2" width="84" height="96" />
          <div class="text-xs mb-4">
            <span v-for="(filter, index) in postFilters.filters" :key="index">
              <template v-if="String(index) !== 'xname' && String(index) !== 'xlink'">
                <strong class="w-16 inline-block ">{{index}}</strong><br />
                <span v-for="(entry, entryIndex) in  filter" :key="('entry' + entryIndex)">
                  &nbsp;&nbsp;{{entry.name}}
                </span><br />
              </template>
            </span>
           </div>
        </div>
      </div>
    </div>
      <h1 class="text-4xl font-bold mb-10" v-text="activePost?.title"></h1>
      <div id="intervention-content" v-html="activePost?.content"></div>
    </div>
  </main>

</template>
<script lang="ts" setup>
  import {useGLStore } from '~/stores/GLStore';
  const glStore = useGLStore();
  const route = useRoute();
  let postFilters:any = {Filters: undefined, Base: undefined};

  glStore.setActivePost(route.params.id);
  let activePost = glStore.getPost('post-' + String(route.params.id))
  if (!activePost && route.params.id) {

    //TODO: Move query to PINIA as an action
    // Get post from wordpress
    const query = gql`query getPost($id:ID!){
      post(id: $id, idType: DATABASE_ID) {
        content
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        },
        categories {
          nodes {
            description
            name
            ancestors {
              nodes {
                name
                link
              }
            }
            link
          }
        }
      }
    }`

    const { data } = await useAsyncQuery(query, { id: route.params.id});

    if (data?.value?.post) {
      // Set post in local data store
      glStore.setPost('post-' + String(route.params.id), data.value.post);
      activePost = glStore.getPost('post-' + String(route.params.id))
      glStore.setPostFilters('filters-post-' + String(route.params.id), data.value.post.categories.nodes);
      postFilters = glStore.getPostFilters('filters-post-' + String(route.params.id));
    }
  } else {
    postFilters = glStore.getPostFilters('filters-post-' + String(route.params.id));
  }
</script>
