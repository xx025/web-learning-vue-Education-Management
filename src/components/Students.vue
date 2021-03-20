<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">学生管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_box">
      <h4>学员筛选</h4>
      <el-form :inline="true" size="medium">
        <el-form-item label="注册时间">
          <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-switch active-text="已付费"
                     v-model="searchFormAccountDisabled"
                     inactive-value="#57a08b"
                     active-color="#57a08b"
                     inactive-text="未付费"></el-switch>
        </el-form-item>
        <el-form-item label="查询条件">
          <el-input v-model="searchForm.searchParam" placeholder="请输入学生账号,昵称,手机号"></el-input>
        </el-form-item>
        <el-form-item class="btn_item">
          <el-button icon="el-icon-search" @click="searchStudent">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  数据部分-->
    <div class="data_container">
      <!--数据头部-->
      <div class="data_header">
        <h4>学员列表</h4>
      </div>
      <div class="data_body">
        <el-table :data="studentList">
          <el-table-column label="用户id" prop="id"></el-table-column>
          <el-table-column label="用户昵称" prop="nickName"></el-table-column>
          <el-table-column label="手机号" prop="cellPhoneNumber"></el-table-column>
          <el-table-column label="付费总额" prop="totalAmountPaid"></el-table-column>
          <el-table-column label="订单数量" prop="numberOfOrders"></el-table-column>
          <el-table-column label="上次付费时间" prop="lastPaymentTime"></el-table-column>
          <el-table-column label="账户禁用" prop="accountDisabled">
            <template v-slot="slotProps">
              <el-switch
                  @change="disableAccount($event,slotProps.row.id)"
                  v-model="slotProps.row.accountDisabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link @click="editStudentShow(scope.row.id)" type="success">编辑</el-link>
              <el-link @click="deleteStudent(scope.row.id)" type="danger">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="data_footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @next-click="next()"
            @prev-click="prev()"
            :current-page="pageNum"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!--更新弹框-->
    <!--更新讲师弹框-->
    <el-dialog :title="'更新学生:'+editId" :visible.sync="dial" >
      <el-form :model="editForm" label-width="100px" label-position="left" >
        <el-form-item label="id" >
          <el-input v-model="editForm.StudentId" placeholder="请输入学员id"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="editForm.nickName" placeholder="请输入学员昵称"></el-input>
        </el-form-item>

        <el-form-item label="手机号" >
          <el-input v-model="editForm.cellPhoneNumber" placeholder="请输入学员手机号"></el-input>
        </el-form-item>

        <el-form-item label="付费总额" >
          <el-input v-model="editForm.totalAmountPaid" placeholder="请输入学员付费总额"></el-input>
        </el-form-item>
        <el-form-item label="订单数量" >
          <el-input v-model="editForm.numberOfOrders" placeholder="请输入学员订单数量"></el-input>
        </el-form-item>
        <el-form-item label="上次付费时间"  >
          <el-date-picker
              v-model="editForm.lastPaymentTime"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="禁用账户"  >
          <el-switch
              inactive-text="禁用"
              active-text="启用"
              v-model="editForm.accountDisabled"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dial = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="editStudent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";

export default {
  data() {
    return {
      searchFormAccountDisabled: true,
      dial: false,
      studentList: [{
        id: '1001',
        nickName: 'xiaoMing',
        cellPhoneNumber: '76877767676',
        totalAmountPaid: 999,
        numberOfOrders: 9,
        lastPaymentTime: '2016-05-02 17:00',
        accountDisabled: true,
      }, {
        id: '1002',
        nickName: 'xiaoTing',
        cellPhoneNumber: '889897876',
        totalAmountPaid: 888,
        numberOfOrders: 7,
        lastPaymentTime: '2016-05-02 15:00',
        accountDisabled: false,
      }],
      editId: '',
      editForm: {
        StudentId: '',
        nickName: '',
        cellPhoneNumber: '',
        totalAmountPaid: '',
        numberOfOrders: '',
        lastPaymentTime: '',
        accountDisabled: true,
      },
      searchForm: {
        date: "",
        searchParam: "",
        searchFormAccountDisabled: "",
      },
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    // this.getStudentList();
    //  暂时不执行
  },
  methods: {
    searchStudent() {
      this.getStudentList();
    },
    getStudentList() {
      let url = "student/getStudent";
      let userInfoStr = window.sessionStorage.getItem("userInfo");
      let token = JSON.parse(userInfoStr).token;
      let param = {
        token: token,
        pagenum: this.pageNum,
        pagesize: this.pageSize,
        searchParam: this.searchForm.searchParam
      };
      let v = this;
      this.$axios.post(
          url,
          Qs.stringify(param)
      ).then(function (r) {
        console.log(r);
        if (r.data.code == 200) {
          //处理结果集
          v.total = r.data.result.total;
          v.studentList = r.data.result.studentList;
        }
      });
    },
    deleteStudent(id) {
      let v = this;
      v.$confirm('你确定删除该学员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        v.$message(`执行删除学员方法,要删除的id:${id}`)
        /*let url = 'student/deleteStudent';
        let param = {id: id};
        v.$axios.post(url, Qs.stringify(param)).then(function (r) {
          v.$message(r.data.message);
          v.getStudentList();
        });*/
      });
    },
    editStudentShow(id) {
      this.dial = true;
      this.editId = id;
      console.log(id)

    },
    editStudent() {
      this.$message(`执行编辑学员方法,编辑队员${this.editId}参数${this.editForm}`)
      this.dial= false;
      /*      let url = "student/editStudent";//  提交请求
            let v = this;
            console.log(v.editForm);
            v.$axios.post(url, Qs.stringify(v.editForm)).then(function (r) {
              v.$message(r.data.message)
              console.log(r)
              if (r.data.code == 200) {
                v.getStudentList();
              }
              v.dial = false;
            });*/
    },
    disableAccount(val, id) {
      let sw = (val == true) ? '启用' : '禁用';
      console.log(`状态${val}  id ${id} 选择${sw}`);
      let v = this;
      v.$confirm(`你确定${sw}该学员账户吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        v.$message(`执行${sw}学员方法,要禁用的id:${id}`)
        /*let url = '#';
        let param = {id: id , ban:val};
        v.$axios.post(url, Qs.stringify(param)).then(function (r) {
          v.$message(r.data.message);
          v.getStudentList();
        });*/
      });
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

.search_box .el-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
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