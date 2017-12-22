<style scoped>
.expand-col {
  margin-bottom: 6px;
}
</style>
<template>
    <div>
        <Row class="expand-row">
             <Col span="4" v-for="(value,key,index) in row" class="expand-col">
                <span v-if="key == '_index'"></span>
                <span v-else-if="key == '_rowKey'"></span>
                <span v-else-if="key == 'editting'"></span>
                <span v-else-if="key == 'edittingCell'"></span>
                <span class="expand-key" v-else>{{ key }}： {{ value }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  mounted() {
    console.log("expand table");
    console.log(this.row);
  }
};
</script>
