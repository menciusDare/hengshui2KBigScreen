import {loadModules} from 'esri-loader'
import {dataRequestUrl} from './AppConfig'
import wryoffline from '../images/namerender/污染源3.svg'
import wrynormal from '../images/namerender/污染源1.svg'
import wryalarm from '../images/namerender/污染源2.svg'
import wrynodata from '../images/namerender/污染源4.svg'
import {initShrinkLayer} from './MapImpl'
import levelnum1 from '../images/numrender/数值1.svg'
import levelnum2 from '../images/numrender/数值2.svg'
import levelnum3 from '../images/numrender/数值3.svg'
import levelnum4 from '../images/numrender/数值4.svg'
import levelnum5 from '../images/numrender/数值5.svg'
import levelnum6 from '../images/numrender/数值6.svg'
import levelnumnodata from '../images/numrender/数值7.svg'

/**
 * 绘制污染源数据
 */
export const createWryGraphics = function (graphicResults, callBack, curMapView, renderType, renderField, stationTypeId, layerId) {
  loadModules(['esri/layers/GraphicsLayer', 'esri/Graphic'])
    .then(([GraphicsLayer, Graphic]) => {
      let graphics = []
      let overGraphics = []
      let numUrlList = [levelnum1, levelnum2, levelnum3, levelnum4, levelnum5, levelnum6, levelnumnodata]
      let renderInfo = dataRequestUrl.options.entStationListInfo.renderInfo
      let wryUrlList = [wryoffline, wrynormal, wryalarm, wrynodata]
      let picWidth = renderInfo.defaultSymbol.width
      let picHeight = renderInfo.defaultSymbol.height
      let nameColor = 'white'
      if (curMapView.map.basemap.id == 'myVectorBasemap') {
        nameColor = 'black'
      }
      let symbolLevel = dataRequestUrl.options.airLevelInfo[renderField]
      let renderFieldMap = [['aqi', 'aqi'], ['pm25', 'pm25'], ['pm10', 'pm10'], ['so2', 'so2'], ['no2', 'no2'], ['co', 'co'], ['o3', 'o3']]
      // 处理报警
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null && stationItem.latitude < 90 && (stationItem.stationTypeId == stationTypeId)) {
          if (stationItem.alarmStatus == 1) {
            overGraphics.push([stationItem.longitude, stationItem.latitude])
          }
        }
      }
      if (overGraphics && overGraphics.length > 0) {
        initShrinkLayer(curMapView, overGraphics, 'wryShrinkLayer', layerId)
      }

      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        let numColor
        let graphicNum
        if (stationItem.longitude != null && stationItem.latitude != null && stationItem.latitude < 90 && (stationItem.stationTypeId == stationTypeId)) {
          let pointGeometry = {
            type: 'point',
            x: stationItem.longitude,
            y: stationItem.latitude
          }

          if (stationItem.aqi) {
            stationItem.aqi = Math.round(stationItem.aqi)
          }
          if (stationItem.pm25) {
            stationItem.pm25 = Math.round(stationItem.pm25)
          }
          if (stationItem.pm10) {
            stationItem.pm10 = Math.round(stationItem.pm10)
          }
          if (stationItem.co) {
            stationItem.co = Math.round(stationItem.co * 10) / 10
          }
          if (stationItem.no2) {
            stationItem.no2 = Math.round(stationItem.no2)
          }
          if (stationItem.o3) {
            stationItem.o3 = Math.round(stationItem.o3)
          }
          if (stationItem.so2) {
            stationItem.so2 = Math.round(stationItem.so2)
          }

          let symbolPicUrl

          if (stationItem.status > 0) {
            for (let j = 0; j < renderFieldMap.length; j++) {
              let renderFieldItem = renderFieldMap[j][0]
              graphicNum = stationItem[renderFieldMap[j][1]]
              if (renderField == renderFieldItem) {
                if (graphicNum >= 0 && symbolLevel && symbolLevel.length == 6) {
                  for (let i = 0; i < symbolLevel.length; i++) {
                    if (graphicNum >= symbolLevel[i][0] && graphicNum <= symbolLevel[i][1]) {
                      // 数值模式，绿色/黄色/橙色用黑色字体，其他三种颜色用白色字体
                      if (renderType.indexOf('numrender') != -1) {
                        symbolPicUrl = numUrlList[i]
                        if (i < 3) {
                          numColor = 'black'
                        } else {
                          numColor = 'white'
                        }
                      } else {
                        if (stationItem.stationStatus != null && (stationItem.stationStatus == '0')) {
                          symbolPicUrl = wryUrlList[0]
                        }
                        if (stationItem.stationStatus != null && (stationItem.stationStatus == '1')) {
                          symbolPicUrl = wryUrlList[1]
                        }
                        if (stationItem.stationStatus != null && (stationItem.stationStatus == '2')) {
                          symbolPicUrl = wryUrlList[2]
                        }
                        if (stationItem.stationStatus != null && (stationItem.stationStatus == '3')) {
                          symbolPicUrl = wryUrlList[2]
                        }
                        if (stationItem.stationStatus != null && (stationItem.stationStatus == '4')) {
                          symbolPicUrl = wryUrlList[3]
                        }
                      }
                      break
                    }
                  }
                }
                if (!symbolPicUrl) {
                  if (renderType.indexOf('numrender') != -1) {
                    symbolPicUrl = numUrlList[numUrlList.length - 1]
                  } else {
                    symbolPicUrl = wryUrlList[0]
                  }
                }
                break
              }
            }
            if (!symbolPicUrl) {
              symbolPicUrl = wryUrlList[0]
            } else {
              let graphicSymbol = {
                type: renderInfo.defaultSymbol.type,
                url: symbolPicUrl,
                width: picWidth,
                height: picHeight
                // xoffset: renderInfo.defaultSymbol.xoffset
              }
              // 默认符号层
              let graphic = new Graphic({
                geometry: pointGeometry,
                attributes: stationItem,
                symbol: graphicSymbol
              })
              graphics.push(graphic)
            }
            // 数值标注层
            if (renderType.indexOf('numrender') != -1) {
              if (!graphicNum && graphicNum != 0) {
                graphicNum = '--'
                numColor = 'white'
              }
              let xoffset = 0
              var numTextSymbol = {
                type: 'text', // autocasts as new TextSymbol()
                color: numColor,
                font: {
                  family: 'sans-serif',
                  size: 9
                },
                text: graphicNum,
                xoffset: xoffset,
                yoffset: 0,
                // haloColor: "black",
                // haloSize: 1,
                horizontalAlignment: 'center',
                verticalAlignment: 'middle'
              }
              let numGraphic = new Graphic({
                geometry: pointGeometry,
                attributes: stationItem,
                symbol: numTextSymbol
              })
              graphics.push(numGraphic)
            }
          } else {
            if (!symbolPicUrl) {
              if (renderType.indexOf('numrender') != -1) {
                symbolPicUrl = numUrlList[numUrlList.length - 1]
              } else {
                symbolPicUrl = wryUrlList[0]
              }
              if (symbolPicUrl) {
                let graphicSymbol = {
                  type: renderInfo.defaultSymbol.type,
                  url: symbolPicUrl,
                  width: picWidth,
                  height: picHeight
                  // xoffset: renderInfo.defaultSymbol.xoffset
                }
                // 默认符号层
                let graphic = new Graphic({
                  geometry: pointGeometry,
                  attributes: stationItem,
                  symbol: graphicSymbol
                })
                graphics.push(graphic)
              }
            }
          }
          // 名称标注层
          if (renderType.indexOf('namerender') != -1 && stationItem['stationName'] != null) {
            var nameTextSymbol = {
              type: 'text', // autocasts as new TextSymbol()
              color: nameColor,
              font: {
                family: 'sans-serif',
                size: 9,
                weight: 'normal'
              },
              text: stationItem['stationName'],
              yoffset: -15,
              // haloColor: "black",
              // haloSize: 1,
              horizontalAlignment: 'center',
              verticalAlignment: 'bottom'
            }
            let nameGraphic = new Graphic({
              geometry: pointGeometry,
              attributes: stationItem,
              symbol: nameTextSymbol
            })
            graphics.push(nameGraphic)
          }
        }
      }
      if (graphics && graphics.length > 0) {
        let airPointFeaLayer = curMapView.map.findLayerById(layerId)
        if (airPointFeaLayer != null) {
          airPointFeaLayer.removeAll()
        } else {
          airPointFeaLayer = new GraphicsLayer({
            'id': layerId
          })
        }
        airPointFeaLayer.addMany(graphics)
        let geometryExtent
        callBack(airPointFeaLayer, geometryExtent)
      } else {
        callBack(null, null)
      }
    })
}
