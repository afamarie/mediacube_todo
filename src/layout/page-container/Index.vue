<template>
  <main class="page-container">
    <header>
      <ThemeSwitcher />
    </header>
    <section>
      <img
        :src="imgUrl"
        class="illustration"
        width="180"
        height="180"
        alt="Mediacube Todo Application Logo"
      />
      <h1>{{ header }}</h1>
      <slot />
    </section>
  </main>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/theme-switcher/Index.vue'

const imgUrl = new URL('@/assets/images/illustration.svg', import.meta.url).href

defineProps<{
  header: string
}>()
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin: 0 auto;
  padding: 1em;
  width: 100%;
  max-width: 1140px;

  header {
    display: flex;
    justify-content: flex-end;
  }

  section {
    margin: clamp(1rem, 5%, 5rem) auto;
    padding: 2em;
    flex-grow: 1;

    width: 100%;
    max-width: 730px;

    border-radius: 1.5rem;
    background-color: var(--bg-basic);

    text-align: center;
  }

  .illustration {
    width: clamp(4rem, 12.5vw, 11.25rem);
    height: clamp(4rem, 12.5vw, 11.25rem);

    filter: drop-shadow(5px 5px 5px rgba(255, 255, 255, 0.2));
  }

  h1 {
    @include header24;
  }
}
</style>
