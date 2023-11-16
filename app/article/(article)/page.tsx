import styles from './article.module.scss'
import {Article} from "@/app/lib/types";
import {CustomMarkdown} from "@/app/ui/markdown";
import {fetchArticleByID} from "@/app/article/api/data";

export default async function Article({
    searchParams,
  }: {
  searchParams?: {
      id?: number;
    };
  }) {
  const article_id = searchParams?.id;
  const article: Article | undefined = await fetchArticleByID(article_id);

  return (
    <div className={styles.container}>
      {/*<Image src={""}/>*/}
      {/*<img src="https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.webp" alt=""/>*/}
      <CustomMarkdown className={styles.markdown}>
        {article ? article.content : '# Статья не найдена!'}
      </CustomMarkdown>
    </div>
  )
}

// ![image](https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.webp)
//
//
// # Двоичная куча
//
// ---
//
// **Куча** (англ. *heap*) — абстрактная структура данных, поддерживающая следующие операции:
//   - Нахождение минимума
// - Удаление минимума
// - Добавление нового элемента в кучу
//
// Другое название, лучше отражающее функциональность — *очередь с приоритетами*.
//
// Кучи используются во многих алгоритмах. Например, кучи используются в алгоритмах поиска кратчайшего пути, а также с помощью кучи можно проводить сортировку (путём превращения массива в кучу, а кучу в отсортированный массив).
//
// ## Устройство двоичной кучи
//
// **Двоичная куча** (*пирамида, сортирующее дерево*, англ. binary *heap*) — реализация очереди с приоритетами, использующая корневое дерево, для которого выполнены три условия:
//
//   - Значение в любой вершине не больше, чем значения её потомков.
// - У любой вершины не более двух сыновей.
// - Слои заполняются последовательно сверху вниз и слева направо, без «дырок».
//
// Заметим, что двоичная куча строится неоднозначно: например, значения сыновей, которые являются листами, всегда можно менять местами. Фиксирована только сама структура и предикат «родитель не больше детей».
//
//
// <RF
//   nodes='[
//         { "id": "1", "position": { "x": 320, "y": 10 }, "data": { "label": "23" }, "className": "red circle" },
//         { "id": "2", "position": { "x": 220, "y": 100 }, "data": { "label": "22" }, "className": "green circle" },
//         { "id": "3", "position": { "x": 420, "y": 100 }, "data": { "label": "20" }, "className": "green circle" },
//         { "id": "4", "position": { "x": 160, "y": 200 }, "data": { "label": "15" }, "className": "blue circle" },
//         { "id": "5", "position": { "x": 280, "y": 200 }, "data": { "label": "13" }, "className": "blue circle" },
//         { "id": "6", "position": { "x": 360, "y": 200 }, "data": { "label": "8" }, "className": "blue circle" },
//         { "id": "7", "position": { "x": 480, "y": 200 }, "data": { "label": "4" }, "className": "blue circle" },
//         { "id": "8", "position": { "x": 100, "y": 300 }, "data": { "label": "10" }, "className": "purple circle" },
//         { "id": "9", "position": { "x": 220, "y": 300 }, "data": { "label": "6" }, "className": "purple circle" }
//     ]'
//   edges='[
//         {"source": "1", "target": "2", "animated": true},
//         {"source": "2", "target": "4", "animated": true},
//         {"source": "2", "target": "5", "animated": true},
//         {"source": "1", "target": "3", "animated": true},
//         {"source": "3", "target": "6", "animated": true},
//         {"source": "3", "target": "7", "animated": true},
//         {"source": "4", "target": "8", "animated": true},
//         {"source": "4", "target": "9", "animated": true}
//     ]'
//   height={400px}
//   align='center'
// />
// <div style="text-align: center;">Двоичная куча для максимума</div>
//
//
// Обозначим высоту дерева как *h*. Так как куча всегда состоит из нескольких слоев заполненных полностью и одного заполненного частично, и каждый следующий слой содержит в два раза больше вершин, чем предыдущий, то высота дерева будет *Θ(log⁡n)*.
//
// Как и любая очередь с приоритетами, двоичная куча должна уметь выполнять операции:
//
//   - Нахождение минимума за O(1)
// - Удаление минимума за O(h)
// - Добавление нового элемента в кучу за O(h)
//
// Помимо основных трёх, можно определить и другие, например «изменить значение ключа», но пока мы остановимся на этих трёх.
