<template>
  <strong>Post</strong> | <nuxt-link to="/post">about</nuxt-link> - <nuxt-link to="/">home</nuxt-link><br />
    <hr />

	<div v-html="data?.post?.content"></div>

</template>
<script lang="ts" setup>
  const route = useRoute();


  const query = gql`
    query getPost($id:ID!){
      post(id: $id, idType: DATABASE_ID) {
        content
      }
    }
  `

const variables = {
  id: route.params.id
}
const { data} = await useAsyncQuery(query, variables);

</script>
