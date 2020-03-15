<template lang="pug">
main(:class="{['_bg-' + (photoIndex + 1)]: true}")
  .content
    .left
      h1 SwapLive
      p Swap your face and live chat!
      ul.features
        li
          img(src="@/assets/ad/neural.svg", alt="neural icon")
          p {{text[0]}}
        li
          img(src="@/assets/ad/camera.svg", alt="camera icon")
          p {{text[1]}}
        li
          img(src="@/assets/ad/speech-bubble.svg", alt="speech bubble icon")
          p {{text[2]}}
      template(v-if="!hasSubmitted")
        p {{text[3]}}
        .form
          ant-input(type="email", v-model="email", placeholder="Email address", @keyup.enter="submit")
          ant-button(type="primary", @click="submit") Sign up
      p(v-else) Thank you for signing up! We'll keep you updated.
    .right
      img(v-for="(src, index) in photos", :src="src", v-if="photoIndex === index")
  .iframe-container: iframe(frameborder="0", allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", :src="videoUrl")
</template>

<script>
import { Button as AntButton, Input as AntInput } from 'ant-design-vue'

import { callApi } from '../api.js'

const SLIDE_INTERVAL = 5 * 1000
const TEXT_FOR_CHAT = [
  'Customize an attractive face for you',
  'Swap your face with a generated face during video chatting',
  'Anonymouse 1-on-1 video chat protecting your privacy',
  'Coming soon! Sign up to get updates!'
]

const TEXT_FOR_SERVICE = [
  'Customize the face you love',
  'Customize the voice you love',
  'Customize the service you love',
  'Start from $5/hr coming soon! Sign up now to get membership discount!'
]

const YOUTUBE_URL = {
  chat: 'https://www.youtube.com/embed/W96M8ypbBPc',
  service: 'https://www.youtube.com/embed/yE71o-eKFEA'
}

export default {
  components: { AntButton, AntInput },
  data () {
    return {
      adType: this.$route.path.split('/')[1], // chat | service | serviceyt
      email: '',
      photoIndex: 0,
      photos: [require('@/assets/ad/phone-1.png'), require('@/assets/ad/phone-2.png'), require('@/assets/ad/phone-3.png')]
    }
  },
  computed: {
    videoUrl () {
      switch (this.adType) {
        case 'chat':
          return YOUTUBE_URL.chat
        case 'service':
          return YOUTUBE_URL.service
        case 'serviceyt':
          return YOUTUBE_URL.service
        default:
          return ''
      }
    },
    text () {
      switch (this.adType) {
        case 'chat':
          return TEXT_FOR_CHAT
        case 'service':
          return TEXT_FOR_SERVICE
        case 'serviceyt':
          return TEXT_FOR_SERVICE
        default:
          return []
      }
    },
    hasSubmitted () {
      return this.$route.path.split('/')[2] === 'complete'
    }
  },
  created () {
    this._addTracking()
    setInterval(() => {
      this.nextPhoto()
    }, SLIDE_INTERVAL)
  },
  methods: {
    nextPhoto () {
      this.photoIndex = (this.photoIndex + 1) % this.photos.length
    },
    submit () {
      callApi('config/user', {
        user_description: `Registered via the ${this.adType} ad.`,
        user_email: this.email,
        updated_ts: Math.round(new Date().getTime() / 1000)
      }, 'POST').catch((error) => {
        console.error('Submit error.', error)
      }).then(() => {
        this.$router.push(`${this.$route.path}/complete`)
      })
    },
    _addTracking () {
      switch (this.adType) {
        case 'chat':
          return this._addFacebookTracking()
        case 'service':
          return this._addFacebookTracking()
        case 'servicety':
          return this._addGoogleAdsTracking()
        default:
          return []
      }
    },
    _addFacebookTracking () {
      /* eslint-disable */
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq)f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'
        n.queue = []; t = b.createElement(e); t.async = !0
        t.src = v; s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js'))
      fbq('init', '215864872930611')
      fbq('track', 'PageView')
      /* eslint-enable */
    },
    _addGoogleAdsTracking () {
      /* eslint-disable */
      window.dataLayer = window.dataLayer || []; function gtag () { dataLayer.push(arguments) } gtag('js', new Date()); gtag('config', 'AW-663237508')
      /* eslint-enable */
    }
  }
}
</script>

<style lang="less" scoped>
:root {
  --z-content: 1;
  --z-bg-photos: 0;
  --transition: 1s linear;
}

main {
  position: relative;
  transition: background var(--transition);

  &._bg-1 {background-color: #009abf;}
  &._bg-2 {background-color: #fdc728;}
  &._bg-3 {background-color: #f16d3e;}
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  position: relative;
  z-index: var(--z-content);
}

.left {
  padding: 20vh 5em 3em;

  & > h1 {
    font-size: 3em;
    font-weight: 600;
  }

  & > p {
    font-size: 1.6em;
  }

  & > button {
    margin-top: 2em;
  }
}

form {
  display: flex;
  align-items: center;

  & input {
    margin-right: 1em;
  }
}

.features {
  display: flex;
  list-style: none;
  font-size: 1rem;
  padding: 0;

  & > li {
    flex: 1;
    text-align: center;
    margin: 1em;
  }

  & img {
    height: 3em;
    margin-bottom: 0.5em;
  }
}

.form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;

  & > button {
    margin-left: 1em;
  }
}

@media screen and (max-width: 800px) {
  main {
    background-position: 50% 100%;
  }

  .content {
    display: block;
    font-size: 0.8em;
  }

  .left {
    padding: 6em 2em 2em;
    text-align: center;
  }

  .features {
    display: block;

    & > li {
      margin-bottom: 2em;
    }
  }
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 300px;
  }
}

.iframe-container {
  grid-column: 1/-1;
  padding: 2em;
}

iframe {
  display: block;
  width: 800px;
  max-width: 100%;
  height: 450px;
  margin: 0 auto;
}
</style>
