<template>
  <Layout :sidebar="false">
    <div class="content">
      <h1>{{ $static.metadata.siteName }} - {{ this.description }}</h1>
      <nav>
        <LanguageButton v-for="{ node } in $static.lang.edges" :key="node.name" :link="node.path" :text="node.name"/>
      </nav>
      <GitLink class="git" size="large"/>
    </div>
  </Layout>
</template>

<static-query>
  query {
    metadata {
      siteName
    }

    lang: allLang(order:ASC) {
      edges {
        node {
          name
          path
        }
      }
    }
  }
</static-query>

<script>
  import GitLink from '~/components/GitLink.vue'
  import LanguageButton from '~/components/LanguageButton.vue'

  export default {
    components: {
      GitLink,
      LanguageButton
    },
    data() {
      return {
        description: 'Quick recaps of most languages'
      }
    },
    metaInfo() {
      return {
        title: this.description,
        meta: [
          {
            key: 'description',
            name: 'description',
            content: 'Quick syntax recaps of most languages.'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
    max-width: 600px;
    margin: 1.5em auto 1.5em;

    @include respond-above(md) {
      max-width: 1000px;
    }
  }

  h2 {
    font-size: 1.4rem;
    margin: 0;
  }

  nav {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include respond-above(sm) {
      flex-direction: row;
    }
  }

  .git {
    margin: 3em 0 0;
    align-self: center;

    @include respond-above(md) {
      margin: 5em 0 0;
    }
  }
</style>
