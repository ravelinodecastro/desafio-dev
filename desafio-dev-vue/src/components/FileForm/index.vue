<template>
  <div class="container">
    <h2>Faça o Upload do Ficheiro TXT</h2>
    <p class="lead">Apenas ficheiro no padrão deste<b>desafio</b></p>

    <!-- Upload  -->
    <form
      id="file-upload-form"
      class="uploader"
      action="/api/transactions/upload"
    >
      <input
        id="file-upload"
        type="file"
        name="fileUpload"
        accept="text/plain"
      />

      <label for="file-upload" id="file-drag">
        <div id="start">
          <i class="fa fa-download" aria-hidden="true"></i>
          <div>Clique em selecionar ou arraste para aqui</div>
          <div id="notimage" class="hidden">Ficheiro com formato inválido</div>
          <span id="file-upload-btn" class="btn btn-primary">Selecionar</span>
        </div>
        <div id="response" class="hidden">
          <div id="messages"></div>
          <progress class="progress" id="file-progress" value="0">
            <span>0</span>%
          </progress>
        </div>
      </label>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.ekUpload()
  },
  methods: {
    output(msg) {
      var m = document.getElementById('messages')
      m.innerHTML = msg
    },
    parseFile(file) {
      this.output('<strong>' + encodeURI(file.name) + '</strong>')

      var imageName = file.name

      var isGood = /\.(?=txt)/gi.test(imageName)
      if (isGood) {
        document.getElementById('start').classList.add('hidden')
        document.getElementById('response').classList.remove('hidden')
        document.getElementById('notimage').classList.add('hidden')
      } else {
        document.getElementById('notimage').classList.remove('hidden')
        document.getElementById('start').classList.remove('hidden')
        document.getElementById('response').classList.add('hidden')
        document.getElementById('file-upload-form').reset()
      }
    },
    fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag')

      e.stopPropagation()
      e.preventDefault()

      fileDrag.className =
        e.type === 'dragover' ? 'hover' : 'modal-body file-upload'
    },
    fileSelectHandler(e) {
      var files = e.target.files || e.dataTransfer.files

      this.fileDragHover(e)

      for (var i = 0, f; (f = files[i]); i++) {
        this.parseFile(f)
        this.uploadFile(f)
      }
    },
    Init() {
      var fileSelect = document.getElementById('file-upload'),
        fileDrag = document.getElementById('file-drag')

      fileSelect.addEventListener('change', this.fileSelectHandler, false)

      var xhr = new XMLHttpRequest()
      if (xhr.upload) {
        fileDrag.addEventListener('dragover', this.fileDragHover, false)
        fileDrag.addEventListener('dragleave', this.fileDragHover, false)
        fileDrag.addEventListener('drop', this.fileSelectHandler, false)
      }
    },
    uploadFile(file) {
      /*let fd = new FormData()
      fd.append('File', file)
      await this.$axios
        .$post('/transaction/upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          fileObj = resp
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {})
*/
      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        pBar = document.getElementById('file-progress'),
        fileSizeLimit = 1024 // In MB
      if (xhr.upload) {
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          pBar.style.display = 'inline'
          xhr.upload.addEventListener(
            'loadstart',
            this.setProgressMaxValue,
            false
          )
          xhr.upload.addEventListener(
            'progress',
            this.updateFileProgress,
            false
          )

          xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
              pBar.className = xhr.status == 200 ? 'success' : 'failure'
             document.location.reload()
            }
          }
          xhr.open(
            'POST',
            `${import.meta.env.VITE_API_URL}/api/transactions/upload`,
           // document.getElementById('file-upload-form').action,
            true
          )
          var formData = new FormData()
          formData.append('file', file)
          xhr.send(formData)
        } else {
          this.output(
            'Please upload a smaller file (< ' + fileSizeLimit + ' MB).'
          )
        }
      }
    },
    setProgressMaxValue(e) {
      var pBar = document.getElementById('file-progress')

      if (e.lengthComputable) {
        pBar.max = e.total
      }
    },

    updateFileProgress(e) {
      var pBar = document.getElementById('file-progress')

      if (e.lengthComputable) {
        pBar.value = e.loaded
      }
    },
    ekUpload() {
      if (window.File && window.FileList && window.FileReader) {
        this.Init()
      } else {
        document.getElementById('file-drag').style.display = 'none'
      }
    },
  },
}
</script>

