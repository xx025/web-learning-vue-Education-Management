<template>
  <div>
    <h1>TYUIO</h1>
<!--    <slot name="footer">-->
<!--      &lt;!&ndash;      <h1>这是后备内容</h1>&ndash;&gt;-->
<!--    </slot>-->
<!--    <slot name="header">-->
<!--    </slot>-->
    <slot :row="row"></slot>
  </div>

</template>

<script>
/*
* 插槽编译作用域:父级模板里的所有内容都是在父级作用域中编译的:
*   子模版中的所有内容是在子模版中编译的
*  后备内容:插槽中的默认值,一旦设置则会取代默认值
* 具名插槽:具有名字的插槽,在使用过程中,插槽的内容会依据插槽的名称排列循序进行摆放
* 作用域插槽:让父组件能够访问插槽中的内容
* */
export default {
  data() {
    return {
      row: {
        user: {
          username: "张三",
          age: "18",
        }
      }
    }
  }
}
</script>

<style scoped>

</style>