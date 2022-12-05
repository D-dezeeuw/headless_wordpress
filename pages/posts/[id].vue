<template>
  <AppHeader page="post" />

	<div v-html="activePost?.content"></div>

</template>
<script lang="ts" setup>
  import {useGLStore } from '~/stores/GLStore';
  const glStore = useGLStore();
  const route = useRoute();

  glStore.setActivePost(route.params.id);
  let activePost = glStore.getPost('post-' + String(route.params.id))

  if (!activePost && route.params.id) {

    // Get post from wordpress
    const query = gql`query getPost($id:ID!){
      post(id: $id, idType: DATABASE_ID) {content}
    }`

    const { data } = await useAsyncQuery(query, { id: route.params.id});

    if (data?.value?.post) {
      // Set post in local data store
      glStore.setPost('post-' + String(route.params.id), data.value.post);
      activePost = glStore.getPost('post-' + String(route.params.id))
    }
  }
</script>
