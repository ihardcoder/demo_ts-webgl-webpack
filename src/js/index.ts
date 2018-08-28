import 'style/index.scss';
import * as GeoViewport from '@mapbox/geo-viewport';
import * as GeojsonExtent from '@mapbox/geojson-extent';
import * as GeojsonCoords from '@mapbox/geojson-coords';
import WebMercatorViewport from 'viewport-mercator-project';
import * as GeoData from 'data/china.json';

import GL from './_gl';

type ViewportObject = {
  zoom:number;
  center:number[];
};
const CnavasSize = {
  width: 800,
  height: 600
};

const Canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

const Ctx_GL:WebGLRenderingContext = Canvas.getContext('webgl');

if(!Ctx_GL){
  alert('webgl is not supportted');
}

// 获取data边界信息
const Bounds:number[] = GeojsonExtent(GeoData);

// 获取data视窗信息
const Viewport:ViewportObject = GeoViewport.viewport(Bounds, [
  CnavasSize.width, 
  CnavasSize.height
]);

// 提取所有坐标
const AllCoords:Array<Array<number>> = GeojsonCoords(GeoData);

// 转换为墨卡托坐标视图
const MercatorViewport:WebMercatorViewport = new WebMercatorViewport({
  width: CnavasSize.width,
  height: CnavasSize.height,
  longitude: Viewport.center[0],
  latitude: Viewport.center[1],
  zoom: 2.5
});

let pxCoords:number[] = [];

AllCoords.forEach((coord:number[]):void => {
    pxCoords = pxCoords.concat(MercatorViewport.project(<[number,number]>coord));
});

GL(Ctx_GL,pxCoords);