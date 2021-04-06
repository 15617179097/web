<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2021/3/28',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2021/3/28 20:46'
        },
        {
          timestamp: '2021/3/15',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2021/3/15 20:46'
        },
        {
          timestamp: '2021/2/12',
          title: 'Build Template',
          content: 'PanJiaChen committed 2021/2/12 20:46'
        },
        {
          timestamp: '2021/2/23',
          title: 'Release New Version',
          content: 'PanJiaChen committed 2021/2/23 20:46'
        }
      ]
    }
  }
}
</script>
