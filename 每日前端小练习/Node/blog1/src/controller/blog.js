const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  // // 先返回假数据
  // return [
  //   {
  //     id: 1,
  //     title: "标题A",
  //     content: "内容A",
  //     createTime: 1610085450380,
  //     author: "zhang",
  //   },
  //   {
  //     id: 2,
  //     title: "标题B",
  //     content: "内容B",
  //     createTime: 1610085450380,
  //     author: "lisi",
  //   },
  // ];
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }
  sql += `order by createtime desc`;

  // 返回promise
  return exec(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content属性
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
    insert into blogs (title,content,createtime,author)
    values ('${title}','${content}',${createTime},'${author}')
  `;
  return exec(sql).then((insertData) => {
    console.log("insertData is", insertData);
    return {
      id: insertData.insertData,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;

  const sql = `update blogs set title='${title}',content='${content}' where id=${id}`;
  console.log(sql);
  return exec(sql).then((updateData) => {
    console.log("updateData is", updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id,author) => {
  const sql=`delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then((delData) => {
    // console.log("updateData is", delData);
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  })
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
