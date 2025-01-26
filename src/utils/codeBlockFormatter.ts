// 格式化代码块 (添加行号等)
export default function formatCodeBlock(htmlContent: string) {
  // 使用 DOMParser 解析 HTML 内容
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // 查找所有的 <pre><code> 块
  const codeBlocks = doc.querySelectorAll("pre > code");

  codeBlocks.forEach((codeBlock) => {
    // 获取代码内容并按行分割
    const codeLines = (codeBlock.textContent || '').split("\n");

    // 创建 <ul> 元素
    const ulElement = document.createElement("ul");
    ulElement.className = "pre-numbering";
    ulElement.classList.add("code-lines");

    // 创建头部元素
    const preElement = codeBlock.parentElement;
    const headerElement = document.createElement("div");
    headerElement.classList.add("code-header");

    // 获取代码语言类型
    const lang = codeBlock.className.replace('language-', '');
    const langElement = document.createElement("span");
    langElement.classList.add("code-lang");
    langElement.textContent = lang;

    // 创建复制按钮
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-button");
    copyButton.textContent = "复制";

    // 复制按钮点击事件
    copyButton.addEventListener("click", () => {
      const codeText = codeBlock.textContent || '';
      navigator.clipboard.writeText(codeText).then(() => {
        console.log("Copied to clipboard: ", codeText);
        copyButton.textContent = "已复制";
        setTimeout(() => {
          copyButton.textContent = "复制";
        }, 2000);
      });
    });

    // 将语言类型和复制按钮添加到头部
    headerElement.appendChild(langElement);
    headerElement.appendChild(copyButton);
    
    // 创建 <li> 元素
    const liElement = document.createElement("li");
    liElement.className = "line-number";
    // <ul class="pre-numbering" style="">
    //   <li style="color: rgb(153, 153, 153);">1</li>
    //   <li style="color: rgb(153, 153, 153);">2</li>
    //   <li style="color: rgb(153, 153, 153);">3</li>
    // </ul>
    codeLines.forEach((line, index) => {
      if (index < codeLines.length - 1) {
        const codeLine = liElement.cloneNode();
        codeLine.textContent = (index + 1).toString();
        ulElement.appendChild(codeLine);
      }
    });
    // 在 <pre><code></code></pre> 之间插入 <ul> 元素
    if (codeBlock.parentNode) {
      codeBlock.parentNode.insertBefore(ulElement, codeBlock);
    }
  });

  // 返回修改后的 HTML 内容
  return doc.body.innerHTML;
}