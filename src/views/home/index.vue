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
          <a-image :width="40" :height="40" :src="item.preview"></a-image>
          <span class="custom-item" style="color: red">{{ item.name }}</span>
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
import { computed, nextTick, ref } from 'vue';

// 上传区域
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';

const fileList = ref<UploadProps['fileList']>([]);

const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value!.indexOf(file);
  const newFileList = fileList.value!.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps['beforeUpload'] = async (file: any) => {
  fileList.value = [...(fileList.value || []), file];
  console.log('file', file, fileList.value)
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
  console.log('file', file, fileList.value)
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
interface MockData {
  key: string;
  title: string;
  description: string;
}
const mockData = ref<any[]>([])
for (let i = 0; i < 20; i++) {
  mockData.value.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  });
}

const targetKeys = ref<string[]>();


const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys: ', nextTargetKeys);
  console.log('direction: ', direction);
  console.log('moveKeys: ', moveKeys);
  if (direction === 'right') {

  }
};
// 展示区域
let imgList = ref([
  { index: 1, image: '' },
  { index: 2, image: '' },
  { index: 3, image: '' },
  { index: 4, image: '' },
  { index: 5, image: '' },
  { index: 6, image: '' },
  { index: 7, image: '' },
  { index: 8, image: '' },
  { index: 9, image: '' },
  { index: 10, image: '' },
  { index: 11, image: '' },
  { index: 12, image: '' },
  { index: 13, image: '' },
  { index: 14, image: '' },
  { index: 15, image: '' },
  { index: 16, image: '' },
  { index: 17, image: '' },
  { index: 18, image: '' },
  { index: 19, image: '' },
  { index: 20, image: '' }
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
  if (index1 > -1 && index2 > -1) {
    // 交换两个图片的 index 属性
    const tempImage = imgList.value[index1].image;
    imgList.value[index1].image = imgList.value[index2].image;
    imgList.value[index2].image = tempImage;
  }
}

function dragEnd(event: any) {
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
  }
}
</style>
