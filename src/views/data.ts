import data from './data.json'

interface Item {
  title: string;
  date: string;
  updateDate: string;
  tags: string[];
  summary: string;
  category: string[];
  image: string;
}

interface CategoryData {
  title: string;
  data: Item[];
}

export const list = data

export const cateList: CategoryData[] = data.reduce<CategoryData[]>((acc, item) => {
  item.category.forEach(category => {
      const existingCategory = acc.find(c => c.title === category);
      if (existingCategory) {
          existingCategory.data.push(item);
      } else {
          acc.push({ title: category, data: [item] });
      }
  });
  return acc;
}, []);

export const tagList = data.reduce<CategoryData[]>((acc, item) => {
  item.tags.forEach(category => {
      const existingCategory = acc.find(c => c.title === category);
      if (existingCategory) {
          existingCategory.data.push(item);
      } else {
          acc.push({ title: category, data: [item] });
      }
  });
  return acc;
}, []);
