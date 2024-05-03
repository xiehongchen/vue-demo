import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式

//创建v-highlight全局指令
export default {
  mounted(el: any) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLDivElement) => {
      hljs.highlightElement(block);
    });
  }
}
