// expand-row.vue
<style scoped>
.expand-col {
  margin-bottom: 12px;
}
</style>
<template>
    <div>
        <Row class="expand-row">
             <Col span="4" v-for="(value,key,index) in row" class="expand-col">
                <span class="expand-key">{{ key }}： </span>
                <span class="expand-value">{{ value }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  },mounted(){
      console.log("expand table");
      console.log(this.row);
  }
};
</script>
