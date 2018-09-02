<template>
  <div :class="disabled ? 'disabled' : 'enabled'" class="photo-upload">
    <div
      ref="uploader"
      :class="{hovering, hasImage}"
      :style="{backgroundImage: backgroundImage}"
      class="uploader"
    >
      <span
        class="uploader__icon"
        @click="handleUploaderIconClick"
      >
        <i :class="uploaderIcon"/>
      </span>
      <input
        v-if="uploadReady"
        :disabled="disabled"
        class="file-photo"
        type="file"
        @change="handleImage"
        @dragenter="hovering = true"
        @dragleave="hovering = false"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      hovering: false,
      preview: null,
      uploadReady: true,
    }
  },
  computed: {
    backgroundImage () {
      let image = this.preview || this.value
      if (!image) return null
      return `url('${image}')`
    },
    hasImage () {
      return !!(this.value || this.preview)
    },
    uploaderIcon () {
      if (this.hasImage) return 'el-icon-delete'
      return 'el-icon-plus'
    },
  },
  methods: {
    isValidImage (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isValidFormat = isJPG || isPNG
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isValidFormat) this.$message.error('Logo must be JPG or PNG format!')
      if (!isLt2M) this.$message.error('Logo size can not exceed 1MB!')
      return isValidFormat && isLt2M
    },
    handleImage (event) {
      // eslint-disable-next-line
      if (this.disabled) return;
      let files = event.target.files

      // eslint-disable-next-line
      if (files.length === 0) return;

      // eslint-disable-next-line
      if(!this.isValidImage(files[0])) return;

      let reader = new FileReader()
      reader.onload = (event) => {
        this.preview = event.target.result
        this.$emit('input', files[0])
        this.upload(files[0])
      }
      reader.readAsDataURL(files[0])
    },
    upload (file) {
      // todo file upload to cloudinary and v-model
      console.log('upload file')
    },
    clear () {
      this.uploadReady = false
      this.$nextTick(() => {
        this.uploadReady = true
        this.preview = null
        this.$message('Logo deleted')
      })
    },
    handleUploaderIconClick () {
      // eslint-disable-next-line
      if (!this.hasImage) return;
      this.clear()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

  .uploader {
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border: $borderSize dashed $colorBase4;
    border-radius: $radius;
    &:hover {
      background-color: $colorBase6;
    }
    &__icon {
      color: $colorBase4;
      position:absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      cursor:pointer;
      i {
        color: $colorBase;
        position:absolute;
        left:50%;
        top:50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    transition: all 400ms ease;
    &.hasImage {
      border: 0px;
      .uploader__icon {
          z-index: 3;
          background-color:rgba($colorBase6,0);
          transition: all 0.4s ease;
          i {
            opacity: 0;
            transition: opacity 0.4s ease;
          }
          &:hover {
            background-color:rgba($colorBase6,0.75);
            i {
              opacity: 1;
            }
          }
      }
    }
  }
  .enabled {
    .file-photo {
      cursor: pointer;
    }
  }

  .file-photo {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0;
  }

  .uploader img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    border: none;
  }
</style>
