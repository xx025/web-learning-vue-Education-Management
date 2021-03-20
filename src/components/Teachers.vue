<template>
  <div>
    <!--导航的面包屑部分-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">讲师管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--      搜索框部分-->
    <div class="search_box">
      <h4>讲师筛选</h4>

      <el-form :inline="true" :model="searchForm" size="medium">
        <el-form-item label="查询条件">
          <el-input v-model="searchForm.searchParam" placeholder="请输入教师姓名,手机号"></el-input>
        </el-form-item>


        <el-form-item class="btn_item">
          <el-button @click="search" icon="el-icon-search">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  数据部分-->
    <div class="data_container">
      <!--数据头部
      -->
      <div class="data_header">
        <h4>讲师列表</h4>
        <el-button size="medium" icon="el-icon-folder-add" @click="ranAdd()">随机添加讲师</el-button>

        <el-button size="medium" icon="el-icon-folder-add" @click="showAdd()">添加讲师</el-button>
      </div>
      <div class="data_body">
        <el-table :data="teacherList">
          <el-table-column label="头像" prop="photo">
            <template slot-scope="scope">
              <el-avatar shape="square" :src="scope.row.photo"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name">
          </el-table-column>
          <el-table-column label="介绍" prop="intro">
          </el-table-column>
          <el-table-column label="手机号" prop="mobile">
          </el-table-column>
          <el-table-column label="性别" prop="sex">
            <!--插槽传值-->
            <template v-slot="slotProps">
              <span v-if="slotProps.row.sex==1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column lable="操作">
            <template slot-scope="scope">
              <el-link @click="editTeacherShow(scope.row.id)" type="success">编辑</el-link>
              <el-link @click="deleteTeacher(scope.row.id)" type="danger">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页区域-->
      <div class="data_footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @next-click="next()"
            @prev-click="prev()"
            :current-page="pagenum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <!--添加讲师弹出框-->
    <el-dialog title="添加讲师" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" size="medium" label-position="left">
        <el-form-item label="姓名">
          <el-input v-model="addForm.name" placeholder="请输入讲师姓名"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="addForm.intro" placeholder="请输入讲师介绍"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addForm.mobile" placeholder="请输入讲师手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="addTeacher()">确 定</el-button>
      </div>
    </el-dialog>
    <!--更新讲师弹框-->
    <el-dialog :title="'更新老师:'+editForm.id" :visible.sync="dial">
      <el-form :model="editForm" size="medium" label-position="left">
        <el-form-item label="id">
          <el-input v-model="editForm.id" placeholder="请输入讲师id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" placeholder="请输入讲师姓名"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="editForm.intro" placeholder="请输入讲师介绍"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.mobile" placeholder="请输入讲师手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dial = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="editTeacher()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
/*
*  分页总结:
*    分页分类
*       1. 物理分页:查询数据时,就进行分页
*       2. 逻辑分页:查询出所有数据时,然后通过代码逻辑分页
*     建议使用物理分页
* */
import Qs from "qs";
import axios from "axios";

export default {
  data() {
    return {
      dialogFormVisible: false,
      dial: false,
      teacherList: [],
      addForm: {
        name: "",
        intro: "",
        mobile: "",
        sex: 1,
      },
      editId: "",
      editForm: {
        id: "",
        name: "",
        intro: "",
        mobile: "",
        sex: ""
      },
      searchForm: {
        searchParam: ""
      },
      pagenum: 1,
      pagesize: 10,
      total: 0
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    search() {
      this.getTeacherList();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      this.getTeacherList();
    },
    handleSizeChange(value) {
      this.pagesize = value;
      this.getTeacherList();
    },
    prev() {
      this.pagenum--;
      this.getTeacherList();
    },
    next() {
      this.pagenum++;
      this.getTeacherList();
    },
    editTeacherShow(id) {
      this.dial = true;
      this.editId = id;
      console.log(id)
    },
    editTeacher() {
      let url = "teacher/editTeacher";//  提交请求
      let v = this;
      console.log(v.editForm);
      v.$axios.post(url, Qs.stringify(v.editForm)).then(function (r) {
        v.$message(r.data.message)
        console.log(r)
        if (r.data.code == 200) {
          v.getTeacherList();
          //  关闭form表单
        }
        v.dial = false;
      });
    },
    addTeacher() {
      //  添加讲师
      //  获取参数
      let url = "teacher/addTeacher";
      //  提交请求
      let v = this;
      console.log(v.addForm)
      v.$axios.post(url, Qs.stringify(v.addForm)).then(function (r) {
        v.$message(r.data.message)
        if (r.data.code == 200) {
          v.getTeacherList();
          //  关闭form表单
          v.dialogFormVisible = false;
        }
      });
      //  提示添加结果,刷新界面
    },
    //删除老师
    deleteTeacher(id) {
      console.log(id);
      //确认删除
      //  删除,提示删除信息
      let v = this;
      v.$confirm('你确定删除该讲师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        //删除讲师信息
        let url = 'teacher/deleteTeacher';
        let param = {id: id};
        v.$axios.post(url, Qs.stringify(param)).then(function (r) {
          v.$message(r.data.message);
          v.getTeacherList();
        });

      });
    },
    showAdd() {
      this.dialogFormVisible = true;
    },
    ranAdd() {
      let url = "teacher/addTeacher";
      let nameS = ['张', '王', '李', '赵', '刘'];
      let nameList = ['依秋', '依波', '香巧', '紫萱', '涵易', '忆之', '幻巧', '美倩', '安寒', '白亦', '玉', '璇', '冰', '廉'];
      let name = nameS[Math.floor(Math.random() * 100) % nameS.length] + nameList[Math.floor(Math.random() * 100) % nameList.length]
      let intro = name + "老师";
      let mobile = String(Math.random()).slice(-7);
      let sex = Math.random() > 0.5 ? 1 : 0;
      let param = {name: name, intro: intro, mobile: mobile, sex: sex}
      console.log(param)
      let v = this;
      v.$axios.post(url, Qs.stringify(param)).then(function (r) {
        if (r.data.code == 200) {
          console.log("成功")
        }
      });

    },
    getTeacherList() {
      //  获取讲师的列表数据
      /*
      * 更换为分页:
      *     增加参数:pagenum,pagesize
      *     修改获取结果集的逻辑*/
      let url = "teacher/getTeachers";
      let userInfoStr = window.sessionStorage.getItem("userInfo");
      let token = JSON.parse(userInfoStr).token;
      let param = {
        token: token,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        searchParam: this.searchForm.searchParam
      };
      //  发起axios请求
      // 在axios的回调中,this指的不是vue对象,在这里存储vue对象
      let v = this;
      this.$axios.post(
          url,
          Qs.stringify(param)
      ).then(function (r) {
        console.log(r);
        if (r.data.code == 200) {
          //处理结果集
          v.total = r.data.result.total;
          v.teacherList = r.data.result.teacherList;
        }
      });
    }
  }

};
</script>

<style scoped>
.search_box {
  margin-top: 15px;
  padding: 16px;
  background-color: #fff;
}

.search_box h4 {
  margin-bottom: 10px;
}

.btn_item {
  float: right;
}

button {
  background-color: #57a08b;
  color: white;
}

.data_container {
  margin-top: 15px;
  background-color: #fff;
}

.data_container .data_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 20px;
  border-bottom: 1px solid #e3e3e3;
}

.data_container .data_body {
  padding: 10px 15px;
}

.data_body .el-link {
  margin-left: 19px;
}

.data_container .data_footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px 20px;
}
</style>