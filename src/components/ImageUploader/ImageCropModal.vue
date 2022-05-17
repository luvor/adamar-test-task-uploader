<template>
  <div class="hidden">
    <img :src="cropping" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      cropping: null,
    };
  },
  methods: {
    doCrop(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.cropping = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
