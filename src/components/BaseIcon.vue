<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" :fill="color">
    <use :href="sprite + `#${name}`" />
  </svg>
</template>
<script>
import sprite from "@/assets/sprite.svg";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      defautl: "1em",
      required: true,
    },
  },
  computed: {
    sprite() {
      return sprite;
    },
  },
};
</script>
