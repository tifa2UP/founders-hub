// A live, slowly rotating sun drawn with a WebGL fragment shader.
// One instance per canvas; returns null when WebGL is unavailable so callers can fall back.

const FRAG = `precision highp float;
uniform vec2 uRes; uniform vec2 uC; uniform float uR; uniform float uT;
float h(vec3 p){ p=fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float n(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float a=.5, s=0.; for(int i=0;i<5;i++){ s+=a*n(p); p*=2.03; a*=.5; } return s; }
void main(){
  vec2 uv=(gl_FragCoord.xy-uC)/uR; float r=length(uv);
  vec3 core=vec3(.976,.263,.102), mid=vec3(.98,.388,.086), edge=vec3(1.,.659,.204), hot=vec3(1.,.86,.55);
  float d=max(r-1.,0.);
  float ang=atan(uv.y,uv.x);
  float fl=fbm(vec3(cos(ang)*2.,sin(ang)*2.,uT*.12))*.7+.3;
  float c=(exp(-d*7.)*.55*fl + exp(-d*2.4)*.16)*smoothstep(1.4,1.12,r);
  vec4 cor=vec4(mix(edge,core,clamp(d*2.,0.,1.))*c,c);
  if(r<1.){
    float z=sqrt(1.-r*r); vec3 p0=vec3(uv,z); float ra=uT*.045, cr=cos(ra), sr=sin(ra);
    vec3 p=vec3(p0.x*cr+p0.z*sr, p0.y, -p0.x*sr+p0.z*cr);
    vec3 q=p*3.2; float t=uT*.06;
    float w=fbm(q+vec3(t,t*.7,-t));
    float g=fbm(q*2.2+w*1.8+vec3(0.,0.,t*1.6));
    float cells=fbm(p*14.+vec3(t*3.))*.5;
    float b=g*.85+cells*.45;
    vec3 base=mix(core,mid,smoothstep(.0,.55,r));
    base=mix(base,edge,smoothstep(.5,1.,r));
    vec3 col=base*(.72+b*.62);
    col=mix(col,hot,smoothstep(.62,.95,b)*.35);
    col*=mix(.8,1.05,pow(z,.35));
    col+=hot*pow(1.-z,3.)*.18;
    float aa=smoothstep(1.,.99,r);
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
