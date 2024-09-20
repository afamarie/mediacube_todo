<template>
  <Teleport to="body">
    <div class="toast-alerts">
      <transition-group name="fade" tag="div">
        <div
          class="toast-alerts toast-alerts__toast"
          v-for="alert in store.alerts"
          :key="alert.id"
          :class="'toast-alerts__toast--' + alert.status"
        >
          <span>{{ alert.message }}</span>
          <button class="toast-alerts toast-alerts__remove-btn" @click="removeAlert(alert.id)">
            ✖
          </button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAlertStore } from './store'

const store = useAlertStore()

const removeAlert = (id: string) => {
  store.removeAlert(id)
}
</script>

<style lang="scss">
@import '@/assets/styles/mixins.scss';

.toast-alerts {
  position: fixed;

  bottom: 1.6px;
  right: 1.6px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  isolation: isolate;
  z-index: 1;

  &__toast {
    @include caption12;

    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem 1rem;
    margin: 0.5rem 0;

    border-radius: 0.5rem;
    background-color: var(--bg-basic);
    color: var(--text-basic);
    box-shadow: -5px -1px 10px 0 var(--bg-transparent);

    animation: fallIn 0.5s ease;

    &--success {
      color: var(--success);
    }

    &--danger {
      color: var(--danger);
    }
  }

  &__remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    width: 1rem;
    height: 1rem;

    background-color: transparent;
    border: none;
    color: var(--text-basic);

    cursor: pointer;

    @media (max-width: 767px) {
      display: none;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fall-enter-active {
    animation: fallIn 0.5s ease;
  }

  .fall-leave-active {
    animation: fallOut 0.5s ease;
  }

  @keyframes fallIn {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fallOut {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }
}
</style>
