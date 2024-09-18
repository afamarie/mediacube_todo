<template>
  <section class="tasks-dashboard">
    <div class="dashboard-section">
      <h3>Completed</h3>
      <p class="caption">{{ getCaption(completed) }}</p>
      <div class="indicator completed">
        <span :style="{ width: getWidth(completed) }"></span>
      </div>
    </div>
    <div class="dashboard-section">
      <h3>To be finished</h3>
      <p class="caption">{{ getCaption(active) }}</p>
      <div class="indicator active">
        <span :style="{ width: getWidth(active) }"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  completed: {
    type: Number,
    default: 0,
  },
  active: {
    type: Number,
    default: 0,
  },
});

const getCaption = (value: number): string => {
  let result = `${value} tasks`;

  if (value === 0) {
    result = "No tasks";
  } else if (value === 1) {
    result = "1 task";
  }

  return result;
};

const getWidth = (value: number): string => {
  const total = props.active + props.completed;

  if (total === 0) {
    return "0%";
  }

  const percentage = (value / total) * 100;
  return Math.round(percentage) + "%";
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/mixins.scss";

.tasks-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  padding-top: 1rem;
  padding-bottom: 1rem;

  .dashboard-section {
    display: flex;
    flex-direction: column;

    padding: 1rem;
    text-align: left;

    border-radius: 1rem;
    background-color: var(--bg-transparent);
  }

  h3 {
    @include bold14;

    order: 1;
    color: var(--text-basic);
  }

  .caption {
    @include caption12;

    order: 2;
    color: var(--text-transparent);
  }

  .indicator {
    position: relative;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    height: 4px;
    flex-grow: 1;

    order: 3;

    border-radius: 2px;
    background-color: var(--bg-transparent);

    overflow: hidden;

    span {
      position: absolute;
      inset: 0;

      border-radius: 2px;
    }

    &.completed > span {
      background-color: var(--done);
    }

    &.active > span {
      background-color: var(--active);
    }
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
