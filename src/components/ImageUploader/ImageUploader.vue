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
    <div
      :class="{
        hidden: previewImage === null,
      }"
      class="absolute w-full h-full bg-black/50 inset-0 flex justify-center"
      @click="previewImage = null"
    >
      <div
        @click.stop
        class="relative bg-white p-2 m-4 max-w-[500px] max-h-[500px] h-min"
      >
        <canvas class="max-w-full max-h-full" id="canvas"></canvas>
        <div
          class="absolute right-0 bottom-0 flex justify-center items-center p-4"
          @click.stop
        >
          <button
            class="bg-white text-black border-0 px-3 py-2 mr-2 rounded-sm shadow-md hover:text-blue-500 duration-300"
            @click="appendImage"
          >
            Cancel
          </button>
          <button
            class="bg-blue-400 text-white border-0 px-3 py-2 rounded-sm shadow-md hover:bg-blue-500 duration-300"
            @click="appendImage"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
      previewResult: null,
      imageList: [],
    };
  },
  methods: {
    onDrag(e) {
      console.log(e);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const reader = new FileReader();
      reader.onload = (file) => {
        const image = new Image();
        image.src = file.target.result;
        image.onload = () => {
          let outWidth = image.width;
          let outHeight = image.height;
          let xaxis = 0;
          let yaxis = 0;

          const aspectRatio = outWidth / outHeight;

          this.previewImage = !0;

          if (aspectRatio !== 1) {
            if (outWidth > outHeight) {
              xaxis = (outWidth - outHeight) / 2;
              outWidth = outHeight;
            } else {
              yaxis = (outHeight - outWidth) / 2;
              outHeight = outWidth;
            }
          }
          canvas.width = outWidth;
          canvas.height = outHeight;
          ctx.drawImage(
            image,
            xaxis,
            yaxis,
            outWidth,
            outHeight,
            0,
            0,
            outWidth,
            outHeight
          );
          this.previewResult = canvas.toDataURL();
        };
      };
      reader.readAsDataURL(file);
    },
    appendImage() {
      this.imageList.push(this.previewResult);
      this.previewImage = null;
    },
  },
};
</script>
