<template>
  <div id="input" class="flex">
    <div class="input-area">
      <input-toolbar @addEmoji="addEmoji"></input-toolbar>
      <textarea class="textarea" ref="textarea" @keypress.stop="handleInput"></textarea>
    </div>

    <div class="action-area">
      <button type="button" class="send" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import InputToolbar from './Toolbar'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'chat-input',

  components: {
    InputToolbar
  },

  computed: mapState(['socket', 'connectionState']),

  methods: {
    ...mapMutations(['addMessage']),

    handleInput (event) {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault()
        this.sendMessage()
      }
    },

    addEmoji (emoji) {
      let textarea = this.$refs.textarea
      let value = textarea.value
      let start = textarea.selectionStart
      let end = textarea.selectionEnd

      textarea.value = value.slice(0, start) + emoji + value.slice(end)
      textarea.setSelectionRange(start + 2, start + 2) // emoji takes up two code units
      textarea.focus()
    },

    sendMessage (event) {
      let textarea = this.$refs.textarea
      let text = textarea.value
      console.log(text)
      if (text) {
        this.addMessage({ text, role: 'you' })
        var http_request = 'https://api.pandorabots.com/talk?botkey=cmNxvzM3vWEV2r9Da7sIOHAqWGkHr0kkkB3pud81ubHB2E7V1ft74tl9W8m_mhbDIjNhLFzaMCA~&input='
        fetch(http_request.concat(text), {
          method: 'POST'
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            for (const response of data.responses) {
              setTimeout(() => this.addMessage({ text: response, role: 'partner' }), 3000);
              // this.addMessage({ text: response, role: 'partner' })
              console.log(response)
            }
            console.log(data.responses)
          })
        textarea.value = ''
        // if (this.connectionState === 'open') {
        //   this.socket.emit('message', { text, role: 'partner' })
        // }
      }
    }
  }
}
</script>

<style lang="less">
#input {
  border-top: 1px solid #ddd;
  flex: 1 0 auto;

  .input-area {
    flex: 1 1 auto;
    padding: 5px 20px;

    .textarea {
      width: 100%;
      height: 60px;
      resize: none;
      border: none;
      padding: 0;
      outline: none;
      font-size: 1rem;
    }
  }

  .action-area {
    border-left: 1px solid #ddd;

    .send {
      width: 80px;

      &:hover {
        background-color: #f5f5f5;
      }

      &:active {
        background-color: #eeeeee;
      }
    }
  }
}
</style>
