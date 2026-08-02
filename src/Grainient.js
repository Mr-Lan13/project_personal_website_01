import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';

const h = React.createElement;

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i),f),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed; vec2 uv=C/iResolution.xy; float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset; tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale); tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0)); tuv.y*=ratio;
  float frequency=uWarpFrequency; float ws=max(uWarpStrength,0.001); float amplitude=uWarpAmplitude/ws; float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude; tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  float b=uColorBalance; float s=max(uBlendSoftness,0.0); mat2 blendRot=Rot(radians(uBlendAngle)); float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s; float edge1=0.2-b+s; float v0=0.5-b+s; float v1=-0.3-b-s;
  vec3 layer1=mix(uColor3,uColor2,S(edge0,edge1,blendX)); vec3 layer2=mix(uColor2,uColor1,S(edge0,edge1,blendX)); vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001); if(uGrainAnimated>0.5) grainUv+=vec2(iTime*0.05);
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453); col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5; float luma=dot(col,vec3(0.2126,0.7152,0.0722)); col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001))); o=vec4(clamp(col,0.0,1.0),1.0);
}
void main(){mainImage(fragColor,gl_FragCoord.xy);}`;

const Grainient = ({
  timeSpeed = 0.34,
  colorBalance = 0.08,
  warpStrength = 1,
  warpFrequency = 4,
  warpSpeed = 2.8,
  warpAmplitude = 42,
  blendAngle = 12,
  blendSoftness = 0.08,
  rotationAmount = 380,
  noiseScale = 1.7,
  grainAmount = 0.14,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.45,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = '#78f1da',
  color2 = '#1c6670',
  color3 = '#050607',
  className = '',
}) => {
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    let renderer;
    let raf = 0;
    let resizeObserver;
    let intersectionObserver;
    try {
      renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
      const gl = renderer.gl;
      const canvas = gl.canvas;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) },
          uTimeSpeed: { value: timeSpeed }, uColorBalance: { value: colorBalance }, uWarpStrength: { value: warpStrength },
          uWarpFrequency: { value: warpFrequency }, uWarpSpeed: { value: warpSpeed }, uWarpAmplitude: { value: warpAmplitude },
          uBlendAngle: { value: blendAngle }, uBlendSoftness: { value: blendSoftness }, uRotationAmount: { value: rotationAmount },
          uNoiseScale: { value: noiseScale }, uGrainAmount: { value: grainAmount }, uGrainScale: { value: grainScale },
          uGrainAnimated: { value: grainAnimated ? 1 : 0 }, uContrast: { value: contrast }, uGamma: { value: gamma },
          uSaturation: { value: saturation }, uCenterOffset: { value: new Float32Array([centerX, centerY]) }, uZoom: { value: zoom },
          uColor1: { value: new Float32Array(hexToRgb(color1)) }, uColor2: { value: new Float32Array(hexToRgb(color2)) }, uColor3: { value: new Float32Array(hexToRgb(color3)) },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });
      const setSize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
        program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
        program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      };
      const loop = (time) => {
        program.uniforms.iTime.value = time * 0.001;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      resizeObserver = new ResizeObserver(setSize);
      resizeObserver.observe(container);
      setSize();
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
        if (!entry.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      });
      intersectionObserver.observe(container);
      contextRef.current = { renderer, canvas };
    } catch {
      container.classList.add('grainient-fallback');
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      const ctx = contextRef.current;
      if (ctx?.canvas?.parentNode === container) container.removeChild(ctx.canvas);
      contextRef.current = null;
      renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    const program = context.renderer.gl.canvas.__grainientProgram;
    if (!program) return;
    program.uniforms.uTimeSpeed.value = timeSpeed;
  }, [timeSpeed]);

  return h('div', { ref: containerRef, className: `grainient-container ${className}`.trim() });
};

export default Grainient;
