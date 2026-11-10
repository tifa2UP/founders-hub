// A live, slowly rotating sun drawn with a WebGL fragment shader.
// One instance per canvas; returns null when WebGL is unavailable so callers can fall back.

const FRAG = `precision highp float;
uniform vec2 uRes; uniform vec2 uC; uniform float uR; uniform float uT;
float h(vec3 p){ p=fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float n(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float a=.5, s=0.; for(int i=0;i<4;i++){ s+=a*n(p); p*=2.03; a*=.5; } return s; }
vec3 h3(vec3 p){ return vec3(h(p), h(p+19.19), h(p+47.77)); }
// Cellular noise: x = distance to the nearest cell centre, y = distance to the cell border.
vec2 cell(vec3 x){ vec3 i=floor(x), f=fract(x); float d1=8., d2=8.;
  for(int a=-1;a<=1;a++) for(int b=-1;b<=1;b++) for(int c=-1;c<=1;c++){
    vec3 g=vec3(float(a),float(b),float(c)); vec3 r=g+h3(i+g)-f; float d=dot(r,r);
    if(d<d1){ d2=d1; d1=d; } else if(d<d2){ d2=d; } }
  d1=sqrt(d1); return vec2(d1, sqrt(d2)-d1); }
void main(){
  vec2 uv=(gl_FragCoord.xy-uC)/uR; float r=length(uv);
  vec3 deep=vec3(.78,.15,.05), core=vec3(.976,.263,.102), mid=vec3(.98,.41,.09), gold=vec3(1.,.659,.204), hot=vec3(1.,.88,.6);
  float detail=smoothstep(40.,220.,uR);

  // Corona: broad streamers, fine rays, prominences and a thin bright rim at the limb.
  float d=max(r-1.,0.);
  vec2 dir=uv/max(r,1e-4);
  float fade=smoothstep(1.4,1.1,r);
  float st=fbm(vec3(dir*2.2,uT*.05));
  float fine=n(vec3(dir*11.,uT*.09-d*1.5));
  float glow=exp(-d*7.)*(.25+.75*st)*(.7+.3*fine)*.62+exp(-d*2.4)*.15*(.5+st);
  float tong=max(fbm(vec3(dir*6.+d*4.,uT*.1))-.54,0.)*.7;
  float fil=n(vec3(uv*26.+dir*d*30.,uT*.25));
  float prom=tong>.002 ? (1.-smoothstep(tong*.15,tong,d))*(.3+.7*fil*fil) : 0.;
  prom*=detail;
  float rim=exp(-d*(26.+20.*fine))*.3;
  vec3 ccol=mix(gold,core,clamp(d*2.2,0.,1.))*glow+mix(mid,core,clamp(d*8.,0.,1.))*prom*.5+gold*rim;
  vec4 cor=vec4(ccol,clamp(glow+prom*.5+rim,0.,1.))*fade;

  if(r<1.){
    float z=sqrt(1.-r*r); vec3 p0=vec3(uv,z); float ra=uT*.045, cr=cos(ra), sr=sin(ra);
    vec3 p=vec3(p0.x*cr+p0.z*sr, p0.y, -p0.x*sr+p0.z*cr);
    vec3 q=p*3.2; float t=uT*.06;
    // Slow plasma flow, then granulation: bright convection cells with dark lanes between them.
    float w=fbm(q+vec3(t,t*.7,-t));
    float g=fbm(q*2.1+w*1.8+vec3(0.,0.,t*1.6));
    vec2 ce=cell(p*34.+w*2.5+vec3(0.,0.,uT*.1));
    float gran=(1.-smoothstep(0.,.95,ce.x))*.65+smoothstep(0.,.3,ce.y)*.35;
    float tex=mix(g, g*.74+gran*.3, detail);
    // Sunspots in two mid-latitude belts, each with a dark umbra and a softer penumbra.
    float lat=abs(p.y);
    float belt=smoothstep(.08,.2,lat)*smoothstep(.62,.42,lat);
    float act=smoothstep(.6,.72,n(p*1.7+7.3))*belt*detail;
    float sd=cell(p*4.2+3.1).x+(g-.5)*.12;
    float pen=(1.-smoothstep(.1,.17,sd))*act, umb=(1.-smoothstep(.05,.09,sd))*act;
    float fac=(1.-smoothstep(.15,.42,sd))*act*(1.-pen);
    // Limb darkening: the edge is cooler and deeper red than the centre.
    vec3 base=mix(deep,mid,smoothstep(0.,.5,z));
    base=mix(base,gold,smoothstep(.45,1.,z)*.5);
    vec3 col=mix(base*vec3(.84,.6,.5),base*1.34,tex);
    col=mix(col,hot,smoothstep(.72,1.,tex)*.3);
    col*=1.-.32*(1.-z);
    col+=hot*fac*.16*(1.-z*.6);
    col=mix(col,col*vec3(.6,.45,.42),pen*.75);
    col=mix(col,vec3(.17,.04,.02),umb*.85);
    col+=gold*pow(1.-z,6.)*.14;
    float aa=smoothstep(1.,1.-1.5/uR,r);
    gl_FragColor=vec4(col,1.)*aa+cor*(1.-aa);
  } else {
    gl_FragColor=cor;
  }
}`;

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

export type Sun = {
  draw: (time: number, radiusPx: number, maxDpr?: number) => void;
};

export function makeSun(canvas: HTMLCanvasElement): Sun | null {
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
  } catch {
    gl = null;
  }
  if (!gl) {
    canvas.classList.add("sun");
    return null;
  }
  const ctx = gl;
  const compile = (type: number, source: string) => {
    const shader = ctx.createShader(type)!;
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);
    return shader;
  };
  const program = ctx.createProgram()!;
  ctx.attachShader(program, compile(ctx.VERTEX_SHADER, VERT));
  ctx.attachShader(program, compile(ctx.FRAGMENT_SHADER, FRAG));
  ctx.linkProgram(program);
  if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    canvas.classList.add("sun");
    return null;
  }
  ctx.useProgram(program);
  const buffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
  const loc = ctx.getAttribLocation(program, "p");
  ctx.enableVertexAttribArray(loc);
  ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);
  const uRes = ctx.getUniformLocation(program, "uRes");
  const uC = ctx.getUniformLocation(program, "uC");
  const uR = ctx.getUniformLocation(program, "uR");
  const uT = ctx.getUniformLocation(program, "uT");
  ctx.enable(ctx.BLEND);
  ctx.blendFunc(ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);

  return {
    draw(time, radiusPx, maxDpr = 1.5) {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.viewport(0, 0, w, h);
      ctx.clearColor(0, 0, 0, 0);
      ctx.clear(ctx.COLOR_BUFFER_BIT);
      ctx.uniform2f(uRes, w, h);
      ctx.uniform2f(uC, (canvas.clientWidth / 2) * dpr, (canvas.clientHeight / 2) * dpr);
      ctx.uniform1f(uR, radiusPx * dpr);
      ctx.uniform1f(uT, time);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    },
  };
}
