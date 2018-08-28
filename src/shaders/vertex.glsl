attribute vec2 a_position;
uniform vec2 u_resolution;
varying vec4 v_color;

void main() {
  vec2 real_poistion = a_position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(real_poistion * vec2(1, -1), 0, 1);
  v_color = vec4(1, 0, 0.5, 1);
}