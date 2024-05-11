import {Article} from "@/app/lib/types";
import {TableProps, Tooltip, Typography} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Link from "next/link";

export const columns: TableProps<Article>['columns'] = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    render: (text) => <Typography.Title level={5}>{text}</Typography.Title>,
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Подкатегория',
    dataIndex: 'subcategory',
    key: 'subcategory',
    align: 'center',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: 'Опубликована',
    dataIndex: 'is_approved',
    key: 'is_approved',
    align: 'center',
    render: (is_approved) => is_approved ?
      <Tooltip title={"Статья одобрена модератором и опубликована"}><CheckOutlined style={{color: 'green'}} /> </Tooltip> :
      <Tooltip title={"Статья находится на проверке модерации"}><CloseOutlined style={{color: 'red'}} /> </Tooltip>,
  },
  {
    title: 'В работе',
    dataIndex: 'is_draft',
    key: 'is_draft',
    align: 'center',
    render: (is_draft) => !is_draft ?
      <Tooltip title={"Статья готова"}> <CheckOutlined style={{color: 'green'}} /> </Tooltip> :
      <Tooltip title={"Статья находится на стадии написания"}><CloseOutlined style={{color: 'red'}} /> </Tooltip>
  },
  {
    title: 'Редактировать',
    key: 'edit',
    align: 'center',
    render: (_, record) => (
      <Link href={`/edit?id=${record.id}`}>
        <Tooltip title={"Редактировать статью"}>
          <EditOutlined style={{color: "#41a0ff"}}/>
        </Tooltip>
      </Link>
    ),
  },
  {
    title: 'Удалить',
    key: 'edit',
    align: 'center',
    render: (_, record) => (
      <Tooltip title={"Удалить статью"}>
        <DeleteOutlined style={{color: "red"}}/>
      </Tooltip>
    ),
  },
]