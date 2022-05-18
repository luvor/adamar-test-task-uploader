<template>
  <div class="p-4 flex">
    <div v-if="imageList.length > 0" class="flex">
      <div
        v-for="(image, index) in imageList"
        :key="image"
        class="group relative border-2 rounded-md p-2 flex items-center border-gray-100 max-w-[100px] h-[100px] mr-2"
      >
        <div
          class="hidden group-hover:flex group-hover:items-center group-hover:justify-center group-hover:absolute group-hover:inset-0 group-hover:bg-black/80"
        >
          <button
            @click="watchImageFromList(index)"
            class="border-0 text-white hover:text-blue-400 mr-1"
          >
            <base-icon name="eye" size="1.2em" />
          </button>
          <button
            @click="deleteImageFromList(index)"
            class="border-0 text-white hover:text-blue-400"
          >
            <base-icon name="delete" size="1.2em" />
          </button>
        </div>
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
        <base-icon name="plus" size="1em" />
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
        <img
          v-if="previewImage && typeof previewImage === 'object'"
          :src="previewImage[0]"
        />
        <canvas v-else class="max-w-full max-h-full" id="canvas"></canvas>
        <div
          :class="{
            hidden: typeof previewImage === 'object',
          }"
          class="absolute right-0 bottom-0 flex justify-center items-center p-4"
        >
          <button
            class="bg-white text-black border-0 px-3 py-2 mr-2 rounded-sm shadow-md hover:text-blue-500 duration-300"
            @click="cancelImageUpload"
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
import BaseIcon from "@/components/BaseIcon.vue";
export default {
  components: {
    BaseIcon,
  },
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
    deleteImageFromList(id) {
      this.imageList.splice(id, 1);
    },
    watchImageFromList(id) {
      this.previewImage = [this.imageList[id], "no-buttons"];
    },
    cancelImageUpload() {
      this.previewImage = null;
    },
    appendImage() {
      this.imageList.push(this.previewResult);
      this.previewImage = null;
    },
  },
};
</script>
