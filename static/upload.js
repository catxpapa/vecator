 const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const previewList = document.getElementById('preview-list');
        window.vtracerForm = document.getElementById('vtracer-form'); // 将 vtracerForm 提升为全局变量
         // 处理文件的核心函数
        function handleFiles(files) {
             console.log("handleFiles called", files); // 添加这行进行调试
              const fileArray = Array.from(files);
               fileInput.value = ''; // 清空 fileInput 的值
            fileArray.forEach(file => {
                const reader = new FileReader();
                const listItem = document.createElement('li');
                listItem.classList.add('preview-item');

                const imgContainer = document.createElement('div');
                imgContainer.classList.add('image-container');

                 const resultContainer = document.createElement('div');
                resultContainer.classList.add('result-container');
                resultContainer.innerHTML = '<p class="status">转换中...</p>';

                const codeContainer = document.createElement('div');
                codeContainer.classList.add('code-container');

               const textarea = document.createElement('textarea');
                textarea.readOnly = true;

                 const downloadButton = document.createElement('a');
                downloadButton.classList.add('download-button');
                downloadButton.textContent = '下载';
                downloadButton.style.display = 'none';


                const copyButton = document.createElement('button');
                 copyButton.textContent = '拷贝';
                copyButton.onclick = () => {
                     navigator.clipboard.writeText(textarea.value)
                    .then(()=> alert("SVG 代码已复制到剪贴板"))
                    .catch(err => alert("拷贝失败"));
                };
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');
                  buttonContainer.appendChild(copyButton);
                 buttonContainer.appendChild(downloadButton)

               codeContainer.appendChild(textarea);

                 listItem.appendChild(imgContainer);
                listItem.appendChild(resultContainer);
               listItem.appendChild(codeContainer);
                listItem.appendChild(buttonContainer);
                 previewList.prepend(listItem);

                reader.onload = (e) => {
                    imgContainer.style.backgroundImage = `url('${e.target.result}')`;
                };
               reader.readAsDataURL(file);

               uploadAndConvert(file, resultContainer, downloadButton, textarea);
           });

        }
        // 拖拽和粘贴事件
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

       uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

       uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
           handleFiles(e.dataTransfer.files);
       });

        uploadArea.addEventListener('paste', (e) => {
             const items = e.clipboardData.items;
            const files = [];
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    files.push(item.getAsFile());
               }
           }
            if (files.length > 0) {
               handleFiles(files);
            }
       });


        fileInput.addEventListener('change', (e) => {
              handleFiles(e.target.files);
        });