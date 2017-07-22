<template>
  <form class="dropzone">
    <div id="dropzone" style="display: none">
      <span class="dropzone-title">Arrastre aquí sus archivos</span>
      <span class="dropzone-info">Puedes subir multiples archivos</span>
    </div>
  </form>
</template>
<script>
import { s3, URL_S3, Bucket } from '@/connection'
import fs from 'fs'
import Dropzone from 'dropzone'
import '@/../../node_modules/dropzone/dist/dropzone.css'
Dropzone.autoDiscover = false
export default {
  name: 'dropzone-component',
  mounted () {
    let vm = this
    // Options to dropzone
    let options = {
      url: '/',
      method: 'put',
      sending (file, xhr) {
        let _send = xhr.send
        xhr.send = () => {
          _send.call(xhr, file)
        }
      },
      parallelUploads: 1,
      uploadMultiple: true,
      dictDefaultMessage: document.querySelector(`#dropzone`).innerHTML,
      autoProcessQueue: false,
      accept (file, done) {
        let fileName = file.name
        let params = {
          Key: fileName,
          ContentType: file.type,
          Body: fs.readFileSync(file.path),
          ACL: 'public-read',
          Bucket
        }
        s3.putObject(params, (error, data) => {
          if (error) {
            done('Error', error)
          } else {
            file.uploadURL = `${URL_S3}${fileName}`
            done()
            setTimeout(() => vm.dropzone.processFile(file))
            console.info('Uploaded!!', file.uploadURL)
          }
        })
      }
    }
    // Instantiate Dropzone
    this.dropzone = new Dropzone(this.$el, options)
    // Set signed upload URL for each file
    this.dropzone.on('processing', (file) => {
      this.dropzone.options.url = file.uploadURL
    })
  }
}
</script>