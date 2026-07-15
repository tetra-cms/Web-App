<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

import Map from 'ol/Map'
import View from 'ol/View'

import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'

import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'

import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

import { fromLonLat } from 'ol/proj'

import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

import {
  defaults as defaultInteractions,
} from 'ol/interaction'

const props = defineProps<{
  lat: number
  lon: number
}>()

const mapElement = ref<HTMLDivElement | null>(null)

let map: Map
let marker: Feature<Point>

const getCenter = () =>
  fromLonLat([
    props.lon,
    props.lat
  ])

onMounted(() => {
  marker = new Feature({
    geometry: new Point(getCenter())
  })

  marker.setStyle(
    new Style({
      image: new Icon({
        src: '/marker.svg', // положите marker.svg в public
        anchor: [0.5, 1],
        scale: 0.8
      })
    })
  )

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker]
    })
  })

  map = new Map({
    target: mapElement.value!,
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],

    view: new View({
      center: getCenter(),
      zoom: 16,
      minZoom: 5,
      maxZoom: 20
    }),

    controls: [],

    interactions: defaultInteractions({
      pinchRotate: false,
      altShiftDragRotate: false
    })
  })
})

watch(
  () => [props.lat, props.lon],
  () => {
    const center = getCenter()

    marker.setGeometry(
      new Point(center)
    )

    map.getView().animate({
      center,
      duration: 300
    })
  }
)

onBeforeUnmount(() => {
  map?.setTarget(undefined)
})
</script>

<template>
  <div
    ref="mapElement"
    :class="'w-full h-full overflow-hidden ' + $attrs.class"
  />
</template>

<style>
@import "ol/ol.css";
</style>