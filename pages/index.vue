<template>
  <AppHeader />

  <div id="layout-overview"
    class="flex flex-row flex-wrap max-w-5xl mx-auto"
  >
    <aside id="filters-interventions"
      class="w-full md:w-2/6"
    >
      <div id="filters-container"
        class="bg-white hidden m-4 md:m-0 sm:block md:mr-4 p-8 rounded-lg h-full"
      >
      <!-- Filters -->
      <p class="text-md">Filters:</p>
        <form class="text-sm mb-6">
          <div v-for="(filter, index) in catFilters" :key="index" class="mb-4">
            <strong class="mb-1" v-text="filter.xname"></strong>
            <div class="mb-1" v-for="(entry, entryIndex) in filter" :key="entryIndex">
              <template v-if="entry.name">
                <input type="checkbox" :name="index + '-' + entry.name" />
                <label :for="index + '-' + entry.name" class="inline-block ml-2"> {{ entry.name}} <sup>({{entry.amount}})</sup></label>
              </template>
            </div>
          </div>
        </form>

        <!-- Categories -->
        <p class="text-md">Categories:</p>
        <div class="text-sm mb-10">
            <template v-for="(category, index) in baseFilters">
              <div v-if="category.name">
                <span class="text-xl">&rsaquo; </span>
                <nuxt-link
                  :to="category.link"
                  :key="index"
                  class="inline-block text-blue-700 hover:text-green-700 transitin-colors duration-150"
                >{{category.name}}</nuxt-link>
              </div>
            </template>
        </div>
        <div id="reset-filters" class="text-center my-6">
          <button class="text-center px-3 py-2 bg-slate-200 text-slate-600 rounded-sm text-sm hover:bg-slate-400 hover:text-slate-800">RESET</button>
        </div>
        <div id="main-search">
          <form action="" class="relative w-full">
            <input type="text" placeholder="Search..." class="rounded-l-sm border border-slate-300 px-2 h-8 w-full pr-8" />
            <input type="submit" class="bg-green-700 hover:bg-green-800 rounded-r-sm px-2 h-8 absolute right-0" value="🔍" />
          </form>
        </div>
      </div>
    </aside>

    <!--
      <template v-if="String(index) !== 'xlink' && String(index) !== 'xname'">
        <strong class="w-16 inline-block">{{index}}</strong><br />
        <div v-for="(entry, entryIndex) in  filter" :key="('entry' + entryIndex)">
          {{String(entry)}}
          <input type="checkbox" :name="index + '-' + entry.name" /><label for="index + '-' + entry.name" class="inline-block ml-2" v-text="entry.name"></label>
        </div>
      </template>
    -->

    <main id="landscape-interventions" class="w-full md:w-4/6">
      <div id="intervention-container" class="bg-white mx-4 sm:mx-0 md:ml-4 p-8 rounded-lg h-full">

        <h2 class="text-center pb-4" v-text="glStore.labelResultsAmount"></h2>

        <div id="intervention-panels" class="flex flex-row flex-wrap">

            <nuxt-link
              :id="('intervention-panel-' + index)"
              :to="'posts/' + post.databaseId"
              v-for="(post, index) in posts" :key="index"
              class="w-1/2 lg:w-1/4 sm:w-1/3 text-center mb-4 px-4 pt-2"
            >
              <img class="brightness-100 hover:brightness-125 transition-all inline-block rounded-md w-full"
                :src="post.featuredImage.node.mediaItemUrl"
                :alt="post.title"

              />

              <div v-html="post.title"
                class="w-full pt-4 font-bold leading-tight"
              ></div>
            </nuxt-link>
        </div>

      </div>
    </main>
  </div>

  <AppFooter />
</template>
<script lang="ts" setup>
  import {useGLStore } from '~/stores/GLStore';
  const glStore = useGLStore();
  let posts:any[];
  let categories:any;
  let catFilters: any;
  let baseFilters: any;

  if (glStore.posts === undefined) {

    //TODO: Move query to PINIA as an action
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
      }
    }`

    const variables = {id: "Interventions"}
    const { data } = await useAsyncQuery(query, variables);
    if (data?.value?.posts) {
      glStore.setPosts(data.value.posts);

      glStore.setAllFilters(data.value.posts.nodes);
      glStore.setLabelResultsAmount(data.value.posts.nodes)
      categories = glStore.getAllFilters();
      catFilters = categories.filters;
      baseFilters = categories.base;

      posts = glStore.posts.nodes;

      // Filtering can be done like this:
      // posts = glStore.getFilteredPosts(["6-15%", "1-5%"]);
    }

  } else {
    if (!glStore.allFilters) {
      glStore.setAllFilters(glStore.posts.nodes);
      posts = glStore.posts.nodes;

      // Filtering can be done like this:
      // posts = glStore.getFilteredPosts(["6-15%", "1-5%"]);
    }

    categories = glStore.allFilters;
    catFilters = categories.filters;
    baseFilters = categories.base;
  }
</script>
