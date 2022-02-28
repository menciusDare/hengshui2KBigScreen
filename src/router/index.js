import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LayOut',
      component: () => import('@/page/LayOut'),
      redirect: '/layOut/IntegratedPanel',
      children: [
        {
          path: '/layOut/regionalEnvironment',
          name: 'RegionalEnvironment',
          component: () => import('@/page/RegionalEnvironment')// 区域环境,
        },
        {
          path: '/layOut/atmosphericQuality',
          name: 'AtmosphericQuality',
          component: () => import('@/page/AtmosphericQuality')// 空气质量,
        },
        {
          path: '/layOut/axeHeadLake',
          name: 'AxeHeadLake',
          component: () => import('@/page/AxeHeadLake')// 斧头湖,
        },
        // {
        //   path: '/layOut/collaborativeScheduling',
        //   name: 'CollaborativeScheduling',
        //   component: () => import('@/page/CollaborativeScheduling')// 调度,
        // },
        {
          path: '/layOut/waterEnvironment',
          name: 'WaterEnvironment',
          component: () => import('@/page/WaterEnvironment')// 水环境,
        },
        {
          path: '/layOut/airQuality',
          name: 'AirQuality',
          component: () => import('@/page/AirQuality')// 空气质量,
        },
        {
          path: '/layOut/collaborativeScheduling',
          name: 'CollaborativeSchedulingChange',
          component: () => import('@/page/CooperativeSchedulingChange')// 协同调度,
        },
        {
          path: '/layOut/IntegratedPanel',
          name: 'IntegratedPanel',
          component: () => import('@/page/IntegratedPanel')// 综合面板,
        }
      ]
    }
  ]
})
