# Vue3-Easy-Directives

​		Vue promotes the idea of a data-driven view, but not all situations are data-driven, so it provides an interface for custom instructions. The project encapsulates a set of custom instructions that are easy to use on a daily basis, effectively complementing and extending the custom manipulation of the DOM. In order to improve reusability across multiple projects, it is packaged and published on npm for download. In order to simplify the development and release process, the Github Action workflow is configured to automatically publish npm.

## Install



```
npm i vue3-easy-directives
or
yarn add vue3-easy-directives
or
pnpm i vue3-easy-directives
```



## Usage

Global import（Can also be imported on demand）

```js
// main.js
import vue3EasyDirectives from 'vue3-easy-directives'

app.use(vue3EasyDirectives)

```



1. focus

   ```js
   <input type="text" v-focus>
   ```

2. trim

   ```js
   // By default, it is triggered after the blur event
   <input type="text" v-trim>
   
   // Can also pass in the input argument
   <input type="text" v-trim:input>
   ```

3. copy

   ```vue
   <template>
   	<div>
   		<input type="text" v-model="message"/>
           <input
           	type="button"
           	v-copy="message"
           	v-copy:success="() => { console.log('success') }"
               v-copy:error="() => { console.log('error') }"
           />
   	</div>
   </template>
   
   <script setup>
   import { ref } from 'vue'
   
   // Yes, you can pass a reactive parameter
   const message = ref("hello world!")
   </script>
   ```

   

4. lazyLoad

   ```js
   // main.js
   
   import { lazyLoad } from 'vue3-easy-directives'
   
   app.use(lazyLoad, {
   	loading: '...',
       error: '...'
   })
   ```

   ```vue
   // component.vue
   <template>
   	<div>
   		<div v-for="image in images" :key="i" v-lazy-load="image.src"></div>
   	</div>
   </template>
   
   <script setup>
   const images = [{
       src: '...'
   }]
   </script>
   ```

   

5. slideIn

   ![PixPin_2024-03-10_23-16-23](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d79cd0acd844e0983000a90a1ecae17~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1005&h=639&s=187988&e=gif&f=127&b=2d8bad)

   ```vue
   <template>
   	<div>
   		<div v-for="i in 10" :key="i" v-slide-in></div>
   	</div>
   </template>
   ```

   