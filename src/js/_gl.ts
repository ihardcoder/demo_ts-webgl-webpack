import * as VertexShaderSource from 'shaders/vertex.glsl';
import * as FragmentShaderSource from 'shaders/fragment.glsl';

/**
 * 创建shader
 */
export function createShader(gl:WebGLRenderingContext,type:number,source:string):WebGLShader{
  const Shader:WebGLShader = gl.createShader(type);
  gl.shaderSource(Shader,source);
  gl.compileShader(Shader);
  if(gl.getShaderParameter(Shader, gl.COMPILE_STATUS)){
    return Shader;
  }
}
/**
 * 创建program
 */
export function createProgram(gl:WebGLRenderingContext,vertexShader:WebGLShader,fragmentShader:WebGLShader):WebGLProgram{
  const Program:WebGLProgram = gl.createProgram();
  gl.attachShader(Program,vertexShader);
  gl.attachShader(Program,fragmentShader);
  gl.linkProgram(Program);
  if(gl.getProgramParameter(Program,gl.LINK_STATUS)){
    return Program;
  }
}
/**
 * 设置canvas像素和尺寸
 */
function resizeCanvas(gl:WebGLRenderingContext) {
  const RealToCSSPixels:number = window.devicePixelRatio;

  // 获取浏览器显示的画布的CSS像素值
  // 然后计算出设备像素设置drawingbuffer
  const DisplayWidth:number  = Math.floor(gl.canvas.clientWidth  * RealToCSSPixels);
  const DisplayHeight:number = Math.floor(gl.canvas.clientHeight * RealToCSSPixels);

  // 检查画布尺寸是否相同
  if (gl.canvas.width  !== DisplayWidth ||gl.canvas.height !== DisplayHeight) {

    // 设置为相同的尺寸
    gl.canvas.width  = DisplayWidth;
    gl.canvas.height = DisplayHeight;
  }
}

export default function(gl:WebGLRenderingContext, data?:number[]){
  // 创建顶点着色器
  const VertexShader:WebGLShader = createShader(gl,gl.VERTEX_SHADER,VertexShaderSource);
  // 创建片段着色器
  const FragmentShader:WebGLShader = createShader(gl,gl.FRAGMENT_SHADER,FragmentShaderSource);  
  // 创建着色程序
  const Program:WebGLProgram = createProgram(gl,VertexShader,FragmentShader);
  // 获取顶点属性的指针
  const Location_attr_position:number = gl.getAttribLocation(Program,'a_position');
  // 获取全局变量的指针
  const Location_uni_resolution:WebGLUniformLocation = gl.getUniformLocation(Program,'u_resolution');

  // 创建缓冲区
  const Buffer_postion:WebGLBuffer = gl.createBuffer(); 
  // 绑定缓冲区指针
  gl.bindBuffer(gl.ARRAY_BUFFER,Buffer_postion);
  // 将顶点数据写入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  resizeCanvas(gl);
  // 设置视图区域
  gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
  
  // 使用着色程序
  gl.useProgram(Program);
  // 设置全局变量值
  gl.uniform2f(Location_uni_resolution,gl.canvas.width,gl.canvas.height);
  // 启用缓冲区
  gl.enableVertexAttribArray(Location_attr_position);
  // 设置缓冲区读取规则
  gl.vertexAttribPointer(Location_attr_position, 2, gl.FLOAT, false, 0, 0);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制
  gl.drawArrays(gl.LINE_STRIP, 0, ~~(data.length/2));
}

