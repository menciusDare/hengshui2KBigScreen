<template>
  <div class="navMain flexColumn">
    <!--    <router-link to="/layOut/regionalEnvironment">区域环境</router-link>-->
    <div
      class="navList alginCenter rowCenter"
      v-for="item in navList"
      :key="item.id"
      style="color: #fff"
      :class="selected === item.path ? 'selected' : ''"
      @click="changeRouter(item.path)"
    >
      <div>
        <i class="iconMain" :class="item.id"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMain',
  data () {
    return {
      navList: [
        { name: '综合看版', id: 'zonghe', path: '/layOut/IntegratedPanel' },
        { name: '大气质量', id: 'air', path: '/layOut/airQuality' },
        { name: '水环境', id: 'water', path: '/layOut/waterEnvironment' },
        { name: '固废危废', id: 'gufei' },
        {
          name: '协同调度指挥',
          id: 'xietong',
          path: '/layOut/collaborativeScheduling'
        }
      ],
      selected: '/layOut/IntegratedPanel'
    }
  },
  methods: {
    changeRouter (path) {
      this.$router.push(path)
      this.selected = path
    }
  }
}
</script>

<style scoped>
.navMain {
  width: 300px;
  height: 100%;
}
.navList {
  width: 100%;
  height: 20%;
  text-align: center;
  background: #000000
    linear-gradient(
      180deg,
      rgba(14, 126, 255, 0.14) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  overflow: hidden;
}
.navList span {
  color: #b5b5b5;
}
.iconMain {
  width: 100px;
  height: 100px;
  background: #fff;
  display: block;
  margin: 0 auto 20px;
}
.navList.selected {
  background: #000000
    linear-gradient(
      90deg,
      rgba(10, 136, 255, 0.32) 0%,
      rgba(7, 108, 255, 0.3) 50%,
      rgba(4, 80, 255, 0.28) 100%
    );
  box-shadow: 0px -38px 45px 0px rgba(5, 74, 255, 0.34);
}
.navList .iconMain.water {
  background: url("../../assets/img/waterIcon/water.png") no-repeat center;
  background-size: 50% 100%;
}
.navList .iconMain.air {
  background: url("../../assets/img/waterIcon/air.png") no-repeat center;
  background-size: 60%;
}
.navList .iconMain.air {
  background: url("../../assets/img/waterIcon/air.png") no-repeat center;
  background-size: 100%;
}
.navList .iconMain.zonghe {
  background: url("../../assets/img/waterIcon/zonghe.png") no-repeat center;
  background-size: 80%;
}
.navList .iconMain.hefushe {
  background: url("../../assets/img/waterIcon/hefushe.png") no-repeat center;
  background-size: 100%;
}
.navList .iconMain.gufei {
  background: url("../../assets/img/waterIcon/gufei.png") no-repeat center;
  background-size: 80%;
}
.navList .iconMain.xietong {
  background: url("../../assets/img/waterIcon/xietong.png") no-repeat center;
  background-size: 80%;
}
</style>
