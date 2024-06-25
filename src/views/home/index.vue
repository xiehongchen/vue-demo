<template>
  <div class="page">
    <div class="upload-box">
      <div class="upload">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          listType="picture-card"
          :before-upload="beforeUpload" 
          @remove="handleRemove"
          @preview="handlePreview"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">点击或拖动文件到该区域上传</p>
          <p class="ant-upload-hint">
            支持单次或批量上传
          </p>
        </a-upload-dragger>
      </div>
    </div>
    <div class="select-box">
      <a-transfer
        v-model:target-keys="targetKeys"
        :titles="['上传', '展示']"
        :data-source="fileList"
        :list-style="{
          width: '300px',
          height: '300px',
        }"
        @change="handleChange"
      >
        <template #render="item">
          <div style="text-align: left">
            <a-image :width="40" :height="40" :src="item.preview"></a-image>
            <span class="custom-item" style="color: red">{{ item.name }}</span>
          </div>
        </template>
      </a-transfer>
    </div>
    <div class="show-box">
      <div v-for="item in imgList" :key="item.index" class="box">
        <div
          class="item"
          :draggable="item.image ? true : false"
          @dragstart="dragStart(item, $event)"
          @dragover="dragOver($event)"
          @drop="drop(item, $event)"
          @dragend="dragEnd"
        >
          <template v-if="item.image">
              <img style="width: 100px; height: 100px;" :src="item.image" />
          </template>
          <template v-else>
            {{ item.index }}
          </template>
        </div>
      </div>
    </div>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// 上传区域
import { InboxOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';

const fileList = ref<UploadProps['fileList']>([]);

const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value!.indexOf(file);
  const newFileList = fileList.value!.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps['beforeUpload'] = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file)) as string;
  }
  file.key = file.uid
  fileList.value = [...(fileList.value || []), file];
  return false;
};
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 筛选区域
const targetKeys = ref<string[]>();


const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('nextTargetKeys', nextTargetKeys, direction, moveKeys)
  const list = fileList.value?.filter((item: any )=> nextTargetKeys.includes(item.key)) as any[]
  console.log('list', list)
  let hasImage = imgList.value.filter(item => item.image)
  console.log('hasImage', hasImage)
  if (hasImage.length > 0) {
    let listKeys = list.map(item => item.key)
    imgList.value = imgList.value.map(imgItem => {
      // 如果该key有值，且list不存在该key，image置空
      if (imgItem.key && !listKeys.includes(imgItem.key)) {
        return { ...imgItem, image: '', key: '' }
      }
      if (listKeys.includes(imgItem.key)) {
        // 过滤掉已经存在的key
        listKeys = listKeys.filter(key => key !== imgItem.key)
      }
      console.log('listKeys', listKeys)
      return imgItem
    })
    console.log('listKeys', listKeys)
    // 如果存在没有的key，就按顺序加上
    if (listKeys.length) {
      for (let i = 0; i < listKeys.length; i++) {
        const index = imgList.value.findIndex(item => item.key === '')
        const item = list.find(item => item.key == listKeys[i])
        console.log('index', index)
        imgList.value[index].image = item.preview
        imgList.value[index].key = item.key
      }
    }
  } else {
    for (let i = 0; i < list!.length; i++) {
      imgList.value[i].image = list[i].preview
      imgList.value[i].key = list[i].key
    }
  }
  hasImage  = imgList.value.filter(item => item.image)
  console.log('hasImage', hasImage)
};
// 展示区域
let imgList = ref([
  { index: 1, image: '', key: '' },
  { index: 2, image: '', key: '' },
  { index: 3, image: '', key: '' },
  { index: 4, image: '', key: '' },
  { index: 5, image: '', key: '' },
  { index: 6, image: '', key: '' },
  { index: 7, image: '', key: '' },
  { index: 8, image: '', key: '' },
  { index: 9, image: '', key: '' },
  { index: 10, image: '', key: '' },
  { index: 11, image: '', key: '' },
  { index: 12, image: '', key: '' },
  { index: 13, image: '', key: '' },
  { index: 14, image: '', key: '' },
  { index: 15, image: '', key: '' },
  { index: 16, image: '', key: '' },
  { index: 17, image: '', key: '' },
  { index: 18, image: '', key: '' },
  { index: 19, image: '', key: '' },
  { index: 20, image: '', key: '' }
]);

let dragItem = ref(null);

function dragStart(item: any, event: any) {
  console.log('dragStart', item, event);
  dragItem.value = item;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', JSON.stringify(item));
}

function dragOver(event: any) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function drop(item: any, event: any) {
  event.preventDefault();
  const data = JSON.parse(event.dataTransfer.getData('text/plain'));
  console.log('data', data, item);
  const index1 = imgList.value.findIndex((i) => i.index === item.index);
  const index2 = imgList.value.findIndex((i) => i.index === data.index);
  console.log('index', index1, index2)
  if (index1 > -1 && index2 > -1) {
    // 交换两个图片的 index 属性
    const temp = { ...imgList.value[index1] }
    imgList.value[index1].image = imgList.value[index2].image;
    imgList.value[index1].key = imgList.value[index2].key;
    imgList.value[index2].image = temp.image;
    imgList.value[index2].key = temp.key;
    console.log('imgList', imgList.value, temp)
  }
}

function dragEnd() {
  dragItem.value = null;
}
</script>
<style lang="scss" scoped>
.page {
  padding: 16px;
  display: flex;

  .upload-box {
    flex: 1;
    :deep(.ant-upload-list) {
      height: 240px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      .ant-upload-list-item-container {
        width: 32%;
        &:nth-of-type(3n-1) {
          margin: 0 2%;
        }
      }
    }
  }

  .show-box {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 10px;
    row-gap: 10px;
    .box {
      border: 1px solid #eee;
      border-radius: 8px;
      width: 120px;
      height: 120px;
      transition: transform 0.3s ease; // 添加过渡效果
    }

    .item {
      font-size: 20px;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
  }
  .select-box {
    flex: 1;
    padding: 0 50px;
  }
}
</style>
