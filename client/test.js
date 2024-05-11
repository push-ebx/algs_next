const data = [
  {
    category: 'Категория 1',
    title: 'Статья 1.1.3',
    subcategory: 'Подкатегория 1.1'
  },
  {
    category: 'Категория 1',
    title: 'Статья 1.1.1',
    subcategory: 'Подкатегория 1.1'
  },
  {
    category: 'Категория 1',
    title: 'Статья 1.1.2',
    subcategory: 'Подкатегория 1.1'
  },
  {
    category: 'Категория 1',
    title: 'Статья 1.2.2',
    subcategory: 'Подкатегория 1.2'
  },
  {
    category: 'Категория 1',
    title: 'Статья 1.2.3',
    subcategory: 'Подкатегория 1.2'
  },
  {
    category: 'Категория 2',
    title: 'Статья 2.1.1',
    subcategory: 'Подкатегория 2.1'
  },
  {
    category: 'Категория 2',
    title: 'Статья 2.1.2',
    subcategory: 'Подкатегория 2.1'
  },
  {
    category: 'Категория 2',
    title: 'Статья 2.2.2',
    subcategory: 'Подкатегория 2.2'
  },
  {
    category: 'Категория 2',
    title: 'Статья 2.2.1',
    subcategory: 'Подкатегория 2.2'
  },
  {
    category: 'Категория 2',
    title: 'Статья 2.1.2',
    subcategory: 'Подкатегория 2.2'
  }
]

const tree = {title: "Содержание", child: []};

let category = '';
let subcategory = '';
let index_category = 0;
let index_subcategory = 0;

for (const article of data) {
  if (article.subcategory !== subcategory) {
    if (article.category !== category) { // если новая категория, то и новая подкатегория
      tree.child.push({title: article.category, child: [{title: article.subcategory, child: [{title: article.title}]}]});
      index_category++;
      index_subcategory = 0;
    } else { // если та же категория, но другая подкатегория
      tree.child[index_category-1].child.push({title: article.subcategory, child: [{title: article.title}]});
      index_subcategory++;
    }
  } else { // та же подкатегория
    tree.child[index_category-1].child[index_subcategory].child.push({title: article.title})
  }
  category = article.category
  subcategory = article.subcategory
}

console.log(tree)