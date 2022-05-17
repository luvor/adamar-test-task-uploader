<template>
  <div class="p-4 flex">
    <div v-if="imageList.length > 0" class="flex">
      <div
        v-for="image in imageList"
        :key="image"
        class="border-2 rounded-md p-2 flex items-center border-gray-100 max-w-[100px] h-[100px] mr-2"
      >
        <img :src="image" />
      </div>
    </div>
    <div class="mr-2">
      <input
        type="file"
        id="imageuploader__upload-btn"
        hidden
        @change="onFileChange"
      />
      <label
        class="flex justify-center items-center indent-1 hover:cursor-pointer hover:border-blue-400 bg-gray-100 border-2 border-gray-200 border-dashed rounded-md p-2 w-[100px] h-[100px] transition-all duration-300 ease-in-out"
        for="imageuploader__upload-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
          ></path>
        </svg>
        Upload
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      preview: null,
      imageList: [],
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageList.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
