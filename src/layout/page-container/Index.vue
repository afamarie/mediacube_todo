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
      <div class="content-wrapper">
        <slot />
      </div>
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
  padding: 0 1em;
  width: 100%;
  max-width: 1140px;

  header {
    display: flex;
    justify-content: flex-end;

    padding: 1rem 0;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: auto;
    padding: 2em;
    flex-grow: 1;

    width: 100%;
    max-width: 730px;

    border-radius: 1.5rem;
    background-color: var(--bg-basic);

    transition: background-color var(--trans-default);

    @media (max-width: 767px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .illustration {
    margin-left: auto;
    margin-right: auto;

    width: clamp(4rem, 12.5vw, 11.25rem);
    height: clamp(4rem, 12.5vw, 11.25rem);

    filter: drop-shadow(5px 5px 5px rgba(255, 255, 255, 0.2));

    @media (max-width: 767px) {
      width: clamp(4rem, 45vw, 8rem);
      height: clamp(4rem, 45vw, 8rem);
    }
  }

  h1 {
    @include header24;
    text-align: center;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: clamp(228px, 50vw, 410px);

    @media (max-width: 767px) {
      width: 100%;
    }
  }
}
</style>
