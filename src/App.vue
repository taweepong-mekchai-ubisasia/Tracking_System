<template>
  <div class="scroll-smooth">
    <router-view ref="view" />
  </div>
</template>
<script>
import { useFavicon } from '@vueuse/core'

const icon = useFavicon()

icon.value = require(`@/assets/img/favicon-32x32.png`)
export default {
  name: "app",
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user() {
      return this.$store.getters.user;
    },
    jwt() {
      return this.$store.getters.jwt;
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      // this.$store.commit(
      //   "language",
      //   localStorage.getItem("language")
      //     ? localStorage.getItem("language")
      //     : "th"
      // );
      this.$store.commit(
        "theme",
        localStorage.getItem("theme")
          ? localStorage.getItem("theme")
          : "th"
      );
    });
  },
  created() {},
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap");
#app,
html,
* {
  // font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  //   Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  //  font-family: 'IBM Plex Sans Thai', sans-serif;
  // font-weight: 500;
  // --font-mono: "Fira Mono", monospace;
  --pure-white: #ffffff;
  --primary-color: #b9c6d2;
  --secondary-color: #d0dde9;
  --tertiary-color: #edf0f8;
  --accent-color: #ff3e00;
  --heading-color: rgba(0, 0, 0, 0.7);
  --text-color: #444444;
  --background-without-opacity: rgba(255, 255, 255, 0.7);
  --column-width: 42rem;
  --column-margin-top: 4rem;
  scroll-behavior: smooth;
}

body {
  // overflow:hidden
  /* background-color: red; */
  height: 100dvh;
  --tw-bg-opacity: 1;
  // background-color: var(--fallback-b2, oklch(var(--b2) / 1));
  background-color: 
var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))
  
}
[data-theme="ubis"] .menu li > *:not(ul):not(.menu-title):not(details):active,
.menu li > *:not(ul):not(.menu-title):not(details).active,
.menu li > details > summary:active {
  border-width: 2px;
  border-color: rgba(180, 180, 180, 0.2);
  color: white !important;
}

body::before {
  content: "";
  width: 80vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 10vw;
  z-index: -1;
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--pure-white) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.05;
}

#svelte {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1,
h2,
p {
  font-weight: 400;
  color: var(--heading-color);
}

p {
  line-height: 1.5;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

h2 {
  font-size: 1rem;
}

pre {
  font-size: 16px;
  font-family: var(--font-mono);
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 3px;
  box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
  padding: 0.5em;
  overflow-x: auto;
  color: var(--text-color);
}

input,
button {
  font-size: inherit;
  font-family: inherit;
}

button:focus:not(:focus-visible) {
  outline: none;
}

@media (min-width: 720px) {
  h1 {
    font-size: 2.4rem;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 3.5px;
  height: 3.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b6b6b6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a4a4a4;
}
select:active,select:hover,select:focus,
input:active,input:hover,input:focus{
  outline-width: 0px !important;
}

tr,
td {
  white-space: nowrap;
}
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
</style>
