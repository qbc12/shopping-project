<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="changePage(pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNumAndEndNum[0] > 1"
      @click="changePage(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum[0] > 2" :disabled="true">···</button>

    <button
      v-for="(p, index) in startNumAndEndNum"
      :key="index"
      @click="changePage(p)"
      :class="{ active: pageNo == p }"
    >
      {{ p }}
    </button>

    <button
      v-if="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPage - 1"
      :disabled="true"
    >
      ···
    </button>
    <button
      v-if="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPage"
      @click="changePage(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="changePage(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      let start = 0;
      let end = 0;
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - this.continues + 1;
        }
      }
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    changePage(p) {
      this.$emit("getPageNo", p);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(212, 8, 8);
      color: #fff;
    }
  }
}
</style>
